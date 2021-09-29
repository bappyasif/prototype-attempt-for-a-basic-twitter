import React, { useEffect, useState } from 'react'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({count, handleCount, selectedFile, setSelectedFile, gifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady}) {

    useEffect(() => handleCount, [count])
    
    useEffect(() => {
        setTweetData([...tweetData, {tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count}])
        // handleCount();
        setSelectedFile('');
    }, [tweetPublishReady])

    // let showImg = (imgRR) => <img src={URL.createObjectURL(imgRR)} />
    // let showImg = (imgRR) => <img src={imgRR} />
    let showImg = (imgRR) => {
        // console.log(imgRR, "?!")
        return imgRR && <img src={URL.createObjectURL(imgRR)} />
        // return <img src={URL.createObjectURL(selectedFile)} />
    }

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
            {tweetData && <AllTweetsPage tweetData={tweetData} handleCount={handleCount} />}
        </div>
    )
}

export default UserProfile