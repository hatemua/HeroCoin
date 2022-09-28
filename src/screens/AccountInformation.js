import React, { useEffect, useState, useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import { withRouter } from "react-router-dom";
import "./AccountInformation.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import countryList from "react-select-country-list";

function AccountInformation(props) {
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [HeroId, setHeroId] = useState("");
  const [Email, setEmail] = useState("");
  const [livingCountry, setLivingCountry] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [choosedFile, setChoosedFile] = useState(null);
  const [receiveMailUpdates, setReceiveMailUpdates] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [success, setSuccess] = useState(false);
  const [heroIdError, setHeroIdError] = useState("");
  const [emailError, setEmailError] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const inputFilePhoto = useRef(null);
  const clickedFile = () => {
    inputFilePhoto.current.click();
    console.log(choosedFile);
  };
  console.log(choosedFile);

  const onChangeEmail = (ev) => {
    setEmail(ev.target.value);
    if (/\S+@\S+\.\S+/.test(ev.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email");
    }
  };

  const getUserInfo = () => {
    axios
      .post(
        "https://hegemony.donftify.digital:8080/userInfo/",
        {
          Email: user.Email,
        },
        {
          headers: {
            Authorization:
              "Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg==",
          },
        }
      )
      .then(function (response) {
        console.log(response.data[0]);
        setEmail(response.data[0]._fields[0].properties.email);
        setFullName(response.data[0]._fields[0].properties.name);
        setLivingCountry(response.data[0]._fields[0].properties.CountryTolive);
        setHeroId(response.data[0]._fields[0].properties.HeroId);
        setProfilePhoto(response.data[0]._fields[0].properties.imageUrl);
      });
  };
  const updateUserInfo = () => {
    const formData = new FormData();

    formData.append("Email", user.Email);
    formData.append("newEmail", Email);
    formData.append("name", fullName);
    formData.append("HeroId", HeroId);
    formData.append("CountryTolive", livingCountry);
    formData.append("url", profilePhoto);
    formData.append("myFile", choosedFile);

    axios
      .post(
        "https://hegemony.donftify.digital:8080/uploadProfilePhoto/",
        formData,
        {
          headers: {
            Authorization:
              "Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg==",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setSuccess(true);
      });
  };
  useEffect(() => {
    console.log(user);
    getUserInfo();
  }, []);
  return (
    <>
      <Header
        showTitlePage
        title={"Account Information"}
        showBackBtn
        showMenuBtn
        transparent
        whiteMode
        backTo={"/"}
      />
      <div id="appCapsule" className="account-information">
        <div className="mt-4">
          <ion-icon
            src="assets/img/svg/accountInfo.svg"
            class="mb-2 icon-btn me-2"
          ></ion-icon>
          <ion-icon
            src="assets/img/svg/passwordInfo.svg"
            class="mb-2 icon-btn me-2"
            onClick={() => history.push("/edit-password")}
          ></ion-icon>
          <ion-icon
            src="assets/img/svg/notification.svg"
            class="mb-2 icon-btn me-2"
            onClick={() => history.push("/subscriptions")}
          ></ion-icon>
          <ion-icon
            src="assets/img/svg/card.svg"
            class="mb-2 icon-btn me-2"
          ></ion-icon>
        </div>
        <div className="section mt-2">
          <div className="card flex-center pt-4 pb-4">
            {(() => {
              if (profilePhoto == "" && choosedFile == null) {
                return (
                  <img
                    src="assets/img/sample/photo/1.jpg"
                    alt="image"
                    className="imaged w48 rounded mb-3"
                  />
                );
              } else if (choosedFile != null) {
                return (
                  <img
                    src={URL.createObjectURL(choosedFile)}
                    alt="image"
                    className="imaged w48 rounded mb-3"
                  />
                );
              } else {
                return (
                  <img
                    src={
                      "https://hegemony.donftify.digital:8080/getFile:" +
                      profilePhoto
                    }
                    alt="image"
                    className="imaged w48 rounded mb-3"
                  />
                );
              }
            })()}

            <span className="blue" onClick={() => clickedFile()}>
              Upload profile photo
            </span>
            <hr className="hr mt-4 mb-4" />
            <div id="">
              <form>
                <div className="form-group boxed">
                  <div className="input-wrapper">
                    <label className="label mb-3" htmlFor="text4b">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="text4b"
                      placeholder={fullName}
                      value={fullName}
                      onChange={(ev) => setFullName(ev.target.value)}
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                </div>

                <div className="form-group boxed">
                  <div className="input-wrapper">
                    <label className="label mb-3" htmlFor="email4b">
                      HERO ID
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email4b"
                      placeholder={HeroId}
                      value={HeroId}
                      onChange={(ev) => setHeroId(ev.target.value)}
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                  {heroIdError && (
                    <h6 className="error-message">{heroIdError}</h6>
                  )}
                </div>
                <div className="form-group boxed">
                  <div className="input-wrapper">
                    <label className="label mb-3" htmlFor="email4b">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email4b"
                      placeholder={Email}
                      value={Email}
                      onChange={(ev) => onChangeEmail(ev)}
                    />
                    <i className="clear-input">
                      <ion-icon name="close-circle"></ion-icon>
                    </i>
                  </div>
                  {emailError && (
                    <h6 className="error-message">{emailError}</h6>
                  )}
                </div>
                <div className="form-group boxed">
                  <div className="input-wrapper">
                    <label className="label mb-3" htmlFor="select4b">
                      Where do you live?
                    </label>
                    {/*<select
                      className="form-control custom-select"
                      id="select4b"
                      value={livingCountry}
                      onChange={(ev) => setLivingCountry(ev.target.value)}
                    >
                      <option value=""></option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="France">France</option>
          </select>*/}
                    <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      value={livingCountry}
                      onChange={(ev) => setLivingCountry(ev.target.value)}
                    >
                      {options.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="flex-center mt-3">
                  <p className="m-0">I want to receive email updates</p>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="SwitchCheckDefault4"
                      checked={receiveMailUpdates}
                      onChange={() => {
                        setReceiveMailUpdates((current) => !current);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="SwitchCheckDefault4"
                    ></label>
                  </div>
                </div>
              </form>
              <input
                type="file"
                id="file"
                ref={inputFilePhoto}
                style={{ display: "none" }}
                accept="image/*"
                onChange={(file) => setChoosedFile(file.target.files[0])}
              />

              <button
                type="button"
                className="btn btn-outline-secondary btn-lg mt-4"
                onClick={() => updateUserInfo()}
                disabled={emailError || heroIdError}
              >
                Save
              </button>
              <br />
              <br />
              {success && (
                <Alert
                  severity="success"
                  color="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccess(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Thank you, your information has been updated
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(AccountInformation);
