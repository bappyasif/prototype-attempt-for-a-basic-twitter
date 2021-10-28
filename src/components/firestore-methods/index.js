import {getFirestore, collection, addDoc} from 'firebase/firestore'
import FirebaseApp from '../firebase-configs'

// Initialize Cloud Firestore through Firebase
let db = getFirestore();

// Add data
// Cloud Firestore stores data in Documents, which are stored in Collections.
// Cloud Firestore creates collections and documents implicitly the first time you add data to the document. 
// You do not need to explicitly create collections or documents, firestore does it for us

export async function testFirestore() {
    try {
        let docRef = await addDoc(collection(db, 'tweet-data'), {
            testData: 'testData'
        });
        console.log('data written into firestore with ID....', docRef.id)
    } catch(err) {
        console.log('Error while adding document....', err);
    }
}