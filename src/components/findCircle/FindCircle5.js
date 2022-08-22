import React from "react";
import { useHistory } from "react-router-dom";
import "./FindCircle5.css";

function FindCircle5(props) {
  const history = useHistory();
  return (
    <div id="findCircle5">
      <div className="" style={{ minHeight: "90vh!important" }}>
        <div className="">
          <img
            src={"assets/img/heroLogoWhite.png"}
            alt="logo"
            className="logo mt-4"
          />
          <div className="mt-4 flex-center flex-col">
            <h3 className="white">
              In the words of <br />
              <b>HERO Supporters</b>
            </h3>
            <button
              id="whiteBlueBtn"
              type="button"
              className="btn btn-primary rounded font-size-btn mt-4 mb-4 "
            >
              <ion-icon src="assets/img/svg/icon3.svg"></ion-icon>
              Fund a HERO Circle
            </button>
          </div>
          <div className="section flex-center mt-4 flex-col">
            <div class="card border-blue mb-3">
              <div class="card-body flex-center flex-col">
                <img
                  src="assets/img/activist4.png"
                  alt="image"
                  class="imaged w48 rounded"
                />
                <span className="blue">A girl from AMS</span>
                <small className="blue">Amsterdam, Netherlands</small>
                <p className="blue">
                  “I wanted to do more for climate, but I just
                  <br /> didn’t how. HERO has allowed me to act in
                  <br /> a super effective way on climate.”
                </p>
              </div>
            </div>
            <div class="card border-blue mb-3">
              <div class="card-body flex-center flex-col">
                <img
                  src="assets/img/activist4.png"
                  alt="image"
                  class="imaged w48 rounded"
                />
                <span className="blue">Anne-Flore Lepeu</span>
                <small className="blue">Paris, France</small>
                <p className="blue">
                  “Having real time reports on the policies
                  <br /> impacted by the HERO Circle I support is
                  <br /> amazing, it makes me feel part of change.”
                </p>
              </div>
            </div>
            <div class="card border-blue mb-3">
              <div class="card-body flex-center flex-col">
                <img
                  src="assets/img/activist4.png"
                  alt="image"
                  class="imaged w48 rounded"
                />
                <span className="blue">A guy from London</span>
                <small className="blue">London, UK</small>
                <p className="blue">
                  “HERO has made changing the world as
                  <br /> simple as supporting incredible people that
                  <br /> have now become my personal heroes.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindCircle5;