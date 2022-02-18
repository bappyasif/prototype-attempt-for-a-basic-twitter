import React, { useState } from 'react'
import CurrentTrends from './current-trends'
import MediaGallery from './media-gallery'
import SearchTwitter from './search-twitter'
import TopNewsRelaysUI from './current-trends/top-news-relays-ui'
import FollowSuggestedPeopleComponent from './follow-suggested-people-component'


function RightSideNavigationPanel({ tweetData, opacity }) {
    // console.log(tweetData, '<><>')
    let [contentCreators, setContentCreators] = useState([])

    let handleContentCreators = name => setContentCreators(prevData => prevData.concat(name))

    // console.log(contentCreators, '<><>')

    return (
        <div id='right-navigation-panel-container' style={{ opacity: opacity ? '.2' : 1 }}>
            <div id='native-panels'>
                <SearchTwitter />
                <MediaGallery tweetData={tweetData} />
            </div>
            <div id='programmable-panels'>
                {/* <TopNewsRelaysUI /> */}
                <CurrentTrends handleContentCreators={handleContentCreators} />
                {/* <FollowSuggestedPeopleList contentCreators={contentCreators} /> */}
                <FollowSuggestedPeopleComponent contentCreators={contentCreators} />
            </div>
        </div>
    )
}

export default RightSideNavigationPanel
