import { createUserWithEmailAndPassword, RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth'

let auth = getAuth();
auth.languageCode = 'it';

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
    // let auth = getAuth();
    // auth.languageCode = 'it';
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
    // let auth = getAuth();
    // auth.languageCode = 'it';
    // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);

    // window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {}, auth);  // simple recaptcha

    // const phoneNumber = number;
    // const appVerifier = window.recaptchaVerifier;

    // visible recaptcha
    // window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
    //     'size': 'normal',
    //     'callback': (response) => {
    //         // reCAPTCHA solved, allow signInWithPhoneNumber.
    //         // ...

    //         // console.log(response, '??')
    //     },
    //     'expired-callback': () => {
    //         // Response expired. Ask user to solve reCAPTCHA again.
    //         // ...
    //     }
    // }, auth);

    window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // onSignInSubmit();
            alert('human check is complete')
        }
    }, auth);

    console.log(number, window.recaptchaVerifier, "<>!!", appVerifier)

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

    // signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    //     .then((confirmationResult) => {
    //         // SMS sent. Prompt user to type the code from the message, then sign the
    //         // user in with confirmationResult.confirm(code).
    //         window.confirmationResult = confirmationResult;
    //         console.log(window.confirmationResult, confirmationResult, "::::")
    //         // ...
    //     }).catch((err) => {
    //         // Error; SMS not sent
    //         // ...
    //         console.log(err.code, err.message)
    //     });

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

export let verifyUserSmsCode = (code) => {
    window.confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log(user, 'user!!')
        window.open('/username/', '_parent')
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        let code = error.code;
        let msg = error.message;
        console.log(code, msg, '<><>')
      });
}