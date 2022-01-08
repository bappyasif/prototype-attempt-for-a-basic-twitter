import React from 'react'
import { tweetPrivacySelected01 } from '../../../tweet-modal'
import { analyticsIcon, backIcon, tweetAdditionalIconsArray } from '../../profile-page/svg-resources'
import { RenderUserTweetText } from '../reuseable-helper-functions'
import { RenderTweetBottomIcons } from '../tweet-bottom'

function ShowTweetThread() {
    return (
        <div id='show-tweet-thread-container'>
            <HeaderComponent />
            <TweetComponent />
            <ReplyThreadComponent />
        </div>
    )
}

let ReplyThreadComponent = () => {
    return (
        <div id='reply-tweet-thread-wrapper'>
            <BeforeClickedMarkup />
        </div>
    )
}

let BeforeClickedMarkup = () => {
    return(
        <div id='before-clicked-markup-wrapper'>
            <img className='profile-pic' src='https://picsum.photos/200/300' />
            <label htmlFor='reply-tweet' />
            <input type={'text'} id='reply-tweet' placeholder='Tweet your reply' />
            <div id='reply-btn'>Reply</div>
        </div>
    )
}

let TweetComponent = () => {
    return (
        <div id='tweet-component-wrapper'>
            <UserInfo />
            <RenderUserTweetText tweetText={'tweet text'} />
            <RenderTweetPostedTimestamp />
            <RenderTweetAnalyticsActivity />
            <RenderMoreOptions />
            <RenderTweetPrivacyAnouncement />
        </div>
    )
}

let RenderTweetPrivacyAnouncement = () => {
    return(
        <div id='privacy-announcement-wrapper'>
            {poepleMentionePrivacySvg()}
            <div id='announcement-texts'>
                <div id='privacy-type-text'>You can reply</div>
                <div id='privacy-sub-text'>People @profile_handel mentioned can reply</div>
            </div>
        </div>
    )
}

let RenderTweetAnalyticsActivity = () => {
    return (
        <div id='analytics-activity-wrapper'>
            <div id='svg-icon'>{analyticsIcon()}</div>
            <div id='actitvity-text'>View Tweet activity</div>
        </div>
    )
}

let RenderTweetPostedTimestamp = () => {
    return (
        <div id='timestamp-wrapper'>
            <div id='timestamp'>8:50 PM · Jan 8, 2022</div>
            <div id='platform'>Twitter Web App</div>
        </div>
    )
}

let RenderMoreOptions = () => {
    let renderOptions = tweetAdditionalIconsArray.map(elem => elem.id != 'analytics' && <RenderTweetBottomIcons key={elem.id} elem={elem} />)
    return <div id='more-options-wrapper'>{renderOptions}</div>
}

let UserInfo = () => {
    return (
        <div id='user-info-wrapper'>
            <img className='profile-pic' src='https://picsum.photos/200/300' />
            <div id='profile-info'>
                <div id='profile-name'>Profile Name</div>
                <div id='profile-handle'>Profile Handle</div>
            </div>
        </div>
    )
}

let HeaderComponent = () => {
    return (
        <div id='component-wrapper'>
            <div id='svg-icon'>{backIcon()}</div>
            <div id='component-title'>Thread</div>
        </div>
    )
}

export let poepleMentionePrivacySvg = () => <svg className='profile-page-svg-icons'><g><path d="M17.23 8.6c0-.85-.69-1.55-1.55-1.55-.37 0-.73.14-1.02.39-.6-.45-1.54-.92-2.85-.92-2.97 0-5.12 2.45-5.12 5.84 0 2.62 1.88 4.75 4.19 4.75 1.42 0 2.48-.53 3.17-1.03.54.62 1.53 1.26 3.32 1.26.05 0 5.05-.06 5.05-5.34 0-5.75-4.67-10.42-10.42-10.42S1.58 6.25 1.58 12 6.25 22.42 12 22.42c2.18 0 3.92-.53 5.65-1.72.28-.19.48-.49.56-.86.06-.35-.01-.68-.21-.97-.19-.29-.5-.49-.85-.54-.36-.06-.72.01-.98.19-1.28.88-2.57 1.27-4.17 1.27-4.29 0-7.79-3.5-7.79-7.79S7.71 4.21 12 4.21s7.79 3.5 7.79 7.79c0 2.15-1.19 2.91-2.31 2.91 0 0-.68 0-.98-.35-.15-.17-.19-.45-.13-.82.86-4.96.86-5.06.86-5.14zm-3.5 2.53v.14c0 .73-.22 1.44-.63 2.02-.4.59-.95.91-1.6.94-1 0-1.67-.75-1.71-1.9-.03-.86.26-1.69.81-2.28.42-.45.96-.71 1.51-.73.95 0 1.57.7 1.62 1.81z"></path></g></svg>


export default ShowTweetThread
