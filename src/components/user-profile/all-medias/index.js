import React from 'react'
import AllTweetsPage from '../all-tweets';

function AllMedias({ tweetData, handlePinnedTweetID, removeSpeceficArrayItem, updateTweetPrivacy, handleAnalysingTweetID, currentUser, handleThreadedTweetData, currentUserProfileInfo, handleLikedTweets, handleQuoteTweetID, handleQuotedFromRetweetModal, removeFromLikedTweets }) {
    // let mediaTweets = [...tweetData].filter(elem => elem.tweetMedia || elem.tweetGif)
    let mediaTweets = [...tweetData].filter((elem) => (elem['medias'].picture || elem['medias'].gif))
    return (
        <AllTweetsPage onlyMedias={mediaTweets} currentUser={currentUser} handlePinnedTweetID={handlePinnedTweetID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} handleLikedTweets={handleLikedTweets} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} removeFromLikedTweets={removeFromLikedTweets} />
    )
}

export default AllMedias
