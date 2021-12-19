import React, { useEffect, useState } from 'react'
import { moreIcon, tweetAdditionalIconsArray } from '../profile-page/svg-resources';
import '../../user-profile/profile-page/index.css';
import { getPrivacySelectedElement, showGif, showImg } from '..';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import TopicsPickerInTimeline from '../topics-picker-in-timeline';

function AllTweetsPage({ tweetData, onlyMedias }) {
    let [show, setShow] = useState(false)
    let [noMoreTweets, setNoMoreTweets] = useState(false)
    let [totalTweets, setTotalTweets] = useState()
    let [currentTweetsIndex, setCurrentTweetsIndex] = useState()

    let handleNoMoreTweets = () => setNoMoreTweets(true)

    let handleShowMoreTweets = () => {
        setCurrentTweetsIndex(currentTweetsIndex + 11 <= totalTweets ? currentTweetsIndex + 11 : totalTweets)
    }

    useEffect(() => currentTweetsIndex >= totalTweets && handleNoMoreTweets(), [currentTweetsIndex])

    useEffect(() => {
        onlyMedias && setTotalTweets(onlyMedias.length)
        onlyMedias && setCurrentTweetsIndex(6)
    }, [onlyMedias])

    useEffect(() => {
        tweetData && setTotalTweets(tweetData.length)
        tweetData && setCurrentTweetsIndex(11)
    }, [tweetData])

    // console.log(totalTweets, '<<>>', currentTweetsIndex)

    let renderTweet = (item) => {
        // item.extraTweet && console.log(item.id, 'checkpoint 01', item.extraGif)
        let ID = item.id
        let content

        // item.privacy && console.log(item.privacy, 'found privacy!!')

        // console.log(item.extraPoll)

        if (item.medias.gif || item.medias.picture || item.medias.extraPicture || item.medias.extraGif) {
            content = {
                tweetText: item.tweetText,
                extraTweet: item.extraTweet,
                gifFile: item.medias.gif,
                extraGifFile: item.medias.extraGif,
                pictureFile: item.medias.picture,
                extraPictureFile: item.medias.extraPicture,
                tweetPrivacy: item.privacy,
                firstTweetHasMedia: item.firstTweetHasMedia,
                secondTweetHasMedia: item.secondTweetHasMedia,
                tweetPoll: item.tweetPoll,
                extraPoll: item.extraPoll,
                scheduledTime: item.scheduledTimeStamp
            }
        } else {
            content = { tweetText: item.tweetText, extraTweet: item.extraTweet, tweetPrivacy: item.privacy, tweetPoll: item.tweetPoll, extraPoll: item.extraPoll, scheduledTime: item.scheduledTimeStamp }
        }

        return <RenderTweetDataComponent content={content} />
    }

    let runThis = time => {
        setTimeout(() => {
            // time = time - 1000;
            // if(time <= 1000) {
            //     clearTimeout(tick)
            //     setShow(true)
            // }
            setShow(true)
            // console.log('running..', time)
        }, time)

        // if(time <= 1000) {
        //     clearTimeout(tick)
        //     setShow(true)
        // }
    }

    // let convertTimeFrom12To24HrsFormat = timestamp => {
    //     let [day, month, date, year, time, zone] = timestamp.split(' ')
    //     let [hour, min, sec] = time.split(':')
    //     console.log(day, month, year, hour, min, sec, time)
    // }

    let displayRule = item => {
        let mode = ''
        if (item.scheduledTimeStamp) {
            // console.log(new Date(item.scheduledTimeStamp).getTime(), new Date().getTime(), new Date(item.scheduledTimeStamp).getTime() - new Date().getTime())
            // convertTimeFrom12To24HrsFormat(item.scheduledTimeStamp)

            if (new Date() < new Date(item.scheduledTimeStamp)) {
                mode = 'none'
                if ((new Date(item.scheduledTimeStamp).getTime() - new Date().getTime()) <= 120000) {
                    // console.log('if block')
                    runThis(new Date(item.scheduledTimeStamp).getTime() - new Date().getTime())
                }
            } else {
                mode = 'block'
            }
        } else if (item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) {
            mode = 'block'
        } else {
            mode = 'none'
        }
        return mode;
    }

    let renderingData = tweetData && tweetData.map((item, idx) =>
    (idx < currentTweetsIndex && <div key={item.id} id='tweet-container' style={{ display: show || displayRule(item) }}>

        {/* {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null} */}
        {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null}

        {/* <div id='show-connecting-line' style={{ visibility: item.extraTweet && item.tweetText ? 'visible' : 'hidden' }}></div> */}

        {/* {item.extraTweet ? whenExtraTweetExists(item) : ''} */}
        {/* <div id='show-more-tweets'>Show more</div> */}

    </div>))
    // (<div key={item.id} id='tweet-container' style={{ display: ((item.scheduledTimeStamp && new Date() > new Date(item.scheduledTimeStamp)) || item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText ) ? 'block' : 'none' }}>
    //     {console.log((item.scheduledTimeStamp && new Date() < new Date(item.scheduledTimeStamp)), 'check', (item.scheduledTimeStamp && new Date() > new Date(item.scheduledTimeStamp)))}
    //     {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null}

    //     {/* <div id='show-connecting-line' style={{ visibility: item.extraTweet && item.tweetText ? 'visible' : 'hidden' }}></div> */}

    //     {/* {item.extraTweet ? whenExtraTweetExists(item) : ''} */}

    // </div>))

    let renderMediaTweetsOnly = onlyMedias && onlyMedias.map((item, idx) => {

        return idx < currentTweetsIndex && <div key={item.id} id='tweet-container' style={{ display: item ? 'block' : 'none' }}>

            {/* {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null} */}
            {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null}

        </div>
    })

    return (
        <div id='all-tweets-container'>
            {onlyMedias ? renderMediaTweetsOnly : renderingData.length ? renderingData : ''}
            <div id='show-more-tweets' style={{ display: noMoreTweets && 'none' }} onClick={handleShowMoreTweets}>Show more</div>
            <TopicsPickerInTimeline />
        </div>
    )
}

let RenderTweetBottomIcons = ({elem, extraTwee, extraEen}) => {
    let [hoveredID, setHoveredID] = useState('')
    let [iconClicked, setIconClicked] = useState('')

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
        return whichIcon
    }

    let mouseHoveredIn = evt => {
        // console.log('in', evt.target.id, evt.target.parentNode.id)
        let foundElement = findWhichIconId(evt)
        // console.log(foundElement, 'which?!')
        setHoveredID(foundElement)
    }
    let mouseHoveredOut = evt => {
        // console.log('out', evt.target.id)
        setHoveredID('')
    }

    let handleClicked = (evt) => {
        // console.log(evt.target.parentNode.parentNode)
        let iconElement = evt.target.parentNode.parentNode.id
        setIconClicked(iconElement)
    }

    // iconClicked && console.log(iconClicked, '?!')

    return (
        <div
            key={elem.id}

            id={extraTwee ? elem.id + '-twee' : extraEen ? elem.id + '-een' : elem.id}

            className='hoverable-div'

            onMouseOver={mouseHoveredIn}
            onMouseOut={mouseHoveredOut}
        >
            <span onClick={handleClicked} style={{fill: iconClicked == 'like' && 'red'}}>{iconClicked == 'like' ? loveIcon() : elem.icon}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>
            {/* <span onClick={handleClicked} style={{color: 'red', fill: iconClicked == 'like' && 'red'}}>{loveIcon()}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span> */}
        </div>
    )

}

let RenderTweetDataComponent = ({ content }) => {
    // let [hoveredID, setHoveredID] = useState('')
    let { scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...content }

    // extraGifFile && console.log(extraGifFile, '||here||')
    // extraPictureFile && console.log(extraPictureFile, '||here||')
    // scheduledTime && console.log(scheduledTime, new Date() < new Date(scheduledTime), new Date())

    // scheduledTime && new Date() < new Date(scheduledTime) && ''

    let readyMedia = (extra) => (gifFile || extraGifFile) ? <MakeGifObjectAvailable gifId={extra != 'extra' ? gifFile : extraGifFile} /> : (pictureFile || extraPictureFile) ? showImg(extra != 'extra' ? pictureFile : extraPictureFile) : ''

    // let findWhichIconId = evt => {
    //     let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
    //     return whichIcon
    // }

    // let mouseHoveredIn = evt => {
    //     // console.log('in', evt.target.id, evt.target.parentNode.id)
    //     let foundElement = findWhichIconId(evt)
    //     // console.log(foundElement, 'which?!')
    //     setHoveredID(foundElement)
    // }
    // let mouseHoveredOut = evt => {
    //     // console.log('out', evt.target.id)
    //     setHoveredID('')
    // }

    // let tweetBottomClickableIcons = (extraEen, extraTwee) => tweetAdditionalIconsArray.map((elem) =>
    //     <div
    //         key={elem.id}

    //         id={extraTwee ? elem.id + '-twee' : extraEen ? elem.id + '-een' : elem.id}

    //         className='hoverable-div'

    //         onMouseOver={mouseHoveredIn}
    //         onMouseOut={mouseHoveredOut}
    //     >
    //         <span>{elem.icon}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>
    //     </div>)

    let tweetBottomClickableIcons = (extraEen, extraTwee) => tweetAdditionalIconsArray.map((elem) => <RenderTweetBottomIcons key={elem.id} elem={elem} extraEen={extraEen} extraTwee={extraTwee} />)

    // style={{display: scheduledTime && new Date() < new Date(scheduledTime) && 'none'}}
    let whenWithoutExtraTweet = () => <div className='rendering-tweet-data-container'>
        {/* <div className='tweet-id'>{id}</div> */}
        <div className='left-side'>
            <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
        </div>
        <div className='right-side'>
            <div className='tweet-info'>

                <div className='tweet-top'>
                    <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                </div>

                <div className='tweet-text'>{tweetText}</div>

                {<div className='tweet-media-file-content'>{readyMedia()}</div>}

                {<RenderPolls poll={tweetPoll} />}

                {getPrivacySelectedElement(tweetPrivacy, 'white')}

                <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons()}</div>
            </div>
        </div>
    </div>

    let whenWithExtraTweet = () => {
        return <div className='rendering-tweet-data-container'>
            {/* <div className='tweet-id'>{id}</div> */}

            <div className='when-has-extra-tweet'>

                <div className='tweet-extra-info-een'>
                    <div className='left-side'>
                        <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
                    </div>

                    <div className='right-side'>

                        <div className='tweet-top'>
                            <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                        </div>

                        <div className='tweet-text'>{tweetText}</div>

                        {<div className='tweet-media-file-content'>{readyMedia()}</div>}
                        {/* {gifFile && pictureFile && <div className='tweet-media-file-content'>{readyMedia()}</div>} */}
                        {/* {<div className='tweet-media-file-content' style={{minHeight: (!gifFile && !pictureFile) && '0px'}}>{readyMedia()}</div>} */}

                        {/* deal with extra tweet */}
                        {<RenderPolls poll={tweetPoll} />}

                        {getPrivacySelectedElement(tweetPrivacy, 'white')}

                        <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons('-een')}</div>
                    </div>
                    {/* <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons}</div> */}
                </div>

                {((pictureFile && extraPictureFile) || (gifFile && extraGifFile) || (((pictureFile || gifFile) && extraTweet))) && <div id='show-connecting-line' className='extended-line-in-tweet' style={{ height: '407.9px', transform: 'translate(24.5px, -406.5px)' }}></div>}

                {((pictureFile || extraPictureFile) || (gifFile || extraGifFile) || (!pictureFile && !extraPictureFile) || (!gifFile && !extraGifFile)) && <div id='show-connecting-line' className='extended-line-in-tweet' style={{ height: '106.9px', transform: 'translate(24.5px, -104.5px)' }}></div>}

                {(!firstTweetHasMedia && !secondTweetHasMedia) && ((extraPoll && extraPoll[0].choice01) && (tweetPoll && tweetPoll[0].choice01)) && <div id='show-connecting-line' className='extended-line-in-tweet' style={{ height: '184.9px', transform: 'translate(25px, -184.5px)' }}></div>}
                {(!firstTweetHasMedia && !secondTweetHasMedia) && (!(extraPoll && extraPoll[0].choice01) && (tweetPoll && tweetPoll[0].choice01)) && <div id='show-connecting-line' className='extended-line-in-tweet' style={{ height: '184.9px', transform: 'translate(25px, -184.5px)' }}></div>}
                {(extraPoll && extraPoll[0].choice01 || tweetPoll.choice01) && console.log(extraPoll, '??', tweetPoll, tweetPoll[0].choice01)}

                <div className='tweet-extra-info-twee'>

                    <div className='left-side'>
                        <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
                    </div>

                    <div className='right-side'>

                        <div className='tweet-top'>
                            <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                        </div>

                        <div className='extra-tweet-text'>{extraTweet}</div>

                        {/* deal with extra media */}
                        {<div className='tweet-media-file-content'>{readyMedia('extra')}</div>}
                        {/* {(extraGifFile || extraPictureFile) && <div className='tweet-media-file-content'>{readyMedia()}</div>} */}
                        {/* {<div className='tweet-media-file-content' style={{maxHeight: (!extraGifFile || !extraPictureFile) && '0px'}}>{readyMedia()}</div>} */}

                        {/* deal with extra poll */}
                        {extraPoll && <RenderPolls poll={extraPoll && extraPoll} />}

                        {getPrivacySelectedElement(tweetPrivacy, 'white')}

                        <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons(null, '-twee')}</div>

                    </div>
                </div>
            </div>
        </div>
    }

    return (
        extraTweet
            ?
            whenWithExtraTweet()
            :
            whenWithoutExtraTweet()
    )
}

let RenderPolls = ({ poll }) => {
    let [maxVotes, setMaxVotes] = useState(100)
    // let [maxVotes, setMaxVotes] = useState(104)

    let handleChange = () => setMaxVotes(maxVotes - 1 >= 0 ? maxVotes - 1 : maxVotes)
    // let handleChange;

    useEffect(() => {
        // handleChange = () => setMaxVotes(maxVotes-1 >= 0 ? maxVotes-1 : maxVotes)
        maxVotes == 0 && alert('votes limit has reached!!')
    }, [maxVotes])

    // maxVotes <= 0 && alert('votes limit has reached!!')

    return poll.map(choice => {
        // return Object.values(choice).map((value, idx) => value ? <div key={value} className='poll-info'><div className='left-view' onClick={handleVotes} id={idx}><span className='poll-progress' style={{ minwidth: `${(votes * 100) / 100}%` }}>[]</span><p>{value}</p></div><span className='poll-percentage'>{(votes * 100) / 100}%</span></div> : null)
        // return Object.values(choice).map((value, idx) => value ? <HandlePollOptionProgress key={value} value={value} /> : null)
        return Object.values(choice).map((value, idx) => value ? <HandlePollOptionProgress key={value} value={value} handleChange={handleChange} highestValue={maxVotes} /> : null)
    })
}

let HandlePollOptionProgress = ({ value, handleChange, highestValue }) => {
    // let [votes, setvotes] = useState(4)
    let [votes, setvotes] = useState(0)
    // let [initialWidth, setInitialWidth] = useState(0)

    let handleVotes = () => {
        handleChange();
        // console.log(highestValue, 'value check', votes + 1 <= (highestValue || 104), votes + 1)
        // setvotes( (highestValue + votes) <= 100 ? votes + 1 : votes)
        setvotes((highestValue > 0) ? votes + 1 : votes)
    }

    // useEffect(() => setInitialWidth(4), [])

    return (
        <div key={value} className='poll-info'>

            <div className='left-view' onClick={handleVotes}>

                <div className='poll-progress'>

                    <div className='progress-initial'></div>

                    <div className='progress-bar' style={{ width: `${votes}%`, borderTopLeftRadius: votes && '0px', borderBottomLeftRadius: votes && '0px' }}></div>
                    {/* <div className='progress-bar' style={{ width: `${votes + 8}%` }}></div> */}
                </div>

                <p>{value}</p>
            </div>

            <span className='poll-percentage'>{(votes * 100) / 100}%</span>
        </div>
    )
}

let MakeGifObjectAvailable = ({ gifId }) => {
    let [gif, setGif] = useState(null)

    // gif && console.log(gifId, 'gif ID ??', gif.id)

    gifId && getGiphyGifObject(gifId).then(res => {
        setGif(res)
        // console.log('checkpoint04', gifId)
    }).catch(err => console.log(err.message))

    // gif && console.log('chekpoint05', gifId)

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

let loveIcon = () => <svg className='profile-page-svg-icons'><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>

export default AllTweetsPage