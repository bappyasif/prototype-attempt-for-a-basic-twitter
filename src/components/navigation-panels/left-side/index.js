import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCurrentUserAccount, signOutCurrentUser } from "../../firebase-auths";
import useOnClickOutside from "../right-side/click-outside-utility-hook/useOnClickOutside";
import "../styles/left-panel.css";
import RenderHomePageView from "./home-page";
import { deleteIcon, iconsArray } from "./svg-resources";

function LeftSideNavigationPanel({toggleModality, handleTweetModalToggle, opacity, currentUser, setOpacity}) {
  let history = useHistory(null)
  let [showMoreOptions, setShowMoreOptions] = useState(false)
  // let [whichNav, setWhichNav] = useState(null)

  // let clickHandler = () => handleTweetModalToggle()
  let clickHandler = () => {
    handleTweetModalToggle()
    // neutralizePreviouslyHeldOpacity()
    toggleOpacity()
  }

  let otherClickHandler = (evt) => {
    // console.log(evt.target.textContent, '[][]')
    let whichLink = evt.target.textContent
    if(whichLink == 'Home') {
      // clickHandler()
      history.push('/home')
    } else if(whichLink == 'Explore') {
      // clickHandler()
      history.push('/explore')
    } else if (whichLink == 'More') {
      setShowMoreOptions(!showMoreOptions)
      // setWhichNav('More')
    }
    // setWhichNav(whichLink)
    neutralizePreviouslyHeldOpacity()
  }

  // let neutralizePreviouslyHeldOpacity = () => !toggleModality && handleTweetModalToggle()
  let neutralizePreviouslyHeldOpacity = () => opacity && setOpacity(false)
  // let neutralizePreviouslyHeldOpacity = () => opacity ? setOpacity(false) : setOpacity(true)

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
      {/* {whichNav == 'More' && showMoreOptions && <RenderMoreOption setShowMoreOptions={setShowMoreOptions} />} */}
    </div>
  ));

  // return <div id="left-panel-container" className={toggleModality ? 'left-opaque' : ''} style={{opacity: opacity ? '.2' : 1}}>{panelDivs}</div>;
  return <div id="left-panel-container" className={toggleModality ? 'left-opaque' : ''} style={{opacity: opacity ? '.2' : 1}}>
    {/* <RenderHomePageView /> */}
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

  // let ref = useRef(null)
  // useOnClickOutside(ref, () => setShowMoreOptions(false))

  let handleClick = () => {
    // setShowMoreOptions(false)

    console.log('HERE!!')
    setAuthAction(true)
  }

  // useEffect(() => authAction && commenceAuthAction(name), [authAction])

  useEffect(() => {
    authAction && confirmAction && commenceAuthAction(name)
    authAction && confirmAction && document.location.reload()
  }, [authAction, confirmAction])

  console.log(authAction, confirmAction, '<><>')

  // useEffect(() => authAction && setShowMoreOptions(false), [authAction])

  return (
    <div className="option-wrapper">
      <div className="option-name" onClick={handleClick}>{name}</div>
      {/* {authAction && commenceAuthAction(name)} */}
      {authAction && <RenderConfirmActionModal name={name} setAuthAction={setAuthAction} setShowMoreOptions={setShowMoreOptions} setConfirmAction={setConfirmAction} />}
    </div>
  )
}

let RenderConfirmActionModal = ({name, setAuthAction, setShowMoreOptions, setConfirmAction}) => {
  // let [confirmAction, setConfirmAction] = useState(false)

  let handleConfirm = () => {
    setConfirmAction(true)
    // setAuthAction(false)
    console.log('confirm')
  }

  let handleNeutralize = () => {
    setAuthAction(false)
    setConfirmAction(false)
    setShowMoreOptions(false)
    console.log('cancel')
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
    console.log('signout')
  } else if (name == 'Delete account') {
    deleteCurrentUserAccount();
    console.log('delete')
  }
}

export default LeftSideNavigationPanel;

/**
 * 
 * 
 let RenderOptionUi = ({name, setShowMoreOptions}) => {
  let [authAction, setAuthAction] = useState(false)

  let [confirmAction, setConfirmAction] = useState(false)

  let ref = useRef(null)
  // useOnClickOutside(ref, () => setShowMoreOptions(false))

  let handleClick = () => {
    // setShowMoreOptions(false)

    console.log('HERE!!')
    setAuthAction(true)
  }

  // useEffect(() => authAction && commenceAuthAction(name), [authAction])

  useEffect(() => {
    authAction && confirmAction && commenceAuthAction(name)
    authAction && confirmAction && document.location.reload()
    authAction && setShowMoreOptions(false)
  }, [authAction, confirmAction])

  console.log(authAction, confirmAction, '<><>')

  // useEffect(() => authAction && setShowMoreOptions(false), [authAction])

  return (
    <div className="option-wrapper" ref={ref}>
      <div className="option-name" onClick={handleClick}>{name}</div>
      {/* {authAction && commenceAuthAction(name)} /}
      {authAction && <RenderConfirmActionModal name={name} setAuthAction={setAuthAction} setShowMoreOptions={setShowMoreOptions} setConfirmAction={setConfirmAction} />}
    </div>
  )
}

let RenderConfirmActionModal = ({name, setAuthAction, setShowMoreOptions, setConfirmAction}) => {
  // let [confirmAction, setConfirmAction] = useState(false)

  let handleConfirm = () => {
    setConfirmAction(true)
    // setAuthAction(false)
    console.log('confirm')
  }

  let handleNeutralize = () => {
    setAuthAction(false)
    setConfirmAction(false)
    console.log('cancel')
  }

  return (
    <div id="confirm-modal-wrapper">
      <div>Are you sure you want to {name}</div>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={handleNeutralize}>No</button>
    </div>
  )
}
 * 
 * 
 let RenderConfirmActionModal = ({name, setAuthAction, setShowMoreOptions}) => {
  let [confirmAction, setConfirmAction] = useState(false)

  let handleConfirm = () => {
    setConfirmAction(true)
    setAuthAction(false)
    console.log('confirm')
  }

  let handleNeutralize = () => {
    setAuthAction(false)
    setConfirmAction(false)
    console.log('cancel')
  }

  useEffect(() => {
    confirmAction && commenceAuthAction(name)
    confirmAction && document.location.reload()
  }, [confirmAction])

  console.log(confirmAction, name, '!!!!')

  // useEffect(() => setShowMoreOptions(false), [])

  return (
    <div id="confirm-modal-wrapper">
      <div>Are you sure you want to {name}</div>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={handleNeutralize}>No</button>
    </div>
  )
}
 * 
 * 
 let RenderOptionUi = ({name, setShowMoreOptions}) => {
  let [authAction, setAuthAction] = useState(false)

  let [confirmAction, setConfirmAction] = useState(false)

  let ref = useRef(null)
  // useOnClickOutside(ref, () => setShowMoreOptions(false))

  let handleClick = () => {
    // let check = prompt(`are you sure you want to ${name}? press y or n`)
    // prompt = !authAction && alert(`are you sure you want to ${name}? press y or n`)
    // check = !authAction && prompt(`are you sure you want to ${name}? press y or n`)
    // (check == 'y' || check =='Y') ? setAuthAction(true) : setAuthAction(false)
    
    // let check = alert(`are you sure you want to ${name}? press y or n`)
    // setConfirmAction((check == 'y' || check =='Y') ? true : false)
    // setAuthAction(true)
    // setShowMoreOptions(false)

    console.log('HERE!!')
    // let check = prompt(`are you sure you want to ${name}? press y or n`)
    // setConfirmAction((check == 'y' || check =='Y') ? true : false)
    setAuthAction(true)
    // console.log(check, 'check')
  }

  // useEffect(() => authAction && commenceAuthAction(name), [authAction])

  useEffect(() => {
    authAction && commenceAuthAction(name)
    authAction && document.location.reload()
  }, [authAction])

  // useEffect(() => {
  //   console.log(authAction, confirmAction, '?!?!')
  //   authAction && confirmAction && commenceAuthAction(name)
  //   authAction && confirmAction && setShowMoreOptions(false)
  //   authAction && confirmAction && document.location.reload()
  //   // let handle = setTimeout(() => {
  //   //   document.location.reload()
  //   // }, 1100)

  //   // return () => clearTimeout(handle)
  // }, [authAction])

  return (
    <div className="option-wrapper" ref={ref}>
      <div className="option-name" onClick={handleClick}>{name}</div>
      {/* {authAction && commenceAuthAction(name)} /}
      </div>
      )
    }
 */