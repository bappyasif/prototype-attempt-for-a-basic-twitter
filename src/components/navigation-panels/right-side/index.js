import React from 'react'
import MediaGallery from './media-gallery'
import SearchTwitter from './search-twitter'

function RightSideNavigationPanel({tweetData}) {
    return (
        <div id='right-navigation-panel-container'>
            <SearchTwitter />
            <MediaGallery tweetData={tweetData} />
        </div>
    )
}

export default RightSideNavigationPanel
