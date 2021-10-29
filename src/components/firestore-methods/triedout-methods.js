import { getFirestore, collection, addDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit } from 'firebase/firestore'
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
        console.log('data written into firestore with ID....', docRef.id, docRef.path)
    } catch (err) {
        console.log('Error while adding document....', err);
    }
}

// Read data
// use the "get" method to retrieve the entire collection
export let testReadData = async () => {
    try {
        let currentSnapshot = await getDocs(collection(db, 'tweet-data'));
        // currentSnapshot.forEach(doc => console.log(`${doc.id} => ${doc.data().testData}`))
        // currentSnapshot.forEach(doc => console.log(`${doc.id} => ${doc.data().testData || doc.data()}`))
        currentSnapshot.forEach(doc => console.log(`${doc.id} => ${doc.data().testData.dairy || doc.data().testData}`))
    } catch (err) {
        console.log('could not read docs from collection....', err)
    }
}

// Write data
// this will create data or doc if it already does not exist in collection, and when already exist completely replaces previous doc entirely,
// but to mitigate that we can use {merge: true} or updateDoc, but updateDoc will throw an error if doc already does not exist in collection
// write specifically refernce to a document where as addDoc refers to a collection adn gives random id to that document and doesnt replaces previous sam e entry but with new entry with same dat is passed down again

export let testWriteData = () => {
    try {
        let docData = {
            description: 'delicious pie',
            price: 2.99,
            dairy: true,
            vegan: false
        }

        let targettedDoc = doc(db, 'tweet-data/testDoc')
        // setDoc(targettedDoc, docData, {merge: true})
        // await setDoc(targettedDoc, {testData: docData}, {merge: true})
        setDoc(targettedDoc, { testData: docData }, { merge: true })
            .then(res => console.log('document has been written in firestore'))

    } catch (err) {
        console.log('error while writing data into collection....', err)
    }
}

// listens to a single document form collection
export let testReadSingleDocument = async () => {
    try {
        // let documentSnapshot = await getDoc(db, 'tweet-data/testDoc');
        // let documentSnapshot = await getDoc(collection(db, 'tweet-data'));
        // let documentSnapshot = await getDoc('testDoc');
        let documentRef = doc(db, 'tweet-data/testDoc');
        let documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
            let docData = documentSnapshot.data();
            console.log('document data: ', JSON.stringify(docData))
        }
    } catch (err) {
        console.log('error while reading document', err)
    }
}

// this listens to a doument in realtime for any changes that has been made
// as this coul get bit network heavy operation, its recommended to unsubscribe from this realtime listeners at an appropriate code block after an appropriate amount of time
// to do this we can save this event listener in some variable and then calle it at some point, to be unsubscribed from that
let unsubscribeFromRealtimeListener;

export let listenToADocument = () => {
    let documentRef = doc(db, 'tweet-data/testDoc');
    unsubscribeFromRealtimeListener = onSnapshot(documentRef, docSnapshot => {
        if(docSnapshot.exists()) {
            let docData = docSnapshot.data();
            console.log('logging changes in document in realtime....', JSON.stringify(docData))
        }
    })
}

let cancelRealTimeListenerAfterSometime = () => unsubscribeFromRealtimeListener();

// query documents
// as in reading from multiple documents from a collection, in our query we can pass in additional clause such as 'where', 'limit' and so on to personify our searches from that collection
// in our additional clause settings if we done use proper 'indexing' required by firestore, console will show us error and guide us through how to resolve that from firestore console
export let queryForDocuments = async () => {
    // let testDocQuery = query(collection(db, 'tweet-data'), where('dairy', '==', 'true'), limit(11))
    // let testDocQuery = query(collection(db, 'tweet-data'), where('testDoc', '!=', 'true'), limit(11))
    // let testDocQuery = query(collection(db, 'test-collection'), where('dairy', '==', 'true'), limit(11))
    
    // let testDocQuery = query(collection(db, 'tweet-data'), limit(2))
    // let testDocQuery = query(collection(db, 'test'), where('dairy', '!=', null), limit(2))
    let testDocQuery = query(collection(db, 'tweet-data'), where('dairy', '!=', null), limit(2))

    try {
        let querySnapshots = await getDocs(testDocQuery)
        querySnapshots.forEach(snapshot => console.log(`document ${snapshot.id} contains ${JSON.stringify(snapshot.data())}`))
        // console.log(querySnapshots, 'snapshots?!!?', testDocQuery)
    } catch(err) {
        console.log('error occured while querying....', err)
    }
}
// export let queryForDocuments = () => {
//     // let testDocQuery = query(collection(db, 'tweet-data'), where('dairy', '==', 'true'), limit(11))
//     // let testDocQuery = query(collection(db, 'tweet-data'), where('testDoc', '!=', 'true'), limit(11))
//     let testDocQuery = query(collection(db, 'testCollection'), where('dairy', '==', 'true'), limit(11))
//     console.log(testDocQuery, 'query?!')

//     let querySnapshot = getDocs(testDocQuery)
    
//     // querySnapshot.then(snapshot => console.log(`document ${snapshot.id} contains ${JSON.stringify(snapshot.data())}`)).catch(err=>console.log(err.message))
//     // querySnapshot.then(snapshot => console.log(`document ${snapshot.id} contains ${JSON.stringify(snapshot)}`)).catch(err=>console.log(err.message))
//     querySnapshot.then(snapshots => snapshots.forEach(snapshot => console.log(`document ${snapshot.id} contains ${JSON.stringify(snapshot.data())}`)).catch(err=>console.log(err.message)))
// }


// query with relal time changes listener
let queryListenerInRealtime;
export let queryForDocumentsWithRealtimeListeners = () => {
    let testDocQuery = query(collection(db, 'tweet-data'), where('dairy', '!=', null), limit(2))
    try {
        // instread of passing in document reference we'll send in queryReference and call on onSnapshot method for relatime change listenres on them
        // let querySnapshots = await getDocs(testDocQuery)
        // querySnapshots.forEach(snapshot => console.log(`document ${snapshot.id} contains ${JSON.stringify(snapshot.data())}`))

        // onSnapshot(testDocQuery, querySnapshot => querySnapshot.forEach(snapshot => console.log(`document ${snapshot.id} contains ${JSON.stringify(snapshot.data())}`)))
        // onSnapshot(testDocQuery, querySnapshot => console.log(`data changed ${JSON.stringify(querySnapshot.docs.map(doc => doc.data()))}`))
        queryListenerInRealtime = onSnapshot(testDocQuery, querySnapshot => console.log(`data changed ${JSON.stringify(querySnapshot.docs.map(doc => doc.data()))}`))
        
    } catch(err) {
        console.log('error occured while querying....', err)
    }
}

let cancelQueryRealtimeListener = () => queryListenerInRealtime()


//  data model
// document reference, is uniquely defined by its location in firestore datatabse
// e.g. let docRef = doc(db, 'collection', 'document')
// e.g. let docRef = doc(db, 'collection/document')

// subcollection, is heirarchical 
// e.g. let docRef = doc(db, 'collection/document/subCollection/document')

// data type, such as strings, booleans, numbers, dates, null, and nested arrays and objects
// Cloud Firestore always stores numbers as doubles, regardless of what type of number you use in your code.

//  queries can be done for a specific document from a single collectgion

// Nested data in documents, we can nest complex objects like arrays or maps within documents.

// Subcollections, we can create collections within documents when you have data that might expand over time.

// Root-level collections, Create collections at the root level of your database to organize disparate data sets.
// Root-level collections are good for many-to-many relationships and provide powerful querying within each collection.