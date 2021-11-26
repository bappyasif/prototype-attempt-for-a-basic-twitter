import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import FirebaseApp from '../../../firebase-configs'
import { createFirestoreCollectionDocument, findUserDocumentFromFirestore } from '../../../firestore-methods';

let auth = getAuth();
auth.languageCode = 'it';

let provider = new GoogleAuthProvider();

provider.setCustomParameters({
    'login_hint': 'e.g. user@example.com'
})

export let signUpWithGoogle = (currentUser, handleCurrentUser) => {
    // To sign in with a pop-up window, call signInWithPopup
    signInWithPopup(auth, provider)
        .then(result => {
            let credential = GoogleAuthProvider.credentialFromResult(result);
            let tokem = credential.accessToken;
            // sign in user info
            let user = result.user
            console.log(user, 'with google', user.uid, user.displayName)
            createFirestoreCollectionDocument(user.uid, user.displayName, handleCurrentUser)
            // handleCurrentUser(user.uid)
            // window.open('/username', '_parent')
            // console.log(currentUser, '!!')
            // currentUser && window.open('/username/profile', '_parent')
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

export let SignInWithGoogle = () => {
    // as this would be anonymous action from users to begin with, we call on google popup service and ther we will collect that uid fom there
    // and search it in our database to check and see if this user already exists or not, if yes then we will also check on a prop to determine whether user updated their profile information or not, if not then show 'username/profile' route
    signInWithPopup(auth, provider)
    .then(result => {
        let user = result.user;
        console.log('user sign in progressing....')
        findUserDocumentFromFirestore(user.uid)
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


    // this is basic idea for sign in concept, at least how am i seeing it currently
    // try {
    //     currentUser && window.open('/username/profile', '_parent')
    // } catch(err) {
    //     console.log('user id not found in firestore')
    // }
}