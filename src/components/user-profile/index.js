import React, { useEffect, useState } from 'react'
import TweetCompose from '../tweet-modal';
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';
// import AllTweetsPage from './profile-page/all-tweets';

function UserProfile({count, handleCount, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady}) {
    // let [primaryTweetText, setPrimaryTweetText] = useState('');
    // let [extraTweetText, setExtraTweetText] = useState('');
    // let [tweetPrivacy, setTweetPrivacy] = useState('01');
    // let [tweetPublishReady, setTweetPublishReady] = useState(false);
    // let [tweetData, setTweetData] = useState([]);
    // let [count, setCount] = useState(1)

    // useEffect(() => setCount(count + 1), [])
    // useEffect(() => handleCount, [count])
    
    useEffect(() => {
        setTweetData([...tweetData, {tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count}])
        // handleCount();
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
            {/* <TweetModal tweetText={primaryTweetText} setTweetText={setPrimaryTweetText} extraTweetText={extraTweetText} setExtraTweetText={setExtraTweetText} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} readyTweetPublish={setTweetPublishReady} /> */}
            {/* <TweetCompose tweetText={primaryTweetText} setTweetText={setPrimaryTweetText} extraTweetText={extraTweetText} setExtraTweetText={setExtraTweetText} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} readyTweetPublish={setTweetPublishReady} /> */}
            {/* <TweetModal
                toggleModality={toggleModality}
                handleTweetModalToggle={handleTweetModalToggle}
                tweetText={primaryTweetText}
                setTweetText={setPrimaryTweetText}
                extraTweetText={extraTweetText}
                setExtraTweetText={setExtraTweetText}
                tweetPrivacy={tweetPrivacy}
                setTweetPrivacy={setTweetPrivacy}
                readyTweetPublish={setTweetPublishReady} /> */}
            {/* {console.log(tweetData, "!!!!")} */}
            {/* <AllTweetsPage tweetData={tweetData} /> */}
            {tweetData && <AllTweetsPage tweetData={tweetData} count={count} handleCount={handleCount} />}
        </div>
    )
}

// let extractingDataFromModal = (tweetData) => {
//     let [primaryTweetText, setPrimaryTweetText] = useState('');
//     let [extraTweetText, setExtraTweetText] = useState('');
//     let [tweetPrivacy, setTweetPrivacy] = useState('01');
//     let [tweetPublishReady, setTweetPublishReady] = useState(false);
//     // let [tweetData, setTweetData] = useState([]);
    
//     useEffect(() => {
//         setTweetData([...tweetData, {tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy)}])
//     }, [tweetPublishReady])

//     let getPrivacySelectedElement = whichOption => {
//         switch(whichOption) {
//             case '01':
//                 return tweetPrivacySelected01()
//             case '02':
//                 return tweetPrivacySelected02()
//             case '03':
//                 return tweetPrivacySelected03()
//             default: console.log('somethigs wrong!!')
//         }
//     }
//     return tweetData
// }

export default UserProfile