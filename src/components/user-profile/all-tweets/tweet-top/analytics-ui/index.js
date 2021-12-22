import React from 'react'
import {useHistory} from 'react-router-dom'
import { likeloveIcon, replyIcon, retweetIcon } from '../../../profile-page/svg-resources'
import './styles.css'

function AnalyticsUI() {
    return (
        <div id='tweet-analytics-ui-container'>
            <RenderAnalyticsHeaderSection />
            <RenderAnalyticsDataSection />
            <RenderTweetAnalyticMetrics />
            <RenderAnalyticsFooterSection />
        </div>
    )
}

let RenderAnalyticsFooterSection = () => {
    return <FooterSectionLowerDeck />
    // return (
    //     <div id='footer-section-ui-wrapper'>
    //         {/* <RenderTweetAnalyticMetrics /> */}
    //         <FooterSectionLowerDeck />
    //     </div>
    // )
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

let RenderAnalyticsDataSection = () => {
    return (
        <div id='analytics-data-section-container'>
            <RenderAnalysingUserTweet />
            <RenderAnalysingTweetLikeRetweetReplyNumbersUI />
            {/* <RenderTweetAnalyticMetrics /> */}
        </div>
    )
}

let RenderTweetAnalyticMetrics = () => {
    let tooltipSvg = informationTooltipSvg()
    let renderMetrics = analyticMetrics.map(item => <RenderTweetAnalyticMetric key={item.name} item={item} tooltipSvg={tooltipSvg} />)
    return (
        <div id='analytic-metrics-ui-wrapper'>
            {renderMetrics}
        </div>
    )
}

let RenderTweetAnalyticMetric = ({ item, tooltipSvg }) => {
    return (
        <div className='metric-wrapper' id={item.name}>
            <div className='upper-deck'>
                <div className='metric-name'>{item.name}</div>
                <div className='tooltip-svg'>{tooltipSvg}</div>
            </div>
            <div className='meteric-number'>{item.number}</div>
        </div>
    )
}

let RenderAnalysingTweetLikeRetweetReplyNumbersUI = () => {
    let renderMarkers = tweetMarkers.map(item => <RenderAnalysingTweetMarker key={item.name} item={item} />)
    return (
        <div id='like-retweet-reply-numbers-ui-wrapper'>
            {renderMarkers}
        </div>
    )
}

let RenderAnalysingTweetMarker = ({ item }) => {
    return (
        <div className='marker-wrapper'>
            <div className='svg-icon'>{item.icon}</div>
            <div className='marker-number'>{item.number}</div>
        </div>
    )
}

let RenderAnalysingUserTweet = () => {
    return (
        <div id='analysing-user-tweet-wrapper'>
            <RenderTweetUserInfo />
            <RenderAnalysingTweetText />
        </div>
    )
}

let RenderAnalysingTweetText = () => {
    return (
        <div id='analysing-tweet-text-wrapper'>
            user Tweet
        </div>
    )
}

let RenderTweetUserInfo = () => {
    return (
        <div id='user-info-wrapper'>
            <img style={{width: '20px', height: '20px'}} src='https://picsum.photos/200/300' />
            <div id='profile-name'>profile name</div>
            <div id='profile-handle'>profile handle</div>
            <div id='text-separator'>-</div>
            <div id='published-date'>Month day</div>
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

let analyticMetrics = [{ name: 'Impressions', number: '00' }, { name: 'New followers', number: '00' }, { name: 'Profile visits', number: '00' }]

export default AnalyticsUI
