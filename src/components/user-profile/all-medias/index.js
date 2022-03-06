import React from 'react'
import AllTweetsPage from '../all-tweets';

function AllMedias({ tweetData, handlePinnedTweetID, removeSpeceficArrayItem, updateTweetPrivacy, handleAnalysingTweetID, currentUser, handleThreadedTweetData }) {
    // let mediaTweets = [...tweetData].filter(elem => elem.tweetMedia || elem.tweetGif)
    let mediaTweets = [...tweetData].filter((elem) => (elem['medias'].picture || elem['medias'].gif))
    return (
        <AllTweetsPage onlyMedias={mediaTweets} currentUser={currentUser} handlePinnedTweetID={handlePinnedTweetID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleThreadedTweetData={handleThreadedTweetData} />
    )
}

export default AllMedias
