import React, { useState } from 'react'
import CurrentTrends from './current-trends'
import MediaGallery from './media-gallery'
import SearchTwitter from './search-twitter'
import TopNewsRelaysUI from './current-trends/top-news-relays-ui'
import FollowSuggestedPeopleComponent from './follow-suggested-people-component'
import RelevantPeopleViewForTweetThread from './relevant-people-view-for-tweet-thread'


function RightSideNavigationPanel({ tweetData, opacity, listOfRandomUsers, handleExplicitTrendSearchText, threadedTweetData, currentUserProfileInfo }) {
    // console.log(tweetData, '<><>')
    let [contentCreators, setContentCreators] = useState([])

    let handleContentCreators = name => setContentCreators(prevData => prevData.concat(name))

    // console.log(contentCreators, '<><>', listOfRandomUsers)

    return (
        <div id='right-navigation-panel-container' style={{ opacity: opacity ? '.2' : 1 }}>
            <div id='native-panels'>
                <SearchTwitter />
                {!threadedTweetData && <MediaGallery tweetData={tweetData} />}
                {/* <MediaGallery tweetData={tweetData} /> */}
            </div>
            <div id='programmable-panels' style={{top: threadedTweetData && '44px'}}>
                {/* <TopNewsRelaysUI /> */}
                {threadedTweetData && <RelevantPeopleViewForTweetThread currentUserProfileInfo={currentUserProfileInfo} />}
                <CurrentTrends handleContentCreators={handleContentCreators} handleExplicitTrendSearchText={handleExplicitTrendSearchText} />
                {/* <FollowSuggestedPeopleList contentCreators={contentCreators} /> */}
                {/* <FollowSuggestedPeopleComponent listOfRandomUsers={listOfRandomUsers} /> */}
                {!threadedTweetData && <FollowSuggestedPeopleComponent listOfRandomUsers={listOfRandomUsers} />}
            </div>
        </div>
    )
}

export default RightSideNavigationPanel
