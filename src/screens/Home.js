import React from "react";
import { withRouter } from "react-router-dom";
import Header from "../components/Header";
import HomeCapsule from "../components/HomeCapsule";

function Home(props) {
  return (
    <>
      <Header whiteMode showLogo showMenuBtn showLoginBtn/>
      <HomeCapsule />
    </>
  );
}

export default withRouter(Home);