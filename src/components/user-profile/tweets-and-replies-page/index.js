import React from 'react'
import AllTweetsPage from '../all-tweets'

function TweetsAndRepliesPage({tweetData, removeSpeceficArrayItem, updateTweetPrivacy, handleAnalysingTweetID, currentUser, handleThreadedTweetData, hideFirstPollReply}) {
    return (
        <div className='all-tweets-and-replies'>
            <AllTweetsPage currentUser={currentUser} tweetData={tweetData} hideFirstPollReply={hideFirstPollReply} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleThreadedTweetData={handleThreadedTweetData} />
        </div>
    )
}

export default TweetsAndRepliesPage
