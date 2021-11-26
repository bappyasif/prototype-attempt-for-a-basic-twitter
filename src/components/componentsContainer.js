import { collection, getFirestore } from '@firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import FirebaseApp from './firebase-configs';
import { createSubCollectionForCurrentUser, getAllDocsOnce, readDataDescendingOrder, readDataInRealtime } from './firestore-methods';
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

    let handleCurrentUser = (userID) => setCurrentUser(userID)

    currentUser && console.log(currentUser, '<<current user>>')

    // useEffect(() => {
    //     try {
    //         currentUser && createSubCollectionForCurrentUser(currentUser, uniqueID, { test: 'test' })
    //     } catch (err) {
    //         console.log(err, '!!')
    //     }
    // }, [currentUser])

    let updateDOM = (frmWhr) => {
        setRerenderDOM(true);
        console.log('<< ::fromWhere:: >>', frmWhr)
    }

    // useEffect(() => rerenderDOM && makingDataReadyInDescendingOrder(), [rerenderDOM])

    useEffect(() => {
        makingDataReadyInDescendingOrder();
        setUniqueID(uuid())
        // setRerenderDOM(false)
        // setCountForTweetContainer(uuid())
        // setCountForTweetContainer(String(new Date().getTime()))
    }, [])

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
            setUserDocs(userDocs)
        } else {
            // for all other use cases add it on front and render it on DOM
            userDocs.unshift(data)
            setUserDocs(userDocs)
        }
        console.log(userDocs, ' ---- from update ---- ', data)
        generateOneNewID();
        // console.log(checkDuplicate, 'checking duplicate')
    }

    let makingDataReadyInDescendingOrder = () => {
        uniqueID && console.log(uniqueID, 'is it?!')
        readDataDescendingOrder().then(res => {
            console.log(res, 'sorted?!')
            setUserDocs(res)
            // setDataLoading(false)
        }).catch(err => console.log('error in useEffect fetching', err.message))
    }

    // useEffect(() => generateOneNewID(), [userDocs])

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

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            {/* {<AllRoutes updateData={updateData} newID={generateOneNewID} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} />} */}
            {<AllRoutes currentUser={currentUser} handleCurrentUser={handleCurrentUser} updateData={updateData} newID={generateOneNewID} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} />}
            {/* { dataLoading && <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
        </div>
    )
}

// export let generateOneNewID = () => setUniqueID(uuid())

export default ComponentsContainer