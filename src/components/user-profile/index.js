import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import {v4 as uuid} from 'uuid'
import { generateOneNewID } from '../componentsContainer';
import { downloadTweetGiphyUrlFromStorage, downloadTweetPictureUrlFromStorage, testUploadBlobFile, uploadTweetGiphyObjectToStorage, uploadTweetPictureUrlToStorage } from '../firebase-storage';
import { testReadFirestoreData, updateUserDocWithMediaUrls, writeDataIntoCollection, writeDataIntoCollectionAnotherVersion } from '../firestore-methods';
// import { listenToADocument, queryForDocuments, queryForDocumentsWithRealtimeListeners, testFirestore, testReadData, testReadSingleDocument, testWriteData } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({updateData, newID, updateDOM, uniqueID, dataLoading, setChangeLayout, newDataStatus, setNewDataStatus, count, handleCount, selectedFile, setSelectedFile, gifFile, setGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {
    let [testUrl, setTestUrl] = useState('')

    let [testGifUrl, setTestGifUrl] = useState('')

    let [doneUploading, setDoneUploading] = useState(false)

    let [gifUploadingDone, setGifUploadingDone] = useState(false);

    let updateGifUploadingStatus = () => setGifUploadingDone(true)
    
    let updatePictureUploadingStatus = () => setDoneUploading(true)
    
    let setUrl = (url) => setTestUrl(url);

    let setGif = url => {
        setTestGifUrl(url);
        console.log('testGif >><< ', url)
    }

    useEffect(() => {
        // download imgFile url from firebase Storage
        doneUploading && downloadTweetPictureUrlFromStorage(uniqueID, setUrl)
        // testUrl && console.log('checkpoint!!', testUrl)
    }, [doneUploading])

    useEffect(() => {
        // download gifFile url from firebase storage
        gifUploadingDone && downloadTweetGiphyUrlFromStorage(uniqueID, setGif)
    }, [gifUploadingDone])

    useEffect(() => {
        // testUrl && console.log('checkpoint!!', testUrl)
        testUrl && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
        // testUrl && updateDOM('img effect');
        newDataStatus && testUrl && newID()
        // testUrl && console.log('checkpoint2>>', testUrl)
        // testUrl && setTestUrl('')
        testUrl && resetUrlToNull()
    }, [testUrl])

    let resetUrlToNull = () => testUrl && setTestUrl('')

    let gifResourceUrlResetter = () => testGifUrl && setTestGifUrl('')

    useEffect(() => {
        testGifUrl && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData, testGifUrl)
        newDataStatus && testGifUrl && newID();
        testGifUrl && gifResourceUrlResetter()
        testGifUrl && console.log(testGifUrl, '<<url found>>')
        // // gifFile && updateDOM();
        // newDataStatus && gifFile && console.log('gif file....', gifFile)
    }, [testGifUrl])
    
    // useEffect(() => handleCount(), [count])

    let [testGif, setTestGif] = useState();
    useEffect(() => {
        setChangeLayout(false)
        // whenever there is a picture file in a tweet content, it immediately upload to firebase storage
        selectedFile && uploadTweetPictureUrlToStorage(selectedFile, uniqueID, updatePictureUploadingStatus)
        // let makeGifFromObject = gifFile && showGif(gifFile)
        // console.log(makeGifFromObject, 'gifCreated?!')
        gifFile && setTestGif(showGif(gifFile))
        
        // gifFile && uploadTweetGiphyObjectToStorage(makeGifFromObject, uniqueID, updateGifUploadingStatus)
        // gifFile && uploadTweetGiphyObjectToStorage(gifFile, uniqueID, updateGifUploadingStatus)
    }, [])

    useEffect(() => {
        testGif && console.log(testGif, 'gifCreated?!')
        testGif && uploadTweetGiphyObjectToStorage(testGif, uniqueID, updateGifUploadingStatus)
    }, [testGif])


    useEffect(() => {
        
        if (!(selectedFile || gifFile)) {
            newDataStatus && writeDataIntoCollectionAnotherVersion({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, uniqueID, testUrl, updateData)
            // newDataStatus && setTestUrl(null)
            newDataStatus && updateDOM('default effect');
            newDataStatus && newID();
        }

        setNewDataStatus(false)

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
                tweetData={tweetData}
                // tweetData={tweetData || []}
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
    // return giphyObject && testGif && <Gif gif={giphyObject} height={200} width={209} />
    return giphyObject && <Gif height='290px' width='96%' gif={selectedGif} className='style-gif-border-radius' />;
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