import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import TweetModal, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal'
import AllTweetsPage from './all-tweets';

function UserProfile({ count, handleCount, selectedFile, setSelectedFile, gifFile, setGifFile, tweetData, setTweetData, primaryTweetText, extraTweetText, tweetPrivacy, tweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {

    useEffect(() => handleCount, [count])
    let [previousID, setPreviousID] = useState('');

    useEffect(() => {
        
        setTweetData([{ tweetPoll: [{choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        
        tweetData.length && setPreviousID(tweetData[0].tweetText)
        
        let removeDuplicates = tweetData && tweetData.filter((item, idx) => tweetData.indexOf(item.tweetText) == (idx && (item.count - 1)))
        console.log(removeDuplicates, "huh?!", previousID)

        // let refineData = tweetData.map(item => {
        //     if(item.count) {
        //         delete item.count;
        //         console.log('here??')
        //     }
        //     return item
        // })
        // console.log(refineData, 'wat wat!!')

        // let removeDuplicates = new Set(refineData)
        // console.log(removeDuplicates, 'duplicates?!')

        // setTweetData(Array.from(removeDuplicates));

        // let refineData = tweetData.filter(item => {
        //     if(item.tweetText) {
        //         if(item.tweetText == previousID) {
        //             return tweetData
        //         } else {
        //             setPreviousID(item.tweetText)
        //         }
        //     }
        // })
        // console.log(refineData, 'wat wat!!')

        // tweetData.map((item, idx) => {
        //     if(idx == 0) {
        //         setPreviousID(item.tweetText)
        //         setTweetData([{ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        //         console.log('here!!')
        //     } else {
        //         setTweetData([...tweetData])
        //         console.log('here!!!!', item.tweetText, previousID, "??")
        //     }
        // })

        // if(tweetData.length == 0) setTweetData([{ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        
        // // tweetData.forEach(item => setPreviousID(item.tweetText + item.count))
        // else tweetData.forEach((item, idx) => {
        //     console.log(previousID, previousID != item.tweetText, item.tweetText)
        //     if(previousID != item.tweetText) {
        //         setPreviousID(item.tweetText)
        //         setTweetData([{ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        //     } else {
        //         setTweetData([...tweetData])
        //     }
        // })

        setSelectedFile('');
        setGifFile('');
        setInputTextChoice01('')
        setInputTextChoice02('')
        setInputTextChoice03('')
        setInputTextChoice04('')
        // console.log(tweetData, 'is it?!', tweetData.length ? tweetData[0].tweetText == primaryTweetText : null)
    }, [tweetPublishReady])

    let showGif = selectedGif => selectedGif && <Gif height='290px' width='96%' gif={selectedGif} className='style-gif-border-radius' />;

    // let showImg = (imgRR) => <img src={URL.createObjectURL(imgRR)} />
    // let showImg = (imgRR) => <img src={imgRR} />
    let showImg = (imgRR) => {
        // console.log(imgRR, "?!")
        // return imgRR && <img src={URL.createObjectURL(imgRR)} />
        // return <img src={URL.createObjectURL(selectedFile)} />
        return imgRR && <img src={handleMediaFileChecks(imgRR)} />
    }

    let handleMediaFileChecks = (mediaFile) => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile)
        }
        // if(gifFile) return gifFile
        // else return mediaSrc;
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
                // tweetData={[...tweetData].reverse()}
                tweetData={tweetData}
                handleCount={handleCount}
            />
            }
            {/* {tweetData && <AllTweetsPage
                tweetData={tweetData}
                handleCount={handleCount}
                // inputTextChoice01={inputTextChoice01}
                // setInputTextChoice01={setInputTextChoice01}
                // inputTextChoice02={inputTextChoice02}
                // setInputTextChoice02={setInputTextChoice02}
                // inputTextChoice03={inputTextChoice03}
                // setInputTextChoice03={setInputTextChoice03}
                // inputTextChoice04={inputTextChoice04}
                // setInputTextChoice04={setInputTextChoice04}
            />
            } */}
            {/* <AllTweetsPage tweetData={tweetData} handleCount={handleCount} /> */}
        </div>
    )
}

export default UserProfile

/**
 * 
 * 
 useEffect(() => {
        // console.log(tweetData.length, 'is it?!')
        // if (tweetData.length) {
        //     tweetData[tweetData.length - 1].tweetText == primaryTweetText ? [...tweetData] : null
        //     console.log(tweetData, 'is it?!')
        // } else {
        //     setTweetData([{ tweetPoll: [{ choice01: inputTextChoice01, choice02: inputTextChoice02, choice03: inputTextChoice03, choice04: inputTextChoice04 }], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        // }

        setTweetData([{ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        
        // let removeDuplicates = [...tweetData].filter((item, idx) => tweetData.indexOf(item.tweetText) == idx)
        // let removeDuplicates = tweetData && Array.from(new Set([...tweetData].map(JSON.stringify))).map(JSON.parse)
        // let removeDuplicates = tweetData.filter((item, idx) => tweetData.indexOf(item.tweetText) == idx)
        // let removeDuplicates = tweetData && Array.from(new Set(tweetData))
        
        // let removeDuplicates = tweetData && tweetData.map(item => item.tweetText == primaryTweetText).filter(item => item)
        // let removeDuplicates = tweetData && [...tweetData].filter(item => item.tweetText == primaryTweetText)
        // let removeDuplicates = tweetData && [...tweetData].filter((item, idx) => tweetData.indexOf(item.tweetText) == idx)
        // let removeDuplicates = Array.from(new Set(tweetData))
        // let removeDuplicates = []
        
        // setRemoveDuplicates(Array.from(new Set(tweetData)))

        // if(removeDuplicates.length) {
        //     // removeDuplicates = Array.from(new Set(tweetData))
        //     setTweetData(removeDuplicates)
        //     console.log(removeDuplicates, 'duplicates!!', primaryTweetText, new Set(tweetData))
        // } else {
        //     setTweetData([{ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        // }
        // if(removeDuplicates) {
        //     setTweetData(tweetData)
        // } else {
        //     setTweetData([{ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }, ...tweetData])
        // }
        // setTweetData([...tweetData].shift({ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }))
        // setTweetData([tweetData].shift({ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }))
        // setTweetData([...tweetData, { tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }])
        // setTweetData([tweetData].shift({ tweetPoll: [{choice01: inputTextChoice01,choice02: inputTextChoice02,choice03: inputTextChoice03,choice04: inputTextChoice04}], tweetMedia: showImg(selectedFile), tweetGif: showGif(gifFile), tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy), count: count }))
        // handleCount();
        setSelectedFile('');
        setGifFile('');
        setInputTextChoice01('')
        setInputTextChoice02('')
        setInputTextChoice03('')
        setInputTextChoice04('')
        // console.log(tweetData, 'is it?!', tweetData.length ? tweetData[0].tweetText == primaryTweetText : null)
    }, [tweetPublishReady])
 */