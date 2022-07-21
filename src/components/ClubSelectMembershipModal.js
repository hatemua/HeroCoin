import React, { useEffect, useState } from "react";
import { Modal } from "bootstrap";
import "./ClubSelectMembershipModal.css";
import HeroStarterDetails from "./HeroStarterDetails";
import HeroSupporterDetails from "./HeroSupporterDetails";
import HeroChangerDetails from "./HeroChangerDetails";

function ClubSelectMembershipModal(props) {
  useEffect(() => {
    if (props.show) {
      const modal = new Modal(document.getElementById("clubSelectMembership"), {
        keyboard: false,
      });
      if (modal) {
        modal.show();
      }
    }

    return () => {
      props.onClose();
      setShowHeroStarterDetails(false);
      setShowHeroSupporterDetails(false);
      setShowHeroChangerDetails(false);
      setShowForm(false);
      setShowWelcomeToClub(false);
    };
  }, [props.show]);
  const [showHeroStarterDetails, setShowHeroStarterDetails] = useState(false);
  const [showHeroSupporterDetails, setShowHeroSupporterDetails] =
    useState(false);
  const [showHeroChangerDetails, setShowHeroChangerDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showWelcomeToClub, setShowWelcomeToClub] = useState(false);
  const [amount, setAmount] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");

  const chooseAmount = (a) => {
    if (amount) {
      setAmount(null);
      return;
    }
    setAmount(a);
    if (a === 10) {
      setShowHeroStarterDetails(true);
      return;
    }
    if (a === 20) {
      setShowHeroSupporterDetails(true);
      return;
    }
    if (a === 50) {
      setShowHeroChangerDetails(true);
      return;
    }
  };

  const confirmAmount = () => {
    if (!amount) {
      return;
    }
    setShowForm(true);
  };

  const validate = () => {
    if (!name || !email || !birthDate || !city) {
      return;
    }
    setShowWelcomeToClub(true);
  };

  return (
    <>
      <div
        className="modal fade modalbox clubSelectMembership"
        id="clubSelectMembership"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ opacity: "90%" }}>
            <div
              className="modal-header"
              style={{
                justifyContent: "flex-end",
                border: "unset",
                background: "transparent",
              }}
            >
              <a href="#" data-bs-dismiss="modal">
                <ion-icon name="close" style={{ color: "white" }}></ion-icon>
              </a>
            </div>
            {!showHeroStarterDetails &&
              !showHeroSupporterDetails &&
              !showHeroChangerDetails &&
              !showForm &&
              !showWelcomeToClub && (
                <div className="modal-body">
                  <img
                    src={"assets/img/heroLogo2.png"}
                    alt="logo"
                    className="logo"
                  />
                  <p className="header-text mt-4">
                    Choose your HERO Club
                    <br /> Membership
                  </p>
                  <div className="button-wrapper mt-4">
                    <button
                      type="button"
                      className={
                        amount === 10
                          ? "btn btn-outline-primary custom-btn-white me-1 mb-1"
                          : "btn btn-outline-primary custom-btn me-1 mb-1"
                      }
                      onClick={() => chooseAmount(10)}
                    >
                      <sup>€</sup>10<span>/mo</span>
                    </button>
                    <span className="mt-1">HERO Starter</span>
                    <a href="" className="mt-1">
                      Click here to see what’s included.
                    </a>
                  </div>
                  <div className="button-wrapper mt-4">
                    <button
                      type="button"
                      className={
                        amount === 20
                          ? "btn btn-outline-primary custom-btn-white me-1 mb-1"
                          : "btn btn-outline-primary custom-btn me-1 mb-1"
                      }
                      onClick={() => chooseAmount(20)}
                    >
                      <sup>€</sup>20<span>/mo</span>
                    </button>
                    <span className="mt-1">HERO Supporter</span>
                    <a href="" className="mt-1">
                      Click here to see what’s included.
                    </a>
                  </div>
                  <div className="button-wrapper mt-4">
                    <button
                      type="button"
                      className={
                        amount === 50
                          ? "btn btn-outline-primary custom-btn-white me-1 mb-1"
                          : "btn btn-outline-primary custom-btn me-1 mb-1"
                      }
                      onClick={() => chooseAmount(50)}
                    >
                      <sup>€</sup>50<span>/mo</span>
                    </button>
                    <span className="mt-1">HERO Changer</span>
                    <a href="" className="mt-1">
                      Click here to see what’s included.
                    </a>
                  </div>
                  <button
                    type="button"
                    className="btn btn-icon rounded btn-primary submit-btn me-1 mb-1 mt-4"
                    onClick={confirmAmount}
                  >
                    <ion-icon
                      src="assets/img/svg/next2.svg"
                      style={{ color: "blue" }}
                    ></ion-icon>
                  </button>
                </div>
              )}
            {showHeroStarterDetails && (
              <div className="modal-body">
                <HeroStarterDetails
                  onClose={() => setShowHeroStarterDetails(false)}
                />
              </div>
            )}
            {showHeroSupporterDetails && (
              <div className="modal-body">
                <HeroSupporterDetails
                  onClose={() => setShowHeroSupporterDetails(false)}
                />
              </div>
            )}
            {showHeroChangerDetails && (
              <div className="modal-body">
                <HeroChangerDetails
                  onClose={() => setShowHeroChangerDetails(false)}
                />
              </div>
            )}
            {showForm && !showWelcomeToClub && (
              <div id="form" className="modal-body">
                <img
                  src={"assets/img/heroLogo.png"}
                  alt="logo"
                  className="logo"
                />
                <p className="header-text mt-4 mb-1">Action is your power!</p>
                <p>
                  Please leave us your details so that we
                  <br />
                  can send you a link for our launch!*
                </p>
                <div className="section">
                  <form id="white-form">
                    <div className="form-group basic">
                      <label className="label">Your Name</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control AmountAc"
                          placeholder="John Doe"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group basic">
                      <label className="label">Email</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control AmountAc"
                          placeholder="john@doe.com"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group basic">
                      <label className="label">Birth Date</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control AmountAc"
                          placeholder="24/10/2022"
                          onChange={(e) => setBirthDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group basic">
                      <label className="label">City</label>
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control AmountAc"
                          placeholder="Amsterdam"
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mb-4">
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
                          I accept to receive emails from HERO.
                        </label>
                      </div>
                    </div>
                    <div className="form-group basic">
                      <button
                        type="button"
                        className="btn btn-link rounded btn-lg"
                        onClick={validate}
                      >
                        Become a HERO Supporter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showWelcomeToClub && (
              <div id="welcomeClub" className="modal-body">
                <img
                  src={"assets/img/heroLogo2.png"}
                  alt="logo"
                  className="logo"
                />
                <p className="header-text mt-4">Welcome to the club, John!</p>
                <p className="mt-4">
                  You are now supporting <b>Anuna</b> and
                  <br /> will have access to exlusive content.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg rounded"
                >
                  Go to Club
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubSelectMembershipModal;