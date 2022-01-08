import React, { useEffect, useState } from 'react'
import { moreIcon, tweetAdditionalIconsArray, analyticsIcon } from '../profile-page/svg-resources';
import '../../user-profile/profile-page/index.css';
import { getPrivacySelectedElement, showGif, showImg } from '..';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import TopicsPickerInTimeline from '../topics-picker-in-timeline';
import { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../../tweet-modal'
import { TweeetTop } from './tweet-top';
import { RenderTweetBottomIcons } from './tweet-bottom';
import { getUserProfileData } from '../../firestore-methods';
import { MakeGifObjectAvailable, RenderPolls } from './reuseable-helper-functions';
import { useHistory } from 'react-router-dom';

function AllTweetsPage({ handlePollVotesCount, currentlyPinnedTweetID, showPinnedTweetTag, handlePinnedTweetID, handleReplyCount, replyCount, quoteTweetData, handleQuoteTweetID, tweetData, onlyMedias, removeSpeceficArrayItem, updateTweetPrivacy, currentUser, handleAnalysingTweetID }) {
    let [show, setShow] = useState(false)
    let [showNoMoreTweets, setShowNoMoreTweets] = useState(false)
    let [totalTweets, setTotalTweets] = useState()
    let [currentTweetsIndex, setCurrentTweetsIndex] = useState()

    let handleNoMoreTweets = () => {
        setShowNoMoreTweets(true)
        console.log('no more!!')
    }

    let handleShowMoreTweets = () => {
        setCurrentTweetsIndex(currentTweetsIndex + 11 <= totalTweets ? currentTweetsIndex + 11 : totalTweets)
    }

    // useEffect(() => (currentTweetsIndex < 11 || currentTweetsIndex == totalTweets) && handleNoMoreTweets(), [currentTweetsIndex])

    useEffect(() => totalTweets && (currentTweetsIndex == totalTweets) && handleNoMoreTweets(), [currentTweetsIndex])

    useEffect(() => (totalTweets) && totalTweets <= 11 && handleNoMoreTweets(), [totalTweets])

    console.log(currentTweetsIndex, totalTweets, showNoMoreTweets)

    useEffect(() => {
        onlyMedias && setTotalTweets(onlyMedias.length)
        onlyMedias && setCurrentTweetsIndex(6)
    }, [onlyMedias])

    useEffect(() => {
        tweetData && setTotalTweets(tweetData.length)
        tweetData && setCurrentTweetsIndex(11)
    }, [tweetData])

    let renderTweet = (item) => {
        let ID = item.id
        let content

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
                ID: ID,
                quotedTweetID: item.quoteTweetID
            }
        } else {
            content = { tweetText: item.tweetText, extraTweet: item.extraTweet, tweetPrivacy: item.privacy, tweetPoll: item.tweetPoll, extraPoll: item.extraPoll, scheduledTime: item.scheduledTimeStamp, ID: ID, quotedTweetID: item.quoteTweetID }
        }

        return <RenderTweetDataComponent content={content} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} quoteTweetData={quoteTweetData} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} handlePollVotesCount={handlePollVotesCount} />
    }

    let runThis = time => {
        setTimeout(() => {
            setShow(true)
            // console.log('running..', time)
        }, time)
    }

    let displayRule = item => {
        let mode = ''
        if (item.scheduledTimeStamp) {

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
        {( showPinnedTweetTag && (currentlyPinnedTweetID == item.id) ) && <PinnedTweetUI />}
        {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null}

    </div>))

    let renderMediaTweetsOnly = onlyMedias && onlyMedias.map((item, idx) => {

        return idx < currentTweetsIndex && <div key={item.id} id='tweet-container' style={{ display: item ? 'block' : 'none' }}>

            {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null}

        </div>
    })

    return (
        <div id='all-tweets-container'>
            {onlyMedias ? renderMediaTweetsOnly : renderingData.length ? renderingData : ''}
            <div id='show-more-tweets' style={{ display: showNoMoreTweets && 'none' }} onClick={handleShowMoreTweets}>Show more</div>
            {/* <div id='show-more-tweets' style={{ display: noMoreTweets && 'none' }} onClick={handleShowMoreTweets}>Show more</div> */}
            <TopicsPickerInTimeline />
        </div>
    )
}

let GetReplyToInformation = ({currentUser}) => {
    let [profileData, setProfileData] = useState(null)
    let handleLoading = data => setProfileData(data)
    // getUserProfileData(currentUser, handleLoading)
    useEffect(() => getUserProfileData(currentUser, handleLoading), [])
    // console.log(profileData, 'profile data!!')
    return (
        profileData
        &&
        <div className='replying-to-wrapper'><div className='replying-to-text'>{`replying to `}</div><div className='profile-handle'>@{profileData[0].content}</div></div>
    )
}

let PinnedTweetUI = () => {
    return (
        <div id='pinned-tweet-ui-wrapper'>
            <div id='svg-icon'>{pinnedTweetIcon()}</div>
            <div id='pinned-tweet-text'>Pinned Tweet</div>
        </div>
    )
}

let RenderTweetDataComponent = ({ content, removeSpeceficArrayItem, updateTweetPrivacy, currentUser, handleAnalysingTweetID, handleQuoteTweetID, quoteTweetData, handleReplyCount, replyCount, handlePinnedTweetID, showPinnedTweetTag, handlePollVotesCount }) => {
    let {quotedTweetID, ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...content }

    let readyMedia = (extra) => (gifFile || extraGifFile) ? <MakeGifObjectAvailable gifId={extra != 'extra' ? gifFile : extraGifFile} /> : (pictureFile || extraPictureFile) ? showImg(extra != 'extra' ? pictureFile : extraPictureFile) : ''

    let [initialReplyCount, setInitialReplyCount] = useState(null)

    let handleInitialReplyCount = (val) => setInitialReplyCount(val)

    let tweetBottomClickableIcons = (extraEen, extraTwee) => tweetAdditionalIconsArray.map((elem) => <RenderTweetBottomIcons key={elem.id} elem={elem} extraEen={extraEen} extraTwee={extraTwee} tweetData={content} handleQuoteTweetID={handleQuoteTweetID} currentUser={currentUser} handleReplyCount={handleReplyCount} replyCount={replyCount} handleAnalysingTweetID={handleAnalysingTweetID} ID={ID} feedParentInitialReplyCount={handleInitialReplyCount} />)
    
    console.log(quotedTweetID, 'check!!', showPinnedTweetTag, initialReplyCount)

    let history = useHistory()

    let handleShowThread = () => history.push('/status/tweetID')

    let whenWithoutExtraTweet = () => <div className='rendering-tweet-data-container'>
        <div className='left-side'>
            <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
        </div>
        <div className='right-side'>
            <div className='tweet-info'>

                {<TweeetTop ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handlePinnedTweetID={handlePinnedTweetID} />}

                {quotedTweetID && <GetReplyToInformation currentUser={currentUser} />}

                <div className='tweet-text'>{tweetText}</div>

                {<div className='tweet-media-file-content'>{readyMedia()}</div>}

                {<RenderPolls poll={tweetPoll} handlePollVotesCount={handlePollVotesCount} />}

                {getPrivacySelectedElement(tweetPrivacy, 'white', tweetPrivacy == '01' ? ' ' : 'You can reply to this conversation')}

                <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons()}</div>

                {(initialReplyCount) > 0 && <div id='show-tweet-thread' onClick={handleShowThread}>Show this thread</div>}
            </div>
        </div>
        {/* {(initialReplyCount) > 0 && <div id='show-tweet-thread'>Show this thread</div>} */}
    </div>

    let whenWithExtraTweet = () => {
        return <div className='rendering-tweet-data-container'>

            <div className='when-has-extra-tweet'>

                <div className='tweet-extra-info-een'>
                    <div className='left-side'>
                        <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
                    </div>

                    <div className='right-side'>

                        {<TweeetTop ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} />}

                        {quotedTweetID && <GetReplyToInformation currentUser={currentUser} />}

                        <div className='tweet-text'>{tweetText}</div>

                        {<div className='tweet-media-file-content'>{readyMedia()}</div>}
                        {/* {<RenderPolls poll={tweetPoll} />} */}
                        {<RenderPolls poll={tweetPoll} handlePollVotesCount={handlePollVotesCount} />}

                        {getPrivacySelectedElement(tweetPrivacy, 'white', tweetPrivacy == '01' ? ' ' : 'You can reply to this conversation')}

                        <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons('-een')}</div>
                    </div>
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

                        {<div className='tweet-media-file-content'>{readyMedia('extra')}</div>}

                        {/* {extraPoll && <RenderPolls poll={extraPoll && extraPoll} />} */}
                        {extraPoll && <RenderPolls poll={extraPoll && extraPoll} handlePollVotesCount={handlePollVotesCount} />}

                        {/* {getPrivacySelectedElement(tweetPrivacy, 'white')} */}
                        {getPrivacySelectedElement(tweetPrivacy, 'white', tweetPrivacy == '01' ? ' ' : 'You can reply to this conversation')}

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

// let RenderPolls = ({ poll }) => {
//     let [maxVotes, setMaxVotes] = useState(100)
//     // let [maxVotes, setMaxVotes] = useState(104)

//     let handleChange = () => setMaxVotes(maxVotes - 1 >= 0 ? maxVotes - 1 : maxVotes)
//     // let handleChange;

//     useEffect(() => {
//         // handleChange = () => setMaxVotes(maxVotes-1 >= 0 ? maxVotes-1 : maxVotes)
//         maxVotes == 0 && alert('votes limit has reached!!')
//     }, [maxVotes])

//     // maxVotes <= 0 && alert('votes limit has reached!!')

//     return poll.map(choice => {
//         return Object.values(choice).map((value, idx) => value ? <HandlePollOptionProgress key={value} value={value} handleChange={handleChange} highestValue={maxVotes} /> : null)
//     })
// }

// let HandlePollOptionProgress = ({ value, handleChange, highestValue }) => {
//     let [votes, setvotes] = useState(0)

//     let handleVotes = () => {
//         handleChange();

//         setvotes((highestValue > 0) ? votes + 1 : votes)
//     }

//     return (
//         <div key={value} className='poll-info'>

//             <div className='left-view' onClick={handleVotes}>

//                 <div className='poll-progress'>

//                     <div className='progress-initial'></div>

//                     <div className='progress-bar' style={{ width: `${votes}%`, borderTopLeftRadius: votes && '0px', borderBottomLeftRadius: votes && '0px' }}></div>
//                 </div>

//                 <p>{value}</p>
//             </div>

//             <span className='poll-percentage'>{(votes * 100) / 100}%</span>
//         </div>
//     )
// }

// let MakeGifObjectAvailable = ({ gifId }) => {
//     let [gif, setGif] = useState(null)

//     gifId && getGiphyGifObject(gifId).then(res => {
//         setGif(res)
//     }).catch(err => console.log(err.message))

//     return gif && <Gif gif={gif} height='290px' className='style-gif-border-radius' />
// }

// let getGiphyGifObject = async (gifId) => {
//     try {
//         let { data } = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
//         // console.log('checkoiint06', gifId)
//         return data
//     } catch (err) {
//         console.log(err)
//     }
// }

let pinnedTweetIcon = () => <svg width={'24px'} height={'24px'} ><g><path d="M20.235 14.61c-.375-1.745-2.342-3.506-4.01-4.125l-.544-4.948 1.495-2.242c.157-.236.172-.538.037-.787-.134-.25-.392-.403-.675-.403h-9.14c-.284 0-.542.154-.676.403-.134.25-.12.553.038.788l1.498 2.247-.484 4.943c-1.668.62-3.633 2.38-4.004 4.116-.04.16-.016.404.132.594.103.132.304.29.68.29H8.64l2.904 6.712c.078.184.26.302.458.302s.38-.118.46-.302l2.903-6.713h4.057c.376 0 .576-.156.68-.286.146-.188.172-.434.135-.59z"></path></g></svg>
// let loveIcon = () => <svg className='profile-page-svg-icons'><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>
// let deleteSvg = () => <svg className='profile-page-svg-icons'><g><path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path><path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path></g></svg>
// let pinSvg = () => <svg className='profile-page-svg-icons'><g><path d="M20.472 14.738c-.388-1.808-2.24-3.517-3.908-4.246l-.474-4.307 1.344-2.016c.258-.387.28-.88.062-1.286-.218-.406-.64-.66-1.102-.66H7.54c-.46 0-.884.254-1.1.66-.22.407-.197.9.06 1.284l1.35 2.025-.42 4.3c-1.667.732-3.515 2.44-3.896 4.222-.066.267-.043.672.222 1.01.14.178.46.474 1.06.474h3.858l2.638 6.1c.12.273.39.45.688.45s.57-.177.688-.45l2.638-6.1h3.86c.6 0 .92-.297 1.058-.474.265-.34.288-.745.228-.988zM12 20.11l-1.692-3.912h3.384L12 20.11zm-6.896-5.413c.456-1.166 1.904-2.506 3.265-2.96l.46-.153.566-5.777-1.39-2.082h7.922l-1.39 2.08.637 5.78.456.153c1.355.45 2.796 1.78 3.264 2.96H5.104z"></path></g></svg>
// let listSvg = () => <svg className='profile-page-svg-icons'><g><path d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zM18.575 22H4.25C3.01 22 2 20.99 2 19.75V5.5c0-1.24 1.01-2.25 2.25-2.25h8.947c.414 0 .75.336.75.75s-.336.75-.75.75H4.25c-.413 0-.75.336-.75.75v14.25c0 .414.337.75.75.75h14.325c.413 0 .75-.336.75-.75v-8.872c0-.414.336-.75.75-.75s.75.336.75.75v8.872c0 1.24-1.01 2.25-2.25 2.25z"></path><path d="M16.078 9.583H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.336.75.75s-.336.75-.75.75zm0 3.867H6.673c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.335.75.75s-.336.75-.75.75zm-4.703 3.866H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.702c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
// let replySvg = () => <svg className='profile-page-svg-icons'><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
// let embedSvg = () => <svg className='profile-page-svg-icons'><g><path d="M23.804 11.5l-6.496-7.25c-.278-.31-.752-.334-1.06-.06-.308.277-.334.752-.058 1.06L22.238 12l-6.047 6.75c-.275.308-.25.782.06 1.06.142.127.32.19.5.19.204 0 .41-.084.558-.25l6.496-7.25c.252-.28.258-.713 0-1zm-23.606 0l6.496-7.25c.278-.31.752-.334 1.06-.06.308.277.334.752.058 1.06L1.764 12l6.047 6.75c.277.308.25.782-.057 1.06-.143.127-.322.19-.5.19-.206 0-.41-.084-.56-.25L.197 12.5c-.252-.28-.257-.713 0-1zm9.872 12c-.045 0-.09-.004-.135-.012-.407-.073-.68-.463-.605-.87l3.863-21.5c.074-.407.466-.674.87-.606.408.073.68.463.606.87l-3.864 21.5c-.065.363-.38.618-.737.618z"></path></g></svg>
// let moreOptions = [{title: 'Delete', icon: deleteSvg()},{title: 'Pin to your profile', icon: pinSvg()}, {title: 'Add/Remove @username from Lists', icon: listSvg()}, {title: 'Change who can reply', icon: replySvg()}, {title: 'Embed tweet', icon: embedSvg()}, {title: 'Analytics', icon: analyticsIcon()}]

export default AllTweetsPage