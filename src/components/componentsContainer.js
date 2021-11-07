import { collection, getFirestore } from '@firebase/firestore';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import FirebaseApp from './firebase-configs';
import { getAllDocsOnce, readDataDescendingOrder, readDataInRealtime } from './firestore-methods';
import {v4 as uuid} from 'uuid'

function ComponentsContainer() {
    let [countForTweetContainer, setCountForTweetContainer] = useState(uuid())
    let [changeLayout, setChangeLayout] = useState(false);
    // let [userDocs, setUserDocs] = useState([getAllDocsOnce()]);
    let [userDocs, setUserDocs] = useState([]);
    // let [userDocs, setUserDocs] = useState();
    let [newDataStatus, setNewDataStatus] = useState(false)
    let [dataLoading, setDataLoading] = useState(true)

    useEffect(()=> {
        makingDataReadyInDescendingOrder();
    } , [])

    

    let makingDataReadyInDescendingOrder = () => {
        readDataDescendingOrder().then(res=>{
            console.log(res, 'sorted?!')
            setUserDocs(res)
            setDataLoading(false)
        }).catch(err => console.log('error in useEffect fetching', err.message))
    }

    useEffect(()=> {
        makingDataReadyInDescendingOrder();
    } , [newDataStatus])

    let handleCount = () => setCountForTweetContainer(uuid());

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            { <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />}
            {/* { dataLoading && <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
        </div>
    )
}

export default ComponentsContainer