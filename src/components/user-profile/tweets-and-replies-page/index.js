import React from 'react'
import AllTweetsPage from '../all-tweets'

function TweetsAndRepliesPage({tweetData}) {
    // console.log(tweetData, 'heeereee!!')
    // console.log('heeereee!!')
    return (
        <div className='all-tweets-and-replies'>
            {/* <h2>here!!</h2> */}
            {/* got to see if and how all tweets and tweetss and replies are different or not to make them more dintinguishable */}
            <AllTweetsPage tweetData={tweetData} />
        </div>
    )
}

export default TweetsAndRepliesPage
