import React, { useEffect, useState } from 'react'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal';
import AllTweetsPage from '../user-profile/all-tweets';
import './index.css';

function ComposeTweet({ selectedFile, setSelectedFile, gifFile, setGifFile, toggleModality, handleTweetModalToggle, primaryTweetText, setPrimaryTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, scheduleStamp, setScheduleStamp }) {

    return (
        <div id='compose-tweet-container'>
            <TweetModal
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                gifFile={gifFile}
                setGifFile={setGifFile}
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
                scheduleStamp={scheduleStamp}
                setScheduleStamp={setScheduleStamp}
            />
        </div>
    )
}

export default ComposeTweet
