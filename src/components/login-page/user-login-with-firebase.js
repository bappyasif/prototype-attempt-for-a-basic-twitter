import {getAuth, signInWithEmailAndPassword, send} from 'firebase/auth'

export let userLoginWithFirebase = (userId, password) => {
    let auth = getAuth();
    signInWithEmailAndPassword(auth, userId, password)
    .then(userCredential => {
        let user = userCredential.user
        console.log(user, userCredential)
    })
    .catch(err => {
        let code = err.code;
        let msg = err.message;
        console.log(code, msg)
    })
}