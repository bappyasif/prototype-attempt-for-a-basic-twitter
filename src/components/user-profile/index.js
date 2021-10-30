import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { testUploadBlobFile } from '../firebase-storage';
import { writeDataIntoCollection } from '../firestore-methods';
// import { listenToADocument, queryForDocuments, queryForDocumentsWithRealtimeListeners, testFirestore, testReadData, testReadSingleDocument, testWriteData } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({setChangeLayout, newDataStatus, setNewDataStatus, count, handleCount, selectedFile, setSelectedFile, gifFile, setGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {

    // testFirestore();
    // testReadData();
    // testWriteData();
    // testReadSingleDocument();
    // listenToADocument();
    // queryForDocuments();
    // queryForDocumentsWithRealtimeListeners()
    // testUploadBlobFile()

    useEffect(() => handleCount, [count])

    useEffect(() => setChangeLayout(false), [])

    useEffect(() => {
        newDataStatus && setTweetData([{ tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, ...tweetData])
        
        // writing into firestore collection
        // writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile })
        writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile })

        // storing images into storage
        // (selectedFile || gifFile) && testUploadBlobFile(selectedFile || gifFile)
        console.log(gifFile, 'gifHere')
        testUploadBlobFile((gifFile && gifFile) || showImg(selectedFile))
        
        
        setNewDataStatus(false)

        setSelectedFile('');
        setGifFile('');
        
        setInputTextChoice01('')
        setInputTextChoice02('')
        setInputTextChoice03('')
        setInputTextChoice04('')
        
    }, [tweetPublishReady])

    let showGif = selectedGif => selectedGif && <Gif height='290px' width='96%' gif={selectedGif} className='style-gif-border-radius' />;

    let showImg = (imgRR) => {
        return imgRR && <img src={handleMediaFileChecks(imgRR)} />
    }

    let handleMediaFileChecks = (mediaFile) => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile)
        }
        return mediaSrc;
    }

    let getPrivacySelectedElement = whichOption => {
        switch (whichOption) {
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
            {tweetData && <AllTweetsPage
                tweetData={tweetData}
                handleCount={handleCount}
            />
            }
        </div>
    )
}

export default UserProfile