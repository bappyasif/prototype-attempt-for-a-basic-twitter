import React, { useEffect } from "react";
import LoginPageBackDrop from "./backdrop";
import LoginPageFrontView from "./frontview";

function LandingPageUILogics() {
  return (
    <div style={{width: '100%'}}>
      <LoginPageBackDrop />
      <LoginPageFrontView />
    </div>
  );
}

export default LandingPageUILogics;
