import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { downloadTweetPictureUrlFromStorage, testUploadBlobFile, uploadTweetPictureUrlToStorage } from '../firebase-storage';
import { writeDataIntoCollection } from '../firestore-methods';

import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({handleUpdateStatus, firstTweetHasMedia, setFirstTweetHasMedia, secondTweetHasMedia, setSecondTweetHasMedia, updateData, newID, uniqueID, setChangeLayout, newDataStatus, setNewDataStatus, selectedFile, extraSelectedFile, setSelectedFile, setExtraSelectedFile, gifFile, extraGifFile, setGifFile, setExtraGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, inputTextChoice05, setInputTextChoice05, inputTextChoice06, setInputTextChoice06, inputTextChoice07, setInputTextChoice07, inputTextChoice08, setInputTextChoice08 }) {
    let [pictureUrl, setPictureUrl] = useState('')

    let [extraPictureUrl, setExtraPictureUrl] = useState('')

    let [doneUploading, setDoneUploading] = useState(false)

    let [doneExtraUrlUploading, setDoneExtraUrlUploading] = useState(false)
    
    let updatePictureUploadingStatus = () => {
        setDoneUploading(true)
        // selectedFile && setDoneUploading(true)
        // extraSelectedFile && setDoneExtraUrlUploading(true)
    }

    let updateExtraPictureUploadingStatus = () => setDoneExtraUrlUploading(true)
    
    let setUrl = (url) => {
        setPictureUrl(url);
        // selectedFile && setPictureUrl(url);
        // extraSelectedFile && setExtraPictureUrl(url);
    }

    let setExtraUrl = url => setExtraPictureUrl(url);

    useEffect(() => {
        doneUploading && downloadTweetPictureUrlFromStorage(uniqueID, setUrl)
        // pictureUrl && console.log('checkpoint!!', pictureUrl)
    }, [doneUploading])

    useEffect(() => {
        // doneExtraUrlUploading && downloadTweetPictureUrlFromStorage(uniqueID+'extra', setExtraUrl)
        doneExtraUrlUploading && downloadTweetPictureUrlFromStorage(uniqueID, setExtraUrl, 'extra')
        // pictureUrl && console.log('checkpoint!!', pictureUrl)
    }, [doneExtraUrlUploading])

    // usng for image element
    useEffect(() => {
        pictureUrl && !extraSelectedFile && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: pictureUrl, extraImgFile: extraPictureUrl, gifItem: gifFile, extraGifItem: extraGifFile }, uniqueID, newDataStatus, updateData)
    }, [pictureUrl])

    // using effect for extra img element
    useEffect(() => {
        pictureUrl && extraPictureUrl && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: pictureUrl && pictureUrl, extraImgFile: extraPictureUrl && extraPictureUrl, gifItem: gifFile, extraGifItem: extraGifFile }, uniqueID, newDataStatus, updateData)
    }, [extraPictureUrl])

    let resetUrlToNull = () => {
        // pictureUrl && setPictureUrl('')
        pictureUrl && setPictureUrl('')
        extraPictureUrl && setExtraPictureUrl('')
    }   

    // initlal calls
    useEffect(() => {
        setChangeLayout(false)
        selectedFile && uploadTweetPictureUrlToStorage(selectedFile, uniqueID, updatePictureUploadingStatus)
        extraSelectedFile && uploadTweetPictureUrlToStorage(extraSelectedFile, uniqueID, updateExtraPictureUploadingStatus, 'extra')
    }, [])


    // when there is new data to store in firestore and render on DOM
    useEffect(() => {        
        if (!(selectedFile || extraSelectedFile)) {
            newDataStatus && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, gifItem: gifFile, extraGifItem: extraGifFile }, uniqueID, newDataStatus, updateData)
        }

        // special use case effect, which is not getting dealt with existing code
        if(selectedFile && !extraSelectedFile) {
            // pictureUrl && writeDataIntoCollection({firstTweetHasMedia: firstTweetHasMedia, secondTweetHasMedia: secondTweetHasMedia, extraPoll:[{choice01: inputTextChoice05, choice02: inputTextChoice06, choice03: inputTextChoice07, choice04: inputTextChoice08}], tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: tweetPrivacy, imgFile: pictureUrl, extraImgFile: extraPictureUrl, gifItem: gifFile, extraGifItem: extraGifFile }, uniqueID, newDataStatus, updateData)
        }

        setNewDataStatus(false)

        // setFirstTweetHasMedia(false)
        // setSecondTweetHasMedia(false)


        setSelectedFile('');
        setExtraSelectedFile('')
        setGifFile('');
        setExtraGifFile('')
        
        setInputTextChoice01('')
        setInputTextChoice02('')
        setInputTextChoice03('')
        setInputTextChoice04('')

        setInputTextChoice05('')
        setInputTextChoice06('')
        setInputTextChoice07('')
        setInputTextChoice08('')
        
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