import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RenderTweetDataComponent, sanitizeDatasetForRendering } from '..'
import { showImg } from '../..'
import ContentInComposeTweet from '../../../compose-tweet/content-in-compose-tweet'
import { downloadTweetPictureUrlFromStorage, uploadTweetPictureUrlToStorage } from '../../../firebase-storage'
import { getDataFromFirestoreSubCollection, readDocumentFromFirestoreSubCollection, updateDataInFirestore, writeDataIntoCollection } from '../../../firestore-methods'
import { UploadFile } from '../../../tweet-modal'
import EmojiPicker from '../../../tweet-modal/emoji-picker'
import GifModal from '../../../tweet-modal/gif-modal'
import { everybodyIcon, locationTagIcon, peopleIcon, replyTweetModalIcons } from '../../../tweet-modal/svg-resources'
import TweetWordCount from '../../../tweet-modal/tweet-word-count'
import { analyticsIcon, backIcon, tweetAdditionalIconsArray } from '../../profile-page/svg-resources'
import { MakeGifObjectAvailable, RenderUserTweetText } from '../reuseable-helper-functions'
import { RenderTweetBottomIcons } from '../tweet-bottom'
import TagLocation from './tag-location'

function ShowTweetThread({ quotesListFromRetweet, handleQuotedFromRetweetModal, handleReplyCount, handleQuoteTweetID, handleAnalysingTweetID, updateRepliedTweetsOnThread, updateTweetPrivacy, handlePinnedTweetID, repliedTweetsIDs, handleLoadingTweetsIDs, removeSpeceficArrayItem, threadedTweetData, currentUser, uniqueID, updateData, primaryTweetText, setPrimaryTweetText, selectedFile, setSelectedFile, selectedGif, setSelectedGif, selectedTaggedPlace, handleSelectedTaggedPlace, currentUserProfileInfo }) {
    let { hasRetweetedThread, created, quotedTweetID, ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...threadedTweetData }

    return (
        <div id='show-tweet-thread-container'>
            <HeaderComponent headerText={'Thread'} />
            {hasRetweetedThread && <RenderThreadWithExistingQuotedTweetWhenQuotedFromRetweet quotedTweetID={quotedTweetID} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} isQuotedFromRetweeted={true} currentUserProfileInfo={currentUserProfileInfo} updateTweetPrivacy={updateTweetPrivacy} handlePinnedTweetID={{handlePinnedTweetID}} removeSpeceficArrayItem={removeSpeceficArrayItem} />}
            {tweetText && <TweetComponent tweetText={tweetText} createdDate={created} handleQuoteTweetID={handleQuoteTweetID} threadedTweetData={threadedTweetData} currentUser={currentUser} currentUserProfileInfo={currentUserProfileInfo} repliedTweetsIDs={repliedTweetsIDs} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} hasRetweetedThread={hasRetweetedThread} quotesListFromRetweet={quotesListFromRetweet} handleAnalysingTweetID={handleAnalysingTweetID} tweetThreadID={ID} />}
            <ReplyThreadComponent currentUser={currentUser} threadedTweetData={threadedTweetData} uniqueID={uniqueID} repliedTweetsIDs={repliedTweetsIDs} updateData={updateData} handleLoadingTweetsIDs={handleLoadingTweetsIDs} primaryTweetText={primaryTweetText} setPrimaryTweetText={setPrimaryTweetText} selectedFile={selectedFile} setSelectedFile={setSelectedFile} selectedGif={selectedGif} setSelectedGif={setSelectedGif} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} currentUserProfileInfo={currentUserProfileInfo} />
            <RenderAlreadyRepliedTweets currentUser={currentUser} tweetThreadID={ID} repliedTweetsIDs={repliedTweetsIDs} handleLoadingTweetsIDs={handleLoadingTweetsIDs} removeSpeceficArrayItem={removeSpeceficArrayItem} handlePinnedTweetID={handlePinnedTweetID} updateTweetPrivacy={updateTweetPrivacy} updateRepliedTweetsOnThread={updateRepliedTweetsOnThread} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleReplyCount={handleReplyCount} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} />
        </div>
    )
}

export let RenderThreadWithExistingQuotedTweetWhenQuotedFromRetweet = ({ quotedTweetID, currentUser, handleAnalysingTweetID, handleQuoteTweetID, handleQuotedFromRetweetModal, isQuotedFromRetweeted, handleThreadedTweetData, currentUserProfileInfo, updateTweetPrivacy, handlePinnedTweetID, removeSpeceficArrayItem }) => {
    let [dataset, setDataset] = useState(null);
    let handleLoadingDataset = items => setDataset(items)

    useEffect(() => quotedTweetID && readDocumentFromFirestoreSubCollection(currentUser, quotedTweetID, handleLoadingDataset), [quotedTweetID])
    // console.log(dataset, 'fromThreadExistingQuote')

    return (
        dataset ? <RenderTweetDataComponent content={sanitizeDatasetForRendering(dataset)} currentUser={currentUser} isQuotedFromRetweeted={isQuotedFromRetweeted} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} updateTweetPrivacy={updateTweetPrivacy} handlePinnedTweetID={handlePinnedTweetID} removeSpeceficArrayItem={removeSpeceficArrayItem} /> : null
    )
}

let RenderAlreadyRepliedTweets = ({ currentUser, tweetThreadID, repliedTweetsIDs, handleLoadingTweetsIDs, removeSpeceficArrayItem, handlePinnedTweetID, updateTweetPrivacy, updateRepliedTweetsOnThread, handleAnalysingTweetID, handleQuoteTweetID, handleReplyCount, currentUserProfileInfo, handleQuotedFromRetweetModal }) => {
    let [lineHeight, setLineHeight] = useState(null)

    // retriving repliedTweetIDs from firestore
    useEffect(() => tweetThreadID && getDataFromFirestoreSubCollection(currentUser, tweetThreadID, 'repliedTweets', handleLoadingTweetsIDs), [])

    let alreadyRepliedTweetsList = () => repliedTweetsIDs && repliedTweetsIDs.map((item, idx) => <RenderRepliedTweet key={item} docID={item} currentUser={currentUser} idx={idx} removeSpeceficArrayItem={removeSpeceficArrayItem} handlePinnedTweetID={handlePinnedTweetID} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleReplyCount={handleReplyCount} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} setLineHeight={setLineHeight} />)

    return (
        repliedTweetsIDs?.length
        ?
        <div id='already-replied-tweets-wrapper'>
            {updateRepliedTweetsOnThread?.length ? repliedTweetsIDs.map((item, idx) => <RenderRepliedTweet key={item} docID={item} currentUser={currentUser} idx={idx} removeSpeceficArrayItem={removeSpeceficArrayItem} handlePinnedTweetID={handlePinnedTweetID} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleReplyCount={handleReplyCount} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} setLineHeight={setLineHeight} />) : null}
            {!updateRepliedTweetsOnThread ? alreadyRepliedTweetsList() : null}
            {repliedTweetsIDs && repliedTweetsIDs.length && <div id='extra-tweet-extension-line' style={{height: lineHeight && lineHeight}}></div>}
        </div>
        :
        null
    )
}

let RenderRepliedTweet = ({ docID, currentUser, idx, removeSpeceficArrayItem, handlePinnedTweetID, updateTweetPrivacy, handleAnalysingTweetID, handleQuoteTweetID, handleReplyCount, currentUserProfileInfo, handleQuotedFromRetweetModal, setLineHeight }) => {
    let [dataset, setDataset] = useState(null)

    let handleDataset = (data) => setDataset(data)

    let markup = '';

    useEffect(() => {
        docID && readDocumentFromFirestoreSubCollection(currentUser, docID, handleDataset)
    }, [docID])

    if (dataset) {
        let { created, quotedTweetID, ID, scheduledTime, tweetText, extraTweet, gifFile, extraGifFile, pictureFile, extraPictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll, extraPoll } = { ...dataset }

        markup = <div className='tweet-ui-wrapper'>
            <RenderTweetDataComponent content={sanitizeDatasetForRendering(dataset)} currentUser={currentUser} fromTweetThread={true} removeSpeceficArrayItem={removeSpeceficArrayItem} handlePinnedTweetID={handlePinnedTweetID} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} replyCount={dataset.replyCount} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} />
            {idx == 0 && <RenderAddAnotherTweet docID={docID} currentUser={currentUser} handleQuoteTweetID={handleQuoteTweetID} handleReplyCount={handleReplyCount} count={dataset.replyCount} setLineHeight={setLineHeight} currentUserProfileInfo={currentUserProfileInfo} />}
        </div>
        return (markup)
    }

    return (markup)
}

let RenderAddAnotherTweet = ({ docID, currentUser, handleQuoteTweetID, handleReplyCount, count, setLineHeight, currentUserProfileInfo }) => {
    let [clicked, setClicked] = useState(false)

    let [readyForReRoute, setReadyForReRoute] = useState(false)

    let [datasetForAddAnother, setDatasetForAddAnother] = useState(null)

    let history = useHistory(null)

    let handleDatasetForAddAnother = tweetData => {
        setDatasetForAddAnother(tweetData)
        setReadyForReRoute(true);
    }

    let handleAddAnotherTweet = () => {
        setClicked(!clicked)
    }

    useEffect(() => {
        let divEl = document.querySelector('#add-another-tweet-wrapper');
        let divEl2 = document.querySelector('.tweet-ui-wrapper');
        let heightCalc = (divEl2.clientHeight - 29) - divEl.clientHeight
        heightCalc && setLineHeight(heightCalc)
    }, [datasetForAddAnother])

    useEffect(() => datasetForAddAnother && handleQuoteTweetID(datasetForAddAnother.id), [datasetForAddAnother])

    useEffect(() => {
        clicked && docID && readDocumentFromFirestoreSubCollection(currentUser, docID, handleDatasetForAddAnother)
        !clicked && docID && datasetForAddAnother && setDatasetForAddAnother(null)
    }, [clicked])

    useEffect(() => {
        readyForReRoute && handleReplyCount(datasetForAddAnother.replyCount)
        readyForReRoute && history.push('/tweet/compose')
    }, [readyForReRoute])

    return (
        <div id='add-another-tweet-wrapper'>
            <img className='profile-pic' src={currentUserProfileInfo?.[6]?.content || 'https://picsum.photos/200/300'} />
            <div id='add-another-tweet' onClick={handleAddAnotherTweet}>Add another Tweet</div>
        </div>
    )
}

let ReplyThreadComponent = ({ currentUser, threadedTweetData, uniqueID, repliedTweetsIDs, updateData, handleLoadingTweetsIDs, primaryTweetText, setPrimaryTweetText, selectedFile, setSelectedFile, selectedGif, setSelectedGif, selectedTaggedPlace, handleSelectedTaggedPlace, currentUserProfileInfo }) => {
    let [clicked, setClicked] = useState(false)

    let handleClicked = () => setClicked(!clicked)

    return (
        <div id='reply-tweet-thread-wrapper' style={{ marginBottom: '20px' }}>
            {(clicked || primaryTweetText)
                ?
                <AfterClickedMarkup handleClicked={handleClicked} handleLoadingTweetsIDs={handleLoadingTweetsIDs} currentUser={currentUser} threadedTweetData={threadedTweetData} uniqueID={uniqueID} repliedTweetsIDs={repliedTweetsIDs} updateData={updateData} primaryTweetText={primaryTweetText} setPrimaryTweetText={setPrimaryTweetText} selectedFile={selectedFile} setSelectedFile={setSelectedFile} selectedGif={selectedGif} setSelectedGif={setSelectedGif} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} currentUserProfileInfo={currentUserProfileInfo} />
                :
                <BeforeClickedMarkup handleClicked={handleClicked} setSelectedFile={setSelectedFile} setSelectedGif={setSelectedGif} handleSelectedTaggedPlace={handleSelectedTaggedPlace} currentUserProfileInfo={currentUserProfileInfo} />}
        </div>
    )
}

let AfterClickedMarkup = ({ handleClicked, currentUser, threadedTweetData, uniqueID, repliedTweetsIDs, updateData, handleLoadingTweetsIDs, primaryTweetText, setPrimaryTweetText, selectedFile, setSelectedFile, selectedGif, setSelectedGif, selectedTaggedPlace, handleSelectedTaggedPlace, currentUserProfileInfo }) => {
    let [tweetText, setTweetText] = useState('')

    let [imgFile, setImgFile] = useState(null);

    let [gifFile, setGifFile] = useState(null)

    let [showGifPickerModal, setShowGifPickerModal] = useState(false)

    let [showTagLocationModal, setShowTagLocationModal] = useState(false)

    let handleTagLocationModal = () => setShowTagLocationModal(!showTagLocationModal)

    let handleGifFile = (gif, evt) => {
        evt.preventDefault();
        setGifFile(gif);
        setSelectedGif(gif);
        handleShowGifPickerModal();
    }

    let handleShowGifPickerModal = () => setShowGifPickerModal(!showGifPickerModal)

    let imgRef = useRef()

    let tweetTextRef = useRef()

    useEffect(() => {
        // feeding from already existing data from container component for data consistency after a route change
        setTweetText(primaryTweetText || '')
        setImgFile(selectedFile || null)
        setGifFile(selectedGif || null)
        tweetTextRef.current.focus();
    }, [])

    let handleImgFileChanges = evt => {
        setImgFile(evt.target.files[0])
        setSelectedFile(evt.target.files[0])
    }

    let handleTweetText = evt => {
        setTweetText(evt.target.value)
        setPrimaryTweetText(evt.target.value); // updating primary tweet text, which is necessary for handling this data to firestore and throughout other components
    }

    let handleUnicodeFromEmoji = data => {
        setTweetText(data)
    }

    let handleRemoveExistingText = () => {
        setTweetText('')
        setPrimaryTweetText('')

        setImgFile(null)
        setSelectedFile(null)

        setGifFile(null)
        setSelectedGif(null)

        // its safer to remove previously held tagged place data fom state variable, so that it doesnt include same tagge place info to other tweets
        handleSelectedTaggedPlace(null) // not sure it is required at this point to remove this after replying a tweet from thread
    }

    return (
        <div id='after-clicked-markup-wrapper'>
            <div id='replying-to'>Replying to @profile_handle</div>
            <div id='user-tweet'>
                <img className='profile-pic' src={currentUserProfileInfo?.[6]?.content || 'https://picsum.photos/200/300'} />
                <label htmlFor='tweet-reply' />
                <input ref={tweetTextRef} id='tweet-reply' placeholder='Tweet your reply' onChange={handleTweetText} maxLength={100} value={tweetText} />
            </div>
            {(imgFile || gifFile) && <ContentInComposeTweet selectedFile={imgFile} gifFile={gifFile} gifWidth={gifFile && 423} />}
            {showTagLocationModal && <TagLocation />}
            {selectedTaggedPlace && <ShowCurrentlyTaggedPlace selectedTaggedPlace={selectedTaggedPlace} />}
            <ReplyTweetBottomUI selectedTaggedPlace={selectedTaggedPlace} handleTagLocationModal={handleTagLocationModal} showGifPickerModal={showGifPickerModal} handleShowGifPickerModal={handleShowGifPickerModal} gifFile={gifFile} handleGifFile={handleGifFile} imgFile={imgFile} handleImgFileChanges={handleImgFileChanges} imgRef={imgRef} replyingTweetText={tweetText} handleUnicodeFromEmoji={handleUnicodeFromEmoji} cleanupRepliedTweetText={handleRemoveExistingText} handleClicked={handleClicked} handleLoadingTweetsIDs={handleLoadingTweetsIDs} currentUser={currentUser} threadedTweetData={threadedTweetData} tweetText={tweetText} uniqueID={uniqueID} repliedTweetsIDs={repliedTweetsIDs} updateData={updateData} />
        </div>
    )
}

export let ShowCurrentlyTaggedPlace = ({ selectedTaggedPlace, fromTweetModal }) => {
    let history = useHistory(null)

    let whenTaggedPlaceFounnd =
        selectedTaggedPlace.length
        &&
        selectedTaggedPlace[0]
        &&
        <div id='show-tagged-place-wrapper' onClick={() => history.push('/compose/tweet/place_picker')} style={{ marginLeft: fromTweetModal && '0px' }}>
            <div id='svg-icon'>{locationTagIcon()}</div>
            <div id='tagged-place-name'>{selectedTaggedPlace[0].name}</div>
        </div>

    return (
        selectedTaggedPlace.length == 0
            ?
            null
            :
            whenTaggedPlaceFounnd
    )
}

let ReplyTweetBottomUI = ({ selectedTaggedPlace, handleTagLocationModal, showGifPickerModal, handleShowGifPickerModal, gifFile, handleGifFile, imgFile, handleImgFileChanges, imgRef, replyingTweetText, handleUnicodeFromEmoji, cleanupRepliedTweetText, handleClicked, currentUser, threadedTweetData, tweetText, uniqueID, repliedTweetsIDs, updateData, handleLoadingTweetsIDs }) => {
    let [showEmojiPicker, setShowEmojiPicker] = useState(false);

    let [isUploadPictureToStorageDone, setIsUploadPictureToStorageDone] = useState(false)
    let [imgFileUrl, setImgFileUrl] = useState(null)

    let handleImgFileUrl = value => setImgFileUrl(value)

    let handleDoneStorageUpload = () => setIsUploadPictureToStorageDone(true)

    let handleShowEmojiPicker = () => setShowEmojiPicker(!showEmojiPicker)

    // needs to use a writeDataIntoFirestore along with updateDataIntoFirestore to update replyCount and recently replied tweet ID to repliedTweetIDs
    let handleInThreadReply = () => {
        if (!imgFile) {
            theseHappensInEveryInThreadReplies();
            writeDataIntoCollection({ tweetText: tweetText, quoteTweetID: threadedTweetData.ID, tweetPrivacy: threadedTweetData.tweetPrivacy, extraPoll: [{ choice01: '', choice02: '', choice03: '', choice04: '' }], tweetPoll: [{ choice01: '', choice02: '', choice03: '', choice04: '' }], extraTweet: null, gifItem: gifFile && gifFile, extraGifItem: null, imgFile: imgFile, extraImgFile: null, firstTweetHasMedia: null, secondTweetHasMedia: null, scheduledTimeStamp: null, selectedTaggedPlace: selectedTaggedPlace }, uniqueID, null, updateData, currentUser)
        } else if (imgFile) {
            // uploading picture to storage
            uploadTweetPictureUrlToStorage(imgFile, uniqueID, handleDoneStorageUpload)
        }
    }

    useEffect(() => {
        isUploadPictureToStorageDone && downloadTweetPictureUrlFromStorage(uniqueID, handleImgFileUrl)
    }, [isUploadPictureToStorageDone])

    // its now creating a new tweet entry, but in thread only tweet text is showing up but no media file!!
    useEffect(() => {
        if (imgFileUrl) {
            theseHappensInEveryInThreadReplies();
            writeDataIntoCollection({ tweetText: tweetText, quoteTweetID: threadedTweetData.ID, tweetPrivacy: threadedTweetData.tweetPrivacy, extraPoll: [{ choice01: '', choice02: '', choice03: '', choice04: '' }], tweetPoll: [{ choice01: '', choice02: '', choice03: '', choice04: '' }], extraTweet: null, gifItem: null, extraGifItem: null, imgFile: imgFileUrl, extraImgFile: null, firstTweetHasMedia: null, secondTweetHasMedia: null, scheduledTimeStamp: null }, uniqueID, null, updateData, currentUser)
        }
    }, [imgFileUrl])

    let theseHappensInEveryInThreadReplies = () => {
        updateDataInFirestore(currentUser, threadedTweetData.ID, { replyCount: Number(repliedTweetsIDs.length + 1) })
        updateDataInFirestore(currentUser, threadedTweetData.ID, { repliedTweets: [...repliedTweetsIDs, uniqueID] })
        handleLoadingTweetsIDs(prevIDs => [...prevIDs, uniqueID])
        handleClicked()
        cleanupRepliedTweetText()
    }

    let nameChecks = name => (name == 'Poll' || name == 'Schedule Tweet') ? true : false;
    let renderIcons = () => replyTweetModalIcons().map(item => !nameChecks(item.name) && <RenderIcon key={item.name} item={item} handleShowEmojiPicker={handleShowEmojiPicker} imgRef={imgRef} handleShowGifPickerModal={handleShowGifPickerModal} handleTagLocationModal={handleTagLocationModal} />)

    return (
        <div id='reply-tweet-modal-wrapper'>
            <div id='icons-wrapper'>{renderIcons()}</div>
            {showEmojiPicker && <EmojiPicker tweetText={replyingTweetText} setTweetText={handleUnicodeFromEmoji} isIconClicked={showEmojiPicker} />}
            {showGifPickerModal && <GifModal onGifClick={handleGifFile} isGifIconClicked={showGifPickerModal} gridWidth={760} />}
            <UploadFile chnageHandler={handleImgFileChanges} inputRef={imgRef} />
            {replyingTweetText && replyingTweetText.length && <TweetWordCount wordCount={replyingTweetText.length} />}
            <div id='reply-btn' onClick={replyingTweetText.length ? handleInThreadReply : null}>Reply</div>
        </div>
    )
}

let RenderIcon = ({ item, handleTagLocationModal, handleShowEmojiPicker, imgRef, handleShowGifPickerModal }) => {
    let [hovered, setHovered] = useState(null)
    let history = useHistory(null)

    let handleClicked = () => {
        if (item.name == 'Tag Location') history.push('/compose/tweet/place_picker')
        if (item.name == 'GIF') handleShowGifPickerModal()
        if (item.name == 'media') imgRef.current.click()
        item.name == 'emoji' && handleShowEmojiPicker()
    }
    let handleHovered = () => setHovered(item.name)
    let handleHoveredReversed = () => setHovered(null)

    return (
        <div id='icon-item-wrapper' onMouseEnter={handleHovered} onMouseLeave={handleHoveredReversed} onClick={handleClicked}>
            <div className='svg-icon' style={{ fill: 'rgb(29, 155, 240)' }}>{item.icon}</div>
            <div className='hoverable-text' style={{ display: hovered == item.name ? 'block' : 'none' }}>{item.name}</div>
        </div>
    )
}

let BeforeClickedMarkup = ({ handleClicked, currentUserProfileInfo }) => {
    return (
        <div id='before-clicked-markup-wrapper'>
            <img className='profile-pic' src={currentUserProfileInfo?.[6]?.content || 'https://picsum.photos/200/300'} />
            <label htmlFor='reply-tweet' />
            <input type={'text'} id='reply-tweet' placeholder='Tweet your reply' onClick={handleClicked} />
            <div id='reply-btn'>Reply</div>
        </div>
    )
}

export let convertTimestampIntoTokens = createdTime => {
    let timestamp = new Date(createdTime * 1000)
    let timestampTokens = String(timestamp).split(' ').slice(1, 5)
    return timestampTokens;
}

let TweetComponent = ({ tweetText, createdDate, handleQuoteTweetID, threadedTweetData, currentUser, handleReplyCount, currentUserProfileInfo, repliedTweetsIDs, handleQuotedFromRetweetModal, hasRetweetedThread, quotesListFromRetweet, handleAnalysingTweetID, tweetThreadID }) => {

    return (
        <div id='tweet-component-wrapper'>
            <UserInfo currentUserProfileInfo={currentUserProfileInfo} />
            <RenderUserTweetText tweetText={tweetText || 'dummy text'} />
            <RenderTweetMediaFiles tweetData={threadedTweetData} />
            <RenderTweetPostedTimestamp timestampTokens={convertTimestampIntoTokens(createdDate.seconds)} fromTweetThread={true} />
            <RenderTweetAnalyticsActivity handleAnalysingTweetID={handleAnalysingTweetID} tweetThreadID={tweetThreadID} />
            {hasRetweetedThread && <RenderThreadQuoteCount handleQuoteTweetID={handleQuoteTweetID} threadedTweetData={threadedTweetData} />}
            <RenderMoreOptions handleQuoteTweetID={handleQuoteTweetID} threadedTweetData={threadedTweetData} currentUser={currentUser} handleReplyCount={handleReplyCount} repliedTweetsIDs={repliedTweetsIDs} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} quotesListFromRetweet={quotesListFromRetweet} />
            <RenderTweetPrivacyAnouncement tweetPrivacy={threadedTweetData.tweetPrivacy} profileName={currentUserProfileInfo[0].content} />
        </div>
    )
}

let RenderThreadQuoteCount = ({ quoteCount, handleQuoteTweetID, threadedTweetData }) => {
    let history = useHistory(null)
    let handleClick = () => {
        handleQuoteTweetID(threadedTweetData.ID)
        history.push('/retweets/with_comments/')
    }
    return (
        <div id='thread-quote-count-wrapper' onClick={handleClick}>{quoteCount || 1} Quote Tweet</div>
    )
}

let RenderTweetMediaFiles = ({ tweetData }) => {
    let mediaFile;
    mediaFile = tweetData.picture ? showImg(tweetData.picture) : tweetData.gifFile && <MakeGifObjectAvailable gifId={tweetData.gifFile} />
    return (
        <div id='tweet-media-files-wrapper'>{mediaFile}</div>
    )
}

let RenderTweetPrivacyAnouncement = ({ tweetPrivacy, profileName }) => {

    let decideSvg = () => tweetPrivacy == '01' ? everybodyIcon() : tweetPrivacy == '02' ? peopleIcon('rgb(29, 155, 240)') : tweetPrivacy == '03' && poepleMentionePrivacySvg('rgb(29, 155, 240)')

    let privacyText = () => tweetPrivacy == '01' ? '' : 'You can reply'

    let privacySubtext = () => tweetPrivacy == '01' ? '' : tweetPrivacy == '02' ? 'follow' : tweetPrivacy == '03' && 'mentioned'

    return (
        <div id='privacy-announcement-wrapper'>
            {decideSvg()}
            <div id='announcement-texts'>
                <div id='privacy-type-text'>{privacyText()}</div>
                <div id='privacy-sub-text'>{profileName || User} @profile_handle {privacySubtext()} can reply</div>
            </div>
        </div>
    )
}

let RenderTweetAnalyticsActivity = ({handleAnalysingTweetID, tweetThreadID}) => {
    let history = useHistory(null)
    let handleClick = () => {
        handleAnalysingTweetID(tweetThreadID)
        history.push(history.push('/analytics'))
    }
    return (
        <div id='analytics-activity-wrapper' onClick={handleClick}>
            <div id='svg-icon'>{analyticsIcon()}</div>
            <div id='actitvity-text'>View Tweet activity</div>
        </div>
    )
}

export let RenderTweetPostedTimestamp = ({ timestampTokens, fromTweetThread }) => {
    let { timeString, dateString } = { ...formatTimeAndDate(timestampTokens) }
    return (
        <div id='timestamp-wrapper'>
            <div id='timestamp'>{timeString} - {dateString}</div>
            {fromTweetThread && <div id='platform'>- Twitter Web App</div>}
        </div>
    )
}

let formatTimeAndDate = timestamp => {
    let [hrs, min, sec] = [...timestamp[3].split(':')]
    let timeString = convertingTime12Hours(hrs, min);
    let dateString = `${timestamp[0]} ${timestamp[1]}, ${timestamp[2]}`;
    return { timeString, dateString }
}

export let convertingTime12Hours = (hrs, min) => {
    let timeString = ''
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

let RenderMoreOptions = ({ handleQuoteTweetID, threadedTweetData, currentUser, handleReplyCount, repliedTweetsIDs, handleQuotedFromRetweetModal, quotesListFromRetweet }) => {
    let renderOptions = tweetAdditionalIconsArray.map(elem => elem.id != 'analytics' && <RenderTweetBottomIcons key={elem.id} elem={elem} handleQuoteTweetID={handleQuoteTweetID} tweetData={threadedTweetData} currentUser={currentUser} repliedTweetsIDs={repliedTweetsIDs} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} quotesListFromRetweet={quotesListFromRetweet} />)
    return <div id='more-options-wrapper'>{renderOptions}</div>
}

let UserInfo = ({ currentUserProfileInfo }) => {
    return (
        <div id='user-info-wrapper'>
            <img className='profile-pic' src={currentUserProfileInfo?.[6].content || 'https://picsum.photos/200/300'} />
            <div id='profile-info'>
                <div id='profile-name'>{currentUserProfileInfo[0].content}</div>
                <div id='profile-handle'>Profile Handle</div>
            </div>
        </div>
    )
}

export let HeaderComponent = ({ headerText }) => {
    let history = useHistory()
    return (
        <div id='component-wrapper'>
            <div id='svg-icon' onClick={() => history.goBack()} style={{transform: 'scale(1.5)'}} >{backIcon()}</div>
            <div id='component-title'>{headerText}</div>
        </div>
    )
}

export let poepleMentionePrivacySvg = (color) => <svg className='profile-page-svg-icons' fill={color && color}><g><path d="M17.23 8.6c0-.85-.69-1.55-1.55-1.55-.37 0-.73.14-1.02.39-.6-.45-1.54-.92-2.85-.92-2.97 0-5.12 2.45-5.12 5.84 0 2.62 1.88 4.75 4.19 4.75 1.42 0 2.48-.53 3.17-1.03.54.62 1.53 1.26 3.32 1.26.05 0 5.05-.06 5.05-5.34 0-5.75-4.67-10.42-10.42-10.42S1.58 6.25 1.58 12 6.25 22.42 12 22.42c2.18 0 3.92-.53 5.65-1.72.28-.19.48-.49.56-.86.06-.35-.01-.68-.21-.97-.19-.29-.5-.49-.85-.54-.36-.06-.72.01-.98.19-1.28.88-2.57 1.27-4.17 1.27-4.29 0-7.79-3.5-7.79-7.79S7.71 4.21 12 4.21s7.79 3.5 7.79 7.79c0 2.15-1.19 2.91-2.31 2.91 0 0-.68 0-.98-.35-.15-.17-.19-.45-.13-.82.86-4.96.86-5.06.86-5.14zm-3.5 2.53v.14c0 .73-.22 1.44-.63 2.02-.4.59-.95.91-1.6.94-1 0-1.67-.75-1.71-1.9-.03-.86.26-1.69.81-2.28.42-.45.96-.71 1.51-.73.95 0 1.57.7 1.62 1.81z"></path></g></svg>


export default ShowTweetThread