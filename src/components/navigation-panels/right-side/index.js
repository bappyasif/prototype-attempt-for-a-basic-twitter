import React from 'react'
import MediaGallery from './media-gallery'
import SearchTwitter from './search-twitter'

function RightSideNavigationPanel({tweetData, opacity}) {
    return (
        <div id='right-navigation-panel-container' style={{opacity: opacity ? '.2' : 1}}>
            <SearchTwitter />
            <MediaGallery tweetData={tweetData} />
        </div>
    )
}

export default RightSideNavigationPanel
