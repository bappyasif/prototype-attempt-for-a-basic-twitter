import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'
import React, { useEffect, useState } from 'react'


export let RenderPolls = ({ poll, handlePollVotesCount, pollVotesCount, forModal }) => {
    let [maxVotes, setMaxVotes] = useState(100)

    let handleChange = () => setMaxVotes(maxVotes - 1 >= 0 ? maxVotes - 1 : maxVotes)

    useEffect(() => {
        maxVotes == 0 && alert('votes limit has reached!!')
    }, [maxVotes])

    return poll.map(choice => {
        return Object.values(choice).map((value, idx) => value ? <HandlePollOptionProgress key={value} value={value} handleChange={handleChange} highestValue={maxVotes} handlePollVotesCount={handlePollVotesCount} pollVotesCount={pollVotesCount} forModal={forModal} /> : null)
    })
}

let HandlePollOptionProgress = ({ value, handleChange, highestValue, handlePollVotesCount, pollVotesCount, forModal }) => {
    let [votes, setvotes] = useState(0)

    let handleVotes = () => {
        handleChange();
        handlePollVotesCount(value, votes)
        setvotes((highestValue > 0) ? votes + 1 : votes)
    }

    useEffect(() => pollVotesCount && setvotes(pollVotesCount[value]), [])

    return (
        <div key={value} className='poll-info'>

            <div className='left-view' onClick={!forModal && handleVotes}>

                <div className='poll-progress'>

                    <div className='progress-initial'></div>

                    <div className='progress-bar' style={{ width: `${forModal ? votes + 4 : votes}${forModal ? 'px' : '%'}`, borderTopLeftRadius: votes && '0px', borderBottomLeftRadius: votes && '0px' }}></div>
                </div>

                <p>{value}</p>
            </div>

            <span className='poll-percentage'>{votes ? ((votes * 100) / 100) : 0}{`${forModal ? ' vote' : '%'}`}</span>
        </div>
    )
}

export let MakeGifObjectAvailable = ({ gifId, quotedFromRetweetModal }) => {
    let [gif, setGif] = useState(null)

    gifId && getGiphyGifObject(gifId).then(res => {
        setGif(res)
    }).catch(err => console.log(err.message))

    return gif && <Gif gif={gif} height='290px' className='style-gif-border-radius' />
}

export let getGiphyGifObject = async (gifId) => {
    try {
        let { data } = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
        return data
    } catch (err) {
        console.log(err)
    }
}

export let RenderUserTweetText = ({tweetText, quotedFromRetweetModal}) => {
    return (
        <div id={quotedFromRetweetModal ? 'analysing-tweet-text-wrapper-from-retweet' : 'analysing-tweet-text-wrapper'} style={{marginBottom: '11px'}}>
            {tweetText || 'user Tweet'}
        </div>
    )
}