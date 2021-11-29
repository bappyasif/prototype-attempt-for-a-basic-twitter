import React from 'react';
import { Timestamp, getFirestore, collection, addDoc, updateDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit, orderBy } from 'firebase/firestore'
import { Link, Route } from 'react-router-dom';
import FirebaseApp from '../firebase-configs'
import { merge } from 'lodash';

// Initialize Cloud Firestore through Firebase
let db = getFirestore();


// set data into firestore
export let writeDataIntoCollection = (data, docID, newDataStatus, updateData, userID) => {
    let { extraPoll, tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, extraImgFile, gifItem, extraGifItem, count, firstTweetHasMedia, secondTweetHasMedia } = { ...data }

    // trying out firestore timestamp as createdDate, this works just fine
    let dateCreated = Timestamp.now()
    // console.log('<<<<<here>>>>>', tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia)

    let refinedData;
    if (extraImgFile && imgFile) {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', extraPicture: extraImgFile ? extraImgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia }
    } else if (!extraImgFile && imgFile) {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia }
    } else {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', extraPicture: extraImgFile ? extraImgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia }
        // console.log('here!!????', refinedData)
    }

    if(gifItem || imgFile || tweetText || extraTweet || extraImgFile || extraGifItem) {
        // let docRef = doc(db, 'tweets-data/', docID);
        let docRef = doc(db, 'tweets-user', userID, userID, docID)

        settingDataIntoFirestore(docRef, refinedData, updateData)
    }
}

let settingDataIntoFirestore = (docRef, refinedData, dataUpdater) => {
    setDoc(docRef, refinedData)
        .then((data) => {
            console.log('data is added successfully')
        })
        .catch(err => console.log('error while in writing into collection....', err.message))
        .finally(() => {
            dataUpdater(refinedData)
            console.log('data updated..')
        })
}

export let readDataDescendingOrder = async () => {
    let data = []
    // let collectionRef = collection(db, 'tweetData');
    let collectionRef = collection(db, 'tweets-data');
    // let collectionRef = doc(db, 'tweets-user', userID, userID)
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
    onSnapshot(collectionRef, () => { console.log('data changed') })
}

export let readDataInDescendingORderFromSubCollection = (userID, updateData) => {
    let data = []
    let collectionRef = collection(db, `tweets-user/${userID}/${userID}`);
    let dataQuery = query(collectionRef, orderBy('created', 'desc'))
    getDocs(dataQuery)
    .then(docs => docs.forEach(doc => data.push(doc.data())))
    .catch(err => console.log('error while sorting data', err.message))
    .finally(() => {
        data && console.log(data, 'here!!')
        data && updateData(data)
    })
}

export let createFirestoreCollectionDocument = (userID, name, handleCurrentUser) => {
    let docRef = doc(db, 'tweets-user', userID);
    
    let userData = {userInfo: {uid: userID, name: name, userProfileCompleted: false},
                    profileInfo: [
                        {
                            content: name,
                            title: 'Name',
                            maxLength: 50
                        },
                        {
                            content: 'user bio',
                            title: 'Bio',
                            maxLength: 160
                        },
                        {
                            content: 'capital, country',
                            title: 'Location',
                            maxLength: 13
                        },
                        {
                            content: 'some.web.site.com',
                            title: 'Website',
                            maxLength: 100
                        },
                        {
                            content: 'Month Day, Year',
                            title: 'Birth date',
                        }
                    ]}

    setDoc(docRef, userData)
    .then(() =>{
        console.log('user added on firestore');
        // created a document with this user id, to distinguish it from data set
        // within this document rest of this user 'tweets data' will be stored within a sub collection under this docID, which is unique to every user
        handleCurrentUser(userID)

        // now opening up user profile editable info section, to update their profile information section
        // window.open('/username/profile', '_parent')
    })
    .catch(err => console.log('user couldnt be added in firestore', err.message, err.code))
}

// writing data into a sub collection in firestore
export let createSubCollectionForCurrentUser = (currentUserID, docID, data) => {
    let subCollectionDocRef = doc(db, 'tweets-user', currentUserID, currentUserID, docID)
    // let subCollectionDocRef = setDoc(db, 'tweets-user', currentUserID, docID)
    // console.log(docID, 'here!! docID')
    data = {'sampleData': 'sampleData'}
    setDoc(subCollectionDocRef, data)
    .then(() => console.log('sub collection added succesfully'))
    .catch(err => console.log('sub collection could not be addeded', err.message))
}

// find user document from firestore collection
export let findUserDocumentFromFirestore = (userID, handleCurrentUser, updateUserProfileCompletionStatus) => {
    let docRef = doc(db, 'tweets-user', userID)
    getDoc(docRef)
    .then(docSnap => {
        if(docSnap.exists) {
            let userData = docSnap.data().userInfo
            
            if(userData.userProfileCompleted) {
                // window.open('/username/', '_parent')
                // <Link to='/username/' />
                // <Route to='/username/' />
                updateUserProfileCompletionStatus()
                console.log('/username')
            } else {
                // window.open('/username/profile', '_parent')
                // <Link to='/username/profile/' />
                // <Route path='/username/profile/' component={} />
                console.log('/username/profile')
            }
            
            handleCurrentUser(userID)
            console.log('signin completed');
        } else {
            console.log('no such document found')
        }
    }).catch(err => console.log('could not complete user document search in firestore', err.message))
}

// get data from a user document
export let getUserProfileData = (userID, dataLoader) => {
    let docRef = doc(db, 'tweets-user', userID)
    getDoc(docRef)
    .then(docSnap => {
        if(docSnap.exists) {
            let userProfileData = docSnap.data().profileInfo;
            dataLoader(userProfileData)
            console.log('data is now loaded')
        } else {
            console.log('no such document found')
        }
    }).catch(err => console.log('could not extract data from given docuement', err.message))
}

// get only Birth date
export let getUserBirthDate = async (userID) => {
    let data;
    let docRef = doc(db, 'tweets-user', userID)
    getDoc(docRef)
    .then(docSnap => {
        if(docSnap.exists) {
            let userBirthdate = docSnap.data().profileInfo[4];
            console.log(userBirthdate, '??')
            data = userBirthdate
        } else {
            console.log('no such document found')
        }
    }).catch(err => console.log('could not extract birthdate from given docuement', err.message))
    .finally(() => data && data)
}

// update data in document
export let updateUserProfileDataInDocument = (docID, data) => {
    let docRef = doc(db, 'tweets-user', docID)
    // let data = { profileInfo[index].content : evt.target.value }
    // data = () => profileInfo[index].content = evt.target.value
    // let data = { [dataRef]: value}
    // let data = profileInfo[0].content : 'data'
    
    updateDoc(docRef,  data)
    .then(() => console.log('data updated', data))
    .catch(err => console.log('data update was failed', err.message))
    .finally(() => userProfileDataIsNowCompleted(docID))
}

export let userProfileDataIsNowCompleted = (docID) => {
    let docRef = doc(db, 'tweets-user', docID);
    let data = {userInfo: {userProfileCompleted: true}}
    setDoc(docRef, data, {merge: true})
    .then(() => console.log('userInfo data merge completed'))
    .catch(err => console.log('userInfo data merge failed', err.message))
}

/**
 *
 *
 export let writeDataIntoCollection = (data, docID, newDataStatus, updateData) => {
    let { extraPoll, tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, extraImgFile, gifItem, extraGifItem, count, firstTweetHasMedia, secondTweetHasMedia } = { ...data }

    // trying out firestore timestamp as createdDate, this works just fine
    let dateCreated = Timestamp.now()
    // console.log('<<<<<here>>>>>', imgUrl)
    // console.log('<<<<<here>>>>>', tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia)
    // newDataStatus && console.log(newDataStatus, 'data ready!!')

    let refinedData;
    if (extraImgFile && imgFile) {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', extraPicture: extraImgFile ? extraImgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia }
    } else if(!extraImgFile && imgFile) {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia }
    } else {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', extraPicture: extraImgFile ? extraImgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia }
        // console.log('here!!', refinedData)
    }

    // using a logical gate to make sure only valid data is going through to firestore, not just empty entries
    if (!extraImgFile && !imgFile && refinedData) {
        if (gifItem || tweetText) {
            // console.log(docID, '<<<<<here>>>>>', imgUrl, gifItem.id)
            let docRef = doc(db, 'tweets-data', docID);

            settingDataIntoFirestore(docRef, refinedData, updateData)
            // console.log('if block', refinedData)
            // updateData(refinedData)
        }
    }
    else if(imgFile && !extraImgFile) {
        let docRef = doc(db, 'tweets-data', docID);

        settingDataIntoFirestore(docRef, refinedData, updateData)
    }
    else {
        if (extraImgFile && imgFile && refinedData) {
            if (extraImgFile && imgFile) {
                // console.log(docID, '<<<<<here>>>>>', imgUrl, gifItem.id)
                let docRef = doc(db, 'tweets-data', docID);

                settingDataIntoFirestore(docRef, refinedData, updateData)

                // console.log('else block', extraImgFile)
            } else if (extraImgFile) {
                let docRef = doc(db, 'tweets-data', docID);

                settingDataIntoFirestore(docRef, refinedData, updateData)

                // console.log('else - else if block', extraImgFile)
            }
            // no effects, as this doesnt gets to run
            // else if(imgFile) {
            //     let docRef = doc(db, 'tweets-data', docID);

            //     settingDataIntoFirestore(docRef, refinedData, updateData)
            // }
        }
        // this off switches gates for double entries when ther is two pictures involves
        // else if(!extraImgFile && imgFile && refinedData) {
        //     let docRef = doc(db, 'tweets-data', docID);

        //     settingDataIntoFirestore(docRef, refinedData, updateData)
        // }
    }
}
 */