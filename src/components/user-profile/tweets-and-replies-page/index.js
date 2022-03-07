import React from 'react'
import AllTweetsPage from '../all-tweets'

function TweetsAndRepliesPage({tweetData, handlePinnedTweetID, removeSpeceficArrayItem, updateTweetPrivacy, handleAnalysingTweetID, currentUser, handleThreadedTweetData, hideFirstPollReply, currentUserProfileInfo, handleLikedTweets, handleQuoteTweetID, handleQuotedFromRetweetModal, removeFromLikedTweets}) {
    return (
        <div className='all-tweets-and-replies'>
            <AllTweetsPage currentUser={currentUser} tweetData={tweetData} handlePinnedTweetID={handlePinnedTweetID} hideFirstPollReply={hideFirstPollReply} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} handleLikedTweets={handleLikedTweets} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} removeFromLikedTweets={removeFromLikedTweets} />
        </div>
    )
}

export default TweetsAndRepliesPage
