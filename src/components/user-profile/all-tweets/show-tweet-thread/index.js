import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RenderTweetDataComponent } from '..'
import { getDataFromFirestoreSubCollection, readDocumentFromFirestoreSubCollection } from '../../../firestore-methods'
import { tweetPrivacySelected01 } from '../../../tweet-modal'
import { replyTweetModalIcons } from '../../../tweet-modal/svg-resources'
import { analyticsIcon, backIcon, tweetAdditionalIconsArray } from '../../profile-page/svg-resources'
import { RenderUserTweetText } from '../reuseable-helper-functions'
import { RenderTweetBottomIcons } from '../tweet-bottom'

function ShowTweetThread({ threadedTweetData, currentUser }) {
    let { created, quotedTweetID, ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...threadedTweetData }
    console.log(ID, tweetText, created, '::::', threadedTweetData)
    return (
        <div id='show-tweet-thread-container'>
            <HeaderComponent />
            {tweetText && <TweetComponent tweetText={tweetText} createdDate={created} />}
            <ReplyThreadComponent />
            <RenderAlreadyRepliedTweets currentUser={currentUser} tweetThreadID={ID} />
        </div>
    )
}

let RenderAlreadyRepliedTweets = ({ currentUser, tweetThreadID }) => {
    let [repliedTweetsIDs, setRepliedTweetsIDs] = useState(null)
    let handleLoadingTweetsIDs = data => setRepliedTweetsIDs(data)
    // let content = {
    //     tweetText: 'item.tweetText',
    //     tweetPrivacy: '02',
    //     // ID: 'd7AMxpgBtuNcnBr7XwM9uWvKrmG3',
    // }
    // retriving repliedTweetIDs from firestore
    useEffect(() => tweetThreadID && getDataFromFirestoreSubCollection(currentUser, tweetThreadID, 'repliedTweets', handleLoadingTweetsIDs), [])
    // console.log(repliedTweetsIDs, '<< replied tweets IDs >>', tweetThreadID, currentUser)

    let alreadyRepliedTweetsList = () => repliedTweetsIDs && repliedTweetsIDs.map((item, idx) => <RenderRepliedTweet key={item} docID={item} currentUser={currentUser} idx={idx} />)
    return (
        <div id='already-replied-tweets-wrapper'>
            {/* <RenderTweetDataComponent content={content} /> */}
            {alreadyRepliedTweetsList()}
            <div id='extra-tweet-extension-line'></div>
            {/* <RenderAddAnotherTweet /> */}
        </div>
    )
}

let RenderRepliedTweet = ({ docID, currentUser, idx }) => {
    let [dataset, setDataset] = useState(null)
    let handleDataset = (data) => setDataset(data)

    let markup = '';

    useEffect(() => {
        docID && readDocumentFromFirestoreSubCollection(currentUser, docID, handleDataset)
    }, [docID])

    if (dataset) {
        // let {created, quotedTweetID, ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = {...dataset}
        // console.log(docID, 'repliedTweetID!!', dataset, tweetText)
        // markup = <RenderTweetDataComponent content={dataset} />
        // return (markup)

        console.log('<<<<checkpoint01>>>>')

        markup = <div className='tweet-ui-wrapper'>
            <RenderTweetDataComponent content={dataset} currentUser={currentUser} fromTweetThread={true} />
            {idx == 0 && <RenderAddAnotherTweet />}
        </div>
        return (markup)
    }

    // console.log(docID, 'repliedTweetID!!', dataset, tweetText)
    return (markup)
}

let RenderAddAnotherTweet = () => {
    return (
        <div id='add-another-tweet-wrapper'>
            <img className='profile-pic' src='https://picsum.photos/200/300' />
            <div id='add-another-tweet'>Add another Tweet</div>
        </div>
    )
}

let ReplyThreadComponent = () => {
    let [clicked, setClicked] = useState(false)
    let handleClicked = () => setClicked(true)
    return (
        <div id='reply-tweet-thread-wrapper' style={{ marginBottom: '20px' }}>
            {clicked ? <AfterClickedMarkup /> : <BeforeClickedMarkup handleClicked={handleClicked} />}
        </div>
    )
}

let AfterClickedMarkup = () => {
    return (
        <div id='after-clicked-markup-wrapper'>
            <div id='replying-to'>Replying to @profile_handle</div>
            <div id='user-tweet'>
                <img className='profile-pic' src='https://picsum.photos/200/300' />
                <label htmlFor='tweet-reply' />
                <input id='tweet-reply' placeholder='Tweet your reply' />
            </div>
            <ReplyTweetBottomUI />
        </div>
    )
}

let ReplyTweetBottomUI = () => {
    let nameChecks = name => (name == 'Poll' || name == 'Schedule Tweet') ? true : false;
    let renderIcons = () => replyTweetModalIcons().map(item => !nameChecks(item.name) && <RenderIcon key={item.name} item={item} />)

    return (
        <div id='reply-tweet-modal-wrapper'>
            <div id='icons-wrapper'>{renderIcons()}</div>
            <div id='reply-btn'>Reply</div>
        </div>
    )
}

let RenderIcon = ({ item }) => {
    let [hovered, setHovered] = useState(null)
    let handleHovered = () => setHovered(item.name)
    let handleHoveredReversed = () => setHovered(null)
    return (
        <div id='icon-item-wrapper' onMouseEnter={handleHovered} onMouseLeave={handleHoveredReversed}>
            <div className='svg-icon'>{item.icon}</div>
            <div className='hoverable-text' style={{ display: hovered == item.name ? 'block' : 'none' }}>{item.name}</div>
        </div>
    )
}

let BeforeClickedMarkup = ({ handleClicked }) => {
    return (
        <div id='before-clicked-markup-wrapper'>
            <img className='profile-pic' src='https://picsum.photos/200/300' />
            <label htmlFor='reply-tweet' />
            <input type={'text'} id='reply-tweet' placeholder='Tweet your reply' onClick={handleClicked} />
            <div id='reply-btn'>Reply</div>
        </div>
    )
}

let TweetComponent = ({ tweetText, createdDate }) => {
    // console.log(new Date(createdDate.seconds))
    // converting epoch timestamp from seconds to gmt time
    let timestamp = new Date(createdDate.seconds * 1000)
    let timestampTokens = String(timestamp).split(' ').slice(1, 5)
    // console.log(timestampTokens, '?!', timestamp)
    return (
        <div id='tweet-component-wrapper'>
            <UserInfo />
            <RenderUserTweetText tweetText={tweetText || 'dummy text'} />
            <RenderTweetPostedTimestamp timestampTokens={timestampTokens} />
            <RenderTweetAnalyticsActivity />
            <RenderMoreOptions />
            <RenderTweetPrivacyAnouncement />
        </div>
    )
}

let RenderTweetPrivacyAnouncement = () => {
    return (
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

let RenderTweetPostedTimestamp = ({ timestampTokens }) => {
    console.log(timestampTokens, '<><>')
    let { timeString, dateString } = { ...formatTimeAndDate(timestampTokens) }
    return (
        <div id='timestamp-wrapper'>
            {/* <div id='timestamp'>8:50 PM · Jan 8, 2022</div> */}
            <div id='timestamp'>{timeString} - {dateString}</div>
            <div id='platform'>- Twitter Web App</div>
        </div>
    )
}

let formatTimeAndDate = timestamp => {
    let [hrs, min, sec] = [...timestamp[3].split(':')]
    let timeString = convertingTime12Hours(hrs, min);
    // console.log(timeString, '{{{{')
    let dateString = `${timestamp[0]} ${timestamp[1]}, ${timestamp[2]}`;
    // console.log(dateString, '}}{"}{}')
    return { timeString, dateString }
}

export let convertingTime12Hours = (hrs, min) => {
    let timeString = ''
    // console.log(hrs, min, sec, '?!>|')
    if (hrs > 12 && hrs < 24) {
        timeString = `${hrs - 12}:${min} PM`
    } else if (hrs == 12) {
        timeString = `${hrs}:${min} PM`
    } else if (hrs == 24) {
        timeString = `${hrs - 12}:${min} AM`
    } else {
        timeString = `${hrs}:${min} AM`
    }
    return timeString
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
    let history = useHistory()
    return (
        <div id='component-wrapper'>
            <div id='svg-icon' onClick={() => history.goBack()}>{backIcon()}</div>
            <div id='component-title'>Thread</div>
        </div>
    )
}

export let poepleMentionePrivacySvg = () => <svg className='profile-page-svg-icons'><g><path d="M17.23 8.6c0-.85-.69-1.55-1.55-1.55-.37 0-.73.14-1.02.39-.6-.45-1.54-.92-2.85-.92-2.97 0-5.12 2.45-5.12 5.84 0 2.62 1.88 4.75 4.19 4.75 1.42 0 2.48-.53 3.17-1.03.54.62 1.53 1.26 3.32 1.26.05 0 5.05-.06 5.05-5.34 0-5.75-4.67-10.42-10.42-10.42S1.58 6.25 1.58 12 6.25 22.42 12 22.42c2.18 0 3.92-.53 5.65-1.72.28-.19.48-.49.56-.86.06-.35-.01-.68-.21-.97-.19-.29-.5-.49-.85-.54-.36-.06-.72.01-.98.19-1.28.88-2.57 1.27-4.17 1.27-4.29 0-7.79-3.5-7.79-7.79S7.71 4.21 12 4.21s7.79 3.5 7.79 7.79c0 2.15-1.19 2.91-2.31 2.91 0 0-.68 0-.98-.35-.15-.17-.19-.45-.13-.82.86-4.96.86-5.06.86-5.14zm-3.5 2.53v.14c0 .73-.22 1.44-.63 2.02-.4.59-.95.91-1.6.94-1 0-1.67-.75-1.71-1.9-.03-.86.26-1.69.81-2.28.42-.45.96-.71 1.51-.73.95 0 1.57.7 1.62 1.81z"></path></g></svg>


export default ShowTweetThread

// let content = {
    //     tweetText: 'item.tweetText',
    //     extraTweet: 'item.extraTweet',
    //     gifFile: 'item.medias.gif',
    //     extraGifFile: 'item.medias.extraGif',
    //     pictureFile: 'item.medias.picture',
    //     extraPictureFile: 'item.medias.extraPicture',
    //     tweetPrivacy: 'item.privacy',
    //     firstTweetHasMedia: 'item.firstTweetHasMedia',
    //     secondTweetHasMedia: 'item.secondTweetHasMedia',
    //     tweetPoll: ['item.tweetPoll'],
    //     extraPoll: ['item.extraPoll'],
    //     scheduledTime: 'item.scheduledTimeStamp',
    //     ID: 'ID',
    //     quotedTweetID: 'item.quoteTweetID'
// }