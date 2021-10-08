import React from 'react'
import AllTweetsPage from '../all-tweets';

function AllMedias({ tweetData }) {
    let mediaTweets = [...tweetData].filter(elem => elem.tweetMedia || elem.tweetGif)
    // console.log(mediaTweets, 'mediaTweets');
    return (
        <AllTweetsPage onlyMedias={mediaTweets} />
    )
}

export default AllMedias
