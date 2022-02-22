import React, { useState } from 'react'
import CurrentTrends from './current-trends'
import MediaGallery from './media-gallery'
import SearchTwitter from './search-twitter'
import TopNewsRelaysUI from './current-trends/top-news-relays-ui'
import FollowSuggestedPeopleComponent from './follow-suggested-people-component'


function RightSideNavigationPanel({ tweetData, opacity, listOfRandomUsers, handleExplicitTrendSearchText }) {
    // console.log(tweetData, '<><>')
    let [contentCreators, setContentCreators] = useState([])

    let handleContentCreators = name => setContentCreators(prevData => prevData.concat(name))

    // console.log(contentCreators, '<><>', listOfRandomUsers)

    return (
        <div id='right-navigation-panel-container' style={{ opacity: opacity ? '.2' : 1 }}>
            <div id='native-panels'>
                <SearchTwitter />
                <MediaGallery tweetData={tweetData} />
            </div>
            <div id='programmable-panels'>
                {/* <TopNewsRelaysUI /> */}
                <CurrentTrends handleContentCreators={handleContentCreators} handleExplicitTrendSearchText={handleExplicitTrendSearchText} />
                {/* <FollowSuggestedPeopleList contentCreators={contentCreators} /> */}
                <FollowSuggestedPeopleComponent listOfRandomUsers={listOfRandomUsers} />
            </div>
        </div>
    )
}

export default RightSideNavigationPanel
