import React from 'react'
import AllTweetsPage from '../all-tweets'

function TweetsAndRepliesPage({tweetData}) {
    return (
        <div className='all-tweets-and-replies'>
            <AllTweetsPage tweetData={tweetData} />
        </div>
    )
}

export default TweetsAndRepliesPage
