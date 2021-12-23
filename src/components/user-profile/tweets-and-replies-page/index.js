import React from 'react'
import AllTweetsPage from '../all-tweets'

function TweetsAndRepliesPage({tweetData, removeSpeceficArrayItem, updateTweetPrivacy, handleAnalysingTweetID, currentUser}) {
    return (
        <div className='all-tweets-and-replies'>
            <AllTweetsPage currentUser={currentUser} tweetData={tweetData} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} />
        </div>
    )
}

export default TweetsAndRepliesPage
