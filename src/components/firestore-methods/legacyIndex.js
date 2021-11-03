import { getFirestore, collection, addDoc, updateDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit } from 'firebase/firestore'
import FirebaseApp from '../firebase-configs'
import { testUploadBlobFileAsyncApproach } from '../firebase-storage';
import { cloneDeep } from 'lodash';

// Initialize Cloud Firestore through Firebase
let db = getFirestore();

// Add or write data into collection
export let writeDataIntoCollection = (data, urlUpdater, userDocUpdater, giphyUpdater) => {
    let { tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count } = { ...data }
    // console.log(tweetPoll, tweetMedia, tweetGif, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, count, '::')

    //  unsupported: tweetMedia, tweetPrivacy, imgFile, tweetGif, gifItem
    // to mitigate image elements we'll have to use firebase storage

    // extracting specific firebase firestore friendly properties from 'gifItem' and storing them into firestore datatbase afterwards
    // let gifObject = {analytics: gifItem.analytics, url: gifItem.url, embed_url: gifItem.embed_url, source_url: gifItem.source, title: gifItem.title, images: gifItem.images}

    // apparently all it neded is just a spread operator, and it was all sanitized for saving in firestore
    // let gifObject = { ...gifItem }  // shallow copy

    // trying deep copy using external library, resulting same....
    // let gifObject = cloneDeep(gifItem)

    // let refinedData = { tweetPoll, tweetText, extraTweet, count, medias: { picture: '', gif: gifItem ? gifObject : '' } }
    let refinedData = { tweetPoll, tweetText, extraTweet, count, medias: { picture: '', gif: gifItem ? gifItem.id : '' } }
    console.log(gifItem, 'files here', imgFile)
    // let refinedData = {tweetPoll, tweetGif, tweetText, extraTweet, gifItem, count, test: [tweetMedia]}


    // using a logical gate to make sure only valid data is going through to firestore, not just empty entries
    if (tweetText || imgFile || gifItem) {
        addDoc(collection(db, 'tweetData'), refinedData)
            .then((data) => {
                // data.id && console.log('data is added successfully', data.id)
                imgFile && testUploadBlobFileAsyncApproach(imgFile, data.id, urlUpdater)
                // gifItem && testReadFirestoreData(data.id, giphyUpdater)
                // gifItem && giphyUpdater(gifItem.id)
                // gifItem && testReadFirestoreData(gifItem.id, giphyUpdater)
                userDocUpdater(data.id)
                console.log('data is added successfully', data.id)
            })
            .catch(err => console.log('error while in writing into collection....', err.message))
    }

    // setDoc(doc(db, 'tweetData', 'dataModel'), refinedData, {merge: true}).then(() => console.log('data is added successfully')).catch(err=>console.log('error while in writing into collection....', err.message))
    // addDoc(collection(db, 'tweetData'), refinedData)
    // .then((data) => {
    //     // testUploadBlobFile((gifItem && gifItem) || selectedFile, (imgFile && imgFile.name  || gifItem && gifItem.id))
    //     // testUploadBlobFile((gifItem && gifItem) || imgFile, data.id)
    //     // testUploadBlobFileAsyncApproach((gifItem && gifItem) || imgFile, data.id)
    //     // testUploadBlobFileAsyncApproach((gifItem && gifItem) || imgFile, data.id, urlUpdater)
    //     testUploadBlobFileAsyncApproach(imgFile, data.id, urlUpdater)
    //     data.id && console.log('data is added successfully', data.id)
    //     userDocUpdater(data.id)
    // })
    // .catch(err=>console.log('error while in writing into collection....', err.message))
}

let readGifIdFromFirestoreCollection = (userDoc, gifIdUpdtaer) => {
    let docRef = doc(db, 'tweetData', userDoc);
    
}

export let updateUserDocWithMediaUrls = (userDoc, mediaUrl) => {
    let data = { picture: mediaUrl }
    let docRef = doc(db, 'tweetData', userDoc)
    updateDoc(docRef, data).then(() => console.log('data updated?!')).catch(err => console.log('couldnt updated', err.message))
    // let data = {medias: mediaUrl}
    // console.log('here here!!', userDoc, mediaUrl)
    // setDoc(doc(db, 'tweetData', userDoc), data).then(()=>console.log('data updated?!')).catch(err=>console.log('couldnt updated', err.message))
}


export let testReadFirestoreData = async (docID, giphyUpdater, gifId) => {
    let docRef = doc(db, 'tweetData', docID)
    console.log(docRef, docID, 'here hyere')
    let docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        // console.log('document data : ', docSnap.data()['medias'].gif)
        console.log('document data is found and reading....')
        giphyUpdater(docSnap.data()['medias'].gif)
        // if(gifId) {
        //     giphyUpdater(docSnap.data()['medias'].gif.id)
        //     console.log('chk01')
        // } else {
        //     giphyUpdater(docSnap.data()['medias'].gif)
        //     console.log('chk02')
        // }
    } else {
        console.log('trouble reading firestore data')
    }
    
    // let docSnap;
    // getDoc(docRef).then(snap => {
    //     if (snap.exists()) {
    //         // docSnap
    //         console.log('document data : ', snap.data())
    //     }
    // }).catch(err => console.log('trouble reading firestore data', err.message))
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
