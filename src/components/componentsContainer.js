import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import ContainerForSignupPage from './signup-page/containerForLoginPage'

function ComponentsContainer () {
    // let [tweetData, setTweetData] = useState([]);
    let [countForTweetContainer, setCountForTweetContainer] = useState(0)
    // let count = 0;
    let [changeLayout, setChangeLayout] = useState(false);

    let handleCount = () => setCountForTweetContainer(countForTweetContainer+1);

    // useEffect(() => handleCount, [count])

    // useEffect(() => {
    //     let midContents = document.querySelector('#profile-page-upperview-container');
    //     if(midContents) {
    //         setChangeLayout(true)
    //     } 
    //     // else {
    //     //     setChangeLayout(false)
    //     // }
    // }, [!changeLayout])

        return (
            <div id='components-container' style={{display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : ''}}>
                <AllRoutes count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />
                {/* <AllRoutes /> */}
            </div>
        )
}

export default ComponentsContainer