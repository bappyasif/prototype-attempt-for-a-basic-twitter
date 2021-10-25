import React, { useEffect, useRef, useState } from "react";
import "./styles/index.css";

function LoginPage() {
  let [idPlaceholder, setIdPlaceholder] = useState(null);
  let [passwordPlaceholder, setPasswordPlaceholder] = useState(null);
  let [userId, setUserId] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let announcementText =
    "The username and password you entered did not match our records. Please double-check and try again.";

  let onFocusInputElement = (evt) => {
    console.log(evt.target.placeholder);
    evt.target.placeholder = "";
    if (evt.target.id == "email") {
      setPasswordPlaceholder("");
      setIdPlaceholder("Mobile, email or username");
      // setUserId(evt.target.value);
    }
    if (evt.target.id == "password") {
      setIdPlaceholder("");
      setPasswordPlaceholder("Password");
      // setUserPassword(evt.target.value);
    }
  };

  let handleChange = (evt) => {
    evt.target.id == "email"
      ? setUserId(evt.target.value)
      : setUserPassword(evt.target.value);
  };

  let UserIdentification = returnAnInputElement(
    "email",
    userId,
    onFocusInputElement,
    handleChange
  );
  let UserPassword = returnAnInputElement(
    "password",
    userPassword,
    onFocusInputElement,
    handleChange
  );
  let LoginButton = returnAnInputElement("submit", "Log In");

  let userIDWithPlaceholder = (
    <div className="user-login">
      <div className="placeholder-div">{idPlaceholder}</div>
      {UserIdentification}
    </div>
  );
  let userPasswordWithPlaceholder = (
    <div className="user-login">
      <div className="placeholder-div">{passwordPlaceholder}</div>
      {UserPassword}
    </div>
  );

  useEffect(() => {
    if (userId && userPassword) {
      // document.querySelector('#submit').classList.add('opaque');
      document.querySelector("#submit").style.opacity = 1;
    } else {
      // document.querySelector('#submit').classList.remove('opaque');
      document.querySelector("#submit").style.opacity = 0.5;
    }

    showAnnouncement();
  }, [userId, userPassword]);

  let showAnnouncement = () => {
    let divElem = document.querySelector("#announcement-div");
    let btnElem = document.querySelector("#submit");
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
      <div id="login-info">
        {/* {UserIdentification} */}
        {userIDWithPlaceholder}
        {/* {UserPassword} */}
        {userPasswordWithPlaceholder}
        {LoginButton}
      </div>
      <div id="additional-info">
        <a href="/begin-password-reset" target="_blank">
          forgot password?
        </a>
        .
        <a href="/" target="_blank">
          sign up for twitter
        </a>
      </div>
      {userId} : {userPassword}
    </div>
  );
}

let TwitterLogo = () => (
  <svg viewBox="0 0 90 24" fill="rgb(29, 155, 240)">
    <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </g>
  </svg>
);

// let returnAnInputElement = (type, value, focusEvent) => {
//   return <input id={type} type={type} placeholder={type} value={value ? value : null} onFocus={focusEvent} />;
// };

let returnAnInputElement = (type, value, focusEvent, changeHandler) => {
  return (
    <input
      id={type}
      type={type}
      placeholder={type}
      value={value}
      onFocus={focusEvent}
      onChange={changeHandler}
    />
  );
};

export default LoginPage;

/**
 * 
 * 
 function LoginPage() {
  let idRef = useRef(null);
  let passRef = useRef(null);

  let inputRef = useRef(null);

  let onInputElementClicked = () => {
    // idRef.current.focus()
    // inputRef.current.id == 'email' ? setIdPlaceholder('email or mobile') : setPasswordPlaceholder('Password');
    // setIdPlaceholder('email or mobile')
    // console.log(inputRef.current.focus(), inputRef.current.id)
    
    // if(idRef.current.id == 'email') setIdPlaceholder('email or mobile')
    // if(passRef.current.id == 'password') setPasswordPlaceholder('Password')
  }

  let onFocusInputElement = (evt) => {
    console.log(evt.target.placeholder)
    evt.target.placeholder = ''
    if(evt.target.id == 'email') {
      setPasswordPlaceholder('')
      setIdPlaceholder('Mobile, email or username')
    }
    if(evt.target.id == 'password') {
      setIdPlaceholder('')
      setPasswordPlaceholder('Password')
    }
  }

  let [idPlaceholder, setIdPlaceholder] = useState(null);
  let [passwordPlaceholder, setPasswordPlaceholder] = useState(null);

  // let UserIdentification = userIdInputElement("email", onInputElementClicked, idRef);
  // let UserPassword = userPasswordInputElement("password", onInputElementClicked, passRef);
  // let UserIdentification = returnAnInputElement("email", null , onInputElementClicked, idRef);
  // let UserPassword = returnAnInputElement("password", null , onInputElementClicked, passRef);
  // let UserIdentification = returnAnInputElement("email", null , onInputElementClicked, inputRef);
  // let UserPassword = returnAnInputElement("password", null , onInputElementClicked, inputRef);
  let UserIdentification = returnAnInputElement("email", null , onInputElementClicked, onFocusInputElement);
  let UserPassword = returnAnInputElement("password", null , onInputElementClicked, onFocusInputElement);
  let LoginButton = returnAnInputElement('submit', 'Log In');

  let userIDWithPlaceholder = <div className='user-login'><div className='placeholder-div'>{idPlaceholder}</div>{UserIdentification}</div>
  let userPasswordWithPlaceholder = <div className='user-login'><div className='placeholder-div'>{passwordPlaceholder}</div>{UserPassword}</div>

  useEffect(() => {});
  return (
    <div id="login-container">
      <div id="twitter-info">
        <TwitterLogo />
        <h2 style={{fontWeight : 'bolder'}}>Log in to Twitter</h2>
      </div>
      <div id="login-info">
        {/* {UserIdentification} /}
        {userIDWithPlaceholder}
        {/* {UserPassword} }
        {userPasswordWithPlaceholder}
        {LoginButton}
      </div>
      <div id='additional-info'>
          <a href='/begin-password-reset' target='_blank'>forgot password?</a>.<a href='/' target='_blank'>sign up for twitter</a>
      </div>
    </div>
  );
}

let returnAnInputElement = (type, value, clickEvent, inputRef) => {
  return <input id={type} type={type} placeholder={type} value={value ? value : null} onClick={clickEvent} ref={inputRef} />;
};
let userIdInputElement = (type, clickEvent, inputRef) => <input id={type} type={type} placeholder={type} onClick={clickEvent} ref={inputRef} />;
let userPasswordInputElement = (type, clickEvent, inputRef) => <input id={type} type={type} placeholder={type} onClick={clickEvent} ref={inputRef} />;
 */
