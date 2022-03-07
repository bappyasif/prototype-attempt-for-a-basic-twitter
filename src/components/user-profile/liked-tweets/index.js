import React from 'react'
import { RenderTweetDataComponent, sanitizeDatasetForRendering } from '../all-tweets'

function LikedTweets({likedTweets, currentUser, handleLikedTweets, removeFromLikedTweets, handleThreadedTweetData, handlePinnedTweetID, removeSpeceficArrayItem, updateTweetPrivacy, handleAnalysingTweetID, currentUserProfileInfo, handleQuoteTweetID, handleQuotedFromRetweetModal }) {
    // console.log(likedTweets, 'likedTweets!!')
    let renderTweets = () => likedTweets && likedTweets.map(item => <RenderTweetDataComponent key={item.id} content={sanitizeDatasetForRendering(item)} currentUser={currentUser} handleLikedTweets={handleLikedTweets} removeFromLikedTweets={removeFromLikedTweets} handleThreadedTweetData={handleThreadedTweetData} handlePinnedTweetID={handlePinnedTweetID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} currentUserProfileInfo={currentUserProfileInfo} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} />)
  return (
    <div id='all-liked-tweets-container' style={{width: '735px', marginLeft: '-85px'}}>
        { likedTweets.length ? renderTweets() : 'No Liked Tweets Yet!! like some to see some here!!'}
    </div>
  )
}

export default LikedTweets