import React, { useEffect } from "react";
import LoginPageBackDrop from "./backdrop";
import LoginPageFrontView from "./frontview";

function LandingPageUILogics() {
  return (
    <div>
      <LoginPageBackDrop />
      <LoginPageFrontView />
    </div>
  );
}

export default LandingPageUILogics;
