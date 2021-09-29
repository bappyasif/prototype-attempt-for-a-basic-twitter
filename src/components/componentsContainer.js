import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import ContainerForSignupPage from './signup-page/containerForLoginPage'

function ComponentsContainer ({count, handleCount}) {
    // let [tweetData, setTweetData] = useState([]);
    // let [count, setCount] = useState(0)
    // let count = 0;

    // let handleCount = () => setCount(count+1);

    // useEffect(() => handleCount, [count])

        return (
            <div id='components-container'>
                <AllRoutes count={count} handleCount={handleCount}/>
            </div>
        )
}

export default ComponentsContainer