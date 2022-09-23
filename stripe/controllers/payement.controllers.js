const stripe = require('stripe')(process.env.STRIPEKEY);
const { getPriceId,getCustomerId,mergeString } = require("../utils/utils");
const { getdriver,initDriver }=require("../../neo4j");
const neo4j = require("neo4j-driver")
const moment =require("moment");
const getTime = require("../../utils/getTime")
const path = require('path');
const writeXlsxFile = require('write-excel-file/node')

const HEADER_ROW = [
  {
    value: 'Activist email',
    fontWeight: 'bold'
  },
  {
    value: 'amount',
    fontWeight: 'bold'
  },
  {
    value: 'IBAN',
    fontWeight: 'bold'
  },
  {
    value : "Cercle",
    fontWeight: 'bold'
  }
]
exports.createSession = async(req,res,next)=>{
  // const {mode,customerId,amount,idActivist}= req.body; for later changement
  const {mode,customerId,amount,grName}= req.body;
  //{price:  req.body.priceId, quantity: 1}
  try{
  const priceId = await getPriceId(amount);
  console.log(priceId);
    const session = await stripe.checkout.sessions.create({
      success_url: `${process.env.DOMAIN}8080/success?session_id={CHECKOUT_SESSION_ID}&grName=${grName}`,
      cancel_url: `${process.env.DOMAIN}8080/cancel?canceled=true`,
      line_items: [{
        price:priceId,
        quantity:1
    }],
      mode: mode,
      payment_method_types:["card","ideal"],
      currency: 'eur',
      customer : customerId
    });
    console.log(session)
    return res.status(200).json(session);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log(err)
  }
  
}

exports.successPage = async (req, res) => {
  // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
 
  // return res.status(200).json(session);
  const {grName}= req.query;
  console.log(req.query.grName);
  const sessione = await stripe.checkout.sessions.retrieve(req.query.session_id);
  await initDriver();
  var driver = getdriver();
  var session = driver.session({
    database: 'Hero'
  })
  const customer = await stripe.customers.retrieve(sessione.customer);
  const ind = mergeString(customer.id,grName,new Date(),sessione.amount_total);
  const ed = moment().add(30, 'days').calendar();
  const today = moment().format();
  const resu = await session.run("match(t:Transaction{Index:$ind})return t",{
    ind
  })
  if(resu.records.length>0){
    return res.status(200).json({message:"already transaction added !"});
  }
  const bwf = sessione.amount_total - ((sessione.amount_total*15)/100);
  await session.run("merge(t:Transaction{From:$fr,To:$to,Amount:$amount,SentDay:$today,Subscribed:$sub,EndDay:$ed,Transfered:$tr,Index:$in})",{
    fr:customer.id,
    to:grName,
    amount:bwf,
    today,
    ed,
    sub:true,
    tr:false,
    in:ind
  });
  await session.run("match(c:Customer{CustomerId:$ci})match(g:Groupe{Name:$grName}) merge(c)-[:JOINED{amount:$amount,date:$date}]->(g)",{
    ci:customer.id,
    grName,
    amount :sessione.amount_total,
    date:moment().format()
  })
  await session.run("match(h:Holder)set h.balance=h.balance+$amount,h.nTransactions=h.nTransactions	+1 with h as h match(t:Transaction{SentDay:$ed}) merge(h)-[:GOT]->(t)",{
    ed:today,
    amount:sessione.amount_total
  });
  
  await session.run("match(g:Groupe{Name:$grName})set g.balance=g.balance+$bwf",{
    grName,
    bwf
  })

  
  return res.redirect('https://herocircle.app/welcome-circle:'+grName.replace(":",""));

}
exports.saveCard = async(req,res)=>{
  try {
    const {number,exp_month,exp_year,cvc,customerId} = req.body;
    const paymentMethod = await stripe.paymentMethods.create({
      type:"card",
      card: {
        number,
        exp_month,
        exp_year,
        cvc,
      },
    });
    const paymentMethod2 = await stripe.paymentMethods.attach(
      paymentMethod.id,
      {customer: customerId}
    );
    const customer = await stripe.customers.update(
      customerId,
      {invoice_settings: {default_payment_method
          : paymentMethod.id}}
    );
  return res.status(200).json({customer});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return err;
  }
}

// exports.createPortalSession =  async (req, res) => {
//     // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
//     // Typically this is stored alongside the authenticated user in your database.
//     try {
//       const session_id= req.body.sessionId;
//       const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  
//     // This is the url to which the customer will be redirected when they are done
//     // managing their billing with the portal.
  
//       const portalSession = await stripe.billingPortal.sessions.create({
//         customer: checkoutSession.customer,
//         return_url: `${process.env.DOMAIN}${process.env.PORT}`,
//       });
  
//       return res.status(200).json(portalSession)
//       } catch (err) {
//         if (!err.statusCode) {
//           err.statusCode = 500;
//         }
//         return err;
//     }
    

// };   


exports.monthPay = async(req,res,next)=>{
  var EXCELDATA = [
    HEADER_ROW
  ];

  await initDriver();
  var driver = getdriver();
  var session = driver.session({
    database: 'Hero'
  })

  var result = await session.run("match(c:Groupe) return c");
  for (let record of result.records){
    var groupe = record.get("c").properties;
    var result = await session.run("match(c:Groupe{Name:$name})<-[:PART_OF]-(a:Activist) return a",{
      name:groupe.Name
    });
    if(groupe.members >0 && groupe.balance>0 ){
      var activistAmount = parseInt((groupe.balance / groupe.members)/100);
    var groupeBalance = groupe.balance;
    var amountRemovedFromStore = parseInt(groupeBalance + ((groupeBalance*15)/100));
    let data_row = [];
    for(let activistD of result.records){
      var activist = activistD.get("a").properties;
      console.log(activist)
      
      data_row.push(
        {
            value: activist.email
        },
        {
          value: activistAmount
        },
        {
          value : ""
        },
        {
          value : groupe.Name
        }
      )
      // const paymentIntent = await stripe.paymentIntents.create({
      //   amount: activistAmount,
      //   currency: 'usd',
      //   transfer_data: {
      //     destination: activist.accountId,
      //   },
      // });
    }
    EXCELDATA.push(data_row)

    await session.run("match(h:Holder) set h.balance= h.balance - $amount",{
      amount:amountRemovedFromStore 
    });
    }
    

    
  }
  await writeXlsxFile(EXCELDATA, { // (optional) column widths, etc.
    filePath: path.join("excel","file.xlsx")
  })
  return res.status(200).json("EXcel file is ready !")
}