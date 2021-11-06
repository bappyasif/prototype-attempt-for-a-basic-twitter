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
    // let [userDocs, setUserDocs] = useState([]);
    let [userDocs, setUserDocs] = useState();
    let [newDataStatus, setNewDataStatus] = useState(false)
    let [dataLoading, setDataLoading] = useState(true)

    // readDataInRealtime();
    // readDataDescendingOrder();

    // getAllDocsOnce().then(res=>{
    //     setUserDocs(res)
    // });

    useEffect(()=> {
    // causes app to stuck, for some reason due to this call of getAllDocsOnce!!
        getAllDocsOnce().then(res=>{
            // when setting userDocs, data doesnt seems to be syncing well enough
            setUserDocs(res)
            console.log('res::', res)  // data is showing but browser is gets laggy, as because its fetching data to show it on DOM
        });
    
        // setUserDocs(data)
        // data && console.log(userDocs, 'data..container', data);
        // data && setDataLoading(false)
    } , [])

    // useEffect(()=> {
    //     getAllDocsOnce().then(res=>{
    //         setUserDocs(res)
    //     });
    //     readDataDescendingOrder();
    //     // console.log(userDocs, 'data..');
    // } , [newDataStatus])

    useEffect(() => {
        readDataInRealtime();
    }, [userDocs])
    
    // userDocs && console.log(userDocs, 'data..');

    // let handleCount = () => setCountForTweetContainer(countForTweetContainer + 1);   
    let handleCount = () => setCountForTweetContainer(uuid());   

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            { <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />}
            {/* { userDocs && <AllRoutes tweetData={userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
        </div>
    )
}

export default ComponentsContainer