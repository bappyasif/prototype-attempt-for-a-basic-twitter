import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { downloadTweetPictureUrlFromStorage, testUploadBlobFile, uploadTweetPictureUrlToStorage } from '../firebase-storage';
import { updateDataInFirestore, writeDataIntoCollection } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({ updateSomeDataInUserDocs, removeFromLikedTweets, handleLikedTweets, hideFirstPollReply, handleRepliedTweets, quotesListFromRetweet, handleQuotesListFromRetweet, quotedFromRetweetModal, handleQuotedFromRetweetModal, currentUserProfileInfo, setPrimaryTweetText, setExtraTweetText, selectedTaggedPlace, repliedTweets, handleThreadedTweetData, handlePollVotesCount, currentlyPinnedTweetID, showPinnedTweetTag, handlePinnedTweetID, handleReplyCount, replyCount, quoteTweetID, quoteTweetData, handleQuoteTweetID, handleAnalysingTweetID, updateTweetPrivacy, removeSpeceficArrayItem, setScheduledTimeStamp, scheduledTimeStamp, currentUser, handleUpdateStatus, firstTweetHasMedia, setFirstTweetHasMedia, secondTweetHasMedia, setSecondTweetHasMedia, updateData, newID, uniqueID, setChangeLayout, newDataStatus, setNewDataStatus, selectedFile, extraSelectedFile, setSelectedFile, setExtraSelectedFile, gifFile, extraGifFile, setGifFile, setExtraGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, inputTextChoice05, setInputTextChoice05, inputTextChoice06, setInputTextChoice06, inputTextChoice07, setInputTextChoice07, inputTextChoice08, setInputTextChoice08 }) {
    let [pictureUrl, setPictureUrl] = useState('');

    let [extraPictureUrl, setExtraPictureUrl] = useState('');

    let [doneUploading, setDoneUploading] = useState(false);

    let [doneExtraUrlUploading, setDoneExtraUrlUploading] = useState(false);
    
    let updatePictureUploadingStatus = () => {
        setDoneUploading(true);
    }

    let updateExtraPictureUploadingStatus = () => setDoneExtraUrlUploading(true);
    
    let setUrl = (url) => {
        setPictureUrl(url);
    }

    let setExtraUrl = url => setExtraPictureUrl(url);

    useEffect(() => {
        doneUploading && downloadTweetPictureUrlFromStorage(uniqueID, setUrl);
    }, [doneUploading])

    useEffect(() => {
        doneExtraUrlUploading && downloadTweetPictureUrlFromStorage(uniqueID, setExtraUrl, 'extra');
    }, [doneExtraUrlUploading])

    // using for image element
    useEffect(() => {
        pictureUrl && !extraSelectedFile && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: pictureUrl, extraImgFile: extraPictureUrl, gifItem: gifFile, extraGifItem: extraGifFile, scheduledTimeStamp: scheduledTimeStamp, quoteTweetID:  quoteTweetID, selectedTaggedPlace: selectedTaggedPlace, retweetedQuote: quotedFromRetweetModal, listOfRetweetedQuotes: [] }, uniqueID, newDataStatus, updateData, currentUser);
        if(tweetPublishReady && pictureUrl && !extraSelectedFile ) {
            cleanupDetails()
        }
    }, [pictureUrl])

    // using effect for extra img element
    useEffect(() => {
        pictureUrl && extraPictureUrl && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: pictureUrl && pictureUrl, extraImgFile: extraPictureUrl && extraPictureUrl, gifItem: gifFile, extraGifItem: extraGifFile, scheduledTimeStamp: scheduledTimeStamp, quoteTweetID:  quoteTweetID, selectedTaggedPlace: selectedTaggedPlace, retweetedQuote: quotedFromRetweetModal, listOfRetweetedQuotes: [] }, uniqueID, newDataStatus, updateData, currentUser);
        !pictureUrl && extraPictureUrl && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: pictureUrl && pictureUrl, extraImgFile: extraPictureUrl && extraPictureUrl, gifItem: gifFile, extraGifItem: extraGifFile, scheduledTimeStamp: scheduledTimeStamp, quoteTweetID:  quoteTweetID, selectedTaggedPlace: selectedTaggedPlace, retweetedQuote: quotedFromRetweetModal, listOfRetweetedQuotes: [] }, uniqueID, newDataStatus, updateData, currentUser);
        if(pictureUrl && extraPictureUrl && tweetPublishReady) {
            cleanupDetails()
        }
    }, [extraPictureUrl])

    // initlal calls
    useEffect(() => {
        setChangeLayout(false);
        selectedFile && uploadTweetPictureUrlToStorage(selectedFile, uniqueID, updatePictureUploadingStatus);
        extraSelectedFile && uploadTweetPictureUrlToStorage(extraSelectedFile, uniqueID, updateExtraPictureUploadingStatus, 'extra');
    }, [])

    useEffect(() => {
        tweetPublishReady && quoteTweetID && updateDataInFirestore(currentUser, quoteTweetID, {replyCount: Number(replyCount + 1)});
    }, [tweetPublishReady])

    let cleanupDetails = () => {
        setNewDataStatus(false);
        setScheduledTimeStamp('');
        setPrimaryTweetText('');
        setExtraTweetText('');

        setSelectedFile('');
        setExtraSelectedFile('');
        setGifFile('');
        setExtraGifFile('');
        
        setInputTextChoice01('');
        setInputTextChoice02('');
        setInputTextChoice03('');
        setInputTextChoice04('');

        setInputTextChoice05('');
        setInputTextChoice06('');
        setInputTextChoice07('');
        setInputTextChoice08('');
    }


    // when there is new data to store in firestore and render on DOM
    useEffect(() => {        
        if (!(selectedFile || extraSelectedFile)) {
            newDataStatus && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, hideTweet: inputTextChoice01 && !repliedTweets ? true : false, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, gifItem: gifFile, extraGifItem: extraGifFile, scheduledTimeStamp: scheduledTimeStamp, quoteTweetID:  quoteTweetID, selectedTaggedPlace: selectedTaggedPlace, retweetedQuote: quotedFromRetweetModal, listOfRetweetedQuotes: [] }, uniqueID, newDataStatus, updateData, currentUser);
            cleanupDetails()
            // inputTextChoice01 && repliedTweets.length == 0 ? true : false
        }

        // when there is a tweet quoted by user, and posted it on profile, updating that count on Firestore
        repliedTweets && !quotedFromRetweetModal && newDataStatus && quoteTweetID && updateDataInFirestore(currentUser, quoteTweetID, {replyCount: repliedTweets ? (repliedTweets.length + 1) : 0});
        
        !quotedFromRetweetModal && newDataStatus && quoteTweetID && repliedTweets && updateDataInFirestore(currentUser, quoteTweetID, {repliedTweets: repliedTweets.length ? [...repliedTweets, uniqueID] : [uniqueID]});
        
        quotedFromRetweetModal && newDataStatus && quoteTweetID && updateDataInFirestore(currentUser, quoteTweetID, {listOfRetweetedQuotes: quotesListFromRetweet ? [...quotesListFromRetweet, uniqueID] : [uniqueID]});

        // updating listOfRetweetedCounts in userDocs for DOM
        quotedFromRetweetModal && newDataStatus && quoteTweetID && updateSomeDataInUserDocs(quoteTweetID, 'listOfRetweetedQuotes', quotesListFromRetweet ? [...quotesListFromRetweet, uniqueID] : [uniqueID])
        
        // updating retweetable quote status for retweeted quoted tweet ID bearing document  (its rather useful for retweet with comment tweet which is about to be created)
        // quotedFromRetweetModal && newDataStatus && quoteTweetID && updateDataInFirestore(currentUser, quoteTweetID, {retweetedQuote: quotedFromRetweetModal})

        // updating retweetable quote status in user docs too for DOM rendering cycle after creation (userdocs gets it from tweet creation by default so no need to manually update this from here)
        // quotedFromRetweetModal && newDataStatus && quoteTweetID && updateSomeDataInUserDocs(uniqueID, 'retweetedQuote', quotedFromRetweetModal)

        // resetting previous reply count to zero, so that it doesnt invoke route forwarding from tweet bottom 'who can reply' functionality
        quoteTweetID && handleReplyCount(0);

        // making previously held quoteTweetID reset to null
        newDataStatus && quoteTweetID && handleQuoteTweetID(false);

        // quotedFromRetweetModal && newDataStatus && quoteTweetID && console.log(repliedTweets,'repliedTweets!!??', quotesListFromRetweet)
        repliedTweets && !quotedFromRetweetModal && newDataStatus && quoteTweetID && updateSomeDataInUserDocs(quoteTweetID, 'replyCount', repliedTweets.length + 1)

        // neutralize previous tweet state variables values
        quotedFromRetweetModal && handleQuotedFromRetweetModal();
        quotesListFromRetweet && handleQuotesListFromRetweet([]);        
    }, [tweetPublishReady])

    return (
        <div id='user-profile-page-container'>
            {tweetData && <AllTweetsPage
                currentUser={currentUser}
                removeSpeceficArrayItem={removeSpeceficArrayItem}
                updateTweetPrivacy={updateTweetPrivacy}
                handleAnalysingTweetID={handleAnalysingTweetID}
                handleQuoteTweetID={handleQuoteTweetID}
                quoteTweetData={quoteTweetData}
                handleReplyCount={handleReplyCount}
                replyCount={replyCount}
                handlePinnedTweetID={handlePinnedTweetID}
                showPinnedTweetTag={showPinnedTweetTag}
                currentlyPinnedTweetID={currentlyPinnedTweetID}
                handlePollVotesCount={handlePollVotesCount}
                handleThreadedTweetData={handleThreadedTweetData}
                currentUserProfileInfo={currentUserProfileInfo}
                handleQuotedFromRetweetModal={handleQuotedFromRetweetModal}
                hideFirstPollReply={hideFirstPollReply}
                handleLikedTweets={handleLikedTweets}
                removeFromLikedTweets={removeFromLikedTweets}
                tweetData={tweetData || []}
            />
            }
        </div>
    )
}


export let GifDemo = ({testGif}) => {
    let [giphyObject, setGiphyObject] = useState('');

    let getGif = async () => {
        let {data} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(testGif)
        setGiphyObject(data);
    }
    getGif();    

    return giphyObject && testGif && <Gif gif={giphyObject} height={200} width={209} />
}

let handleMediaFileChecks = (mediaFile) => {
    let mediaSrc = mediaFile;
    if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
        mediaSrc = URL.createObjectURL(mediaFile)
    }
    return mediaSrc;
}

export let showGif = selectedGif => {
    return selectedGif && <Gif height='290px' width='96%' gif={selectedGif} className='style-gif-border-radius' />;
}

export let showImg = (imgRR) => {
    return imgRR && <img src={handleMediaFileChecks(imgRR)} />
}

export let getPrivacySelectedElement = (whichOption, color, text) => {
    switch (whichOption) {
        case '01':
            return tweetPrivacySelected01(color, text)
        case '02':
            return tweetPrivacySelected02(color, text)
        case '03':
            return tweetPrivacySelected03(color, text)
        default: console.log('somethigs wrong!!')
    }
}

export default UserProfile