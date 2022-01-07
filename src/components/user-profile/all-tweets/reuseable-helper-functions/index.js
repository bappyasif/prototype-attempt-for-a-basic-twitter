import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'
import React, { useEffect, useState } from 'react'


export let RenderPolls = ({ poll, handlePollVotesCount, pollVotesCount }) => {
    let [maxVotes, setMaxVotes] = useState(100)
    // let [maxVotes, setMaxVotes] = useState(104)
    // let [votesCount, setVotesCount] = useState({})

    // let handleVotesCount = (elem, value) => {
    //     setVotesCount({...votesCount, [elem]: value})
    //     // setVotesCount(prevData => prevData[elem] ? value : 1)
    //     // setVotesCount(prevData => prevData.map(item => ({...item, [elem]: value})))
    // }

    console.log(pollVotesCount, 'pollVotes')

    let handleChange = () => setMaxVotes(maxVotes - 1 >= 0 ? maxVotes - 1 : maxVotes)
    // let handleChange;

    useEffect(() => {
        // handleChange = () => setMaxVotes(maxVotes-1 >= 0 ? maxVotes-1 : maxVotes)
        maxVotes == 0 && alert('votes limit has reached!!')
    }, [maxVotes])

    // maxVotes <= 0 && alert('votes limit has reached!!')

    return poll.map(choice => {
        return Object.values(choice).map((value, idx) => value ? <HandlePollOptionProgress key={value} value={value} handleChange={handleChange} highestValue={maxVotes} handlePollVotesCount={handlePollVotesCount} pollVotesCount={pollVotesCount} /> : null)
    })
}

let HandlePollOptionProgress = ({ value, handleChange, highestValue, handlePollVotesCount, pollVotesCount }) => {
    let [votes, setvotes] = useState(0)

    let handleVotes = () => {
        handleChange();
        handlePollVotesCount(value, votes)
        setvotes((highestValue > 0) ? votes + 1 : votes)
    }

    useEffect(() => pollVotesCount && setvotes(pollVotesCount[value]), [])

    return (
        <div key={value} className='poll-info'>

            <div className='left-view' onClick={handleVotes}>

                <div className='poll-progress'>

                    <div className='progress-initial'></div>

                    <div className='progress-bar' style={{ width: `${votes}%`, borderTopLeftRadius: votes && '0px', borderBottomLeftRadius: votes && '0px' }}></div>
                </div>

                <p>{value}</p>
            </div>

            <span className='poll-percentage'>{(votes * 100) / 100}%</span>
        </div>
    )
}

export let MakeGifObjectAvailable = ({ gifId }) => {
    let [gif, setGif] = useState(null)

    gifId && getGiphyGifObject(gifId).then(res => {
        setGif(res)
    }).catch(err => console.log(err.message))

    return gif && <Gif gif={gif} height='290px' className='style-gif-border-radius' />
}

export let getGiphyGifObject = async (gifId) => {
    try {
        let { data } = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
        // console.log('checkoiint06', gifId)
        return data
    } catch (err) {
        console.log(err)
    }
}