import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { downloadTweetPictureUrlFromStorage, testUploadBlobFile, uploadTweetPictureUrlToStorage } from '../firebase-storage';
import { writeDataIntoCollection } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({updateData, newID, uniqueID, setChangeLayout, newDataStatus, setNewDataStatus, selectedFile, setSelectedFile, gifFile, setGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {
    let [pictureUrl, setPictureUrl] = useState('')

    let [doneUploading, setDoneUploading] = useState(false)
    
    let updatePictureUploadingStatus = () => setDoneUploading(true)
    
    let setUrl = (url) => setPictureUrl(url);

    useEffect(() => {
        doneUploading && downloadTweetPictureUrlFromStorage(uniqueID, setUrl)
        // pictureUrl && console.log('checkpoint!!', pictureUrl)
    }, [doneUploading])

    // usng for image element
    useEffect(() => {
        // pictureUrl && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), imgFile: selectedFile, gifItem: gifFile }, uniqueID, pictureUrl, updateData)
        pictureUrl && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: selectedFile, gifItem: gifFile }, uniqueID, pictureUrl, updateData)
        pictureUrl && newID()
        resetUrlToNull() // resetting picture url back to null, so that when next img resource is used this effect gets to run
    }, [pictureUrl])

    let resetUrlToNull = () => pictureUrl && setPictureUrl('')

    // initlal calls
    useEffect(() => {
        setChangeLayout(false)
        selectedFile && uploadTweetPictureUrlToStorage(selectedFile, uniqueID, updatePictureUploadingStatus)
    }, [])


    // when there is new data to store in firestore and render on DOM
    useEffect(() => {        
        if (!(selectedFile)) {
            // newDataStatus && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), imgFile: selectedFile, gifItem: gifFile }, uniqueID, pictureUrl, updateData)
            newDataStatus && writeDataIntoCollection({tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: selectedFile, gifItem: gifFile }, uniqueID, pictureUrl, updateData)
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

    // let getPrivacySelectedElement = whichOption => {
    //     switch (whichOption) {
    //         case '01':
    //             return tweetPrivacySelected01()
    //         case '02':
    //             return tweetPrivacySelected02()
    //         case '03':
    //             return tweetPrivacySelected03()
    //         default: console.log('somethigs wrong!!')
    //     }
    // }

    return (
        <div id='user-profile-page-container'>
            {/* {pictureUrl && <img src={pictureUrl} />} */}
            {tweetData && <AllTweetsPage
                // tweetData={tweetData}
                tweetData={tweetData || []}
                // handleCount={handleCount}
            />
            }
            {/* { testGif && testUserDoc && <GifDemo testGif={testGif} />} */}
        </div>
    )
}


export let GifDemo = ({testGif}) => {
    let [giphyObject, setGiphyObject] = useState('');
    // console.log(testGif, 'id found')
    let getGif = async () => {
        let {data} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(testGif)
        setGiphyObject(data);
        // console.log(testGif, '<id found>', data)
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
    // console.log('visting here')
    return imgRR && <img src={handleMediaFileChecks(imgRR)} />
}

export let getPrivacySelectedElement = (whichOption, color) => {
    // console.log(whichOption, '<<which option>>')
    switch (whichOption) {
        case '01':
            return tweetPrivacySelected01(color)
        case '02':
            return tweetPrivacySelected02(color)
        case '03':
            return tweetPrivacySelected03(color)
        default: console.log('somethigs wrong!!')
    }
}

export default UserProfile