import { getFirestore, collection, addDoc, updateDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit } from 'firebase/firestore'
import FirebaseApp from '../firebase-configs'
import { testUploadBlobFileAsyncApproach } from '../firebase-storage';

// Initialize Cloud Firestore through Firebase
let db = getFirestore();

// Add or write data into collection
export let writeDataIntoCollection = (data, urlUpdater, userDocUpdater) => {
    let {tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count} = {...data}
    // console.log(tweetPoll, tweetMedia, tweetGif, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count, '::')

    //  unsupported: tweetMedia, tweetPrivacy, imgFile, tweetGif, gifItem
    // to mitigate image elements we'll have to use firebase storage
    let refinedData = {tweetPoll, tweetText, extraTweet, count, medias: {picture: '', gif: '' }}
    // console.log(gifItem, 'files here', imgFile)
    // let refinedData = {tweetPoll, tweetGif, tweetText, extraTweet, gifItem, count, test: [tweetMedia]}
    
    // setDoc(doc(db, 'tweetData', 'dataModel'), refinedData, {merge: true}).then(() => console.log('data is added successfully')).catch(err=>console.log('error while in writing into collection....', err.message))
    addDoc(collection(db, 'tweetData'), refinedData)
    .then((data) => {
        // testUploadBlobFile((gifItem && gifItem) || selectedFile, (imgFile && imgFile.name  || gifItem && gifItem.id))
        // testUploadBlobFile((gifItem && gifItem) || imgFile, data.id)
        // testUploadBlobFileAsyncApproach((gifItem && gifItem) || imgFile, data.id)
        testUploadBlobFileAsyncApproach((gifItem && gifItem) || imgFile, data.id, urlUpdater)
        data.id && console.log('data is added successfully', data.id)
        userDocUpdater(data.id)
    })
    .catch(err=>console.log('error while in writing into collection....', err.message))
}

export let updateUserDocWithMediaUrls = (userDoc, mediaUrl) => {
    let data = {picture: mediaUrl}
    let docRef = doc(db, 'tweetData', userDoc)
    updateDoc(docRef, data).then(()=>console.log('data updated?!')).catch(err=>console.log('couldnt updated', err.message))
    // let data = {medias: mediaUrl}
    // console.log('here here!!', userDoc, mediaUrl)
    // setDoc(doc(db, 'tweetData', userDoc), data).then(()=>console.log('data updated?!')).catch(err=>console.log('couldnt updated', err.message))
}






// export let writeDataIntoCollection = (data) => {
//     let {tweetPoll, tweetMedia, tweetGif, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count} = {...data}
//     // console.log(tweetPoll, tweetMedia, tweetGif, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count, '::')
    
//     // setDoc(doc(db, 'tweetData', 'dataModel'), data, {merge: true}).then(() => console.log('data is added successfully')).catch(err=>console.log('error while in writing into collection....', err.message))
//     //  unsupported: tweetMedia, tweetPrivacy, imgFile
//     let refinedData = {tweetPoll, tweetGif, tweetText, extraTweet, gifItem, count}
//     // setDoc(doc(db, 'tweetData', 'dataModel'), refinedData, {merge: true}).then(() => console.log('data is added successfully')).catch(err=>console.log('error while in writing into collection....', err.message))
//     addDoc(collection(db, 'tweetData'), refinedData).then(() => console.log('data is added successfully')).catch(err=>console.log('error while in writing into collection....', err.message))
    
//     // try {
//     //     await setDoc(doc(db, 'tweetData', 'dataModel'), data, {merge: true})
//     // } catch (err) {
//     //     console.log('error while in writing into collection....', err)
//     // }
// }
