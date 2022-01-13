import { Gif } from '@giphy/react-components'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RenderTweetDataComponent, sanitizeDatasetForRendering } from '..'
import ContentInComposeTweet from '../../../compose-tweet/content-in-compose-tweet'
import { downloadTweetPictureUrlFromStorage, uploadTweetPictureUrlToStorage } from '../../../firebase-storage'
import { getDataFromFirestoreSubCollection, readDocumentFromFirestoreSubCollection, updateDataInFirestore, writeDataIntoCollection } from '../../../firestore-methods'
import { tweetPrivacySelected01, UploadFile, GridDemo } from '../../../tweet-modal'
import EmojiPicker from '../../../tweet-modal/emoji-picker'
import { replyTweetModalIcons } from '../../../tweet-modal/svg-resources'
import TweetWordCount from '../../../tweet-modal/tweet-word-count'
import { analyticsIcon, backIcon, tweetAdditionalIconsArray } from '../../profile-page/svg-resources'
import { RenderUserTweetText } from '../reuseable-helper-functions'
import { RenderTweetBottomIcons } from '../tweet-bottom'

function ShowTweetThread({ threadedTweetData, currentUser, uniqueID, updateData }) {
    let { created, quotedTweetID, ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...threadedTweetData }
    let [repliedTweetsIDs, setRepliedTweetsIDs] = useState(null)    

    // let [clicked, setClicked] = useState(false)
    // let handleClicked = () => setClicked(!clicked)
    let handleLoadingTweetsIDs = data => setRepliedTweetsIDs(data)
    console.log(ID, tweetText, tweetPrivacy, created, uniqueID, '::::', threadedTweetData)
    return (
        <div id='show-tweet-thread-container'>
            <HeaderComponent />
            {tweetText && <TweetComponent tweetText={tweetText} createdDate={created} />}
            <ReplyThreadComponent currentUser={currentUser} threadedTweetData={threadedTweetData} uniqueID={uniqueID} repliedTweetsIDs={repliedTweetsIDs} updateData={updateData} handleLoadingTweetsIDs={handleLoadingTweetsIDs} />
            <RenderAlreadyRepliedTweets currentUser={currentUser} tweetThreadID={ID} repliedTweetsIDs={repliedTweetsIDs} handleLoadingTweetsIDs={handleLoadingTweetsIDs} />
        </div>
    )
}

let RenderAlreadyRepliedTweets = ({ currentUser, tweetThreadID, repliedTweetsIDs, handleLoadingTweetsIDs }) => {
    // let [repliedTweetsIDs, setRepliedTweetsIDs] = useState(null)
    // let handleLoadingTweetsIDs = data => setRepliedTweetsIDs(data)
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
        let {created, quotedTweetID, ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = {...dataset}
        // console.log(docID, 'repliedTweetID!!', dataset, tweetText, )
        // markup = <RenderTweetDataComponent content={dataset} />
        // return (markup)

        console.log('<<<<checkpoint01>>>>', dataset)

        markup = <div className='tweet-ui-wrapper'>
            <RenderTweetDataComponent content={sanitizeDatasetForRendering(dataset)} currentUser={currentUser} fromTweetThread={true} />
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

let ReplyThreadComponent = ({ currentUser, threadedTweetData, uniqueID, repliedTweetsIDs, updateData, handleLoadingTweetsIDs}) => {
    let [clicked, setClicked] = useState(false)

    let handleClicked = () => setClicked(!clicked)
    
    return (
        <div id='reply-tweet-thread-wrapper' style={{ marginBottom: '20px' }}>
            {clicked ? <AfterClickedMarkup handleClicked={handleClicked} handleLoadingTweetsIDs={handleLoadingTweetsIDs} currentUser={currentUser} threadedTweetData={threadedTweetData} uniqueID={uniqueID} repliedTweetsIDs={repliedTweetsIDs} updateData={updateData} /> : <BeforeClickedMarkup handleClicked={handleClicked} />}
        </div>
    )
}

let AfterClickedMarkup = ({handleClicked, currentUser, threadedTweetData, uniqueID, repliedTweetsIDs, updateData, handleLoadingTweetsIDs}) => {
    let [tweetText, setTweetText] = useState('')

    let [imgFile, setImgFile] = useState(null);

    let [gifFile, setGifFile] = useState(null)

    let [showGifPickerModal, setShowGifPickerModal] = useState(false)

    let handleGifFile = (gif, evt) => {
        evt.preventDefault();
        setGifFile(gif)
        handleShowGifPickerModal();
    }

    let handleShowGifPickerModal = () => setShowGifPickerModal(!showGifPickerModal)
    
    let imgRef = useRef()

    let handleImgFileChanges = evt => setImgFile(evt.target.files[0])
    
    let handleTweetText = evt => setTweetText(evt.target.value)
    
    let handleUnicodeFromEmoji = data => {
        setTweetText(data)
        // console.log(data, '<<<<data>>>>>')
    }

    let handleRemoveExistingText = () => {
        setTweetText('')
        // console.log('<hererererer>')
    }

    return (
        <div id='after-clicked-markup-wrapper'>
            <div id='replying-to'>Replying to @profile_handle</div>
            <div id='user-tweet'>
                <img className='profile-pic' src='https://picsum.photos/200/300' />
                <label htmlFor='tweet-reply' />
                <input id='tweet-reply' placeholder='Tweet your reply' onChange={handleTweetText} maxLength={100} value={tweetText} />
            </div>
            {(imgFile || gifFile) && <ContentInComposeTweet selectedFile={imgFile} gifFile={gifFile} gifWidth={gifFile && 423} />}
            <ReplyTweetBottomUI showGifPickerModal={showGifPickerModal} handleShowGifPickerModal={handleShowGifPickerModal} gifFile={gifFile} handleGifFile={handleGifFile} imgFile={imgFile} handleImgFileChanges={handleImgFileChanges} imgRef={imgRef} replyingTweetText={tweetText} handleUnicodeFromEmoji={handleUnicodeFromEmoji} cleanupRepliedTweetText={handleRemoveExistingText} handleClicked={handleClicked} handleLoadingTweetsIDs={handleLoadingTweetsIDs} currentUser={currentUser} threadedTweetData={threadedTweetData} tweetText={tweetText} uniqueID={uniqueID} repliedTweetsIDs={repliedTweetsIDs} updateData={updateData} />
        </div>
    )
}

let ReplyTweetBottomUI = ({showGifPickerModal, handleShowGifPickerModal, gifFile, handleGifFile, imgFile, handleImgFileChanges, imgRef, replyingTweetText, handleUnicodeFromEmoji, cleanupRepliedTweetText, handleClicked, currentUser, threadedTweetData, tweetText, uniqueID, repliedTweetsIDs, updateData, handleLoadingTweetsIDs}) => {
    let [showEmojiPicker, setShowEmojiPicker] = useState(false);
    // let [showGifPickerModal, setShowGifPickerModal] = useState(false)
    let [isUploadPictureToStorageDone, setIsUploadPictureToStorageDone] = useState(false)
    let [imgFileUrl, setImgFileUrl] = useState(null)
    // let [gifFile, setGifFile] = useState(null)

    // let handleGifFile = (gif, evt) => {
    //     evt.preventDefault();
    //     setGifFile(gif)
    //     handleShowGifPickerModal();
    // }
    
    // let handleShowGifPickerModal = () => setShowGifPickerModal(!showGifPickerModal)

    let handleImgFileUrl = value => setImgFileUrl(value)

    let handleDoneStorageUpload = () => setIsUploadPictureToStorageDone(true)

    let handleShowEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker)
    
    // needs to use a writeDataIntoFirestore along with updateDataIntoFirestore to update replyCount and recently replied tweet ID to repliedTweetIDs
    let handleInThreadReply = () => {
        if(!imgFile) {
            // console.log('??!!', gifFile)
            theseHappensInEveryInThreadReplies();
            writeDataIntoCollection({tweetText: tweetText, quoteTweetID: threadedTweetData.ID, tweetPrivacy: threadedTweetData.tweetPrivacy, extraPoll:[{choice01: '', choice02: '', choice03: '', choice04: ''}], tweetPoll: [{choice01: '', choice02: '', choice03: '', choice04: ''}], extraTweet: null, gifItem: gifFile && gifFile, extraGifItem: null, imgFile: imgFile, extraImgFile: null, firstTweetHasMedia: null, secondTweetHasMedia: null, scheduledTimeStamp: null}, uniqueID, null, updateData, currentUser )
            // console.log(gifFile, '<<fromgif>>', gifFile.id)
        } else if (imgFile) {
            // uploading picture to storage
            uploadTweetPictureUrlToStorage(imgFile, uniqueID, handleDoneStorageUpload)
        } 
        // else if(gifFile) {
        //     console.log(gifFile, '<<fromgif>>', gifFile.id)
        //     theseHappensInEveryInThreadReplies();
        //     writeDataIntoCollection({tweetText: tweetText, quoteTweetID: threadedTweetData.ID, tweetPrivacy: threadedTweetData.tweetPrivacy, extraPoll:[{choice01: '', choice02: '', choice03: '', choice04: ''}], tweetPoll: [{choice01: '', choice02: '', choice03: '', choice04: ''}], extraTweet: null, gifItem: gifFile && gifFile.id, extraGifItem: null, imgFile: imgFile, extraImgFile: null, firstTweetHasMedia: null, secondTweetHasMedia: null, scheduledTimeStamp: null}, uniqueID, null, updateData, currentUser )
        // }
    }

    // gifFile && console.log(gifFile, '<<fromgif>>')

    useEffect(() => {
        isUploadPictureToStorageDone && downloadTweetPictureUrlFromStorage(uniqueID, handleImgFileUrl )
    }, [isUploadPictureToStorageDone])
    
    // its now creating a new tweet entry, but in thread only tweet text is showing up but no media file!!
    useEffect(() => {
        // imgFileUrl && console.log('ready, roll')
        if(imgFileUrl) {
            // console.log('ready, roll')
            theseHappensInEveryInThreadReplies();
            writeDataIntoCollection({tweetText: tweetText, quoteTweetID: threadedTweetData.ID, tweetPrivacy: threadedTweetData.tweetPrivacy, extraPoll:[{choice01: '', choice02: '', choice03: '', choice04: ''}], tweetPoll: [{choice01: '', choice02: '', choice03: '', choice04: ''}], extraTweet: null, gifItem: null, extraGifItem: null, imgFile: imgFileUrl, extraImgFile: null, firstTweetHasMedia: null, secondTweetHasMedia: null, scheduledTimeStamp: null}, uniqueID, null, updateData, currentUser )
        }
    }, [imgFileUrl])

    let theseHappensInEveryInThreadReplies = () => {
        updateDataInFirestore(currentUser, threadedTweetData.ID, {replyCount: Number(repliedTweetsIDs.length + 1)})
        updateDataInFirestore(currentUser, threadedTweetData.ID, {repliedTweets: [...repliedTweetsIDs, uniqueID]})
        handleLoadingTweetsIDs(prevIDs => [...prevIDs, uniqueID])
        handleClicked()
        cleanupRepliedTweetText()
    }

    let nameChecks = name => (name == 'Poll' || name == 'Schedule Tweet') ? true : false;
    let renderIcons = () => replyTweetModalIcons().map(item => !nameChecks(item.name) && <RenderIcon key={item.name} item={item} handleShowEmojiPicker={handleShowEmojiPicker} imgRef={imgRef} handleShowGifPickerModal={handleShowGifPickerModal} />)

    return (
        <div id='reply-tweet-modal-wrapper'>
            <div id='icons-wrapper'>{renderIcons()}</div>
            {showEmojiPicker && <EmojiPicker tweetText={replyingTweetText} setTweetText={handleUnicodeFromEmoji} isIconClicked={showEmojiPicker} />}
            {showGifPickerModal && <GridDemo onGifClick={handleGifFile} isGifIconClicked={showGifPickerModal}  />}
            <UploadFile chnageHandler={handleImgFileChanges} inputRef={imgRef} />
            {/* {gifFile && <Gif width={461} height={290} gif={gifFile} />} */}
            {replyingTweetText && replyingTweetText.length && <TweetWordCount wordCount={replyingTweetText.length} />}
            <div id='reply-btn' onClick={replyingTweetText.length ? handleInThreadReply : null}>Reply</div>
        </div>
    )
}

let RenderIcon = ({ item, handleShowEmojiPicker, imgRef, handleShowGifPickerModal }) => {
    let [hovered, setHovered] = useState(null)
    // let [clicked, setClicked] = useState(null)
    let handleClicked = () => {
        // console.log(item.name)
        // setClicked(item.name)
        if(item.name == 'GIF') handleShowGifPickerModal()
        if(item.name == 'media') imgRef.current.click()
        item.name == 'emoji' && handleShowEmojiPicker()
    }
    let handleHovered = () => setHovered(item.name)
    let handleHoveredReversed = () => setHovered(null)
    
    // useEffect(() => {
    //     if(clicked == 'media') {
    //         console.log('todo....media')
    //     } else if(clicked == 'GIF') {
    //         console.log('todo....gif')
    //     } else if(clicked == 'emoji') {
    //         console.log('todo....emoji')
    //         handleShowEmojiPicker()
    //     } else if(clicked == 'Tag Location') {
    //         console.log('todo.... tagLocation')
    //     }
    // }, [clicked])

    return (
        <div id='icon-item-wrapper' onMouseEnter={handleHovered} onMouseLeave={handleHoveredReversed} onClick={handleClicked}>
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