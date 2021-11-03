import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { testUploadBlobFile } from '../firebase-storage';
import { testReadFirestoreData, updateUserDocWithMediaUrls, writeDataIntoCollection } from '../firestore-methods';
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
    let [testUrl, setTestUrl] = useState('')
    let [testUserDoc, setTestUserDoc] = useState('');
    // let [giphyObject, setGiphyObject] = useState({});
    let [testGif, setTestGif] = useState('')
    let testGifUpdater = (gifID) => setTestGif(gifID);
    // let giphyObjectUpdater = (obj) => setGiphyObject(obj)
    let setUrl = (url) => setTestUrl(url);
    let setUserDoc = userDoc => setTestUserDoc(userDoc)
    // console.log(testUserDoc, 'userdoc')
    testUrl && testUserDoc && updateUserDocWithMediaUrls(testUserDoc, testUrl)
    // // reading testGif from firestore
    testUserDoc && testReadFirestoreData(testUserDoc, testGifUpdater, 'gifId')
    testUserDoc && console.log(testGif, testUserDoc, 'it is?!')

    useEffect(() => handleCount, [count])

    useEffect(() => setChangeLayout(false), [])

    // useEffect(() => {
    //     // reading testGif from firestore
    //     testUserDoc && testReadFirestoreData(testUserDoc, testGifUpdater, 'gifId')
    //     testUserDoc && console.log(testGif, testUserDoc, 'it is?!')
    // }, testUserDoc)

    useEffect(() => {
        newDataStatus && setTweetData([{ tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, ...tweetData])
        
        // writing into firestore collection
        // writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile })
        // writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile })
        // setTestUrl(writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile }))
        // writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, setUrl, setUserDoc, giphyObjectUpdater)
        writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count, imgFile: selectedFile, gifItem: gifFile }, setUrl, setUserDoc, testGifUpdater)
        // testUserDoc && updateUserDocWithMediaUrls(testUserDoc)
        // gifFile && setTestGif(gifFile)

        // storing images into storage
        // (selectedFile || gifFile) && testUploadBlobFile(selectedFile || gifFile)
        // console.log(gifFile, 'mediaFilesHere', selectedFile)
        // testUploadBlobFile((gifFile && gifFile) || showImg(selectedFile))
        // testUploadBlobFile((gifFile && showGif(gifFile)) || showImg(selectedFile), (selectedFile && selectedFile.name  || gifFile && gifFile.id))
        // testUploadBlobFile((gifFile && gifFile) || imgFile, data.id)
        
        // reading testGif from firestore
        // testUserDoc && testReadFirestoreData(testUserDoc, testGifUpdater, 'gifId')
        // console.log(testGif, 'id found', testUserDoc)
        
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

    // let GifDemo = () => {
    //     let [giphyObject, setGiphyObject] = useState({});
    //     let getGif = async () => {
    //         let {data} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(testGif)
    //         setGiphyObject(data);
    //         console.log(testGif, 'id found', testUserDoc, data)
    //     }
    //     getGif();
    //     console.log(testGif, 'id found', testUserDoc, data)
    //     return giphyObject && <Gif gif={giphyObject} height={200} width={209} />
    // }

    return (
        <div id='user-profile-page-container'>
            {/* {testUrl && <img src={testUrl} />} */}
            {tweetData && <AllTweetsPage
                tweetData={tweetData}
                handleCount={handleCount}
            />
            }
            {
                testGif && testUserDoc && <GifDemo testGif={testGif} />
                // testUserDoc && console.log(testGif, 'id found', testUserDoc)
                // giphyObject != null && <GifDemo />
                // testGif && console.log(testGif)
                // testGif && <GifDemo />
                // testGif && <Gif gif={testGif} height={200} width={209} />
                // giphyObject && console.log(Object.keys(giphyObject).every(key=>giphyObject[key]===testGif[key]), testGif)
                // giphyObject && console.log(giphyObject, '?>', gifFile)
                // giphyObject != null && <Gif height='290px' width='96%' gif={giphyObject} className='style-gif-border-radius' />
                // giphyObject && testUserDoc && <Gif height='290px' width='96%' gif={testReadFirestoreData(testUserDoc)['medias'].gif} className='style-gif-border-radius' />
                // testUserDoc && testReadFirestoreData(testUserDoc)
                // gifFile && <Gif height='290px' width='96%' gif={} className='style-gif-border-radius' />
            }
            {/* {testUrl && console.log(testUrl, 'is it!!')} */}
        </div>
    )
}


let GifDemo = ({testGif}) => {
    let [giphyObject, setGiphyObject] = useState('');
    let getGif = async () => {
        let {data} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(testGif)
        setGiphyObject(data);
        console.log(testGif, '<id found>', data)
    }
    getGif();
    // console.log(testGif, 'id found', testUserDoc, data)
    return giphyObject && testGif && <Gif gif={giphyObject} height={200} width={209} />
}

export default UserProfile