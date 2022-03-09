import React, { useEffect, useState } from 'react'
import { tweetAdditionalIconsArray } from '../profile-page/svg-resources';
import '../../user-profile/profile-page/index.css';
import { getPrivacySelectedElement, showImg } from '..';
import TopicsPickerInTimeline from '../topics-picker-in-timeline';
import { TweeetTop } from './tweet-top';
import { RenderTweetBottomIcons } from './tweet-bottom';
import { getUserProfileData, readDocumentFromFirestoreSubCollection } from '../../firestore-methods';
import { MakeGifObjectAvailable, RenderPolls } from './reuseable-helper-functions';
import { useHistory } from 'react-router-dom';
import { RenderUserTweet } from './tweet-top/analytics-ui';

function AllTweetsPage({ removeFromLikedTweets, handleLikedTweets, hideFirstPollReply, handleQuotedFromRetweetModal, currentUserProfileInfo, handleThreadedTweetData, handlePollVotesCount, currentlyPinnedTweetID, showPinnedTweetTag, handlePinnedTweetID, handleReplyCount, replyCount, quoteTweetData, handleQuoteTweetID, tweetData, onlyMedias, removeSpeceficArrayItem, updateTweetPrivacy, currentUser, handleAnalysingTweetID }) {
    let [show, setShow] = useState(false)
    let [showNoMoreTweets, setShowNoMoreTweets] = useState(false)
    let [totalTweets, setTotalTweets] = useState()
    let [currentTweetsIndex, setCurrentTweetsIndex] = useState()

    let handleNoMoreTweets = () => {
        setShowNoMoreTweets(true)
    }

    let handleShowMoreTweets = () => {
        setCurrentTweetsIndex(currentTweetsIndex + 11 <= totalTweets ? currentTweetsIndex + 11 : totalTweets)
    }

    useEffect(() => totalTweets && (currentTweetsIndex == totalTweets) && handleNoMoreTweets(), [currentTweetsIndex])

    useEffect(() => {
        (totalTweets) && totalTweets <= 11 && handleNoMoreTweets()
    }, [totalTweets])

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
            content = sanitizeDatasetForRendering(item)
        } else {
            content = { tweetText: item.tweetText, extraTweet: item.extraTweet, tweetPrivacy: item.privacy, tweetPoll: item.tweetPoll, extraPoll: item.extraPoll, scheduledTime: item.scheduledTimeStamp, ID: ID, quotedTweetID: item.quoteTweetID, created: item.created, retweetedQuote: item.retweetedQuote, hasRetweetedThread: item.hasRetweetedThread, replyCount: item.replyCount, listOfRetweetedQuotes: item.listOfRetweetedQuotes, repliedTweets: item.repliedTweets, liked: item?.liked }
        }

        return <RenderTweetDataComponent content={content} removeFromLikedTweets={removeFromLikedTweets} handleLikedTweets={handleLikedTweets} hideFirstPollReply={hideFirstPollReply} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} quoteTweetData={quoteTweetData} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} handlePollVotesCount={handlePollVotesCount} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} />
    }

    let runThis = time => {
        setTimeout(() => {
            setShow(true)
        }, time)
    }

    let displayRule = item => {
        let mode = ''
        if (item.scheduledTimeStamp) {

            if (new Date() < new Date(item.scheduledTimeStamp)) {
                mode = 'none'
                if ((new Date(item.scheduledTimeStamp).getTime() - new Date().getTime()) <= 120000) {
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
        {(showPinnedTweetTag && (currentlyPinnedTweetID == item.id)) && <PinnedTweetUI />}
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
            <div id='show-more-tweets' style={{ display: (showNoMoreTweets || !totalTweets) ? 'none' : 'block' }} onClick={handleShowMoreTweets}>Show more</div>
            <TopicsPickerInTimeline />
        </div>
    )
}

export let sanitizeDatasetForRendering = item => {
    return {
        tweetText: item.tweetText,
        extraTweet: item.extraTweet,
        gifFile: item.medias?.gif,
        extraGifFile: item.medias?.extraGif,
        picture: item.medias?.picture,
        extraPictureFile: item.medias?.extraPicture,
        tweetPrivacy: item.privacy,
        firstTweetHasMedia: item.firstTweetHasMedia,
        secondTweetHasMedia: item.secondTweetHasMedia,
        tweetPoll: item.tweetPoll,
        extraPoll: item.extraPoll,
        scheduledTime: item.scheduledTimeStamp,
        ID: item.id,
        quotedTweetID: item.quoteTweetID,
        created: item.created,
        retweetedQuote: item.retweetedQuote,
        hasRetweetedThread: item.hasRetweetedThread,
        replyCount: item.replyCount,
        listOfRetweetedQuotes: item.listOfRetweetedQuotes,
        repliedTweets: item.repliedTweets,
        hideTweet: item.hideTweet ? item.hideTweet : null,
        liked: item?.liked
    }
}

let GetReplyToInformation = ({ currentUser }) => {
    let [profileData, setProfileData] = useState(null)
    let handleLoading = data => setProfileData(data)

    useEffect(() => getUserProfileData(currentUser, handleLoading), [])

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

let ShowRetweetedQuote = ({ quoteTweetID, currentUser, handleThreadedTweetData }) => {
    let [quotedTweetData, setQuotedTweetData] = useState(null)
    let handleLoadingQuotedTweetData = items => {
        setQuotedTweetData(items)
    }

    useEffect(() => {
        quoteTweetID && readDocumentFromFirestoreSubCollection(currentUser, quoteTweetID, handleLoadingQuotedTweetData)
    }, [quoteTweetID])

    return (
        quotedTweetData && <RenderUserTweet speceficTweetData={quotedTweetData && quotedTweetData} currentUser={currentUser} quotedFromRetweetModal={true} handleThreadedTweetData={handleThreadedTweetData} />
    )
}

let RenderPollFirstReply = ({currentUser, docID, hideFirstPollReply, handleLikedTweets, showExtensionLine, updateTweetPrivacy, currentUserProfileInfo}) => {
    let [documentDataset, setDocumentDataset] = useState(null)
    let [repliedtweetData, setRepliedTweetData] = useState(null)

    useEffect(() => readDocumentFromFirestoreSubCollection(currentUser, docID, setDocumentDataset), [])

    useEffect(() => documentDataset && readDocumentFromFirestoreSubCollection(currentUser, documentDataset.repliedTweets[0], setRepliedTweetData), [documentDataset])

    useEffect(() => {
        repliedtweetData && hideFirstPollReply(repliedtweetData.id)
        repliedtweetData && showExtensionLine(true)
    }, [repliedtweetData])
    
    return (
        <div id='poll-first-reply-wrapper'>
            {repliedtweetData && <RenderTweetDataComponent content={sanitizeDatasetForRendering(repliedtweetData)} currentUser={currentUser} pollFirstReply={true} handleLikedTweets={handleLikedTweets} updateTweetPrivacy={updateTweetPrivacy} currentUserProfileInfo={currentUserProfileInfo} />}
        </div>
    )
}

let TweetContentsMarkUp = ({ removeFromLikedTweets, handleLikedTweets, pollFirstReply, tweetType, extra, ID, currentUser, tweetText, tweetPoll, gifFile, extraGifFile, picture, extraPictureFile, handlePollVotesCount, content, handleQuoteTweetID, handleReplyCount, quotedTweetID, handleThreadedTweetData, fromTweetThread, isQuotedFromRetweeted, retweetedQuote, removeSpeceficArrayItem, handleInitialReplyCount, tweetPrivacy, updateTweetPrivacy, handleAnalysingTweetID, handlePinnedTweetID, currentUserProfileInfo, created, handleQuotedFromRetweetModal, listOfRetweetedQuotes}) => {
    let decideMarkupClassName = tweetType == 'een' ? 'tweet-extra-info-een' : tweetType == 'twee' && 'tweet-extra-info-twee'
    let forClickableTweets = tweetType == 'een' ? '-een' : tweetType == 'twee' && '-twee'

    let readyMedia = (extra) => (gifFile || extraGifFile) ? <MakeGifObjectAvailable gifId={extra != 'extra' ? gifFile : extraGifFile} /> : (picture || extraPictureFile) ? showImg(extra != 'extra' ? picture : extraPictureFile) : ''

    let tweetBottomClickableIcons = () => tweetAdditionalIconsArray.map((elem) => <RenderTweetBottomIcons key={elem.id} elem={elem} removeFromLikedTweets={removeFromLikedTweets} handleLikedTweets={handleLikedTweets} tweetType={tweetType} tweetData={content} handleQuoteTweetID={handleQuoteTweetID} currentUser={currentUser} handleReplyCount={handleReplyCount} handleAnalysingTweetID={handleAnalysingTweetID} ID={ID} feedParentInitialReplyCount={handleInitialReplyCount} changedCount={content.replyCount} fromTweetThread={fromTweetThread} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} listOfRetweetedQuotes={listOfRetweetedQuotes} currentCountInFirestore={content.repliedTweets && content.repliedTweets.length} />)

    return (
        <div id={!tweetType ? 'tweet-part' : null} className={tweetType ? decideMarkupClassName : null}>
            <div className='left-side'>
                <img className='in-tweet-profile-pic' src={currentUserProfileInfo?.[6]?.content || 'https://picsum.photos/200/300'} />
            </div>
            <div className='right-side'>
                <div className='tweet-info'>

                    {<TweeetTop ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handlePinnedTweetID={handlePinnedTweetID} currentUserProfileInfo={currentUserProfileInfo} createdDate={created} />}

                    {(quotedTweetID || fromTweetThread) && !isQuotedFromRetweeted && !retweetedQuote && !pollFirstReply && <GetReplyToInformation currentUser={currentUser} />}

                    <div className='tweet-text'>{tweetText}</div>

                    {<div className='tweet-media-file-content'>{readyMedia( extra ? extra : null)}</div>}

                    {tweetPoll && <RenderPolls poll={tweetPoll} handlePollVotesCount={handlePollVotesCount} />}

                    {quotedTweetID && retweetedQuote && <ShowRetweetedQuote quoteTweetID={quotedTweetID} currentUser={currentUser} handleThreadedTweetData={handleThreadedTweetData} />}

                    {getPrivacySelectedElement(tweetPrivacy, 'white', tweetPrivacy == '01' ? ' ' : 'You can reply to this conversation')}

                    <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons(tweetType ? forClickableTweets : null)}</div>
                </div>
            </div>
        </div>
    )
}

export let RenderTweetDataComponent = ({ content, removeFromLikedTweets, handleLikedTweets, hideFirstPollReply, pollFirstReply, removeSpeceficArrayItem, updateTweetPrivacy, currentUser, handleAnalysingTweetID, handleQuoteTweetID, quoteTweetData, handleReplyCount, replyCount, handlePinnedTweetID, showPinnedTweetTag, handlePollVotesCount, handleThreadedTweetData, fromTweetThread, currentUserProfileInfo, handleQuotedFromRetweetModal, isQuotedFromRetweeted }) => {
    let { hasRetweetedThread, repliedTweets, listOfRetweetedQuotes, retweetedQuote, quotedTweetID, ID, scheduledTime, created, tweetText, extraTweet, gifFile, extraGifFile, picture, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...content }

    let [initialReplyCount, setInitialReplyCount] = useState(null)

    let [lineHeight, setLineHeight] = useState(null)

    let [showExtensionForFirstPollReply, setShowExtensionForFirstPollReply] = useState(false)

    let calculateLineHeight = () => {
        let referencePoints = document.querySelectorAll('.rendering-tweet-data-container')
        let reference01;

        referencePoints && referencePoints.forEach(node => {
            if (node.id == ID) reference01 = node
        })

        let checkRef = reference01 && reference01.id == ID

        if (checkRef) {
            let reference02 = reference01.querySelector('.in-tweet-profile-pic')
            let reference03 = reference01.querySelector('.tweet-extra-info-twee')
            let calc;

            if (picture || extraPictureFile) {
                calc = reference01 && reference03 && reference01.clientHeight - reference02.clientHeight - reference03.clientHeight - 20;
            } else if (!gifFile && extraGifFile) {
                calc = reference01 && reference03 && reference01.clientHeight - reference03.clientHeight - reference02.clientHeight - 20;
            } else if (gifFile) {
                calc = reference01 && reference03 && reference01.clientHeight - reference02.clientHeight - reference03.clientHeight + 281;
            } else if (tweetPoll || extraPoll) {
                calc = reference01 && reference03 && reference01.clientHeight - reference02.clientHeight - reference03.clientHeight - 18.2;
            } else {
                calc = reference01 && reference03 && reference01.clientHeight - reference02.clientHeight - reference03.clientHeight + 6;
            }

            calc && setLineHeight(calc)
        }
    }

    let calculateLineHeightForFirstPollReply = () => {
        let p_o_f_01 = document.querySelector('#poll-first-reply-wrapper');
        let parentOfPof01 = p_o_f_01?.parentNode;
        let calc = parentOfPof01?.clientHeight - p_o_f_01?.clientHeight - 53
        !calc < 0 && setLineHeight(calc)
    }

    useEffect(() => showExtensionForFirstPollReply && setLineHeight((tweetPrivacy == '02' || tweetPrivacy == '03') ? 216 : 178), [[showExtensionForFirstPollReply]])

    useEffect(() => content.replyCount >= 1 && tweetPoll[0] && calculateLineHeightForFirstPollReply(), [tweetPoll])

    useEffect(() => (extraTweet || extraGifFile || extraPictureFile || extraPoll) && calculateLineHeight(), [extraTweet, extraGifFile, extraPictureFile, extraPoll, ID, tweetPrivacy, tweetPoll])

    let handleInitialReplyCount = (val) => setInitialReplyCount(val)

    let history = useHistory()

    let handleShowThread = () => {
        handleThreadedTweetData(content)
        history.push('/status/tweetID')
    }

    let whenWithoutExtraTweet = () => {
        return (
            !content.hideTweet
            &&
            <div className='rendering-tweet-data-container' style={{ marginLeft: isQuotedFromRetweeted && '11px' }}>

                <TweetContentsMarkUp ID={ID} removeFromLikedTweets={removeFromLikedTweets} handleLikedTweets={handleLikedTweets} pollFirstReply={pollFirstReply} handleReplyCount={handleReplyCount} handleInitialReplyCount={handleInitialReplyCount} content={content} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} listOfRetweetedQuotes={listOfRetweetedQuotes} gifFile={gifFile} picture={picture} retweetedQuote={retweetedQuote} fromTweetThread={fromTweetThread} tweetPoll={tweetPoll} isQuotedFromRetweeted={isQuotedFromRetweeted} tweetPrivacy={tweetPrivacy} handleThreadedTweetData={handleThreadedTweetData} quotedTweetID={quotedTweetID} handlePollVotesCount={handlePollVotesCount} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handlePinnedTweetID={handlePinnedTweetID} currentUserProfileInfo={currentUserProfileInfo} created={created} tweetText={tweetText} />
                
                { (((content.repliedTweets && content.repliedTweets.length) || content.replyCount )  && !(tweetPoll[0].choice01) && !isQuotedFromRetweeted  && !(fromTweetThread && replyCount)) ? <div id='show-tweet-thread' onClick={handleShowThread}>Show this thread</div> : null}

                {(content.replyCount >= 1 && (tweetPoll[0].choice01) || showExtensionForFirstPollReply) && <div id='show-connecting-line' style={{ height: lineHeight && lineHeight }}></div>}

                { content.replyCount >= 1 && (tweetPoll[0].choice01) && <RenderPollFirstReply currentUser={currentUser} docID={ID} removeFromLikedTweets={removeFromLikedTweets} handleLikedTweets={handleLikedTweets} hideFirstPollReply={hideFirstPollReply} replyCount={content.replyCount} showExtensionLine={setShowExtensionForFirstPollReply} updateTweetPrivacy={updateTweetPrivacy} currentUserProfileInfo={currentUserProfileInfo} /> }
            </div>
        )
    }

    let whenWithExtraTweet = () => {
        let urlTokens = window.location.href.split('/')
        let getRouteUrl = urlTokens[urlTokens.length - 1]

        return (
            <div className='rendering-tweet-data-container' id={ID}>

                <div className='when-has-extra-tweet'>
                    
                    { getRouteUrl != 'likes' && <TweetContentsMarkUp tweetType={'een'} ID={ID} removeFromLikedTweets={removeFromLikedTweets} handleLikedTweets={handleLikedTweets} handleReplyCount={handleReplyCount} handleAnalysingTweetID={handleAnalysingTweetID} feedParentInitialReplyCount={handleInitialReplyCount} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} listOfRetweetedQuotes={listOfRetweetedQuotes} content={content} handleQuoteTweetID={handleQuoteTweetID} gifFile={gifFile} picture={picture} tweetPoll={tweetPoll} tweetText={tweetText} fromTweetThread={fromTweetThread} tweetPrivacy={tweetPrivacy} handleThreadedTweetData={handleThreadedTweetData} quotedTweetID={quotedTweetID} handlePollVotesCount={handlePollVotesCount} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handlePinnedTweetID={handlePinnedTweetID} currentUserProfileInfo={currentUserProfileInfo} created={created} />}

                    { getRouteUrl != 'likes' && <div id='show-connecting-line' style={{ height: lineHeight && lineHeight }}></div>}

                    <TweetContentsMarkUp tweetType={'twee'} extra={'extra'} ID={ID} removeFromLikedTweets={removeFromLikedTweets} handleLikedTweets={handleLikedTweets} handleReplyCount={handleReplyCount} handleAnalysingTweetID={handleAnalysingTweetID} feedParentInitialReplyCount={handleInitialReplyCount} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} listOfRetweetedQuotes={listOfRetweetedQuotes} content={content} handleQuoteTweetID={handleQuoteTweetID} extraGifFile={extraGifFile} extraPictureFile={extraPictureFile} tweetText={extraTweet} tweetPoll={extraPoll} tweetPrivacy={tweetPrivacy} handleThreadedTweetData={handleThreadedTweetData} quotedTweetID={quotedTweetID} handlePollVotesCount={handlePollVotesCount} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handlePinnedTweetID={handlePinnedTweetID} currentUserProfileInfo={currentUserProfileInfo} created={created} />
                </div>
            </div>
        )
    }

    return (
        (extraTweet)
            ?
            whenWithExtraTweet()
            :
            whenWithoutExtraTweet()
    )
}

let pinnedTweetIcon = () => <svg width={'24px'} height={'24px'} ><g><path d="M20.235 14.61c-.375-1.745-2.342-3.506-4.01-4.125l-.544-4.948 1.495-2.242c.157-.236.172-.538.037-.787-.134-.25-.392-.403-.675-.403h-9.14c-.284 0-.542.154-.676.403-.134.25-.12.553.038.788l1.498 2.247-.484 4.943c-1.668.62-3.633 2.38-4.004 4.116-.04.16-.016.404.132.594.103.132.304.29.68.29H8.64l2.904 6.712c.078.184.26.302.458.302s.38-.118.46-.302l2.903-6.713h4.057c.376 0 .576-.156.68-.286.146-.188.172-.434.135-.59z"></path></g></svg>

export default AllTweetsPage