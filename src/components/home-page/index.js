import React, { useEffect, useState } from 'react'
import LeftSideNavigationPanel from './navigation-panels/left-side'
import TweetModal from './navigation-panels/left-side/tweet-modal'

function HomePage() {
    return (
        <div id='home-page-container'>
            <LeftSideNavigationPanel />
            <TweetModal />
        </div>
    )
}

export default HomePage
