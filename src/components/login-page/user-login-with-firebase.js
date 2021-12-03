import {getAuth, signInWithEmailAndPassword, send} from 'firebase/auth'
import { createFirestoreCollectionDocument, findUserDocumentFromFirestore } from '../firestore-methods';

export let userLoginWithFirebase = (userId, password, handleSigninStatus, handleProfileCompletion, handleCurrentUser) => {
    let auth = getAuth();
    signInWithEmailAndPassword(auth, userId, password)
    .then(userCredential => {
        let user = userCredential.user.uid
        // console.log(user, userCredential)
        if(user) {
            // handleSigninStatus()
            // handleCurrentUser(user)
            // createFirestoreCollectionDocument(user, 'name', handleCurrentUser)
            findUserDocumentFromFirestore(user, handleCurrentUser, handleProfileCompletion)
            console.log('valid user!!')
        } else {
            console.log('invalid user!!')
        }
    })
    .catch(err => {
        let code = err.code;
        let msg = err.message;
        console.log(code, msg)
    })
    .finally(() => {
        console.log('do this!!');
        handleSigninStatus()
    })
}