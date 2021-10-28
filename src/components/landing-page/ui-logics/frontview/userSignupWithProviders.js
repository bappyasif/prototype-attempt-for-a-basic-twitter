import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import FirebaseApp from '../../../firebase-configs'

let auth = getAuth();
auth.languageCode = 'it';

let provider = new GoogleAuthProvider();

provider.setCustomParameters({
    'login_hint': 'e.g. user@example.com'
})

export let signUpWithGoogle = () => {
    // To sign in with a pop-up window, call signInWithPopup
    signInWithPopup(auth, provider)
        .then(result => {
            let credential = GoogleAuthProvider.credentialFromResult(result);
            let tokem = credential.accessToken;
            // sign in user info
            let user = result.user
            console.log(user, 'with google')
            window.open('/username', '_parent')
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