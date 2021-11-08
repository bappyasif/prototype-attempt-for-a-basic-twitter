import { collection, getFirestore } from '@firebase/firestore';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import FirebaseApp from './firebase-configs';
import { getAllDocsOnce, readDataDescendingOrder, readDataInRealtime } from './firestore-methods';
import {v4 as uuid} from 'uuid'

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

    let updateDOM = () => setRerenderDOM(true);

    useEffect(() => rerenderDOM && makingDataReadyInDescendingOrder(), [rerenderDOM])

    useEffect(()=> {
        makingDataReadyInDescendingOrder();
        setUniqueID(uuid())
        // setRerenderDOM(false)
        // setCountForTweetContainer(uuid())
        setCountForTweetContainer(String(new Date().getTime()))
    } , [])

    

    let makingDataReadyInDescendingOrder = () => {
        uniqueID && console.log(uniqueID, 'is it?!')
        readDataDescendingOrder().then(res=>{
            console.log(res, 'sorted?!')
            setUserDocs(res)
            setDataLoading(false)
        }).catch(err => console.log('error in useEffect fetching', err.message))
    }

    useEffect(()=> {
        newDataStatus && console.log('it running!!')
        newDataStatus && makingDataReadyInDescendingOrder();
    } , [newDataStatus])

    let handleCount = (val) => {
        // setCountForTweetContainer(uuid());
        // setCountForTweetContainer(val);
        setCountForTweetContainer(String(new Date().getTime()))
        setRerenderDOM(false)
    }
    
    let generateOneNewID = () => setUniqueID(uuid())

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            { <AllRoutes newID={generateOneNewID} updateDOM={updateDOM} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />}
            {/* { dataLoading && <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
        </div>
    )
}

// export let generateOneNewID = () => setUniqueID(uuid())

export default ComponentsContainer