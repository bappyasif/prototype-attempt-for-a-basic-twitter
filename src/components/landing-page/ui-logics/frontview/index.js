import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { signInWithGoogle, signUpWithGoogle, userSigninWithProvidersAndLocalAuthPersistence, userSignupWithProvidersAndLocalPersistence } from "../../../firebase-auths";
import "../../styles/frontview.css";
// import { SignInWithGoogle, signUpWithGoogle } from './userSignupWithProviders';

function LoginPageFrontView({ currentUser, handleCurrentUser }) {
  return (
    <div className="front-view">
      <LeftSide />
      <RightSide currentUser={currentUser && currentUser} handleCurrentUser={handleCurrentUser} />
    </div>
  );
}

// let LeftSide = () => <svg viewBox='0 0 24 24' strokeWidth='1.5' stroke='red' fill='green' path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z' />
let LeftSide = () => (
  <svg className="svg-elem" viewBox="0 0 56 31" fill="white">
    <g>
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </g>
  </svg>
);

let RightSide = ({ currentUser, handleCurrentUser }) => {
  let [hasAccount, setHasAccount] = useState(false)
  let [profileCompleted, setProfileCompleted] = useState(false);
  let [redirectJustOnce, setRedirectJustOnce] = useState(0)
  let [usingSignin, setUsingSignin] = useState(false)
  // let [signInCompleted, setSignInCompleted] = useState(false);

  let handleAlreadyVisitedCount = () => setRedirectJustOnce(redirectJustOnce + 1)

  // let handleSinginCompleted = () => setSignInCompleted(true)

  let handleSigninWithGoogle = (evt) => {
    // console.log(evt.target.id);
    // signUpWithGoogle();
    // signInWithGoogle(currentUser, handleCurrentUser);
    // SignInWithGoogle(handleCurrentUser, handleUserProfileCompleted, handleSinginCompleted)
    
    // without auth state persistence
    // signInWithGoogle(handleCurrentUser, handleUserProfileCompleted)

    // with auth state persistence
    userSigninWithProvidersAndLocalAuthPersistence(handleCurrentUser, handleUserProfileCompleted)
    // currentUser && 

    // incrementing counter so that, whnever this route is visited redirect should only be activated when cunter is just 1
    handleAlreadyVisitedCount()
  }

  let handleSignUpWithGoogle = () => {
    // without auth state persistence
    // signUpWithGoogle(currentUser, handleCurrentUser);

    // with auth state persistence
    userSignupWithProvidersAndLocalPersistence(handleCurrentUser)
    
    // incrementing counter so that, whnever this route is visited redirect should only be activated when cunter is just 1
    handleAlreadyVisitedCount()
  }

  let handleSigninWithApple = (evt) => {
    console.log(evt.target.id, 'apple sign in block');

  }

  let handleUserProfileCompleted = () => setProfileCompleted(true)

  // console.log(currentUser, 'from landingpage', redirectJustOnce, 'completed', profileCompleted, 'signindone', signInCompleted)
  console.log(currentUser, 'from landingpage', redirectJustOnce, 'profile completed', profileCompleted,)

  let handleChange = () => {
    setHasAccount(!hasAccount)
    // setting a gate to make sure that whenever user uses signin option, it waits to make sure which route to go
    setUsingSignin(!usingSignin);
  }

  // let loginsOptions = loginsDomains.map(domain => <div key={domain.text} className='login-options'><svg path={domain.icon} width={domain.width} height={domain.height} /><p>{domain.text}</p></div>)
  let loginsOptions = loginsDomains.map((domain) => (
    <div key={domain.id} className="login-options" onClick={domain.id == 'google' && hasAccount ? handleSigninWithGoogle : domain.id == 'google' && !hasAccount ? handleSignUpWithGoogle : handleSigninWithApple}>
      <img className="login-icons" src={domain.icon} />
      <p style={{ color: domain.id == 'google' ? 'GrayText' : 'black', cursor: domain.id != 'apple' && 'pointer' }}>{'Sign ' + `${hasAccount ? 'in' : 'up'} ` + domain.text}</p>

      {
        // !usingSignin && currentUser && redirectJustOnce == 1 && <Redirect to='/username/profile' />
        !usingSignin && currentUser && redirectJustOnce == 1 && <Redirect to={`/${currentUser}/profile`} />
      }
      {
        // profileCompleted && currentUser && redirectJustOnce == 1 && <Redirect to='/username/' />
        profileCompleted && currentUser && redirectJustOnce == 1 && <Redirect to={`/${currentUser}/`} />
      }

      {
        // !profileCompleted && currentUser && redirectJustOnce == 1 && <Redirect to='/username/profile' />
        !profileCompleted && currentUser && redirectJustOnce == 1 && <Redirect to={`/${currentUser}/profile`} />
      }

    </div>
  ));

  return (
    <div className="login-elems">
      <svg width='24px' height='24px' transform='scale(2.2)' fill="white">
        <g>
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </g>
      </svg>
      {
        !hasAccount
          ?
          <h1>Happening Now</h1>
          :
          <h1>Happening Now</h1>
      }
      {
        !hasAccount
          ?
          <h4>Join Today</h4>
          :
          <h4>Sign in to Twitter</h4>
      }
      {loginsOptions}
      <div className="with-email login-options">
        {/* {!hasAccount ? <p>Sign up with email ur phone</p> : <p>Use phone, email or username</p>} */}
        {
          !hasAccount
            ?
            <Link style={{ color: 'black', textDecoration: 'none' }} to='/i/flow/signup/'>Sign up with email ur phone</Link>
            :
            <Link to='/login/'>Use phone, email or username</Link>
        }
      </div>
      {
        !hasAccount
        &&
        <p>
          By signing up, you agree to the{" "}
          <a href="https://twitter.com/en/tos" target="_blank">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="https://twitter.com/en/privacy" target="_blank">
            Privacy Policy
          </a>
          ,including{" "}
          <a
            href="https://help.twitter.com/en/rules-and-policies/twitter-cookies"
            target="_blank"
          >
            Cookie Use
          </a>
          .
        </p>
      }
      <h6 className='sign-in'>
        {
          !hasAccount
            ?
            "Already have an account? "
            :
            "Dont have an account? "
        }
        {/* <a href="/login" target="_blank">
          Sign In
        </a> */}
        <Link onClick={handleChange} to="/">Sign {!hasAccount ? 'in' : 'up'}</Link>
      </h6>
    </div>
  );
};

let loginsDomains = [
  {
    id: 'google',
    text: "With Google",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    width: "16",
    height: "16",
  },
  {
    id: 'apple',
    text: "With Apple",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    width: "60",
    height: "60",
  },
];

export default LoginPageFrontView;