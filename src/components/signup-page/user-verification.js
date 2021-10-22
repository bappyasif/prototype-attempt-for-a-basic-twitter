import { createUserWithEmailAndPassword, RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth'

let window = {
    recaptchaVerifier: undefined,
    confirmationResult: undefined
}

let confirmationResult = undefined;

// let verifyUserSignUp = (isPhoneNumberUsed, emailOrPhone) => {
//     if(!isPhoneNumberUsed) {
//         withEmailUserVerification(emailOrPhone)
//     } else {
//         phoneVerification(emailOrPhone)
//     }
// }

export let withEmailUserVerification = (emailOrPhone) => {
    let auth = getAuth();
    auth.languageCode = 'it';
    createUserWithEmailAndPassword(auth, emailOrPhone, emailOrPhone + '1234').then(res => {
        console.log(res)
        window.open('/username/', '_parent')
    }).catch(err => {
        let errCode = err.code;
        let errMsg = err.message;
        console.log(errCode, errMsg)
    })
}

export let phoneVerification = (number, recaptchaContainer) => {
    // window.recaptchaVerifier = RecaptchaVerifier('recaptcha-container');
    let auth = getAuth();
    auth.languageCode = 'it';
    // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

    // window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {}, auth);  // simple recaptcha

    const phoneNumber = number;
    const appVerifier = window.recaptchaVerifier;

    // visible recaptcha
    window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...

            // console.log(response, '??')
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
        }
    }, auth);

    console.log(number, window.recaptchaVerifier, "<>!!", appVerifier)
    
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
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

    // signInWithPhoneNumber(phoneNumber, appVerifier)
    //     .then((confirmationResult) => {
    //         // SMS sent. Prompt user to type the code from the message, then sign the
    //         // user in with confirmationResult.confirm(code).
    //         window.confirmationResult = confirmationResult;
    //         console.log(window.confirmationResult)
    //         // ...
    //     }).catch((err) => {
    //         // Error; SMS not sent
    //         // ...
    //         console.log(err.code, err.message)
    //     });
    // confirmationResult.confirm('code').then(res => console.log(res, "!!")).catch(err => console.log(err.code, err.message))
}