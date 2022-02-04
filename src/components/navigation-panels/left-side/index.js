import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/left-panel.css";
import RenderHomePageView from "./home-page";
import { deleteIcon, iconsArray } from "./svg-resources";

function LeftSideNavigationPanel({toggleModality, handleTweetModalToggle, opacity, currentUser}) {
  let history = useHistory(null)

  let clickHandler = () => handleTweetModalToggle()

  let otherClickHandler = (evt) => {
    console.log(evt.target.textContent, '[][]')
    let whichLink = evt.target.textContent
    if(whichLink == 'Home') {
      history.push('/home')
    }
  }

  let panelDivs = iconsArray.map((icon) => (
    <div key={icon.id} id={icon.id} onClick={icon.id == 'Tweet' ? clickHandler : otherClickHandler}>
      <Link className="item-divs" to={icon.id == 'Tweet' ? '/tweet/compose' : icon.id == 'Profile' && '/'+currentUser }>
        <span className="icons-span" style={{display: icon.id == 'Tweet' ? 'none': 'block'}}>{icon.svg}</span>
        <span className="names-span">{icon.id == "Twitter" ? "" : icon.id}</span>
      </Link>

    </div>
  ));

  // return <div id="left-panel-container" className={toggleModality ? 'left-opaque' : ''} style={{opacity: opacity ? '.2' : 1}}>{panelDivs}</div>;
  return <div id="left-panel-container" className={toggleModality ? 'left-opaque' : ''} style={{opacity: opacity ? '.2' : 1}}>
    {/* <RenderHomePageView /> */}
    {panelDivs}
  </div>;
}

export default LeftSideNavigationPanel;