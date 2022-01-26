import React from 'react';
import { Timestamp, getFirestore, collection, addDoc, updateDoc, getDocs, setDoc, doc, getDoc, onSnapshot, query, where, limit, orderBy, deleteField, FieldValue, deleteDoc } from 'firebase/firestore'
import { Link, Route } from 'react-router-dom';
import FirebaseApp from '../firebase-configs'
import { merge } from 'lodash';

// Initialize Cloud Firestore through Firebase
let db = getFirestore();


// set data into firestore
export let writeDataIntoCollection = (data, docID, newDataStatus, updateData, userID) => {
    let { listOfRetweetedQuotes, retweetedQuote, selectedTaggedPlace, quoteTweetID, scheduledTimeStamp, extraPoll, tweetPoll, tweetMedia, tweetText, extraTweet, tweetPrivacy, imgFile, extraImgFile, gifItem, extraGifItem, count, firstTweetHasMedia, secondTweetHasMedia } = { ...data }

    // trying out firestore timestamp as createdDate, this works just fine
    let dateCreated = Timestamp.now()
    console.log('<<<<<here>>>>>', tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, data)

    let refinedData;
    if (extraImgFile && imgFile) {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', extraPicture: extraImgFile ? extraImgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, quoteTweetID: quoteTweetID ? quoteTweetID : null, replyCount: 0}
    } else if (!extraImgFile && imgFile) {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, quoteTweetID: quoteTweetID ? quoteTweetID : null, replyCount: 0 }
    } else {
        refinedData = { id: docID, extraPoll, tweetPoll, tweetText, extraTweet, medias: { picture: imgFile ? imgFile : '', extraPicture: extraImgFile ? extraImgFile : '', gif: gifItem ? gifItem.id : '', extraGif: extraGifItem ? extraGifItem.id : '' }, created: dateCreated, privacy: tweetPrivacy, firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, quoteTweetID: quoteTweetID ? quoteTweetID : null, replyCount: 0 }
        // console.log('here!!????', refinedData)
    }

    if(scheduledTimeStamp) refinedData.scheduledTimeStamp = scheduledTimeStamp

    refinedData.repliedTweets = []; // bringing in repliedTweets into firestore subcollection as well

    refinedData.selectedTaggedPlace = selectedTaggedPlace ? selectedTaggedPlace : null; // binging in tagged location information too

    refinedData.retweetedQuote = retweetedQuote; // bringing in retweetedQuote property so that when tweets gets rendered on DOM initially DOM can style it differently than it does for quotedTweets

    refinedData.listOfRetweetedQuotes = listOfRetweetedQuotes; // also bringing in listOfRetweetedQuotes so that whenever it gets quoted from retweet modal component can look for its data when needed
    
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

export let createFirestoreCollectionDocument = (userID, name, handleCurrentUser, userPhotoUrl) => {
    let docRef = doc(db, 'tweets-user', userID);
    let date = new Date()
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let day = date.getDay()
    let month = months[date.getMonth()];
    let year = date.getFullYear()
    // console.log(day, month, year)
    console.log(name, '<>')
    
    let userData = {userInfo: {uid: userID, name: name, userProfileCompleted: false},
                    profileInfo: [
                        {
                            content: name != 'name' ? name : 'enter name',
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
                            content: `${month} ${day}, ${year}`,
                            title: 'Birth date',
                        },
                        {
                            content: `${month} ${day}, ${year}`,
                            title: 'Joining date',
                        },
                        {
                            content: userPhotoUrl || 'https://picsum.photos/200/300',
                            title: 'userPhotoUrl'
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
                // handleSinginCompleted(true)
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
            userProfileData && dataLoader(userProfileData)
            userProfileData && console.log('data is now loaded', userProfileData)
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

// delete user birthdate field from, firestore
// export let deleteBirthdate = (docID) => {
//     let docRef = doc(db, 'tweets-user', docID);
//     updateDoc(docRef, {'profileInfo[4]': {content: deleteField(), title: deleteField()}})
//     .then(() => console.log('birthdate removed'))
//     .catch(err => console.log('birthdate removal was failed', err.message))
// }

export let deleteBirthdate = (docID) => {
    let docRef = doc(db, 'tweets-user', docID);
    updateDoc(docRef, {profileInfo: FieldValue.arrayRemove(docID.profileInfo[4])})
    .then(() => console.log('birthdate removed'))
    .catch(err => console.log('birthdate removal was failed', err.message))
}

export let updateUserInterestsSelection = (data, docID, completionStatus) => {
    let docRef = doc(db, 'tweets-user', docID)
    console.log('checkpoint-01')
    updateDoc(docRef, data)
    .then(() => {
        console.log('interests updated or added')
    }).catch(err=>console.log('interests could not be updated or added', err.message))
    .finally(() => {
        completionStatus()
        console.log('checkpoint-02')
    })
}

export let getSomeDataFromUserMainDocument = (userID, dataLoader, whichData) => {
    let docRef = doc(db, 'tweets-user', userID)
    getDoc(docRef)
    .then(docSnap => {
        if(docSnap.exists) {
            let queriedData = docSnap.data()[whichData];
            dataLoader(queriedData)
            console.log('data is now loaded')
        } else {
            console.log('no such document found')
        }
    }).catch(err => console.log('could not extract data from given docuement', err.message))
}

export let updateSomeDataWithinUserMainDocument = (userID, whichData) => {
    let docRef = doc(db, 'tweets-user', userID)
    updateDoc(docRef, whichData)
    .then(() => console.log('data been updated successfuly into user main document'))
    .catch(err=>console.log('user main document data update has been failed', err.code, err.message))
}

export let deleteDocFromFirestore = (userID, docID) => {
    let docRef = doc(db, 'tweets-user', userID, userID, docID)
    deleteDoc(docRef)
    .then(() => console.log('document is now deleted'))
    .catch(err => console.log('document deletion has failed', err.code, err.message))
}

export let updateDataInFirestore = (userID, docID, data) => {
    let docRef = doc(db, 'tweets-user', userID, userID, docID)
    updateDoc(docRef, data)
    .then(() => console.log('data been updated successfuly'))
    .catch(err=>console.log('data update has failed', err.code, err.message))
}

export let readDocumentFromFirestoreSubCollection = (userID, docID, dataLoader) => {
    let docRef = doc(db, 'tweets-user', userID, userID, docID)
    // console.log(userID, docID, 'firestore!!')
    getDoc(docRef)
    .then(docSnap => {
        if(docSnap.exists) {
            let dataset = docSnap.data();
            // console.log(dataset, 'fromfirestore!!')
            dataset && dataLoader(dataset)
            dataset && console.log('document loading was successful')
        } else {
            console.log('document was not found!!')
        }
    }).catch(err => console.log('docuemnt fetched has failed', err.code, err.message))
}

export let getDataFromFirestoreSubCollection = (userID, docID, whichData, dataLoader) => {
    let docRef = doc(db, 'tweets-user', userID, userID, docID)
    // console.log('checkpoint 3')
    getDoc(docRef)
    .then(docSnap => {
        // console.log('checkpoint 4', docSnap.data(), docSnap.exists(), whichData, docSnap.data()[whichData])
        if(docSnap.exists) {
            let data = docSnap.data()[whichData]
            // data && dataLoader(data)
            data ? dataLoader(data) : whichData == 'replyCount' && dataLoader(data)
            data && console.log('data loaded!!', data)
        } else {
            console.log('data does not exist!!')
        }
    }).catch(err => console.log('data was not found', err.code, err.message))
}

export let addSpecificDataIntoFirestoreCollection = (userID, data) => {
    let docRef = doc(db, 'tweets-user', userID);
    updateDoc(docRef, data)
    .then(() => console.log('data added to firestore'))
    .catch(err => console.log('data addition has failed', err.code, err.message))
}