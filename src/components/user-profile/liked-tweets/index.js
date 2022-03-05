import React from 'react'
import { RenderTweetDataComponent, sanitizeDatasetForRendering } from '../all-tweets'

function LikedTweets({likedTweets, currentUser, handleLikedTweets, removeFromLikedTweets, handleThreadedTweetData}) {
    console.log(likedTweets, 'likedTweets!!')
    let renderTweets = () => likedTweets && likedTweets.map(item => <RenderTweetDataComponent key={item.id} content={sanitizeDatasetForRendering(item)} currentUser={currentUser} handleLikedTweets={handleLikedTweets} removeFromLikedTweets={removeFromLikedTweets} handleThreadedTweetData={handleThreadedTweetData} />)
  return (
    <div id='all-liked-tweets-container' style={{width: '735px', marginLeft: '-85px'}}>
        {renderTweets()}
    </div>
  )
}

export default LikedTweets