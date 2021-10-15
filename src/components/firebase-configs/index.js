import {initializeApp} from 'firebase/app'
// import {getFirestore, collection} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0",
    authDomain: "prototyping-a-basic-twitter.firebaseapp.com",
    projectId: "prototyping-a-basic-twitter",
    storageBucket: "prototyping-a-basic-twitter.appspot.com",
    messagingSenderId: "787563146563",
    appId: "1:787563146563:web:467822d5334c0f2be013f6",
    measurementId: "G-JN4YHPNYLF"
  };
  
  // Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;

// let db = getFirestore(app);

// export default async function AccessDatabase() {
//     let dbCollection = collection(db, 'example');
//     console.log(dbCollection);
// }