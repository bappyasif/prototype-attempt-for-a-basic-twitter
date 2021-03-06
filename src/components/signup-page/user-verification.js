import { createUserWithEmailAndPassword, RecaptchaVerifier, getAuth, signInWithPhoneNumber, sendSignInLinkToEmail, isSignInWithEmailLink, PhoneAuthProvider, signInWithCredential } from 'firebase/auth'
import { createFirestoreCollectionDocument } from '../firestore-methods';

let auth = getAuth();
auth.languageCode = 'it';

let window = {
    recaptchaVerifier: undefined,
    confirmationResult: undefined,
    localStorage: undefined,
    // open: undefined,
    prompt: undefined
}

// Construct the ActionCodeSettings object, which provides Firebase with instructions on how to construct the email link
let actionCodeSettings = {
    // url: '/localhost/username/',
    // url: 'https://localhost:8080/username',
    // url: 'https://prototyping-a-basic-twitter.firebaseapp.com/username',
    // url: 'https://prototyping-a-basic-twitter.web.app/username',
    url: 'http://localhost:8080/username',
    handleCodeInApp: true
}

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

    // createUserWithEmailAndPassword(auth, userId, password).then(res => {
    //     console.log(res, 'authenticated....')
    // }).catch(err => {
    //     let errCode = err.code;
    //     let errMsg = err.message;
    //     console.log(errCode, errMsg)
    // })
}

export let withoutEmailLinkSignup = (emailOrPhone) => {
    createUserWithEmailAndPassword(auth, emailOrPhone, emailOrPhone + '1234').then(res => {
        console.log(res)
        window.open('/username/', '_parent')
    }).catch(err => {
        let errCode = err.code;
        let errMsg = err.message;
        console.log(errCode, errMsg)
    })
}

// Send the authentication link to the user's email, and save the user's email in case the user completes the email sign-in on the same device
export let withEmailLinkSignUp = (email) => {
    // console.log('before', auth, email, actionCodeSettings)
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            // window.localStorage.setItem('emailForSignIn', email);
            localStorage.setItem('emailForSignIn', email);
            console.log('checkpoint!!')
            userEmailLinkVerification()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        })
    //   .finally(() => userEmailLinkVerification())
}

// Completing sign-in in a web page
export let userEmailLinkVerification = () => {

    // if(localStorage.getItem('emailForSignIn') !== null) {
    //     let email = window.localStorage.getItem('emailForSignIn');
    //     if (!email) {
    //         // User opened the link on a different device. To prevent session fixation
    //         // attacks, ask the user to provide the associated email again. For example:
    //         email = window.prompt('Please provide your email for confirmation');
    //     }
    //     console.log('checkpoint 02') 
    // }

    // to check whether a link is a sign-in with email link.
    if (isSignInWithEmailLink(auth, actionCodeSettings.url)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        // let email = localStorage.getItem('emailForSignIn');
        if (localStorage.getItem('emailForSignIn')) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            console.log('checkpoint 02')
        }
        // let email = window.localStorage.getItem('emailForSignIn');
        // if (!email) {
        //     // User opened the link on a different device. To prevent session fixation
        //     // attacks, ask the user to provide the associated email again. For example:
        //     email = window.prompt('Please provide your email for confirmation');
        // }
        console.log('checkpoint 03')
    }
    console.log('checkpoint 04')
}

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

export let fakePhoneVerification = (recaptchaContainer) => {
    // Turn off phone auth app verification.
    auth.settings.appVerificationDisabledForTesting = true;

    var phoneNumber = "+16505554567";
    var testVerificationCode = "123456";

    // This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
    // This will resolve after rendering without app verification.
    var appVerifier = new RecaptchaVerifier(recaptchaContainer);
    // signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
    // reCAPTCHA response.

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => confirmationResult.confirm(testVerificationCode))
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(window.confirmationResult, confirmationResult, "?!?!")
            // ...
        }).catch((err) => {
            // Error; SMS not sent
            // ...
            console.log(err.code, err.message)
        });
}

export let verifyUserSmsCode = (code, name, handleCurrentUser) => {
    let loginCredential = PhoneAuthProvider.credential(window.confirmationResult.verificationId, code)
    //sign in with user login credential
    signInWithCredential(loginCredential).then(res => console.log(res, 'with AuthCredential')).catch(err => console.log(err.code, err.message, 'from AuthCredential'))

    console.log(loginCredential, "loginCredential")

    window.confirmationResult.confirm(code).then((result) => {
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