import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCurrentUserAccount, signOutCurrentUser } from "../../firebase-auths";
import useOnClickOutside from "../right-side/click-outside-utility-hook/useOnClickOutside";
import "../styles/left-panel.css";
import { iconsArray } from "./svg-resources";

function LeftSideNavigationPanel({toggleModality, handleTweetModalToggle, opacity, currentUser, setOpacity}) {
  let history = useHistory(null)
  let [showMoreOptions, setShowMoreOptions] = useState(false)

  let clickHandler = () => {
    handleTweetModalToggle()
    toggleOpacity()
  }

  let otherClickHandler = (evt) => {
    let whichLink = evt.target.textContent
    if(whichLink == 'Home') {
      history.push('/home')
    } else if(whichLink == 'Explore') {
      history.push('/explore')
    } else if (whichLink == 'More') {
      setShowMoreOptions(!showMoreOptions)
    }
    neutralizePreviouslyHeldOpacity()
  }

  let neutralizePreviouslyHeldOpacity = () => opacity && setOpacity(false)

  let toggleOpacity = () => setOpacity(!opacity)

  useEffect(() => neutralizePreviouslyHeldOpacity(), [])

  let ref = useRef(null)
  useOnClickOutside(ref, () => setShowMoreOptions(false))

  let panelDivs = iconsArray.map((icon) => (
    <div key={icon.id} id={icon.id} onClick={icon.id == 'Tweet' ? clickHandler : otherClickHandler}>
      <Link className="item-divs" to={icon.id == 'Tweet' ? '/tweet/compose' : icon.id == 'Profile' && '/'+currentUser } ref={icon.id == 'More' ? ref : null}>
        <span className="icons-span" style={{display: icon.id == 'Tweet' ? 'none': 'block'}}>{icon.svg}</span>
        <span className="names-span">{icon.id == "Twitter" ? "" : icon.id}</span>
        {icon.id == 'More' && showMoreOptions && <RenderMoreOption setShowMoreOptions={setShowMoreOptions} />}
      </Link>
    </div>
  ));

  return <div id="left-panel-container" className={toggleModality ? 'left-opaque' : ''} style={{opacity: opacity ? '.2' : 1}}>
    {panelDivs}
  </div>;
}

let RenderMoreOption = ({setShowMoreOptions}) => {

  let options = ['Signout', 'Delete account']
  
  let renderOptions = () => options.map(name => <RenderOptionUi key={name} name={name} setShowMoreOptions={setShowMoreOptions} />)

  return (
    <div id="more-options-wrpper">
      {renderOptions()}
    </div>
  )
}

let RenderOptionUi = ({name, setShowMoreOptions}) => {
  let [authAction, setAuthAction] = useState(false)

  let [confirmAction, setConfirmAction] = useState(false)

  let handleClick = () => {
    setAuthAction(true)
  }

  useEffect(() => {
    authAction && confirmAction && commenceAuthAction(name)
    authAction && confirmAction && document.location.reload()
  }, [authAction, confirmAction])

  return (
    <div className="option-wrapper">
      <div className="option-name" onClick={handleClick}>{name}</div>
      {authAction && <RenderConfirmActionModal name={name} setAuthAction={setAuthAction} setShowMoreOptions={setShowMoreOptions} setConfirmAction={setConfirmAction} />}
    </div>
  )
}

let RenderConfirmActionModal = ({name, setAuthAction, setShowMoreOptions, setConfirmAction}) => {
  let handleConfirm = () => {
    setConfirmAction(true)
    // console.log('confirm')
  }

  let handleNeutralize = () => {
    setAuthAction(false)
    setConfirmAction(false)
    setShowMoreOptions(false)
    // console.log('cancel')
  }

  return (
    <div id="confirm-modal-wrapper">
      <div>Are you sure you want to {name}</div>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={handleNeutralize}>No</button>
    </div>
  )
}

let commenceAuthAction = (name) => {
  if(name == 'Signout') {
    signOutCurrentUser()
    // console.log('signout')
  } else if (name == 'Delete account') {
    deleteCurrentUserAccount();
    // console.log('delete')
  }
}

export default LeftSideNavigationPanel;