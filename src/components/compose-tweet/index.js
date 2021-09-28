import React, { useEffect, useState } from 'react'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal';
import AllTweetsPage from '../user-profile/all-tweets';
import './index.css';

function ComposeTweet({ tweetData, setTweetData, toggleModality, handleTweetModalToggle, primaryTweetText, setPrimaryTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, tweetPublishReady, setTweetPublishReady }) {
    // let [primaryTweetText, setPrimaryTweetText] = useState('');
    // let [extraTweetText, setExtraTweetText] = useState('');
    // let [tweetPrivacy, setTweetPrivacy] = useState('01');
    // let [tweetPublishReady, setTweetPublishReady] = useState(false);
    // let [tweetData, setTweetData] = useState([]);

    // useEffect(() => {
    //     setTweetData([...tweetData, { tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy) }])

    //     console.log(tweetData, 'tweet compose', primaryTweetText)
    // }, [tweetPublishReady])
    
    // useEffect(() => {
    //     setTweetData([...tweetData, { tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy) }])

    //     console.log(tweetData, 'tweet compose', primaryTweetText, tweetPublishReady)
    // }, [primaryTweetText, tweetPublishReady])

    // useEffect(() => {
    //     setTweetData([...tweetData, { tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy) }])

    //     console.log(tweetData, 'tweet compose', primaryTweetText, tweetPublishReady)
    // }, [primaryTweetText])

    // useEffect(() => {
    //     if(tweetPublishReady) setTweetData([...tweetData, { tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy) }])

    //     console.log(tweetData, 'tweet compose', primaryTweetText, tweetPublishReady)
    // }, [primaryTweetText])

    // useEffect(() => setToggleModality(!toggleModality), [!toggleModality])

    // let getPrivacySelectedElement = whichOption => {
    //     switch (whichOption) {
    //         case '01':
    //             return tweetPrivacySelected01()
    //         case '02':
    //             return tweetPrivacySelected02()
    //         case '03':
    //             return tweetPrivacySelected03()
    //         default: console.log('somethigs wrong!!')
    //     }
    // }
    return (
        <div id='compose-tweet-container'>
            <TweetModal
                toggleModality={toggleModality}
                handleTweetModalToggle={handleTweetModalToggle}
                tweetText={primaryTweetText}
                setTweetText={setPrimaryTweetText}
                extraTweetText={extraTweetText}
                setExtraTweetText={setExtraTweetText}
                tweetPrivacy={tweetPrivacy}
                setTweetPrivacy={setTweetPrivacy}
                readyTweetPublish={setTweetPublishReady} />
            
            {/* <AllTweetsPage tweetData={tweetData} /> */}
        </div>
    )
}

export default ComposeTweet
