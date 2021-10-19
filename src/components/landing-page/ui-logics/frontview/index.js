import React from "react";
import "../../styles/frontview.css";

function LoginPageFrontView() {
  return (
    <div className="front-view">
      <LeftSide />
      <RightSide />
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
// let LeftSide = () => (
//     <svg className="svg-elem" fill='silver'>
//       <img src='src/components/twitter.svg' />
//     </svg>
//   );

// let returnSvg = (width, height) => {
//   return (
//     <svg className="svg-elem" viewBox="0 0 49 31" fill="silver">
//       <g>
//         <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
//       </g>
//     </svg>
//   );
// };

let RightSide = () => {
  // let loginsOptions = loginsDomains.map(domain => <div key={domain.text} className='login-options'><svg path={domain.icon} width={domain.width} height={domain.height} /><p>{domain.text}</p></div>)
  let loginsOptions = loginsDomains.map((domain) => (
    <div key={domain.id} className="login-options">
      <img className="login-icons" src={domain.icon} />
      <p style={{color: domain.id == 'google' ? 'GrayText' : 'black'}}>{domain.text}</p>
    </div>
  ));
  return (
    <div className="login-elems">
      <svg viewBox="0 0 170 31" fill="white">
        <g>
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </g>
      </svg>
      <h2>Happening Now</h2>
      <h4>Join Today</h4>
      {loginsOptions}
      <div className="with-email">
        <p>Sign Up With Email Or Mobile</p>
      </div>
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
      <h6 className='sign-in'>
        already have an account?{" "}
        <a href="/login" target="_blank">
          Sign In
        </a>
      </h6>
    </div>
  );
};

let loginsDomains = [
  {
    id: 'google',
    text: " Sign Up With Google",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    width: "16",
    height: "16",
  },
  {
    id: 'apple',
    text: " Sign Up With Apple",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    width: "60",
    height: "60",
  },
];

export default LoginPageFrontView;