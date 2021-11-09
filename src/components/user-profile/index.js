import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'
import { generateOneNewID } from '../componentsContainer';
import { downloadTweetPictureUrlFromStorage, testUploadBlobFile, uploadTweetPictureUrlToStorage } from '../firebase-storage';
import { testReadFirestoreData, updateUserDocWithMediaUrls, writeDataIntoCollection, writeDataIntoCollectionAnotherVersion } from '../firestore-methods';
// import { listenToADocument, queryForDocuments, queryForDocumentsWithRealtimeListeners, testFirestore, testReadData, testReadSingleDocument, testWriteData } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({updateData, newID, updateDOM, uniqueID, dataLoading, setChangeLayout, newDataStatus, setNewDataStatus, count, handleCount, selectedFile, setSelectedFile, gifFile, setGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {
    let [testUrl, setTestUrl] = useState('')
    let [testUserDoc, setTestUserDoc] = useState('');
    
    let [testGif, setTestGif] = useState('')
    let testGifUpdater = (gifID) => setTestGif(gifID);

    let [doneUploading, setDoneUploading] = useState(false)
    let [fileFound, setFileFound] = useState(false)
    // let [dateString, setDateString] = useState(String(new Date().getTime()))
    // let [userDocUniqueId, setUserDocUniqueId] = useState(null)
    
    let updateFileFoundStatus = () => setFileFound(true)
    let updatePictureUploadingStatus = () => setDoneUploading(true)
    let setUrl = (url) => setTestUrl(url);
    let setUserDoc = userDoc => setTestUserDoc(userDoc)

    // let dateString = String(new Date().getTime())
    // let userDocUniqueId = uuid();

    // userDocUniqueId && selectedFile && uploadTweetPictureUrlToStorage(selectedFile, userDocUniqueId, updatePictureUploadingStatus)
    
    // selectedFile && doneUploading && downloadTweetPictureUrlFromStorage(dateString, setUrl)
    
    // useEffect(() => {
    //     selectedFile && uploadTweetPictureUrlToStorage(selectedFile, userDocUniqueId, updatePictureUploadingStatus)
    // }, [userDocUniqueId])

    useEffect(() => {
        // download imgFile url from firebase Storage
        // selectedFile && doneUploading && downloadTweetPictureUrlFromStorage(dateString, setUrl)
        // doneUploading && downloadTweetPictureUrlFromStorage(userDocUniqueId, setUrl)
        doneUploading && downloadTweetPictureUrlFromStorage(uniqueID, setUrl)
        // testUrl && console.log('checkpoint!!', testUrl)
    }, [doneUploading])

    useEffect(() => {
        testUrl && console.log('checkpoint!!', testUrl)
        testUrl && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
        // testUrl && updateDOM('img effect');
        newDataStatus && testUrl && newID()
        testUrl && console.log('checkpoint2>>', testUrl)
        // testUrl && setTestUrl('')
        testUrl && resetUrlToNull()
    }, [testUrl])

    // useEffect(() => {
    //     // updateDOM('uniqueID effect')
    //     // setTestUrl('')
    //     // console.log(testUrl, uniqueID, 'uniqID effect')
    // }, [uniqueID])

    let resetUrlToNull = () => testUrl && setTestUrl('')

    useEffect(() => {
        gifFile && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, null, updateData)
        gifFile && newID();
        // gifFile && updateDOM();
        gifFile && console.log('gif file....', gifFile)
    }, [gifFile])
    
    // useEffect(() => handleCount(), [count])

    useEffect(() => {
        setChangeLayout(false)
        // setDateString(String(new Date().getTime()))
        // setUserDocUniqueId(uuid())
        selectedFile && uploadTweetPictureUrlToStorage(selectedFile, uniqueID, updatePictureUploadingStatus)
    }, [])


    useEffect(() => {
        // newDataStatus && setTweetData([{ tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, ...tweetData])
        
        // newDataStatus && updateDocs({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile })
        
        // newDataStatus && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, setUrl, setUserDoc, testGifUpdater)

        // newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, dateString)
        
        if (selectedFile || gifFile) {
            // console.log(testUrl, '<< found url?! >>')
            // testUrl && newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, userDocUniqueId, testUrl)
            // doneUploading && newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, dataLoading)
            // testUrl && newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
        } else {
            // newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID)
            // newDataStatus && gifFile && updateDOM();
            // newDataStatus && newID();
            // updateDOM()
            // newID()

            newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
            // newDataStatus && setTestUrl(null)
            newDataStatus && updateDOM('default effect');
            newDataStatus && newID();
        }

        // (!selectedFile || !gifFile) && newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)

        // updateDOM()

        // newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl)
        // newDataStatus && testUrl && setTestUrl(null)
        // newDataStatus && testUrl && updateDOM();
        // newDataStatus && newID();

        // !newDataStatus && setTestUrl('')
        // !newDataStatus && updateDOM()
        // !newDataStatus && newID()

        // newDataStatus && handleCount(uuid())
        // newDataStatus && generateOneNewID();
        // newDataStatus && newID();

        setNewDataStatus(false)

        setSelectedFile('');
        setGifFile('');
        
        setInputTextChoice01('')
        setInputTextChoice02('')
        setInputTextChoice03('')
        setInputTextChoice04('')
        
    }, [tweetPublishReady])

    // let showGif = selectedGif => selectedGif && <Gif height='290px' width='96%' gif={selectedGif} className='style-gif-border-radius' />;

    // let showImg = (imgRR) => {
    //     return imgRR && <img src={handleMediaFileChecks(imgRR)} />
    // }

    // let handleMediaFileChecks = (mediaFile) => {
    //     let mediaSrc = mediaFile;
    //     if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
    //         mediaSrc = URL.createObjectURL(mediaFile)
    //     }
    //     return mediaSrc;
    // }

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

export let showGif = selectedGif => selectedGif && <Gif height='290px' width='96%' gif={selectedGif} className='style-gif-border-radius' />;

export let showImg = (imgRR) => {
    return imgRR && <img src={handleMediaFileChecks(imgRR)} />
}

export default UserProfile