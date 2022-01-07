import React, { useEffect, useState } from 'react'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal';
import AllTweetsPage from '../user-profile/all-tweets';
import './index.css';

function ComposeTweet({handlePollVotesCount, pollVotesCount, handleQuoteTweetID, quoteTweetData, currentUser, firstTweetHasMedia, setFirstTweetHasMedia, secondTweetHasMedia, setSecondTweetHasMedia, firstTweetHasPoll, setFirstTweetHasPoll, secondTweetHasPoll, setSecondTweetHasPoll, opacity, setOpacity, setChangeLayout, selectedFile, extraSelectedFile, setSelectedFile, setExtraSelectedFile, gifFile, extraGifFile, setGifFile, setExtraGifFile, toggleModality, handleTweetModalToggle, primaryTweetText, setPrimaryTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, inputTextChoice05, setInputTextChoice05, inputTextChoice06, setInputTextChoice06, inputTextChoice07, setInputTextChoice07, inputTextChoice08, setInputTextChoice08, scheduleStamp, setScheduleStamp, mediaDescriptionText, setMediaDescriptionText, setNewDataStatus }) {

    // setChangeLayout(true)

    // useEffect(() => setOpacity(true), [])
    // useEffect(() => setChangeLayout(true), [])

    useEffect(() => {
        handleTweetModalToggle();
        setChangeLayout(true)
        setOpacity(true)
    }, [])

    return (
        <div id='compose-tweet-container'>
            <TweetModal
                selectedFile={selectedFile}
                extraSelectedFile={extraSelectedFile}
                setSelectedFile={setSelectedFile}
                setExtraSelectedFile={setExtraSelectedFile}
                gifFile={gifFile}
                extraGifFile={extraGifFile}
                setGifFile={setGifFile}
                setExtraGifFile={setExtraGifFile}
                toggleModality={toggleModality}
                handleTweetModalToggle={handleTweetModalToggle}
                tweetText={primaryTweetText}
                setTweetText={setPrimaryTweetText}
                extraTweetText={extraTweetText}
                setExtraTweetText={setExtraTweetText}
                tweetPrivacy={tweetPrivacy}
                setTweetPrivacy={setTweetPrivacy}
                readyTweetPublish={setTweetPublishReady}
                inputTextChoice01={inputTextChoice01}
                setInputTextChoice01={setInputTextChoice01}
                inputTextChoice02={inputTextChoice02}
                setInputTextChoice02={setInputTextChoice02}
                inputTextChoice03={inputTextChoice03}
                setInputTextChoice03={setInputTextChoice03}
                inputTextChoice04={inputTextChoice04}
                setInputTextChoice04={setInputTextChoice04}
                inputTextChoice05={inputTextChoice05}
                setInputTextChoice05={setInputTextChoice05}
                inputTextChoice06={inputTextChoice06}
                setInputTextChoice06={setInputTextChoice06}
                inputTextChoice07={inputTextChoice07}
                setInputTextChoice07={setInputTextChoice07}
                inputTextChoice08={inputTextChoice08}
                setInputTextChoice08={setInputTextChoice08}
                scheduleStamp={scheduleStamp}
                setScheduleStamp={setScheduleStamp}
                mediaDescriptionText={mediaDescriptionText}
                setMediaDescriptionText={setMediaDescriptionText}
                setNewDataStatus={setNewDataStatus}
                setOpacity={setOpacity}
                opacity={opacity}
                firstTweetHasMedia={firstTweetHasMedia}
                setFirstTweetHasMedia={setFirstTweetHasMedia}
                secondTweetHasMedia={secondTweetHasMedia}
                setSecondTweetHasMedia={setSecondTweetHasMedia}
                firstTweetHasPoll={firstTweetHasPoll}
                setFirstTweetHasPoll={setFirstTweetHasPoll}
                secondTweetHasPoll={secondTweetHasPoll}
                setSecondTweetHasPoll={setSecondTweetHasPoll}
                currentUser={currentUser}
                quoteTweetData={quoteTweetData}
                handleQuoteTweetID={handleQuoteTweetID}
                pollVotesCount={pollVotesCount}
                handlePollVotesCount={handlePollVotesCount}
            />
        </div>
    )
}

export default ComposeTweet
