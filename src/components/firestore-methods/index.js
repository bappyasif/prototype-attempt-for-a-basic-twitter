import { Timestamp, getFirestore, collection, addDoc, updateDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit, orderBy } from 'firebase/firestore'
import FirebaseApp from '../firebase-configs'

// Initialize Cloud Firestore through Firebase
let db = getFirestore();


// set data into firestore
export let writeDataIntoCollection = (data, docID, imgUrl, updateData) => {
    let { extraPoll, tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, gifItem, extraGifItem, count, firstTweetHasMedia, secondTweetHasMedia } = { ...data }
    
    // trying out firestore timestamp as createdDate, this works just fine
    let dateCreated = Timestamp.now()
    // console.log('<<<<<here>>>>>', imgUrl)
    console.log('<<<<<here>>>>>', tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia)

    let refinedData = {id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgUrl ? imgUrl : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia }
    
    // trying updating data locally first and render data from that
    updateData(refinedData)

    // using a logical gate to make sure only valid data is going through to firestore, not just empty entries
    if (imgFile || gifItem || tweetText) {
        // console.log(docID, '<<<<<here>>>>>', imgUrl, gifItem.id)
        let docRef = doc(db, 'tweets-data', docID);

        setDoc(docRef, refinedData)
        .then((data) => {
            console.log('data is added successfully')
        })
        .catch(err => console.log('error while in writing into collection....', err.message))
    }
}

export let readDataDescendingOrder = async () => {
    let data = []
    // let collectionRef = collection(db, 'tweetData');
    let collectionRef = collection(db, 'tweets-data');
    let dataQuery = query(collectionRef, orderBy('created', 'desc'))
    try {
        let querySnapshot = await getDocs(dataQuery);
        querySnapshot.forEach(doc => {
            data.push(doc.data());
            // console.log('data sorted: ', doc.id +' => '+doc.data().created)
        })
        console.log('data sorted and ready')
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

