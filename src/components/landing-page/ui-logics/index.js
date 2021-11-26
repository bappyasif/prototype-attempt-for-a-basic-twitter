import React, { useEffect } from "react";
import LoginPageBackDrop from "./backdrop";
import LoginPageFrontView from "./frontview";

function LandingPageUILogics({currentUser, handleCurrentUser}) {
  return (
    <div style={{width: '100%'}}>
      <LoginPageBackDrop />
      <LoginPageFrontView currentUser={currentUser} handleCurrentUser={handleCurrentUser} />
    </div>
  );
}

export default LandingPageUILogics;
