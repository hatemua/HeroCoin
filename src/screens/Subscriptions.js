import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import { withRouter } from "react-router-dom";
import "./Subscriptions.css";

function Subscriptions(props) {
  const history = useHistory();

  return (
    <>
      <Header
        showTitlePage
        title={"Active Subscriptions"}
        showBackBtn
        showMenuBtn
        transparent
        whiteMode
        backTo={"/"}
      />
      <div id="appCapsule" className="edit-password">
        <div className="mt-4">
          <ion-icon
            src="assets/img/svg/account.svg"
            class="mb-2 icon-btn me-2"
            onClick={() => history.push("/account-information")}
          ></ion-icon>
          <ion-icon
            src="assets/img/svg/passwordInfo.svg"
            class="mb-2 icon-btn me-2"
            onClick={() => history.push("/edit-password")}
          ></ion-icon>
          <ion-icon
            src="assets/img/svg/notificationWhite.svg"
            class="mb-2 icon-btn me-2"
          ></ion-icon>
          <ion-icon
            src="assets/img/svg/card.svg"
            class="mb-2 icon-btn me-2"
          ></ion-icon>
        </div>
        <div className="section mt-2">
          <div className="card flex-center pt-4 pb-4">
            <span>
              Below you can find the list of your active HERO
              <br /> Circle subscriptions.
            </span>
            <hr className="hr mt-4 mb-4" />
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Subscriptions);