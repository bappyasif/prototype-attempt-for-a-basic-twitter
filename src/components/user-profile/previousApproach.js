import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { downloadTweetPictureUrlFromStorage, testUploadBlobFile, uploadTweetPictureUrlToStorage } from '../firebase-storage';
import { testReadFirestoreData, updateUserDocWithMediaUrls, writeDataIntoCollection } from '../firestore-methods';
// import { listenToADocument, queryForDocuments, queryForDocumentsWithRealtimeListeners, testFirestore, testReadData, testReadSingleDocument, testWriteData } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({dataLoading, setChangeLayout, newDataStatus, setNewDataStatus, count, handleCount, selectedFile, setSelectedFile, gifFile, setGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {
    let [testUrl, setTestUrl] = useState('')
    let [testUserDoc, setTestUserDoc] = useState('');
    
    let [testGif, setTestGif] = useState('')
    let testGifUpdater = (gifID) => setTestGif(gifID);

    let [doneUploading, setDoneUploading] = useState(false)
    let [fileFound, setFileFound] = useState(false)
    
    let updateFileFoundStatus = () => setFileFound(true)
    let updatePictureUploadingStatus = () => setDoneUploading(true)
    let setUrl = (url) => setTestUrl(url);
    let setUserDoc = userDoc => setTestUserDoc(userDoc)
    
    // testUrl && testUserDoc && updateUserDocWithMediaUrls(testUserDoc, testUrl)
    // reading testGif from firestore
    // testUserDoc && testReadFirestoreData(testUserDoc, testGifUpdater, 'gifId')

    // testUserDoc && selectedFile && testUploadBlobFileAsyncApproach(selectedFile, testUserDoc, setUrl)
    // testUserDoc && selectedFile && console.log(selectedFile, testUserDoc, testUrl, 'it is?!')
    
    useEffect(() => {
        // upload imgFile to Storage
        testUserDoc && selectedFile && uploadTweetPictureUrlToStorage(selectedFile, testUserDoc, updatePictureUploadingStatus)
        // testUrl && testUserDoc && updateUserDocWithMediaUrls(testUserDoc, testUrl)

        // update imgFile url from storage to firestore doc
        // doneUploading && downloadTweetPictureUrlFromStorage(testUserDoc)
        
        // download gif
        // gifFile && testReadFirestoreData(testUserDoc, testGifUpdater)
    }, [testUserDoc])

    useEffect(()=> {
        console.log(doneUploading, 'uploading status')
        downloadTweetPictureUrlFromStorage(testUserDoc, setUrl)
    }, [doneUploading])

    //  trying to figure out how to deal with picture and gif to generate wthout causing malfunctions on DOM
    useEffect(() => {
        console.log(testUrl, 'url found')
        // doneUploading && testUrl && updateUserDocWithMediaUrls(testUserDoc, testUrl)
        // testUrl && updateUserDocWithMediaUrls(testUserDoc, testUrl)
        doneUploading && updateUserDocWithMediaUrls(testUserDoc, testUrl)
    }, [testUrl])
    
    useEffect(() => handleCount, [count])

    useEffect(() => setChangeLayout(false), [])

    useEffect(() => {
        // newDataStatus && setTweetData([{ tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, ...tweetData])
        
        // newDataStatus && updateDocs({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile })
        
        newDataStatus && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, setUrl, setUserDoc, testGifUpdater)
        
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