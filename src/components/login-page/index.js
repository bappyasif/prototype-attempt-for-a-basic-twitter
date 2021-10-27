import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/index.css";
import { userLoginWithFirebase } from "./user-login-with-firebase";

function LoginPage() {
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
        // window.open("/home", "_blank");
        window.open("/user-profile", "_blank");
      } else {
        document.querySelector("#announcement-div").textContent = "";
        divElem.style.display = "none";
      }
    });
  };

  return (
    <div id="login-container">
      <div id="twitter-info">
        <TwitterLogo />
        <h2 style={{ fontWeight: "bolder" }}>Log in to Twitter</h2>
      </div>
      <div id="announcement-div"></div>

      <UserLoginInfoComponent />

      <div id="additional-info">
        <a href="/begin-password-reset" target="_blank">
          forgot password?
        </a>
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

let UserLoginInfoComponent = () => {
  let [userID, setUserID] = useState(false)
  let [userPassword, setUserPassword] = useState(false)
  let [bothPresent, setBothPresent] = useState(false)

  useEffect(() => {
    if (userID && userPassword) {
      setBothPresent(true)
    } else {
      setBothPresent(false)
    }
    // showAnnouncement();
  }, [userID, userPassword]);

  let confirmLogin = () => userLoginWithFirebase(userID, userPassword)

  return (
    <div id="login-info">
      <ReturnAnInputElement name='Mobile, email or username' elemID='user-id' setID={setUserID} />
      <ReturnAnInputElement name='Password' elemID='user-password' setPassword={setUserPassword} />
      <button onClick={confirmLogin} style={{opacity: bothPresent ? 1 : .5, cursor: bothPresent && 'pointer', pointerEvents: !bothPresent && 'none'}} id='login-btn'>Login</button>
    </div>
  )

  // <input placeholder={name} value={value} onChange={handleChange} onFocus={handleFocus} />

}

let ReturnAnInputElement = ({ name, elemID, setID, setPassword }) => {
  let [value, setValue] = useState('')
  let [focused, setFocused] = useState(false);

  let handleChange = evt => {
    setValue(evt.target.value)
    elemID == 'user-id' ? setID(evt.target.value) : setPassword(evt.target.value)
  }
  let handleFocus = () => setFocused(true)
  let handleBlur = () => setFocused(false)

  return (
      <div className="user-login">
        <div className="placeholder-div" style={{ display: focused || value ? 'block' : 'none' }}>{name}</div>
        <input id={elemID} placeholder={focused ? '' : name} value={value} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
      </div>
  )
}

export default LoginPage;
