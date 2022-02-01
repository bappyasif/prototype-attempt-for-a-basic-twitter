import React from 'react'
import CurrentTrends from './current-trends'
import MediaGallery from './media-gallery'
import SearchTwitter from './search-twitter'
import TopNewsRelaysUI from './current-trends/top-news-relays-ui'

function RightSideNavigationPanel({tweetData, opacity}) {
    // console.log(tweetData, '<><>')
    return (
        <div id='right-navigation-panel-container' style={{opacity: opacity ? '.2' : 1}}>
            <SearchTwitter />
            <MediaGallery tweetData={tweetData} />
            {/* <TopNewsRelaysUI /> */}
            <CurrentTrends />
        </div>
    )
}

export default RightSideNavigationPanel
