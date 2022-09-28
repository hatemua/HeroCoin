import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import { withRouter } from "react-router-dom";
import "./CircleInteractions.css";

function CircleInteractions(props) {
  const history = useHistory();
  const { circlename } = useParams();

  return (
    <>
      <Header
        showTitlePage
        title={"Circle Interactions"}
        showBackBtn
        showMenuBtn
        transparent
        whiteMode
        backTo={"/circle-home" + circlename}
      />
      <div id="appCapsule" className="circle-interactions">
        <div className="mt-4">
          <ion-icon
            src="assets/img/svg/icon24.svg"
            class="mb-2 icon-btn me-2"
            onClick={() => history.push("/circle-updates" + circlename)}
          ></ion-icon>
          <ion-icon
            src="assets/img/svg/icon16.svg"
            class="mb-2 icon-btn me-2"
            onClick={() => history.push("/circle-videos" + circlename)}
            ></ion-icon>
          <ion-icon
            src="assets/img/svg/icon23.svg"
            class="mb-2 icon-btn me-2"
            onClick={() => history.push("/circle-interactions" + circlename)}
          ></ion-icon>
        </div>
        <div className="section mt-2">
          <div className="card flex-center">
            <img
              src={"assets/img/logo3.png"}
              alt="logo"
              className="logo imaged w36 mt-3"
            />
            <p className="header-text mt-3 blue mb-1">
              We will update you when the
              <br /> first Livestream is planned.
            </p>
            <img
              src={"assets/img/image10.png"}
              alt="logo"
              className="logo imaged w180 mt-3 mb-3"
            />
            <span>
              Do you have questions or topics that you
              <br /> would likes us to address in our next stream?
            </span>
            <form className="flex-center flex-col">
              <div class="form-group boxed">
                <div class="input-wrapper">
                  <input
                    type="text"
                    class="form-control"
                    id="text4b"
                    placeholder="Leave your comment or questions here"
                  />
                  <i class="clear-input">
                    <ion-icon
                      name="close-circle"
                      role="img"
                      class="md hydrated"
                      aria-label="close circle"
                    ></ion-icon>
                  </i>
                </div>
              </div>{" "}
              <button
                id="blueBtn"
                type="button"
                className="btn btn-primary rounded font-size-btn mt-2 mb-4 "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(CircleInteractions);
