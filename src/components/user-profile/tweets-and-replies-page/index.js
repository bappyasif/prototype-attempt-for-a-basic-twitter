import React from 'react'
import AllTweetsPage from '../all-tweets'

function TweetsAndRepliesPage({tweetData, removeSpeceficArrayItem}) {
    return (
        <div className='all-tweets-and-replies'>
            <AllTweetsPage tweetData={tweetData} removeSpeceficArrayItem={removeSpeceficArrayItem} />
        </div>
    )
}

export default TweetsAndRepliesPage
