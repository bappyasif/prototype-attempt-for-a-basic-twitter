import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "@firebase/auth"

let window = {
    recaptchaVerifier: null
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
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            alert('a sms is sent with OTP code, check your mobile device and use it in next prompt to login successfully')
            let code = prompt('enter your 6 digit long verification code here, do not close this until you do so')
            confirmationalResult.confirm(code)
            .then(result => {
                user = result.user
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
}