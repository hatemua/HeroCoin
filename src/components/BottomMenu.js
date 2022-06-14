import React from "react";

import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";

function BottomMenu(props) {
  const history = useHistory();
  const showHomeBtn = props.showHomeBtn;
  const showCardBtn = props.showCardBtn;
  const showVoteBtn = props.showVoteBtn;
  const activeItem = props.activeItem;
  return (
    <div className="appBottomMenu">
      {showHomeBtn && (
        <a
          href=""
          className={"item " + (activeItem === "home" ? "active" : "")}
          onClick={() => history.push("/")}
        >
          <div className="col">
            <ion-icon src="assets/img/svg/home.svg"></ion-icon>
          </div>
        </a>
      )}
      {showCardBtn && (
        <a
          href=""
          className={"item " + (activeItem === "card" ? "active" : "")}
          onClick={() => history.push("/card")}
        >
          <div className="col">
            <ion-icon
              src="assets/img/svg/card.svg"
              style={{ color: "bule" }}
            ></ion-icon>
          </div>
        </a>
      )}
      {showVoteBtn && (
        <a
          href=""
          className={"item " + (activeItem === "vote" ? "active" : "")}
          onClick={() => history.push("/vote")}
        >
          <div className="col">
            <ion-icon src="assets/img/svg/vote.svg"></ion-icon>
          </div>
        </a>
      )}
    </div>
  );
}

export default withRouter(BottomMenu);