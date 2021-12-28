import { collection, getFirestore } from '@firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import FirebaseApp from './firebase-configs';
import { addSpecificDataIntoFirestoreCollection, createSubCollectionForCurrentUser, deleteDocFromFirestore, getAllDocsOnce, getSomeDataFromUserMainDocument, readDataDescendingOrder, readDataInDescendingORderFromSubCollection, readDataInRealtime, updateDataInFirestore } from './firestore-methods';
import { v4 as uuid } from 'uuid'
import LandingPageUILogics from './landing-page/ui-logics';

function ComponentsContainer() {
    let [countForTweetContainer, setCountForTweetContainer] = useState([])
    let [changeLayout, setChangeLayout] = useState(false);
    // let [userDocs, setUserDocs] = useState([getAllDocsOnce()]);
    let [userDocs, setUserDocs] = useState([]);
    // let [userDocs, setUserDocs] = useState();
    let [newDataStatus, setNewDataStatus] = useState(false)
    let [dataLoading, setDataLoading] = useState(true)
    let [uniqueID, setUniqueID] = useState()
    let [rerenderDOM, setRerenderDOM] = useState(false)
    let [currentUser, setCurrentUser] = useState('')
    let [analysingTweetID, setAnalysingTweetID] = useState(null)
    let [analysingTweetData, setAnalysingTweetData] = useState(null)
    let [quoteTweetID, setQuoteTweetID] = useState(false)
    let [quoteTweetData, setQuoteTweetData] = useState(null)
    let [replyCount, setReplyCount] = useState(0)
    let [pinnedTweetID, setPinnedTweetID] = useState(null)
    let [pinnedTweetData, setPinnedTweetData] = useState(null)
    let [initialPinnedTweetData, setInitialPinnedTweetData] = useState(null)
    let [userDocsFlag, setUserDocsFlag] = useState(false)
    let [pinnedTweetIndex, setPinnedTweetIndex] = useState(null)
    let [previousPinnedTweetID, setPreviousPinnedTweetID] = useState(null)
    let [regainedDocs, setRegainedDocs] = useState(null)
    let [showPinnedTweetTag, setShowPinnedTweetTag] = useState(false)
    let [currentlyPinnedTweetID, setCurrentlyPinnedTweetID] = useState(false);
    // let [pinnedTweetFlag, setPinnedTweetFlag] = useState(false)
    // let [newlYPinnedTweetID, setNewlyPinneedTweetID] = useState(null)

    // vnxOMhbaq8ObeFIE56GNPDQanig1

    let tweetDataRefetched = data => setRegainedDocs(data)

    let handleInitialPinnedTweetDataLoader = dataset => setInitialPinnedTweetData(dataset)

    let handlePinnedTweetID = val => setPinnedTweetID(val);

    let handlePinnedTweetData = dataset => setPinnedTweetData(dataset)

    let handleReplyCount = (val) => setReplyCount(val);

    let handleQuoteTweetID = value => setQuoteTweetID(value)

    let handleAnalysingTweetID = value => setAnalysingTweetID(value)

    let handleCurrentUser = (userID) => setCurrentUser(userID)

    // currentUser && console.log(currentUser, '<<current user>>')

    // let updateDOM = (frmWhr) => {
    //     setRerenderDOM(true);
    //     console.log('<< ::fromWhere:: >>', frmWhr)
    // }

    // useEffect(() => rerenderDOM && makingDataReadyInDescendingOrder(), [rerenderDOM])

    useEffect(() => {
        // currentUser && makingDataReadyInDescendingOrder(currentUser);
        setUniqueID(uuid())
        // setRerenderDOM(false)
        // setCountForTweetContainer(uuid())
        // setCountForTweetContainer(String(new Date().getTime()))

        // getting session stored auth persistence state, if there is any in sesion storage
        let browserStorage = window.sessionStorage;
        // let sessionID = browserStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]')
        let sessionID = JSON.parse(browserStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]'))
        sessionID && console.log(browserStorage, sessionID, sessionID.uid)
        sessionID && handleCurrentUser(sessionID.uid)

        // getting local storage for local auth persistence entry, if there is any
        let localStorage = window.localStorage;
        let localSession = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]'))
        localSession && console.log(localStorage, localSession, localSession.uid)
        localSession && handleCurrentUser(localSession.uid)
    }, [])

    useEffect(() => {
        currentUser && makingDataReadyFromSubCollectionInDescendingOrder(currentUser)
        // search for pinned tweet, in firestore user collection
        currentUser && getSomeDataFromUserMainDocument(currentUser, handleInitialPinnedTweetDataLoader, 'pinnedTweet')
    }, [currentUser])

    let updateData = data => {
        // when there is two picture files in a tweet, spanned over two tweets together, we had to do some cleanign up to do before rendering it on DOM, otherwise a duplicate node is getting rendered
        let checkDuplicate = userDocs.filter(obj => {
            // console.log(obj.id == data.id, 'found id!!')
            return obj.id == data.id
        })

        // makinf sure when two picture exists, just insertn it in dataset but not rendering it
        if (data.secondTweetHasMedia && checkDuplicate.length == 0) {
            // console.log('do nothing', checkDuplicate)
            // setUserDocs(userDocs)
            userDocs.unshift(data)
        } else if (data.secondTweetHasMedia && checkDuplicate.length == 1) {
            // when found duplicate entry, taking it out and rendering it on DOM
            userDocs.splice(0, 1)
            userDocs.unshift(data)
            // console.log(userDocs, ' ---- from update ---- dd ', data)
            // setUserDocs(userDocs)
        } else {
            // for all other use cases add it on front and render it on DOM
            userDocs.unshift(data)
            // setUserDocs(userDocs)
        }
        setUserDocs(userDocs)
        console.log(userDocs, ' ---- from update ---- ', data)
        generateOneNewID();
        setUserDocsFlag(true)

        // adjusting dataset if there is any pinned tweet exist in user profile
        // pinnedTweetID && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        // console.log(checkDuplicate, 'checking duplicate')
    }

    let makingDataReadyFromSubCollectionInDescendingOrder = (currentUser) => {
        readDataInDescendingORderFromSubCollection(currentUser, setUserDocs)
    }

    useEffect(() => {
        newDataStatus && console.log('it running!!')
        // newDataStatus && makingDataReadyInDescendingOrder();

    }, [newDataStatus])

    let handleCount = (val) => {
        // setCountForTweetContainer(uuid());
        // setCountForTweetContainer(val);
        setCountForTweetContainer(String(new Date().getTime()))
        setRerenderDOM(false)
        // updateDOM();
    }

    let generateOneNewID = () => setUniqueID(uuid())

    let removeSpeceficArrayItem = idx => {
        // idx = 'fb34e41b-60ab-4541-a99e-65d2d6181102'
        setUserDocs(prevData => {
            let foundIndex = userDocs && userDocs.findIndex(item => item.id == idx)
            
            // updating records in firestore as well, trying against it
            // deleteDocFromFirestore(currentUser, idx)

            // updating userdocs for DOM node rendering
            return prevData.slice(0, foundIndex).concat(prevData.slice(foundIndex+1))
        })
        // let foundIndex = userDocs && userDocs.findIndex(item => item.id == idx)
        //     console.log(foundIndex, 'found!!')
    }

    let updateTweetPrivacy = (idx, privacyOption) => {
        let foundIndex = userDocs.findIndex(item => item.id == idx)
        setUserDocs(prevData => prevData.map(item => item.id == idx ? {...item, privacy: privacyOption} : {...item}))
        updateDataInFirestore(currentUser, idx, {privacy: privacyOption})
    }

    let getSpeceficItemFromUserDocs = (idx, dataLoader) => {
        let tweetAnalysing = userDocs.filter(item => item.id == idx)
        dataLoader(tweetAnalysing)
    }

    // useEffect(() => analysingTweetID && getSpeceficItemFromUserDocs(), [analysingTweetID])
    useEffect(() => analysingTweetID && getSpeceficItemFromUserDocs(analysingTweetID, setAnalysingTweetData), [analysingTweetID])

    useEffect(() =>  quoteTweetID && getSpeceficItemFromUserDocs(quoteTweetID, setQuoteTweetData), [quoteTweetID])

    useEffect(() => {
        pinnedTweetID && getSpeceficItemFromUserDocs(pinnedTweetID, handlePinnedTweetData)
        // pinnedTweetID && removeSpeceficArrayItem(pinnedTweetID);
        // keeping track whether a new pinned id is detected after already existing pinned tweet id
        // pinnedTweetID && setPreviousPinnedTweetID(pinnedTweetID);
    }, [pinnedTweetID])

    useEffect(() => {
        // pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
        // if(pinnedTweetData) pinnedTweetData[0].index = pinnedTweetIndex
        // pinnedTweetData && removeSpeceficArrayItem(pinnedTweetID);
        // pinnedTweetData && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        // pinnedTweetData && updateUserDocsItems(pinnedTweetID)
        pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
        // pinnedTweetData && makingDataReadyFromSubCollectionInDescendingOrder(currentUser)
        // pinnedTweetData && setPinnedTweetFlag(true)
        pinnedTweetData && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        pinnedTweetData && readDataInDescendingORderFromSubCollection(currentUser, tweetDataRefetched)
        // pinnedTweetData && setPinnedTweetData(null)
        // pinnedTweetData && alert('??')
    }, [pinnedTweetData])

    useEffect(() => {
        regainedDocs && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        regainedDocs && console.log('here!!', regainedDocs, userDocs)
        regainedDocs && setShowPinnedTweetTag(true)
        regainedDocs && setCurrentlyPinnedTweetID(pinnedTweetID)
        regainedDocs && adjustDocsFromRecentlyFetchedDataset()
    }, [regainedDocs])

    let adjustDocsFromRecentlyFetchedDataset = () => {
        let temp = regainedDocs.filter(item => item.id != pinnedTweetID)
        let readyDocs = [].concat(pinnedTweetData[0], temp)
        // console.log(readyDocs);
        readyDocs && setUserDocs(readyDocs)
    }

    // useEffect(() => {
    //     pinnedTweetFlag && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
    //     pinnedTweetFlag && setPinnedTweetFlag(false)
    //     pinnedTweetFlag && pinnedTweetData && setPinnedTweetData(null)
    // }, [pinnedTweetFlag])

    let updateUserDocsItems = idx => {
        setUserDocs(prevData => {
            let foundIndex = userDocs && userDocs.findIndex(item => item.id == idx)

            // updating userdocs for DOM node rendering
            return prevData.slice(0, foundIndex).concat(prevData.slice(foundIndex+1))
        })
    }

    let adjustUserDocsDataset = (pinnedID, pinnedData) => {
        console.log('dataset updating....', pinnedData)
        setUserDocs(prevData => {
            let temp = prevData.filter((item, idx) => {
                // setPinnedTweetIndex(idx)
                return item.id != pinnedID
            })
            return [].concat(pinnedData, temp)
        })
    }

    useEffect(() => {
        initialPinnedTweetData && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        // initialPinnedTweetData && setPreviousPinnedTweetID(initialPinnedTweetData.id)
        initialPinnedTweetData && setShowPinnedTweetTag(true)
        initialPinnedTweetData && setCurrentlyPinnedTweetID(initialPinnedTweetData.id)
    }, [initialPinnedTweetData])

    useEffect(() => {
        // userDocsFlag && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        // userDocsFlag && (pinnedTweetData || initialPinnedTweetData) && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        
        // if there is a new pinned tweet adjust accordingly otherwise adjust with initial pinned tweet data
        if (pinnedTweetData) {
            userDocsFlag && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData)
        } else if(initialPinnedTweetData) {
            userDocsFlag && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        }
        
        userDocsFlag && setUserDocsFlag(false)

    }, [userDocsFlag])

    // currentUser && removeSpeceficArrayItem()
    // userDocs && console.log(userDocs.length, 'removed??', userDocs)

    // quoteTweetID && console.log(quoteTweetID, 'quoteID')
    // pinnedTweetData && console.log(pinnedTweetData, 'pinned tweet data here!!');
    initialPinnedTweetData && console.log(initialPinnedTweetData, 'initial pinned!!')
    // pinnedTweetID && console.log(pinnedTweetID, 'tweet ID', userDocs)

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            {/* {<AllRoutes updateData={updateData} newID={generateOneNewID} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} />} */}
            {<AllRoutes currentUser={currentUser} handleCurrentUser={handleCurrentUser} updateData={updateData} newID={generateOneNewID} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} analysingTweetID={analysingTweetID} handleAnalysingTweetID={handleAnalysingTweetID} analysingTweetData={analysingTweetData} handleQuoteTweetID={handleQuoteTweetID} quoteTweetData={quoteTweetData} quoteTweetID={quoteTweetID} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} showPinnedTweetTag={showPinnedTweetTag} currentlyPinnedTweetID={currentlyPinnedTweetID} />}
            {/* { dataLoading && <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
        </div>
    )
}

// export let generateOneNewID = () => setUniqueID(uuid())

export default ComponentsContainer



/**
 * 
 * 
     // let makingDataReadyInDescendingOrder = () => {
    //     // uniqueID && console.log(uniqueID, 'is it?!')
    //     readDataDescendingOrder().then(res => {
    //         console.log(res, 'sorted?!')
    //         setUserDocs(res)
    //         // setDataLoading(false)
    //     }).catch(err => console.log('error in useEffect fetching', err.message))
    // }

    // useEffect(() => generateOneNewID(), [userDocs])
 * 
 * 
 
    // useEffect(() => {
    //     // if(pinnedTweetIndex && pinnedTweetData[0]) pinnedTweetData[0].index = pinnedTweetIndex
    //     pinnedTweetData && pinnedTweetIndex && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
    // }, [pinnedTweetIndex])

    // useEffect(() => {
    //     // previousPinnedTweetID == pinnedTweetID && console.log('different id')

    //     // whenever ther is newer tweet pinned iD kepping it updated in firestore as well
    //     // (previousPinnedTweetID) && pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})

    //     // // adding back previously pinned tweet ID back into firestore
    //     // previousPinnedTweetID && pinnedTweetData && updateDataInFirestore(currentUser, previousPinnedTweetID, pinnedTweetData[0])
    // }, [previousPinnedTweetID])
 * 
 * 
 useEffect(() => {
        pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
        pinnedTweetData && setUserDocs(prevData => {
            // ([pinnedTweetData[0], prevData.filter(item => item.id != pinnedTweetID)])
            let temp = prevData.filter(item => item.id != pinnedTweetID)
            return [].concat(pinnedTweetData[0], temp)
        })
        // if(pinnedTweetData) {
        //     let temp = [pinnedTweetData[0], userDocs.slice(0)]
        //     console.log(temp, '<><>')
        //     // setUserDocs(temp)
        // }
        // pinnedTweetData && setUserDocs(prevData => [].concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.slice(0, 0).concat(pinnedTweetData[0]).concat(prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.slice(0, 0).concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.unshift(pinnedTweetData[0]))
        // pinnedTweetData && setUserDocs(prevData => prevData.splice(0, 0, pinnedTweetData[0]))
        // pinnedTweetData && setUserDocs(prevData => {
        //     let temp = []
        //     let prevSliced = prevData.slice(1)
        //     temp = temp.concat(pinnedTweetData[0], prevSliced)
        //     return temp
        // })
        // pinnedTweetData && setUserDocs(prevData => [...prevData.slice(0, 0)].concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => [].concat(pinnedTweetData[0], prevData.slice(1)))
        // let temp = []
        // pinnedTweetData && userDocs.forEach(item => temp.push(item))
        // pinnedTweetData && temp.shift()
        // pinnedTweetData && temp.unshift(pinnedTweetData[0])
        // temp && setUserDocs(temp)
        // let temp = [...userDocs].shift()
        // temp.unshift(pinnedTweetData[0])
        // setUserDocs(temp)

        // if(pinnedTweetData) {
        //     let temp = []
        //     temp = [...userDocs]
        //     temp.shift()
        //     temp.unshift(pinnedTweetData[0])
        //     setUserDocs(temp)
        // }
    }, [pinnedTweetData])
 */