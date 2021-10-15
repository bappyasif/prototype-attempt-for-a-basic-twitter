import { collection, getFirestore } from '@firebase/firestore';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import FirebaseApp from './firebase-configs';

function ComponentsContainer() {
    let [countForTweetContainer, setCountForTweetContainer] = useState(0)
    let [changeLayout, setChangeLayout] = useState(false);

    let handleCount = () => setCountForTweetContainer(countForTweetContainer + 1);

    let db = getFirestore(FirebaseApp);

    function accessDatabase() {
        let dbCollection = collection(db, 'example');
        console.log(dbCollection);
    }

    accessDatabase();

    // example signup
    let auth = getAuth()
    
    createUserWithEmailAndPassword(auth, 'test@test.com', 'test11').then(res=>console.log(res)).catch(err=> {
        let errorCode = err.code;
        let errorMsg = err.message;
        console.log(errorCode, errorMsg)
    })
    

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            <AllRoutes count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />
            {/* <AllRoutes /> */}
        </div>
    )
}

export default ComponentsContainer