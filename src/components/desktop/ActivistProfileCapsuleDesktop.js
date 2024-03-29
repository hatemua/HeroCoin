import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "../ActivistProfileCapsule.css";
import ActivistCampaignsDesktopModal from "../modals/ActivistCampaignsDesktopModal";
import ActivistVictoriesDesktopModal from "../modals/ActivistVictoriesDesktopModal";
//import CardTransactionModal from "./modals/CardTransactionModal";

function ActivistProfileCapsuleDesktop(props) {
  const A = useLocation();
  const history = useHistory();
  const [showMobilizerCampaignsModal, setShowMobilizerCampaignsModal] =
    useState(false);
  const [showMobilizerVictoriesModal, setShowMobilizerVictoriesModal] =
    useState(false);
  const [showCardTransactionModal, setShowCardTransactionModal] =
    useState(false);
  const [loggedin, setLogedin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      setLogedin(true);
    }
  }, []);
  useEffect(() => {
    console.log(A);
  }, []);
  const support = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user == null) {
      history.push("/Login");
    } else {
      //setShowCardTransactionModal(true);
      history.push("/cardtransaction");
    }
  };

  return (
    <>
      <div
        id="appCapsule"
        className="bg-g-1"
        style={loggedin ? { paddingBottom: "100px" } : {}}
      >
        <div className="container" style={{ marginBottom: "50px" }}>
          <div className="row mt-4 pt-4">
            <div className="col-6 flex-center">
              <iframe
                id="background-video"
                src={A.state.autre.Video}
                title="HERO Coin - How it works"
                frameborder="0"
                allow="accelerometer;autoplay=false; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{ borderRadius: "30px", width: "100%", height: "40vh" }}
              ></iframe>
            </div>
            <div className="col-6">
              <div
                className=" wallet-card ml-4"
                style={{ borderRadius: "30px" }}
              >
                <div className="section mt-3 text-center center-div">
                  <div className="avatar-section mb-2">
                    <a href="#">
                      <img
                        src={"assets/img/" + A.state.autre.Photo}
                        alt="avatar"
                        className="imaged w100 rounded profil-img"
                      />
                    </a>
                  </div>
                  <h3
                    className="custom-font blue-text"
                    style={{ paddingBottom: 0, margin: 0 }}
                  >
                    {A.state.Nom + " " + A.state.Prenom}{" "}
                    <ion-icon
                      src="assets/img/svg/heroblue.svg"
                      style={{ width: "8.4px", marginLeft: "3px" }}
                    ></ion-icon>
                  </h3>
                  <span className="blue-text" style={{ fontStyle: "italic" }}>
                    {A.state.autre.Pays}
                  </span>
                  <div className="black-text pt-3 pb-3">
                    <span style={{ fontFamily: "Serabic!important" }}>
                      {A.state.autre.Bio + " "}
                    </span>
                  </div>
                  <h5>
                    <a
                      href={A.state.autre.twitter}
                      className="blue-text title-font"
                    >
                      {"@" + A.state.Nom}
                    </a>
                  </h5>
                </div>
                <hr
                  data-content="AND"
                  className="hr-text mt-4 mb-4"
                  style={{
                    width: "70%",
                    margin: "0 auto",
                    background: "#a9abad",
                  }}
                ></hr>
                <div className="section">
                  <span className="blue-text">
                    <strong>Endorsed by</strong>
                  </span>
                  <div className="black-text pb-2">
                    <span>{A.state.autre.Endorser}</span>
                  </div>
                </div>
                <hr
                  data-content="AND"
                  className="hr-text mt-4 mb-4"
                  style={{
                    width: "70%",
                    margin: "0 auto",
                    background: "#a9abad",
                  }}
                ></hr>
                <div className="section">
                  <div style={{ display: "flex" }}>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-xs-6 flex-center mb-2"
                      style={{ flexDirection: "column" }}
                    >
                      <ion-icon
                        class="md-icon"
                        src="assets/img/svg/voteBlue.svg"
                        style={{ marginRight: "5px" }}
                        onClick={() => setShowMobilizerCampaignsModal(true)}
                      ></ion-icon>
                      <span
                        className="blue-text"
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        Campaigns
                      </span>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-xs-6 flex-center  mb-2"
                      style={{ flexDirection: "column" }}
                    >
                      <ion-icon
                        class="md-icon"
                        src="assets/img/svg/HeroCoin2.svg"
                        style={{ marginRight: "5px" }}
                        onClick={() => setShowMobilizerVictoriesModal(true)}
                      ></ion-icon>
                      <span
                        className="blue-text"
                        style={{ fontSize: "14px", fontWeight: "bold" }}
                      >
                        Victories
                      </span>
                    </div>
                  </div>
                </div>

                <hr
                  data-content="AND"
                  className="hr-text mt-4 mb-4"
                  style={{
                    width: "70%",
                    margin: "0 auto",
                    background: "#a9abad",
                  }}
                ></hr>
                <div className="section mb-4">
                  <div className="title blue-text">
                    <span>Fund a 1 year Basic Income of</span>
                  </div>
                  <h5 className="value blue-text title-font">{"€5, 000"}</h5>

                  <div className="center-div mt-3 ">
                    <div
                      className="progress mb-2"
                      style={{
                        width: "200px",
                        margin: "0 auto",
                        backgroundColor: "#dcdce9",
                      }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: "55%",
                          background: "blue",
                          height: "100%",
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div
                      className="value"
                      style={{ color: "blue", textAlign: "center" }}
                    >
                      <b className="title-font">€ 500</b>
                      {" of € 5000"}
                    </div>
                  </div>
                </div>
                <div className="section pb-4 mb-4">
                  <button
                    id="supportMobBtn"
                    type="button"
                    className="btn btn-primary rounded font-size-btn"
                    onClick={() => support()}
                  >
                    {"Support " + A.state.Nom}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ActivistCampaignsDesktopModal
          show={showMobilizerCampaignsModal}
          activist={A.state}
          onClose={() => setShowMobilizerCampaignsModal(false)}
        />
        <ActivistVictoriesDesktopModal
          show={showMobilizerVictoriesModal}
          activist={A.state}
          onClose={() => setShowMobilizerVictoriesModal(false)}
        />
      </div>
      {/*<CardTransactionModal
        show={showCardTransactionModal}
        onClose={() => setShowCardTransactionModal(false)}
            />*/}
    </>
  );
}

export default ActivistProfileCapsuleDesktop;
