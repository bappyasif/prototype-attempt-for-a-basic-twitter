import React, { useEffect, useState } from 'react'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal';
import AllTweetsPage from '../user-profile/all-tweets';
import './index.css';

function ComposeTweet({ selectedFile, setSelectedFile, gifFile, setGifFile, toggleModality, handleTweetModalToggle, primaryTweetText, setPrimaryTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, tweetPublishReady, setTweetPublishReady }) {

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
                readyTweetPublish={setTweetPublishReady} />
        </div>
    )
}

export default ComposeTweet
