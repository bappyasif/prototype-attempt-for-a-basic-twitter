import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword } from 'firebase/auth'
import { createFirestoreCollectionDocument, findUserDocumentFromFirestore } from '../firestore-methods';

let auth = getAuth();

auth.languageCode = 'it';

let provider = new GoogleAuthProvider();

provider.setCustomParameters({
    'login_hint': 'e.g. user@example.com'
})

let window = {
    recaptchaVerifier: null,
    confirmationalResult: null
}

// user sign in with local browser auth state persistence
export let userSigninWithProvidersAndLocalAuthPersistence = (handleCurrentUser, handleIsUserProfileCompletedStatus) => {
    // setPersistence(auth, browserLocalPersistence)
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log('local auth state persisting')
        signInWithGoogle(handleCurrentUser, handleIsUserProfileCompletedStatus)
    }).catch(err => console.log('auth persistence has failed in signin with provider', err.code, err.message))
}

// user signup with auth state persistence
export let userSignupWithProvidersAndLocalPersistence = (handleCurrentUser) => {
    // setPersistence(auth, browserLocalPersistence)
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log('local auth state persisting')
        signUpWithGoogle(handleCurrentUser)
    }).catch(err => console.log('auth persistence has failed in signup with provider', err.code, err.message))
}

// user signup with session auth persistence
export let userSignupWithSessionAuthPersistence = (name, userId, password, signupStatus, handleCurrentUser) => {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log('session auth persistence employed')
        authenticateUserWithFirebase(name, userId, password, signupStatus, handleCurrentUser)
    }).catch(err => console.log('auth persistence has failed in signup', err.code, err.message))
}

// user sign in with session auth persistance
export let userSignInWithSessionPersistence = (userId, password, handleSigninStatus, handleProfileCompletion, handleCurrentUser, handleAnnouncement) => {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        // auth states are now persisted in browser session only, closing containing tab or window will clear out any existing states
        userLoginWithFirebase(userId, password, handleSigninStatus, handleProfileCompletion, handleCurrentUser, handleAnnouncement)
        // return userLoginWithFirebase(userId, password, handleSigninStatus, handleProfileCompletion, handleCurrentUser, handleAnnouncement)
    }).catch(err => console.log('auth persistence has failed in signin', err.code, err.message))
}

// password reset with an email link
export let sendingPasswordResetEmail = (email, showErrorMessage) => {
    sendPasswordResetEmail(auth, email)
    .then(() => console.log('password reset email sent!!'))
    .catch(err => {
        console.log('password reset email sending has failed', err.code, err.message)
        showErrorMessage(err.message.split(':')[1])
    })
}

// user signup with google
export let signUpWithGoogle = (handleCurrentUser) => {
    // To sign in with a pop-up window, call signInWithPopup
    signInWithPopup(auth, provider)
        .then(result => {
            let credential = GoogleAuthProvider.credentialFromResult(result);
            // let tokem = credential.accessToken;
            // sign in user info
            let user = result.user
            console.log(user, 'with google', user.uid, user.displayName, user.getIdToken().then(val => val), user.photoURL)
            createFirestoreCollectionDocument(user.uid, user.displayName, handleCurrentUser, user.photoURL)
            
        }).catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential, 'error logs')
        })
}

// user login with google
export let signInWithGoogle = (handleCurrentUser, handleIsUserProfileCompletedStatus) => {
    // as this would be anonymous action from users to begin with, we call on google popup service and ther we will collect that uid fom there
    // and search it in our database to check and see if this user already exists or not, if yes then we will also check on a prop to determine whether user updated their profile information or not, if not then show 'username/profile' route
    signInWithPopup(auth, provider)
    .then(result => {
        let user = result.user;
        console.log('user sign in progressing....')
        findUserDocumentFromFirestore(user.uid, handleCurrentUser, handleIsUserProfileCompletedStatus)
    }).catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential, 'error logs')
    })
}

// user login with eamil and password
export let userLoginWithFirebase = (userId, password, handleSigninStatus, handleProfileCompletion, handleCurrentUser, handleAnnouncement) => {
    let auth = getAuth();
    signInWithEmailAndPassword(auth, userId, password)
    .then(userCredential => {
        let user = userCredential.user.uid
        // console.log(user, userCredential)
        if(user) {
            findUserDocumentFromFirestore(user, handleCurrentUser, handleProfileCompletion)
            console.log('valid user!!')
            handleSigninStatus()
            // handleAnnouncement('found user')
        } else {
            console.log('invalid user!!')
            handleAnnouncement('user is not found')
        }
    })
    .catch(err => {
        let code = err.code;
        let msg = err.message;
        console.log(code, msg)
        handleAnnouncement(msg)
    })
    // .finally(() => {
    //     console.log('do this!!');
    //     // handleSigninStatus()
    // })
}

// user login with OTP (modified version)
// let userLoginWithPhone = (phoneNumber, signInButton, otpCode)
export let userLoginWithPhone = (phoneNumber, otpCode, handleSigninStatus, handleProfileCompletion, handleCurrentUser) => {
    // let auth = getAuth();
    // auth.languageCode = 'it';
    // console.log(signInButton)

    // window.recaptchaVerifier = new RecaptchaVerifier(signInButton, {
    //     'size': 'invisible',
    //     'callback': (response) => {
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         // onSignInSubmit();
    //     }
    // }, auth);

    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationalResult => {
            window.confirmationalResult = confirmationalResult
            
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            // alert('a sms is sent with OTP code, check your mobile device and use it in next prompt to login successfully')
            // let code = prompt('enter your 6 digit long verification code here, do not close this until you do so')
            // confirmationalResult.confirm(code)
            
            // will be using rather direct user provided otp code instead
            confirmationalResult.confirm(otpCode)
            .then(result => {
                // user = result.user
                let user = result.user.uid
                console.log('is it here!!!! chk01')
                if(user) {
                    findUserDocumentFromFirestore(user, handleCurrentUser, handleProfileCompletion)
                    console.log('valid user!!')
                    handleSigninStatus()
                    // handleAnnouncement('found user')
                } else {
                    console.log('invalid user!!')
                    handleAnnouncement('user is not found')
                }
            }).catch(err=>console.log('bad verfication code provided!! please try again later!!', err.code, err.message))
        }))
        .catch(err => {
            let errCode = err.code;
            let errMsg = err.message;
            console.log('something went wrong, check console for more info', errCode, errMsg)

            // now re-rendering captcha, so that user can try again!!
            // window.recaptchaVerifier.render().then(function(widgetId) {
            //     grecaptcha.reset(widgetId);
            //   })
        })
        // .finally(()=>signInThroughOTP())
}

// user login with OTP, tryouts!!
export let signInThroughOTP = () => {
    let code = prompt('enter your 6 digit long verification code here, do not close this until you do so')
    window.confirmationalResult.confirm(code)
        .then(result => {
            user = result.user
            console.log(user, 'here!!')
        }).catch(err => console.log('bad verfication code provided!! please try again later!!', err.code, err.message))
}

// signup user with email and password
export let authenticateUserWithFirebase = (name, userId, password, signupStatus, handleCurrentUser) => {
    // console.log(userId, password, 'here!!')
    let regEx = /\w+@\w+.[a-z]{2,}/
    let test = regEx.test(userId);
    // if(!test) userId = prompt('enter login email address, e.g. user@example.com')

    if (test) {
        createUserWithEmailAndPassword(auth, userId, password).then(res => {
            console.log(res, 'authenticated....')
            signupStatus('done')
            createFirestoreCollectionDocument(res.user.uid, name, handleCurrentUser)
        }).catch(err => {
            let errCode = err.code;
            let errMsg = err.message;
            console.log(errCode, errMsg)
            signupStatus(errMsg)
        })
    } else {
        return
        // making signup with phonenumber
        // let codeDiv = document.querySelector('#confirmation-code');
        // let verificationCode = codeDiv.value;
        // verifyUserSmsCode(verificationCode);
        // console.log('here!!')
    }
}

// part of OTP based user signup
export let verifyUserSmsCode = (code, name, handleCurrentUser) => {
    // let loginCredential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, code)
    //sign in with user login credential
    // signInWithCredential(loginCredential).then(res => console.log(res, 'with AuthCredential')).catch(err => console.log(err.code, err.message, 'from AuthCredential'))

    // console.log(loginCredential, "loginCredential")

    window.confirmationalResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log(user, 'user!!')
        // window.open('/username/', '_parent')

        // create a firestore document with all initial info
        createFirestoreCollectionDocument(user.uid, name, handleCurrentUser)
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        let code = error.code;
        let msg = error.message;
        console.log(code, msg, '<><>')
    });
}

// user signup using OTP
export let phoneVerification = (number, recaptchaContainer) => {
    window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
            alert('verification code is sent, check your mobile for sms with secret code')
        }
    }, auth);

    const phoneNumber = number;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(window.confirmationResult, confirmationResult, "::::")
            // ...
        }).catch((err) => {
            // Error; SMS not sent
            // ...
            console.log(err.code, err.message)
        });
}

export let beginRecaptchaForVerification = (recaptchaContainer, phoneNumber, handleShowOtpModal) => {
    console.log(recaptchaContainer, 'recaptchaContainer!!')
    // this will enable recaptch in invisible mode on browser
    window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
            alert('verification code is sent, check your mobile for sms with secret code')
        }
    }, auth);

    const appVerifier = window.recaptchaVerifier;

    // this will send verification code to user device
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
      handleShowOtpModal()
      alert('a 6 digit otp has been sent to your device, once recieved enter it in designated textbox to proceed with login process')
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log('sms could not be sent to user device', error.code, error.message)
    });

    // if vereification code could not be sent to user device, we can use this to resend code again
    // window.recaptchaVerifier.render()
    // .then((widgetId) => {
    //     grecaptcha.reset(widgetId);
    // })
}