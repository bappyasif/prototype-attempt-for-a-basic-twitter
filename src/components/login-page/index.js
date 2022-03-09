import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { beginRecaptchaForVerification, userLoginWithPhone, userSignInWithSessionPersistence } from "../firebase-auths";
import "./styles/index.css";

function LoginPage({ currentUser, handleCurrentUser }) {
  let announcementText =
    "The username and password you entered did not match our records. Please double-check and try again.";

  let showAnnouncement = () => {
    let divElem = document.querySelector("#announcement-div");
    let btnElem = document.querySelector("#login-btn");
    btnElem.addEventListener("click", () => {
      if (userId && userPassword && Math.random() > 0.5) {
        divElem.style.display = "block";
        document.querySelector("#announcement-div").textContent =
          announcementText;
      } else if (userId && userPassword) {
        window.open("/user-profile", "_blank");
      } else {
        document.querySelector("#announcement-div").textContent = "";
        divElem.style.display = "none";
      }
    });
  };

  let [announcement, setAnnouncement] = useState('')

  let handleAnnouncement = message => {
    // console.log(message, '<here>', message.split(':')[1])
    setAnnouncement(message.split(':')[1])
  }

  return (
    <div id="login-container">
      <div id="twitter-info">
        <TwitterLogo />
        <h2 style={{ fontWeight: "bolder" }}>Log in to Twitter</h2>
      </div>
      {announcement && <div id="announcement-div">{announcement}</div>}

      <UserLoginInfoComponent currentUser={currentUser} handleCurrentUser={handleCurrentUser} handleAnnouncement={handleAnnouncement} />

      <div id="additional-info">
        <Link to='/begin-password-reset'>
          forgot password?
        </Link>
        .
        <Link to='/i/flow/signup'>
          sign up for twitter
        </Link>

      </div>
    </div>
  );
}

let TwitterLogo = () => (
  <svg width='24px' height='24px' transform='scale(2)' style={{ marginLeft: '-143px' }} fill="rgb(29, 155, 240)">
    <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </g>
  </svg>
);

let UserLoginInfoComponent = ({ currentUser, handleCurrentUser, handleAnnouncement }) => {
  let [userID, setUserID] = useState(false)
  let [userPassword, setUserPassword] = useState(false)
  let [bothPresent, setBothPresent] = useState(false)
  let [signinDone, setIsSigninDone] = useState(false)
  let [profileCompleted, setIsProfileCompleted] = useState(false);
  let [loginWithPhoneNumber, setIsLoginWithPhoneNumber] = useState(false)
  let [showOtpModal, setShowOtpModal] = useState(false)

  let handleShowOtpModal = () => setShowOtpModal(!showOtpModal)

  let handleSigninStatus = () => setIsSigninDone(true);

  let handleProfileCompletion = () => setIsProfileCompleted(true);

  let handleLoginWithPhone = (val) => setIsLoginWithPhoneNumber(val);

  useEffect(() => {
    if (userID && userPassword) {
      setBothPresent(true)
    } else {
      setBothPresent(false)
    }
  }, [userID, userPassword]);

  let confirmLogin = (evt) => {
    !loginWithPhoneNumber && userSignInWithSessionPersistence(userID, userPassword, handleSigninStatus, handleProfileCompletion, handleCurrentUser, handleAnnouncement)
    loginWithPhoneNumber && beginRecaptchaForVerification(evt.target, userID, handleShowOtpModal)
  }
  let renderMarkup = () => {
    return (
      showOtpModal
      ?
      <div id="login-info">
        <GetOtpFromUser userID={userID} handleSigninStatus={handleSigninStatus} handleProfileCompletion={handleProfileCompletion} handleCurrentUser={handleCurrentUser} />
      </div>
      :
      <div id="login-info">
        <ReturnAnInputElement name='Mobile, email or username' elemID='user-id' setID={setUserID} updateIfItsNumber={handleLoginWithPhone} />
        {!loginWithPhoneNumber && <ReturnAnInputElement name='Password' elemID='user-password' setPassword={setUserPassword} updateIfItsNumber={handleLoginWithPhone} />}
        <button onClick={confirmLogin} style={{ opacity: (loginWithPhoneNumber || bothPresent) ? 1 : .5, cursor: (!loginWithPhoneNumber && !bothPresent) && 'pointer', pointerEvents: (!loginWithPhoneNumber && !bothPresent) && 'none' }} id='login-btn'>Login</button>
      </div>
    )
  }

  return (
    <div id="login-info">
      {renderMarkup()}
      
      {
        currentUser && signinDone && profileCompleted && <Redirect to={`/${currentUser}`} />
      }
      
      {
        currentUser && signinDone && !profileCompleted && <Redirect to={`/${currentUser}/profile`} />
      }
    </div>
  )
}

let GetOtpFromUser = ({userID, handleSigninStatus, handleProfileCompletion, handleCurrentUser}) => {
  let [code, setCode] = useState(null)
  let handleCodeInput = evt => setCode(evt.target.value)
  let handleClick = evt => {
    // console.log('go gogogo', code, userID)
    userLoginWithPhone(userID, code, handleSigninStatus, handleProfileCompletion, handleCurrentUser)
  }
  return (
    <div id="user-otp-verification-wrapper">
      <label htmlFor="otp-input">
        <input id="otp-input" onChange={handleCodeInput} placeholder="enter 6 digit otp right here!!" />
      </label>
      <div id="opt-submit" onClick={handleClick}>Done</div>
    </div>
  )
}

let ReturnAnInputElement = ({ name, elemID, setID, setPassword, updateIfItsNumber }) => {
  let [value, setValue] = useState('')
  let [focused, setFocused] = useState(false);
  let [maskedPassword, setMaskedPassword] = useState(true)

  let handleMaskedPassword = () => setMaskedPassword(!maskedPassword)

  let handleChange = evt => {
    setValue(evt.target.value)
    elemID == 'user-id' ? setID(evt.target.value) : setPassword(evt.target.value)
    if (elemID == 'user-id' && value.length >= 11) {
      let regEx = /(\+)|([0-9]{3}(-){0,1}){2}[0-9]{4,}/
      let test = regEx.test(value)
      test && updateIfItsNumber(true)
    } else if (value.length == 10) {
      updateIfItsNumber(false)
    }
  }

  useEffect(() => value.length == 0 && updateIfItsNumber(false), [value])

  let handleFocus = () => setFocused(true)
  let handleBlur = () => setFocused(false)

  return (
    <div className="user-login">
      <div className="placeholder-div" style={{ display: focused || value ? 'block' : 'none' }}>{name}</div>
      <input id={elemID} className={(name == 'Password' && maskedPassword) ? 'password-masking' : null} placeholder={focused ? '' : name} value={value} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
      {name == 'Password' && <div id="mask-or-unmask" onClick={handleMaskedPassword}>{maskedPassword ? maskPasswordSvgIcon() : revealPasswordSvgIcon()}</div>}
    </div>
  )
}

export let maskPasswordSvgIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M14.548 11.634c-1.207 0-2.188-.98-2.188-2.188 0-.664.302-1.25.77-1.653-.363-.097-.736-.165-1.13-.165-2.416 0-4.375 1.96-4.375 4.376S9.585 16.38 12 16.38c2.418 0 4.377-1.96 4.377-4.376 0-.4-.07-.78-.17-1.146-.402.47-.992.776-1.66.776z"></path><path d="M12 19.79c-7.228 0-10.12-6.724-10.24-7.01-.254-.466-.254-1.105.035-1.642C1.88 10.923 4.772 4.2 12 4.2s10.12 6.723 10.24 7.01c.254.465.254 1.104-.035 1.64-.085.216-2.977 6.94-10.205 6.94zm0-14c-6.154 0-8.668 5.787-8.772 6.033-.068.135-.068.208-.033.273.137.316 2.65 6.104 8.805 6.104 6.18 0 8.747-5.973 8.772-6.033.07-.136.07-.21.034-.274-.138-.316-2.652-6.103-8.806-6.103z"></path></g></svg>

export let revealPasswordSvgIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M7.625 12.004c0 .15.03.292.044.438l4.777-4.778c-.147-.018-.294-.036-.447-.036-2.416 0-4.375 1.96-4.375 4.376zm8.752 0c0-.156-.018-.306-.037-.456l-4.786 4.787c.15.015.293.045.446.045 2.418 0 4.377-1.96 4.377-4.376z"></path><path d="M20.806 11.893c.036.064.036.138-.034.274-.025.06-2.592 6.033-8.772 6.033-.745 0-1.433-.088-2.073-.237l-1.284 1.284c.998.333 2.108.543 3.357.543 7.228 0 10.12-6.724 10.205-6.94.29-.536.29-1.175.035-1.64-.057-.136-.747-1.72-2.216-3.346L18.897 8.99c1.246 1.397 1.844 2.755 1.91 2.903zm-17.616.203c-.035-.065-.035-.138.033-.273.104-.246 2.618-6.033 8.772-6.033.748 0 1.44.088 2.082.24l1.283-1.284c-1-.335-2.113-.546-3.365-.546-7.228 0-10.12 6.723-10.205 6.938-.29.537-.29 1.176-.035 1.642.057.136.748 1.722 2.22 3.35l1.128-1.126c-1.25-1.398-1.848-2.76-1.913-2.908zm-.778 10.242c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.06L21.058 1.882c.293-.294.768-.294 1.06 0s.294.767 0 1.06L2.942 22.12c-.146.145-.338.22-.53.218z"></path></g></svg>

export default LoginPage;