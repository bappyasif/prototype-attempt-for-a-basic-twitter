import React, { useEffect, useState } from 'react'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({count, handleCount, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady}) {
    // let [count, setCount] = useState(1)

    // useEffect(() => setCount(count + 1), [])
    useEffect(() => handleCount, [count])
    
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
            {tweetData && <AllTweetsPage tweetData={tweetData} count={count} handleCount={handleCount} />}
        </div>
    )
}

export default UserProfile