const express = require("express");
const router = express.Router();
const payementController = require("../controllers/payement.controllers");
const bodyParser = require('body-parser');
router.post("/create-checkout",payementController.createSession);
router.post('/create-portal', payementController.createPortalSession);
// router.post("/save-card",payementController.saveCard);
router.get('/success',payementController.successPage);
router.get("/monthly-payment",payementController.monthPay);
router.post("/webhook",bodyParser.raw({type:"application/json"}),payementController.handleWebhooks);

module.exports = router;