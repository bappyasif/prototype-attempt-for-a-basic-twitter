import React from 'react'
import AllTweetsPage from '../all-tweets';

function AllMedias({ tweetData }) {
    // let mediaTweets = [...tweetData].filter(elem => elem.tweetMedia || elem.tweetGif)
    let mediaTweets = [...tweetData].filter((elem) => (elem['medias'].picture || elem['medias'].gif))
    return (
        <AllTweetsPage onlyMedias={mediaTweets} />
    )
}

export default AllMedias
