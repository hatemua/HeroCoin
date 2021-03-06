import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import BlockLargeButton from "../components/buttons/BlockLargeButton";
import SmsVerification from "../components/SmsVerification";
import BasicInput from "../components/inputs/BasicInput";
import { checkIsPhoneFormat } from "../util/functions";
import Toastbox, { toast } from "react-toastbox";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./Login.css";
function Login() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberError, setphoneNumberError] = useState(false);
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  const [codeSmsValidated, setCodeSmsValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [points, setPoints] = useState("");
  const history = useHistory();
  useEffect(() => {
    //setphoneNumberError(!checkIsPhoneFormat(phoneNumber));
  }, [phoneNumber]);

  const login = (e) => {
    e.preventDefault();
    if (!phoneNumberError) {
      setShowSmsVerification(true);
      axios
      .post("https://hegemony.donftify.digital:8080/sendEmail/", {
        Email: phoneNumber,
        
      })
      .then(function (response) {
        
        
      })
      .catch(function (error) {
        //handle error here
        console.log(error);
      });
    } else {
      toast.error("Invalid Email");
      return;
    }
  };
  const createWallet = () => {
    console.log("ok");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      console.log("utilisateur trouvé");
    } else {
      setPoints("...");
      axios
        .post("https://hegemony.donftify.digital:8080/CreateWallet/", {
          Email: phoneNumber,
          password: password,
        })
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem(
            "user",
            JSON.stringify({ Email: phoneNumber, wallet: response.data })
          );
          history.push("/cardtransaction");
        })
        .catch(function (error) {
          //handle error here
          console.log(error);
        });
    }
  };
  const onCodeValidate = () => {
    setCodeSmsValidated(true);
  };

  const validate = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (password.length < 8) {
      toast.error("Make sure to include at least 8 characters");
      return;
    }
    if (password !== rePassword) {
      toast.error("the passwords are not the same");
      return;
    }
    console.log("Login successful :)");
  };

  return (
    <React.Fragment>
      <Header whiteMode showLogo showBackBtn />
      <Toastbox position="top-right" pauseOnHover={true} intent="danger" />
      {!showSmsVerification && !codeSmsValidated && (
        <div id="appCapsule" className="bg-g" style={{ minHeight: "100vh" }}>
          <div className="section mt-4 pt-4 pb-3 text-center">
            <img src="assets/img/supporter.png" className="supporter-logo" />
          </div>
          <div className="section pb-3 text-center">
            <h4
              className="white-text text-title"
              style={{ width: "70%", margin: "0 auto" }}
            >
              Please entrer your Email
            </h4>
          </div>
          <div className="section mb-3">
            <form id="white-form" onSubmit={login} className="login-form">
              <BasicInput
                type="text"
                label=""
                id="phone"
                placeholder="Your Email"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div className="pt-4 mt-4 center-div">
                <button
                  type="submit"
                  className="btn btn-link btn-block btn-lg rounded"
                  style={{ backgroundColor: "white" }}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showSmsVerification && !codeSmsValidated && (
        <SmsVerification onCodeValidate={onCodeValidate} isMobilizer={false} />
      )}
      {codeSmsValidated && (
        <div id="appCapsule" className="bg-g" style={{ minHeight: "100vh" }}>
          <div className="section mt-4 pt-4 text-center">
            <img src="assets/img/supporter.png" className="supporter-logo" />
          </div>
          <div className="section text-center">
            <div className="lead white-text">
              <h4 className="white-text text-title">Create new password</h4>
              Make sure to include at least 1 capital letter and 1 number or
              symbol
            </div>
          </div>
          <div className="section mb-5 p-2">
            <form onSubmit={validate} id="white-form" className="login-form">
              <BasicInput
                type="password"
                label=""
                id="password1"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <BasicInput
                type="password"
                label=""
                id="password2"
                placeholder="Type password again"
                onChange={(e) => setRePassword(e.target.value)}
              />
              <div className="mt-2">
                <div class="form-check mb-1">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label
                    class="form-check-label"
                    for="flexRadioDefault1"
                    style={{ fontSize: "14px" }}
                  >
                    I agree to the{" "}
                    <a
                      href="https://herolabsco.notion.site/Private-Policy-3da3d0ebdd3849dfa7d48fb13cf27564"
                      className="white-text"
                      target="_blank"
                    >
                      HERO Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <div className="pt-4 center-div">
                <button
                  type="submit"
                  className="btn btn-link btn-block btn-lg rounded"
                  style={{ backgroundColor: "white" }}
                  onClick={() => createWallet()}
                >
                  {"Validate" + points}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default withRouter(Login);
