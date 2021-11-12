import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'
import { generateOneNewID } from '../componentsContainer';
import { downloadTweetPictureUrlFromStorage, testUploadBlobFile, uploadTweetPictureUrlToStorage } from '../firebase-storage';
import { writeDataIntoCollection } from '../firestore-methods';
// import { listenToADocument, queryForDocuments, queryForDocumentsWithRealtimeListeners, testFirestore, testReadData, testReadSingleDocument, testWriteData } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({updateData, newID, updateDOM, uniqueID, dataLoading, setChangeLayout, newDataStatus, setNewDataStatus, count, handleCount, selectedFile, setSelectedFile, gifFile, setGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {
    let [testUrl, setTestUrl] = useState('')

    let [doneUploading, setDoneUploading] = useState(false)
    
    let updatePictureUploadingStatus = () => setDoneUploading(true)
    
    let setUrl = (url) => setTestUrl(url);

    useEffect(() => {
        doneUploading && downloadTweetPictureUrlFromStorage(uniqueID, setUrl)
        // testUrl && console.log('checkpoint!!', testUrl)
    }, [doneUploading])

    // usng for image element
    useEffect(() => {
        testUrl && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
        testUrl && newID()
        resetUrlToNull() // resetting picture url back to null
    }, [testUrl])
    
    // useEffect(() => {
    //     testUrl && console.log('checkpoint!!', testUrl)
    //     // if(newID() != uniqueID) {
    //     //     testUrl && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
    //     // }
    //     testUrl && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
    //     // testUrl && updateDOM('img effect');
    //     // newDataStatus && testUrl && newID()
    //     // newDataStatus && newID()
    //     testUrl && newID()
    //     testUrl && console.log('checkpoint2>>', testUrl)
    //     // testUrl && setTestUrl('')
    //     resetUrlToNull()
    // }, [testUrl])

    // useEffect(() => {
    //     // updateDOM('uniqueID effect')
    //     // setTestUrl('')
    //     // console.log(testUrl, uniqueID, 'uniqID effect')
    // }, [uniqueID])

    let resetUrlToNull = () => testUrl && setTestUrl('')

    // // // // current situation is, gif rendering works for if there is only 1 or 2 of them in firestore or tweetData array (which is feeded from firestore and then upon each entry gets updated)

    // usng for gif element
    // useEffect(() => {
    //     gifFile && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, null, updateData)
    //     gifFile && newID();
    //     // gifFile && updateDOM();
    //     gifFile && console.log('gif file....', gifFile)
    //     // gifFile && setGifFile('');
    // }, [gifFile])
    
    // useEffect(() => handleCount(), [count])

    // initlal calls
    useEffect(() => {
        setChangeLayout(false)
        // setDateString(String(new Date().getTime()))
        // setUserDocUniqueId(uuid())
        selectedFile && uploadTweetPictureUrlToStorage(selectedFile, uniqueID, updatePictureUploadingStatus)
    }, [])


    // when there is new data to store in firestore and render on DOM
    useEffect(() => {        
        if (!(selectedFile)) {
            newDataStatus && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
            // newDataStatus && setTestUrl(null)
            // newDataStatus && updateDOM('default effect');
            newDataStatus && newID();
        }

        // newDataStatus && newID();
        // newID()

        setNewDataStatus(false)

        // setDataReady(true)

        setSelectedFile('');
        setGifFile('');
        
        setInputTextChoice01('')
        setInputTextChoice02('')
        setInputTextChoice03('')
        setInputTextChoice04('')
        
    }, [tweetPublishReady])

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
            {/* {testUrl && <img src={testUrl} />} */}
            {tweetData && <AllTweetsPage
                // tweetData={tweetData}
                tweetData={tweetData || []}
                handleCount={handleCount}
            />
            }
            {/* { testGif && testUserDoc && <GifDemo testGif={testGif} />} */}
        </div>
    )
}


export let GifDemo = ({testGif}) => {
    let [giphyObject, setGiphyObject] = useState('');
    console.log(testGif, 'id found')
    let getGif = async () => {
        let {data} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(testGif)
        setGiphyObject(data);
        console.log(testGif, '<id found>', data)
    }
    getGif();    
    // console.log(testGif, 'id found', testUserDoc, data)
    return giphyObject && testGif && <Gif gif={giphyObject} height={200} width={209} />
}

let handleMediaFileChecks = (mediaFile) => {
    let mediaSrc = mediaFile;
    if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
        mediaSrc = URL.createObjectURL(mediaFile)
    }
    return mediaSrc;
}

export let showGif = selectedGif => {
    return selectedGif && <Gif height='290px' width='96%' gif={selectedGif} className='style-gif-border-radius' />;
}

export let showImg = (imgRR) => {
    console.log('visting here')
    return imgRR && <img src={handleMediaFileChecks(imgRR)} />
}

export default UserProfile