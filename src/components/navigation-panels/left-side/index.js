import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/left-panel.css";
import { deleteIcon, iconsArray } from "./svg-resources";

function LeftSideNavigationPanel({toggleModality, handleTweetModalToggle, opacity}) {

  let clickHandler = () => handleTweetModalToggle()

  let panelDivs = iconsArray.map((icon) => (
    <div key={icon.id} id={icon.id} onClick={icon.id == 'Tweet' ? clickHandler : null}>
      <Link className="item-divs" to={icon.id == 'Tweet' ? '/tweet/compose' : icon.id == 'Profile' ? '/user-profile' : '/'}>
        <span className="icons-span" style={{display: icon.id == 'Tweet' ? 'none': 'block'}}>{icon.svg}</span>
        <span className="names-span">{icon.id == "Twitter" ? "" : icon.id}</span>
      </Link>

    </div>
  ));

  return <div id="left-panel-container" className={toggleModality ? 'left-opaque' : ''} style={{opacity: opacity ? '.2' : 1}}>{panelDivs}</div>;
}

export default LeftSideNavigationPanel;