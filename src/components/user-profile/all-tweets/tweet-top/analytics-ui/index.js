import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { likeloveIcon, replyIcon, retweetIcon } from '../../../profile-page/svg-resources'
import './styles.css'
import useOnClickOutside from '../../../../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside'
import { getUserProfileData, updateDataInFirestore } from '../../../../firestore-methods'
import { handleMediaFileChecks } from '../../../../compose-tweet/content-in-compose-tweet'
import { MakeGifObjectAvailable, RenderPolls, RenderUserTweetText } from '../../reuseable-helper-functions'
import { convertTimestampIntoTokens, RenderTweetPostedTimestamp } from '../../show-tweet-thread'
import { sanitizeDatasetForRendering } from '../..'

function AnalyticsUI({ analysingTweetID, analysingTweetData, currentUser }) {

    return (
        (analysingTweetID
            &&
            analysingTweetData)
            ?
            <div id='tweet-analytics-ui-container'>
                <RenderAnalyticsHeaderSection />
                <RenderAnalyticsDataSection analysingTweetData={analysingTweetData} currentUser={currentUser} />
                <RenderTweetAnalyticMetrics analysingTweetID={analysingTweetID} analysingTweetData={analysingTweetData} />
                <RenderAnalyticsFooterSection />
            </div>
            :
            null
    )
}

let RenderAnalyticsFooterSection = () => {
    return <FooterSectionLowerDeck />
}

let FooterSectionLowerDeck = ({ number }) => {
    return (
        <div id='lower-deck-wrapper'>
            <div id='left-side'>
                <div id='heading-text'>Promote your Tweet</div>
                <div id='sub-text'>Your Tweet has earned {number} impressions so far. Switch to a professional account to broaden your reach.</div>
            </div>
            <div id='switch-to'>Switch to professional</div>
        </div>
    )
}

let RenderAnalyticsDataSection = ({ analysingTweetData, currentUser }) => {
    // console.log(analysingTweetData, 'analysingTweetData!!')
    return (
        <div id='analytics-data-section-container'>
            <RenderUserTweet speceficTweetData={analysingTweetData} currentUser={currentUser} />
            <RenderAnalysingTweetLikeRetweetReplyNumbersUI analysingTweetData={analysingTweetData} />
        </div>
    )
}

let RenderTweetAnalyticMetrics = ({ analysingTweetID, analysingTweetData }) => {
    let [randomNumberTotal, setRandomNumberTotal] = useState(0)

    let handleRandomNumberTotal = (value) => {
        setRandomNumberTotal(prevNum => prevNum + value)
    }

    let tooltipSvg = informationTooltipSvg()

    let renderMetrics = analyticMetrics.map((item, idx) => idx ? <RenderTweetAnalyticMetric key={item.name} item={item} tooltipSvg={tooltipSvg} analysingTweetData={analysingTweetData} handleRandomNumberTotal={handleRandomNumberTotal} /> : null)

    let leftItem = { name: 'Impressions', number: '00' }

    return (
        <div id='analytic-metrics-ui-wrapper'>
            <RenderTweetAnalyticMetric item={leftItem} tooltipSvg={tooltipSvg} analysingTweetData={analysingTweetData} randomNumberTotal={randomNumberTotal} handleRandomNumberTotal={handleRandomNumberTotal} />
            <div id='rests-metrics'>
                {renderMetrics}
            </div>
        </div>
    )
}

let RenderTweetAnalyticMetric = ({ item, tooltipSvg, handleRandomNumberTotal, randomNumberTotal }) => {
    let [currentTooltip, setCurrentTooltip] = useState(null)

    let [randomNumber, setRandomNumber] = useState(0)

    let generateRandomNumbersAsDummyData = () => {
        let rndNum = Math.floor(Math.random() * 42)
        setRandomNumber(rndNum)
        handleRandomNumberTotal(rndNum)
    }

    useEffect(() => generateRandomNumbersAsDummyData(), [])

    let handleTooltips = evt => {
        if (item.name == evt.target.parentNode.parentNode.parentNode.id) {
            setCurrentTooltip(item.name)
        }
    }

    let closeTooltip = () => setCurrentTooltip(null)

    return (
        <div className='metric-wrapper' id={item.name}>
            {item.name == currentTooltip && <RenderMetricTooltipModal tooltip={currentTooltip} closeTooltip={closeTooltip} randomNumber={randomNumber} randomNumberTotal={randomNumberTotal} />}

            <div className='upper-deck'>
                <div className='metric-name'>{item.name}</div>
                <div className='tooltip-svg' onClick={handleTooltips}>{tooltipSvg}</div>
            </div>

            <div className='meteric-number'>{randomNumberTotal || randomNumber || item.number}</div>
        </div>
    )
}

let RenderMetricTooltipModal = ({ tooltip, closeTooltip, randomNumber, randomNumberTotal }) => {
    let ref = useRef(null);

    let handleModal = () => {
        closeTooltip()
    }

    useOnClickOutside(ref, handleModal)

    let subText = tooltip == 'Impressions' ? 'Times this tweets was seen on Twitter' : tooltip == 'New followers' ? 'Follows gained directly from this Tweet' : tooltip == 'Profile visits' ? 'Number of profile views from this Tweet' : tooltip == 'Engagements' ? 'Total number of times a user has interacted with a Tweet' : 'Times people viewed the details about this Tweet'

    return (
        <div className='tooltip-ui-wrapper' ref={ref}>
            <div className='tooltip-name'>{tooltip}</div>
            <div className='tooltip-subtext'><span style={{ fontSize: 'larger', fontWeight: 'bolder' }}>{randomNumberTotal || randomNumber}</span> {subText}</div>
            <div className='tooltip-modal-btn' onClick={() => closeTooltip()}>OK</div>
        </div>
    )
}

let RenderAnalysingTweetLikeRetweetReplyNumbersUI = ({ analysingTweetData }) => {
    let renderMarkers = tweetMarkers.map(item => <RenderAnalysingTweetMarker key={item.name} item={item} analysingTweetData={analysingTweetData} />)
    return (
        <div id='like-retweet-reply-numbers-ui-wrapper'>
            {renderMarkers}
        </div>
    )
}

let RenderAnalysingTweetMarker = ({ item, analysingTweetData }) => {
    let [count, setCount] = useState(null)
    useEffect(() => {
        item && setCount(item.name == 'reply' ? analysingTweetData[0].replyCount : item.name == 'retweet' ? analysingTweetData[0].listOfRetweetedQuotes.length : item.number)
    }, [item])
    return (
        <div className='marker-wrapper'>
            <div className='svg-icon'>{item.icon}</div>
            <div className='marker-number'>{count}</div>
        </div>
    )
}

export let RenderUserTweet = ({ speceficTweetData, currentUser, pollVotesCount, handlePollVotesCount, forModal, quotedFromRetweetModal, handleThreadedTweetData }) => {
    let [userProfileData, setUserProfileData] = useState(null)

    let [neededInfo, setNeededInfo] = useState([])

    let history = useHistory(null)

    let handleShowThisThread = () => {
        // console.log(speceficTweetData, 'from showthisthread')
        handleThreadedTweetData(sanitizeDatasetForRendering(speceficTweetData))
        updateDataInFirestore(currentUser, speceficTweetData.id, { hasRetweetedThread: true })
        setTimeout(() => history.push('/status/tweetID'), 800)
    }

    let handleDataLoading = (dataset) => setUserProfileData(dataset)

    let { created, extraPoll, extraTweet, extraPicture, extraGif, medias, tweetPoll, tweetText, id, gif, picture } = Object.keys(speceficTweetData) && { ...speceficTweetData[0] }

    useEffect(() => currentUser && getUserProfileData(currentUser, handleDataLoading), [])

    let filterProfileData = () => {
        let itemFiltered = userProfileData.filter((item, idx) => (idx == 0 || idx == 6) && item.content)
        setNeededInfo(itemFiltered)
    }

    useEffect(() => userProfileData && filterProfileData(), [userProfileData])

    // let numberOfPollOptions = tweetPoll && Object.values(tweetPoll[0]).filter(val => val).length
    
    let retweetModalQuoteStyles = {
        border: 'solid 1px silver',
        marginLeft: '80px',
        padding: '11px 11px 4px 17px',
        marginTop: '11px',
        borderRadius: '20px',
        lineHeight: '1.5em'
    }

    return (
        <div id='analysing-user-tweet-wrapper' style={quotedFromRetweetModal && retweetModalQuoteStyles}>
            <RenderTweetUserInfo name={neededInfo.length && neededInfo[0].content} tweetPostedDate={(created && created.seconds) || (speceficTweetData.created.seconds)} quotedFromRetweetModal={quotedFromRetweetModal} profilePicture={neededInfo[1]?.content} />
            
            <RenderUserTweetText tweetText={quotedFromRetweetModal && speceficTweetData.extraTweet ? speceficTweetData.extraTweet : speceficTweetData.extraTweet ? speceficTweetData.extraTweet : tweetText} quotedFromRetweetModal={quotedFromRetweetModal} />

            <RenderUserTweetMedias medias={medias ? medias : speceficTweetData.medias} quotedFromRetweetModal={quotedFromRetweetModal} />

            {tweetPoll && <RenderPolls poll={tweetPoll} handlePollVotesCount={handlePollVotesCount} pollVotesCount={pollVotesCount} forModal={forModal} />}
            
            {quotedFromRetweetModal && <div id='show-this-thread-text' onClick={handleShowThisThread}>Show this thread</div>}
        </div>
    )
}

let RenderUserTweetMedias = ({ medias, quotedFromRetweetModal }) => {
    let { gif, picture, extraGif, extraPicture } = { ...medias }
    
    return (
        (extraPicture || picture) ? <img className='quoted-picture' src={handleMediaFileChecks(quotedFromRetweetModal && extraPicture ? extraPicture : extraPicture ? extraPicture : picture)} style={{width: quotedFromRetweetModal ? '522px' : '594px', marginLeft: quotedFromRetweetModal ? '40px' : ' 42px'}} /> : <MakeGifObjectAvailable gifId={quotedFromRetweetModal && extraGif ? extraGif : extraGif ? extraGif : gif} quotedFromRetweetModal={quotedFromRetweetModal} />        
    )
}

let RenderTweetUserInfo = ({ name, profileHandle, tweetPostedDate, quotedFromRetweetModal, profilePicture }) => {

    let processCreatedDateFormat = () => {
        let dateString = new Date(tweetPostedDate).toUTCString()
        let neededPieces = []
        let dateTokens = dateString.split(' ')
        neededPieces.push(dateTokens[1], dateTokens[2])
        return neededPieces.reverse().join(', ')
    }
    return (
        <div id='user-info-wrapper'>
            <img id={quotedFromRetweetModal && 'profile-pic-for-retweet-quote-tweet'} style={{ width: '20px', height: '20px', marginRight: '9px' }} src={profilePicture || 'https://picsum.photos/200/300'} />
            <div id='profile-name' style={{ marginRight: '8px' }}>{name || 'profile name'}</div>
            <div id='profile-handle' style={{ marginRight: '8px' }}>@{profileHandle || 'profile handle'}</div>
            <div id='text-separator' style={{ marginRight: '8px', fontSize: 'small', color: 'silver' }}> - </div>
            {!quotedFromRetweetModal && <div id='published-date'>{processCreatedDateFormat() || 'Month day'}</div>}
            {quotedFromRetweetModal && <RenderTweetPostedTimestamp timestampTokens={convertTimestampIntoTokens(tweetPostedDate)} />}
        </div>
    )
}

let RenderAnalyticsHeaderSection = () => {
    let history = useHistory()
    let handleCloseModal = () => {
        history.goBack()
    }
    return (
        <div id='analytics-header-ui-wrapper'>
            <div id='close-svg' onClick={handleCloseModal}>{cancelMarkSvg()}</div>
            <div id='header-text'>Tweet Analytics</div>
        </div>
    )
}

let cancelMarkSvg = () => <svg width={24} height={24}><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

let informationTooltipSvg = () => <svg width={24} height={24}><g><path d="M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z"></path><circle cx="12" cy="8.042" r="1.25"></circle><path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path></g></svg>

let tweetMarkers = [{ name: 'like', number: '00', icon: likeloveIcon() }, { name: 'retweet', number: '00', icon: retweetIcon() }, { name: 'reply', number: '00', icon: replyIcon() }]

let analyticMetrics = [{ name: 'Impressions', number: '00' }, { name: 'New followers', number: '00' }, { name: 'Profile visits', number: '00' }, { name: 'Engagements', number: '00' }, { name: 'Details expands', number: '00' }]

export default AnalyticsUI