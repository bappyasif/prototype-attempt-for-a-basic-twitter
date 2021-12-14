import {getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signInWithEmailAndPassword } from 'firebase/auth'
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

export let sendingPasswordResetEmail = (email, showErrorMessage) => {
    sendPasswordResetEmail(auth, email)
    .then(() => console.log('password reset email sent!!'))
    .catch(err => {
        console.log('password reset email sending has failed', err.code, err.message)
        showErrorMessage(err.message.split(':')[1])
    })
}

export let signUpWithGoogle = (currentUser, handleCurrentUser) => {
    // To sign in with a pop-up window, call signInWithPopup
    signInWithPopup(auth, provider)
        .then(result => {
            let credential = GoogleAuthProvider.credentialFromResult(result);
            let tokem = credential.accessToken;
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
    .finally(() => {
        console.log('do this!!');
        // handleSigninStatus()
    })
}

export let userLoginWithPhone = (phoneNumber, signInButton) => {
    let auth = getAuth();
    auth.languageCode = 'it';
    // console.log(signInButton)

    window.recaptchaVerifier = new RecaptchaVerifier(signInButton, {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
        }
    }, auth);

    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationalResult => {
            window.confirmationalResult = confirmationalResult
            
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            // alert('a sms is sent with OTP code, check your mobile device and use it in next prompt to login successfully')
            // let code = prompt('enter your 6 digit long verification code here, do not close this until you do so')
            // confirmationalResult.confirm(code)
            // .then(result => {
            //     user = result.user
            // }).catch(err=>console.log('bad verfication code provided!! please try again later!!', err.code, err.message))
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

export let signInThroughOTP = () => {
    let code = prompt('enter your 6 digit long verification code here, do not close this until you do so')
    window.confirmationalResult.confirm(code)
        .then(result => {
            user = result.user
            console.log(user, 'here!!')
        }).catch(err => console.log('bad verfication code provided!! please try again later!!', err.code, err.message))
}