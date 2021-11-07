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

    // let updateFirestoreUserDocsAdditionalEntries = (newData) => setUserDocs([[newData], ...userDocs])
    // let data = getAllDocsOnce();
    let data;

    // useEffect(()=> {
    //     // getAllDocsOnce().then(res=>{
    //     //     setUserDocs(res)
    //     // });
    //     // setUserDocs(data)
    //     // data && console.log(userDocs, 'data..container', data);
    //     readDataDescendingOrder().then(res=>{
    //         console.log(res, 'sorted?!')
    //         setUserDocs(res)
    //     })
    //     data && setDataLoading(false)
    // } , [])

    // useEffect(()=> {
    //     readDataDescendingOrder().then(res=>{
    //         console.log(res, 'sorted?!')
    //         setUserDocs(res)
    //     })
    //     data && setDataLoading(false)
    // } , [])

    useEffect(()=> {
        makingDataReadyInDescendingOrder();
        // dataLoading && makingDataReadyInDescendingOrder();
        // data && setDataLoading(false)
    } , [])

    

    let makingDataReadyInDescendingOrder = () => {
        readDataDescendingOrder().then(res=>{
            console.log(res, 'sorted?!')
            setUserDocs(res)
            setDataLoading(false)
        }).catch(err => console.log('error in useEffect fetching', err.message))
    }

    // makingDataReadyInDescendingOrder();

    useEffect(()=> {
        makingDataReadyInDescendingOrder();
        // dataLoading && makingDataReadyInDescendingOrder();
    } , [newDataStatus])

    // useEffect(()=> {
    //     newDataStatus && userDocs && makingDataReadyInDescendingOrder();
    // } , [newDataStatus])

    // useEffect(()=> {
    //     data = getAllDocsOnce().then();
    //     setUserDocs(data)
    //     console.log(userDocs, 'data..container', data);
    // } , [])

    // useEffect(()=> {
    //     getAllDocsOnce().then(res=>{
    //         setUserDocs(res)
    //     });
    //     // readDataDescendingOrder();
    //     // console.log(userDocs, 'data..');
    // } , [newDataStatus])

    // useEffect(() => {
    //     readDataInRealtime();
    // }, [userDocs])
    // userDocs && console.log(userDocs, 'data..');

    // let handleCount = () => setCountForTweetContainer(countForTweetContainer + 1);   
    let handleCount = () => setCountForTweetContainer(uuid());   

    // let MakeReadyData = () => {
    //     let [data, setData] = useState([])
    //     getAllDocsOnce()
    //     .then(datas => {
    //         // data = datas
    //         setData([datas])
    //         console.log(datas, 'hErE')
    //     })
    //     return data && <AllRoutes tweetData={data} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />
    // }

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            { <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />}
            {/* { dataLoading && <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
            {/* {<MakeReadyData />} */}
            {/* <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} /> */}
            {/* <AllRoutes tweetData={userDocs || getAllDocsOnce()} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} /> */}
            {/* <AllRoutes tweetData={(userDocs || getAllDocsOnce() ) && (userDocs || getAllDocsOnce())} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} /> */}
            {/* {userDocs && <AllRoutes tweetData={userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
            {/* <AllRoutes /> */}
        </div>
    )
}

export default ComponentsContainer

/**
 * 
 * 
  let db = getFirestore(FirebaseApp);

    function accessDatabase() {
        let dbCollection = collection(db, 'example');
        // console.log(dbCollection);
    }

    accessDatabase();

    // example signup
    let auth = getAuth()
    
    // createUserWithEmailAndPassword(auth, 'test@test.com', 'test11').then(res=>console.log(res)).catch(err=> {
    //     let errorCode = err.code;
    //     let errorMsg = err.message;
    //     console.log(errorCode, errorMsg)
    // })
 */