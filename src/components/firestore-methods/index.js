import { getFirestore, collection, addDoc, updateDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit } from 'firebase/firestore'
import FirebaseApp from '../firebase-configs'
import { testUploadBlobFileAsyncApproach } from '../firebase-storage';

// Initialize Cloud Firestore through Firebase
let db = getFirestore();

// Add or write data into collection
export let writeDataIntoCollection = (data, urlUpdater, userDocUpdater, giphyUpdater) => {
    let { tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count } = { ...data }

    let refinedData = { tweetPoll, tweetText, extraTweet, count, medias: { picture: '', gif: gifItem ? gifItem.id : '' } }
    // console.log(gifItem, 'files here', imgFile)
    
    // using a logical gate to make sure only valid data is going through to firestore, not just empty entries
    if (tweetText || imgFile || gifItem) {
        addDoc(collection(db, 'tweetData'), refinedData)
            .then((data) => {
                // writing image url to firebase storage
                imgFile && testUploadBlobFileAsyncApproach(imgFile, data.id, urlUpdater)
                userDocUpdater(data.id)
                console.log('data is added successfully', data.id)
            })
            .catch(err => console.log('error while in writing into collection....', err.message))
    }
}

export let updateUserDocWithMediaUrls = (userDoc, mediaUrl) => {
    let data = { picture: mediaUrl }
    let docRef = doc(db, 'tweetData', userDoc)
    updateDoc(docRef, data).then(() => console.log('data updated?!')).catch(err => console.log('couldnt updated', err.message))
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

export let getAllDocsOnce = () => {
    let data = []
    let collectionRef = collection(db, 'tweetData');
    getDocs(collectionRef).then(docSnapshots => {
        docSnapshots.forEach(doc => {
            data = data.concat(doc.data())
        })
        console.log('all documents been read....')
        console.log(data, 'data..')
    }).catch(err=>console.log(err.message))
}

export let readDataInRealtime = () => {
    let collectionRef = collection(db, 'tweetData');
    onSnapshot(collectionRef, ()=> {console.log('data changed')})
}

