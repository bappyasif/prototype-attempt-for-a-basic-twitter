import React, { useEffect, useState } from 'react'
import LeftSideNavigationPanel from '../navigation-panels/left-side'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import ProfilePage from './profile-page'
import AllTweetsPage from './profile-page/all-tweets';
// import '../user-profile/profile-page/index.css';
import ProfilePageUpperView from './profile-page';

function UserProfile() {
    let [primaryTweetText, setPrimaryTweetText] = useState('');
    let [extraTweetText, setExtraTweetText] = useState('');
    let [tweetPrivacy, setTweetPrivacy] = useState('01');
    let [tweetPublishReady, setTweetPublishReady] = useState(false);
    let [tweetData, setTweetData] = useState([]);
    
    useEffect(() => {
        setTweetData([...tweetData, {tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy)}])
    }, [tweetPublishReady])

    let getPrivacySelectedElement = whichOption => {
        switch(whichOption) {
            case '01':
                return tweetPrivacySelected01()
            case '02':
                return tweetPrivacySelected02()
            case '03':
                return tweetPrivacySelected03()
            default: console.log('somethigs wrong!!')
        }
    }

    return (
        <div id='user-profile-page-container'>
            {/* <LeftSideNavigationPanel /> */}
            <TweetModal tweetText={primaryTweetText} setTweetText={setPrimaryTweetText} extraTweetText={extraTweetText} setExtraTweetText={setExtraTweetText} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} readyTweetPublish={setTweetPublishReady} />
            {/* <ProfilePage tweetData={tweetData} /> */}
            <ProfilePageUpperView />
            {/* <div id='all-tweets-container'>
                <AllTweetsPage tweetData={tweetData} />
            </div> */}
            <AllTweetsPage tweetData={tweetData} />
        </div>
    )
}

export default UserProfile