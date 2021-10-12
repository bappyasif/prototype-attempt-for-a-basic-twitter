import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import ContainerForSignupPage from './signup-page/containerForLoginPage'

function ComponentsContainer () {
    let [countForTweetContainer, setCountForTweetContainer] = useState(0)
    let [changeLayout, setChangeLayout] = useState(false);

    let handleCount = () => setCountForTweetContainer(countForTweetContainer+1);

        return (
            <div id='components-container' style={{display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : ''}}>
                <AllRoutes count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />
                {/* <AllRoutes /> */}
            </div>
        )
}

export default ComponentsContainer