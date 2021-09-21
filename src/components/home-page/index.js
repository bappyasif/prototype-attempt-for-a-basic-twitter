import React, { useEffect, useState } from 'react'
import LeftSideNavigationPanel from './navigation-panels/left-side'
import TweetModal from './navigation-panels/left-side/tweet-modal'
import ProfilePage from './profile-page'

function HomePage() {
    let [primaryTweetText, setPrimaryTweetText] = useState('');
    let [extraTweetText, setExtraTweetText] = useState('');
    let [tweetPrivacy, setTweetPrivacy] = useState('01');
    let [tweetPublishReady, setTweetPublishReady] = useState(false);
    let [tweetData, setTweetData] = useState([]);
    
    useEffect(() => {
        if(tweetPublishReady) {
            // tweetData.concat({primaryTweetText})
            // setTweetData([...tweetData, {primaryTweetText: primaryTweetText}])
            // console.log(tweetData)
        }
        // setTweetData([...tweetData, {tweetText: primaryTweetText}])
        // setTweetData([primaryTweetText])
        setTweetData(tweetData => {[...tweetData, {text: primaryTweetText}]})
        console.log(tweetData, primaryTweetText, 'here!!')
        // console.log(tweetData, tweetPublishReady)
    }, [tweetPublishReady])

    // if(tweetPublishReady) {
    //     setTweetData([...tweetData, [{primaryTweetText}]])
    //     console.log(tweetData, 'here!!')
    // }


    return (
        <div id='home-page-container'>
            <LeftSideNavigationPanel />
            <TweetModal tweetText={primaryTweetText} setTweetText={setPrimaryTweetText} extraTweetText={extraTweetText} setExtraTweetText={setExtraTweetText} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} readyTweetPublish={setTweetPublishReady} />
            <ProfilePage tweetText={primaryTweetText} extraTweetText={extraTweetText} privacySelected={tweetPrivacy} readyTweetPublish={tweetPublishReady} tweetData={tweetData} />
        </div>
    )
}

export default HomePage
