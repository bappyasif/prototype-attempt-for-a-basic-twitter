import { Timestamp, getFirestore, collection, addDoc, updateDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit, orderBy } from 'firebase/firestore'
import FirebaseApp from '../firebase-configs'
import { downloadTweetPictureUrlFromStorage, downloadTweetPictureUrlFromStorageAnotherVersion, testUploadBlobFileAsyncApproach, uploadTweetPictureUrlToStorage } from '../firebase-storage';

// Initialize Cloud Firestore through Firebase
let db = getFirestore();


// set data into firestore
export let writeDataIntoCollectionAnotherVersion = (data, docID, imgUrl, updateData) => {
    let { tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count } = { ...data }
    
    // trying out firestore timestamp as createdDate, this works just fine
    let dateCreated = Timestamp.now()
    // console.log('<<<<<here>>>>>', imgUrl)

    // imgReady && downloadTweetPictureUrlFromStorageAnotherVersion(docID).then(url => console.log(url, 'showing url'))

    let refinedData = { tweetPoll, tweetText, extraTweet, count, medias: { picture: imgUrl ? imgUrl : '', gif: gifItem ? gifItem.id : '' }, created: dateCreated }
    
    // trying updating data locally first and render data from that
    updateData(refinedData)

    // using a logical gate to make sure only valid data is going through to firestore, not just empty entries
    if (imgFile || gifItem || tweetText) {
        console.log(docID, '<<<<<here>>>>>', imgUrl, gifItem.id)
        let docRef = doc(db, 'TweetsData', docID);

        setDoc(docRef, refinedData)
        .then((data) => {
            console.log('data is added successfully', data)
            // updateData(refinedData)
            // readDataDescendingOrder();
        })
        .catch(err => console.log('error while in writing into collection....', err.message))
    }
}


// Add or write data into collection
export let writeDataIntoCollection = (data, urlUpdater, userDocUpdater, giphyUpdater) => {
    let { tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count } = { ...data }
    
    // if there is any image element we're uploading it to storage


    // trying out firestore timestamp as createdDate, this works just fine
    let dateString = Timestamp.now()
    
    console.log(dateString, '::timestamp')

    let refinedData = { tweetPoll, tweetText, extraTweet, count, medias: { picture: '', gif: gifItem ? gifItem.id : '' }, created: dateString }
    
    // using a logical gate to make sure only valid data is going through to firestore, not just empty entries
    if (tweetText || imgFile || gifItem) {
        addDoc(collection(db, 'tweetData'), refinedData)
            .then((data) => {
                // writing image url to firebase storage
                // imgFile && uploadTweetPictureUrlToStorage(imgFile, data.id)
                // imgFile && testUploadBlobFileAsyncApproach(imgFile, data.id, urlUpdater)
                userDocUpdater(data.id)
                console.log('data is added successfully', data.id)
            })
            .catch(err => console.log('error while in writing into collection....', err.message))
    }
}

export let updateUserDocWithMediaUrls = (userDoc, mediaUrl) => {
    // let data = { picture: mediaUrl }
    let data = { medias: {picture: mediaUrl, gif: ''} }
    let docRef = doc(db, 'tweetData', userDoc)
    updateDoc(docRef, data).then(() => console.log('data updated?!')).catch(err => console.log('could not be updated', err.message))
}


export let testReadFirestoreData = async (docID, giphyUpdater, gifId) => {
    let docRef = doc(db, 'tweetData', docID)
    let docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        console.log('document data is found and reading....')
        giphyUpdater(docSnap.data()['medias'].gif)
    } else {
        console.log('trouble reading firestore data')
    }
}

export let getAllDocsOnce = async () => {
    let data = []
    let collectionRef = collection(db, 'tweetData');

    try {
        let docSnapshots = await getDocs(collectionRef);
        docSnapshots.forEach(doc=>{
            data.push(doc.data())
        });
        console.log('....all documents been read and pushed to an array....', data)
    } catch (err) {
        console.log('error while reading data....', err)
    }
    // console.log(data, 'HERE..')
    return data && data   
}

export let readDataDescendingOrder = async () => {
    let data = []
    // let collectionRef = collection(db, 'tweetData');
    let collectionRef = collection(db, 'TweetsData');
    let dataQuery = query(collectionRef, orderBy('created', 'desc'))
    try {
        let querySnapshot = await getDocs(dataQuery);
        querySnapshot.forEach(doc => {
            data.push(doc.data());
            console.log('data sorted: ', doc.id +' => '+doc.data().created)
        })
    } catch (err) {
        console.log('error while sorting data', err)
    }
    return data && data
    // console.log(dataQuery, 'hows?!')
}

export let readDataInRealtime = () => {
    let collectionRef = collection(db, 'tweetData');
    onSnapshot(collectionRef, ()=> {console.log('data changed')})
}

