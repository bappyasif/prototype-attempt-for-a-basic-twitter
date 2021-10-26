let ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
let AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
let TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

export let testTwilio = () => {
    console.log('Your Twilio environment variable: ', ACCOUNT_SID, AUTH_TOKEN, TWILIO_PHONE_NUMBER);
}

/**
 * 
 * 
 // will have to use alternative to this to meet backend requirement, such as cloud functions
// import {Twilio} from'twilio' // server-side library

// import { createRequire } from 'module';
// import {Twilio} from 'twilio'
// let client = Twilio(ACCOUNT_SID, AUTH_TOKEN);
// let client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
// const twilio = require('twilio');
// const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

export let testTwilio = () => {
    console.log('Your Twilio environment variable: ', process.env.TWILIO_ACCOUNT_SID, AUTH_TOKEN, TWILIO_PHONE_NUMBER);
    // client.verify.services('https://verify.twilio.com/v2/Services')
    //          .verifications
    //          .create({to: '+8801915645093', channel: 'sms'})
    //          .then(verification => console.log(verification.status))
}
 * 
 * 
// require('dotenv').config()
// let ACCOUNT_SID = TWILIO_ACCOUNT_SID
// let AUTH_TOKEN = TWILIO_AUTH_TOKEN
// require('dotenv').config()
// const dotenv = require('dotenv')
// console.log('Your environment variable TWILIO_ACCOUNT_SID has the value: ', process.env.TWILIO_ACCOUNT_SID);
//  testing installation
 */