import React, { useEffect, useState } from 'react'
import { moreIcon, tweetAdditionalIconsArray, analyticsIcon } from '../profile-page/svg-resources';
import '../../user-profile/profile-page/index.css';
import { getPrivacySelectedElement, showGif, showImg } from '..';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import TopicsPickerInTimeline from '../topics-picker-in-timeline';
import {tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03} from '../../tweet-modal'
import { TweeetTop } from './tweet-top';
import { RenderTweetBottomIcons } from './tweet-bottom';

function AllTweetsPage({ tweetData, onlyMedias, removeSpeceficArrayItem, updateTweetPrivacy }) {
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

    // let removeArrayItemSafelyFromData = idx => {

    // }

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
                scheduledTime: item.scheduledTimeStamp,
                ID: ID
            }
        } else {
            content = { tweetText: item.tweetText, extraTweet: item.extraTweet, tweetPrivacy: item.privacy, tweetPoll: item.tweetPoll, extraPoll: item.extraPoll, scheduledTime: item.scheduledTimeStamp, ID: ID}
        }

        return <RenderTweetDataComponent content={content} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} />
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

// let RenderTweetBottomIcons = ({ elem, extraTwee, extraEen, tweetData }) => {
//     let [hoveredID, setHoveredID] = useState('')
//     let [iconClicked, setIconClicked] = useState('')

//     let findWhichIconId = evt => {
//         let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
//         return whichIcon
//     }

//     let mouseHoveredIn = evt => {
//         // console.log('in', evt.target.id, evt.target.parentNode.id)
//         let foundElement = findWhichIconId(evt)
//         // console.log(foundElement, 'which?!')
//         setHoveredID(foundElement)
//     }
//     let mouseHoveredOut = evt => {
//         // console.log('out', evt.target.id)
//         setHoveredID('')
//     }

//     let handleClicked = (evt) => {
//         // console.log(evt.target.parentNode.parentNode)
//         let iconElement = evt.target.parentNode.parentNode.id
//         setIconClicked(iconElement)
//     }

//     // iconClicked && console.log(iconClicked, '?!')

//     // let shareableData = () => {
//     //     let shareDataObject = {
//     //         title: 'sharing from web app',
//     //         url: window.location.href,
//     //         text: tweetData.tweetText
//     //     }
//     //     // let shareDataObject = navigator.share({
//     //     //     title: document.title,
//     //     //     text: 'Hello World',
//     //     //     url: 'https://developer.mozilla.org',
//     //     //   });
//     //     return shareDataObject
//     // }

//     // let checkingIfDataShareable = () => {
//     //     let isShareable = navigator.canShare && navigator.canShare(tweetData.tweetText)
//     //     // let isShareable = navigator.canShare
//     //     return isShareable
//     // }

//     // let sharingData = () => {
//     //     if(checkingIfDataShareable()) {
//     //         navigator.share(shareableData)
//     //     } else {
//     //         navigator.share(shareableData)
//     //         .then(()=>console.log('success!!'))
//     //         .catch(console.error)
//     //         // alert('data unshareable')
//     //     }

//     // }

//     let handleShare = evt => {
//         console.log(iconClicked, 'share!!', tweetData)
//         // sharingData()
//         // if(navigator.share) {
//         //     console.log('supports share')
//         //     navigator.share({text: 'yeah.what'})
//         //     .then(()=>console.log('successfull'))
//         //     .catch(err=>console.log(err.message))
//         // }
//     }

//     return (
//         <div
//             key={elem.id}

//             id={extraTwee ? elem.id + '-twee' : extraEen ? elem.id + '-een' : elem.id}

//             className='hoverable-div'

//             onMouseOver={mouseHoveredIn}
//             onMouseOut={mouseHoveredOut}
//         >
//             <span onClick={iconClicked == 'share' ? handleShare : handleClicked} style={{ fill: iconClicked == 'like' ? 'red' : iconClicked == 'retweet' && 'lightGreen' }}>{iconClicked == 'like' ? loveIcon() : elem.icon}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>
//             {/* <span onClick={handleClicked} style={{color: 'red', fill: iconClicked == 'like' && 'red'}}>{loveIcon()}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span> */}
//         </div>
//     )

// }

// let TweeetTop = ({ID, removeSpeceficArrayItem}) => {
//     let [clicked, setClicked] = useState(false)
//     let [changedWhoCanReply, setChangedWhoCanReply] = useState(false) 
//     let handleClicked = () => setClicked(!clicked)
//     // let rederDropdown = () => moreOptions.map(item => <Rend)
//     let handleWhoCanReply = () => setChangedWhoCanReply(true)
//     return (
//         <div className='tweet-top'>
//             <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg' onClick={handleClicked}>{moreIcon()}</div>
//             { clicked && !changedWhoCanReply && <RenderDropdownForTweetMoreOptions ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} /> }
//             { changedWhoCanReply && <RenderDropdownForWhoCanReply /> }
//         </div>
//     )
// }

// let RenderDropdownForWhoCanReply = () => {
//     return (
//         <div className='who-can-reply-container'>
//             <div className='header-text'>Who can reply?</div>
//             <div className='subheading-text'>Choose who can reply to this Tweet. Anyone mentioned can always reply.</div>
//             <div className='privacy-options'>
//                 {tweetPrivacySelected01()}
//                 {tweetPrivacySelected02()}
//                 {tweetPrivacySelected03()}
//             </div>
//         </div>
//     )
// }

// let RenderDropdownForTweetMoreOptions = ({ID, removeSpeceficArrayItem}) => {
//     let renderOptions = moreOptions.map(item => <RenderOptions key={item.title} item={item} ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} />)

//     return (
//         <div id='more-options-dropdown-container'>
//             {renderOptions}
//         </div>
//     )
// }

// let RenderOptions = ({item, ID, removeSpeceficArrayItem}) => {
//     let [tweetID, setTweetID] = useState('')
//     // console.log('heree!!')
//     let handleClickAction = evt => {
//         // evt.target.parentNode.id && console.log( evt.target.id || evt.target.parentNode.id)
//         // setting tweet ID with which docID needs to be deleted both from DOM and Firestore
//         (evt.target.id || evt.target.parentNode.id) && setTweetID(evt.target.id || evt.target.parentNode.id)
        
//         // removing that targetted tweet from profile
//         // removeSpeceficArrayItem(ID)

//         let test = (evt.target.querySelector('.option-title') || evt.target.parentNode.querySelector('.option-title'))
//         // console.log(test, '?!')
//         if(test.textContent == 'Change who can reply') {

//         }
//     }
//     // tweetID && console.log(tweetID)
//     // removing that targetted tweet from profile
//     useEffect(() => tweetID && removeSpeceficArrayItem(tweetID), [tweetID])

//     return (
//         <div className='option-container' id={item.title == 'Delete' ? ID : null} onClick={handleClickAction}>
//             <div className='options-svg'>{item.icon}</div>
//             <div className='option-title'>{item.title}</div>
//         </div>
//     )
// }

let RenderTweetDataComponent = ({ content, removeSpeceficArrayItem, updateTweetPrivacy }) => {
    // let [hoveredID, setHoveredID] = useState('')
    let { ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...content }

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

    let tweetBottomClickableIcons = (extraEen, extraTwee) => tweetAdditionalIconsArray.map((elem) => <RenderTweetBottomIcons key={elem.id} elem={elem} extraEen={extraEen} extraTwee={extraTwee} tweetData={content} />)

    // style={{display: scheduledTime && new Date() < new Date(scheduledTime) && 'none'}}
    let whenWithoutExtraTweet = () => <div className='rendering-tweet-data-container'>
        {/* <div className='tweet-id'>{id}</div> */}
        <div className='left-side'>
            <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
        </div>
        <div className='right-side'>
            <div className='tweet-info'>

                {/* <div className='tweet-top'>
                    <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                </div> */}
                {<TweeetTop ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} /> }

                <div className='tweet-text'>{tweetText}</div>

                {<div className='tweet-media-file-content'>{readyMedia()}</div>}

                {<RenderPolls poll={tweetPoll} />}

                {/* {getPrivacySelectedElement(tweetPrivacy, 'white')} */}
                {getPrivacySelectedElement(tweetPrivacy, 'white', tweetPrivacy == '01' ? ' ' : 'You can reply to this conversation')}

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

                        {/* <div className='tweet-top'>
                            <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                        </div> */}
                        {<TweeetTop ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} /> }

                        <div className='tweet-text'>{tweetText}</div>

                        {<div className='tweet-media-file-content'>{readyMedia()}</div>}
                        {/* {gifFile && pictureFile && <div className='tweet-media-file-content'>{readyMedia()}</div>} */}
                        {/* {<div className='tweet-media-file-content' style={{minHeight: (!gifFile && !pictureFile) && '0px'}}>{readyMedia()}</div>} */}

                        {/* deal with extra tweet */}
                        {<RenderPolls poll={tweetPoll} />}

                        {/* {getPrivacySelectedElement(tweetPrivacy, 'white')} */}
                        {getPrivacySelectedElement(tweetPrivacy, 'white', tweetPrivacy == '01' ? ' ' : 'You can reply to this conversation')}

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

// let loveIcon = () => <svg className='profile-page-svg-icons'><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>
// let deleteSvg = () => <svg className='profile-page-svg-icons'><g><path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path><path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path></g></svg>
// let pinSvg = () => <svg className='profile-page-svg-icons'><g><path d="M20.472 14.738c-.388-1.808-2.24-3.517-3.908-4.246l-.474-4.307 1.344-2.016c.258-.387.28-.88.062-1.286-.218-.406-.64-.66-1.102-.66H7.54c-.46 0-.884.254-1.1.66-.22.407-.197.9.06 1.284l1.35 2.025-.42 4.3c-1.667.732-3.515 2.44-3.896 4.222-.066.267-.043.672.222 1.01.14.178.46.474 1.06.474h3.858l2.638 6.1c.12.273.39.45.688.45s.57-.177.688-.45l2.638-6.1h3.86c.6 0 .92-.297 1.058-.474.265-.34.288-.745.228-.988zM12 20.11l-1.692-3.912h3.384L12 20.11zm-6.896-5.413c.456-1.166 1.904-2.506 3.265-2.96l.46-.153.566-5.777-1.39-2.082h7.922l-1.39 2.08.637 5.78.456.153c1.355.45 2.796 1.78 3.264 2.96H5.104z"></path></g></svg>
// let listSvg = () => <svg className='profile-page-svg-icons'><g><path d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zM18.575 22H4.25C3.01 22 2 20.99 2 19.75V5.5c0-1.24 1.01-2.25 2.25-2.25h8.947c.414 0 .75.336.75.75s-.336.75-.75.75H4.25c-.413 0-.75.336-.75.75v14.25c0 .414.337.75.75.75h14.325c.413 0 .75-.336.75-.75v-8.872c0-.414.336-.75.75-.75s.75.336.75.75v8.872c0 1.24-1.01 2.25-2.25 2.25z"></path><path d="M16.078 9.583H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.336.75.75s-.336.75-.75.75zm0 3.867H6.673c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.335.75.75s-.336.75-.75.75zm-4.703 3.866H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.702c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
// let replySvg = () => <svg className='profile-page-svg-icons'><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
// let embedSvg = () => <svg className='profile-page-svg-icons'><g><path d="M23.804 11.5l-6.496-7.25c-.278-.31-.752-.334-1.06-.06-.308.277-.334.752-.058 1.06L22.238 12l-6.047 6.75c-.275.308-.25.782.06 1.06.142.127.32.19.5.19.204 0 .41-.084.558-.25l6.496-7.25c.252-.28.258-.713 0-1zm-23.606 0l6.496-7.25c.278-.31.752-.334 1.06-.06.308.277.334.752.058 1.06L1.764 12l6.047 6.75c.277.308.25.782-.057 1.06-.143.127-.322.19-.5.19-.206 0-.41-.084-.56-.25L.197 12.5c-.252-.28-.257-.713 0-1zm9.872 12c-.045 0-.09-.004-.135-.012-.407-.073-.68-.463-.605-.87l3.863-21.5c.074-.407.466-.674.87-.606.408.073.68.463.606.87l-3.864 21.5c-.065.363-.38.618-.737.618z"></path></g></svg>
// let moreOptions = [{title: 'Delete', icon: deleteSvg()},{title: 'Pin to your profile', icon: pinSvg()}, {title: 'Add/Remove @username from Lists', icon: listSvg()}, {title: 'Change who can reply', icon: replySvg()}, {title: 'Embed tweet', icon: embedSvg()}, {title: 'Analytics', icon: analyticsIcon()}]

export default AllTweetsPage