import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import ContainerForSignupPage from './signup-page/containerForLoginPage'

function ComponentsContainer () {
    // let [tweetData, setTweetData] = useState([]);
    let [countForTweetContainer, setCountForTweetContainer] = useState(0)
    // let count = 0;

    let handleCount = () => setCountForTweetContainer(countForTweetContainer+1);

    // useEffect(() => handleCount, [count])

        return (
            <div id='components-container' style={{display: 'flex', justifyContent: 'space-around'}}>
                <AllRoutes count={countForTweetContainer} handleCount={handleCount}/>
                {/* <AllRoutes /> */}
            </div>
        )
}

export default ComponentsContainer