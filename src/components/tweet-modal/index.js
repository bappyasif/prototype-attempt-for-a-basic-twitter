import React, { useEffect, useRef, useState } from 'react'
import { copyIcon, deleteIcon, deleteIconForGif, descriptionIcon, everybodyIcon, gifIcon, imageIcon, locationTagIcon, mentionedIcon, peopleIcon, pollIcon, scheduleIcon, tagIcon } from './svg-resources';
import './tweet-modal.css'
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid, Gif } from '@giphy/react-components';
import TweetPoll from './tweet-poll';
import EmojiPicker from './emoji-picker';
import TweetScheduler from './schedule-tweet';
import TweetWordCount from './tweet-word-count';
import ContentInComposeTweet from '../compose-tweet/content-in-compose-tweet';
import { Link, useHistory } from 'react-router-dom';
import { RenderAnalysingUserTweet, RenderUserTweet } from '../user-profile/all-tweets/tweet-top/analytics-ui';
import GifModal from './gif-modal';
import { ShowCurrentlyTaggedPlace } from '../user-profile/all-tweets/show-tweet-thread';

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
// var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?";

function TweetModal({ fromHomePage, quotedFromRetweetModal, selectedTaggedPlace, handlePollVotesCount, pollVotesCount, handleQuoteTweetID, quoteTweetData, currentUser, firstTweetHasMedia, setFirstTweetHasMedia, secondTweetHasMedia, setSecondTweetHasMedia, firstTweetHasPoll, setFirstTweetHasPoll, secondTweetHasPoll, setSecondTweetHasPoll, opacity, setOpacity, setNewDataStatus, isScheduleIconClicked, selectedFile, extraSelectedFile, setSelectedFile, setExtraSelectedFile, gifFile, extraGifFile, setGifFile, setExtraGifFile, toggleModality, handleTweetModalToggle, tweetText, setTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, readyTweetPublish, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, inputTextChoice05, setInputTextChoice05, inputTextChoice06, setInputTextChoice06, inputTextChoice07, setInputTextChoice07, inputTextChoice08, setInputTextChoice08, scheduleStamp, setScheduleStamp, mediaDescriptionText, setMediaDescriptionText }) {
    let [isPrimaryTweetClicked, setIsPrimaryTweetClicked] = useState(false);
    let [isExtraTweetClicked, setIsExtraTweetClicked] = useState(false);
    let [addExtraTweetClicked, setAddExtraTweetClicked] = useState(false);
    let [isBothTextareaExist, setIsBothTextareaExist] = useState(false);
    let [extraPaddingTop, setExtraPaddingTop] = useState(null)

    // let [toggleModality, setToggleModality] = useState(false);
    let [tweetOptions, setTweetOptions] = useState(false);

    // let [selectedFile, setSelectedFile] = useState();
    // let [gifFile, setGifFile] = useState('');
    let inputRef = useRef();

    let [isGifIconClicked, setIsGifIconClicked] = useState(false);
    let [isGifIconClickedForExtraTweet, setIsGifIconClickedForExtraTweet] = useState(false);
    let [isPollIconClicked, setIsPollIconClicked] = useState(false);
    let [isPollIconClickedForExtraTweet, setIsPollIconClickedForExtraTweet] = useState(false);
    let [isEmojiIconClicked, setIsEmojiIconClicked] = useState(false);
    // let [isScheduleIconClicked, setIsScheduleIconClicked] = useState(false)

    let [firstTweetHasGif, setFirstTweetHasGif] = useState(false)
    let [secondTweetHasGif, setSecondTweetHasGif] = useState(false)

    let [lineHeight, setLineHeight] = useState(null)
    let [modalHeight, setModalHeight] = useState(null)

    useEffect(() => {
        let optionsDiv = document.querySelector('#options-selected');
        optionsDiv.addEventListener('click', () => {
            if (tweetOptions) {
                setTweetOptions(false);
            } else {
                setTweetOptions(true);
            }
        })

    }, [tweetOptions])

    // initial module loading usecases
    useEffect(() => {
        setTweetText(tweetText || '')
        setExtraTweetText(extraTweetText || '')
        setGifFile(gifFile || '')
        setSelectedFile(selectedFile || '')
    }, [])

    // when gif is added in tweets, deciding which part of tweet its been added
    useEffect(() => {
        gifFile && !addExtraTweetClicked && setFirstTweetHasGif(true)
        gifFile && addExtraTweetClicked && setSecondTweetHasGif(true)
    }, [gifFile])
    // console.log(firstTweetHasGif, 'gif check', secondTweetHasGif)

    // when picture files aredded in tweets, deciding which part gets those added 'picture files'
    useEffect(() => {
        selectedFile && isPrimaryTweetClicked && !addExtraTweetClicked && setFirstTweetHasMedia(true)
        // console.log(firstTweetHasMedia, 'first tweet')
    }, [selectedFile])

    useEffect(() => {
        selectedFile && addExtraTweetClicked && setSecondTweetHasMedia(true);
        // secondTweetHasMedia && console.log(secondTweetHasMedia, 'second tweet')
    }, [addExtraTweetClicked])

    // when poll is added into tweets, deciding which tweet has it in it, so that proper rendering on modal and later on on profile page is done correctly
    useEffect(() => {
        isPollIconClicked && !addExtraTweetClicked && setFirstTweetHasPoll(true)
    }, [isPollIconClicked])

    useEffect(() => addExtraTweetClicked && isPollIconClicked && setSecondTweetHasPoll(true), [addExtraTweetClicked])

    useEffect(() => setExtraTweetText(''), [!readyTweetPublish])

    useEffect(() => {
        // quoteTweetData && console.log('quote data', quoteTweetData)
        if (quoteTweetData) {
            // setAddExtraTweetClicked(true)
            // setExtraTweetText('')
            // setTweetText(quoteTweetData[0].tweetText)
            // setTweetPrivacy(quoteTweetData[0].privacy)

        }
    }, [quoteTweetData])

    let fileUploadChangeHandler = (evt) => {
        // setSelectedFile(evt.target.files[0])
        !addExtraTweetClicked && setSelectedFile(evt.target.files[0])
        addExtraTweetClicked && setExtraSelectedFile(evt.target.files[0])
        // addExtraTweetClicked && console.log('yehe')
    }

    let removeImageHandler = () => {
        setSelectedFile('')
        setExtraSelectedFile('')
    }

    let removeGifFileHandler = () => {
        setGifFile('');
        setExtraGifFile('')
    }

    let closeTweetModalHandler = () => {
        // setToggleModality(!toggleModality)
        handleTweetModalToggle();
        setScheduleStamp('')

        setTweetText('')
        setExtraTweetText('')

        setSelectedFile('')
        setExtraSelectedFile('')

        !fromHomePage && handleQuoteTweetID(null);

        setOpacity(false)

        setFirstTweetHasPoll(false)
        setSecondTweetHasPoll(false)
    }

    let handlePollIconClicked = () => {
        !firstTweetHasPoll && setIsPollIconClicked(!isPollIconClicked);
        (firstTweetHasPoll || addExtraTweetClicked) && setIsPollIconClickedForExtraTweet(true)
    }

    let handlePublishTweetNow = evt => {
        readyTweetPublish(true);
        // setToggleModality(!toggleModality)
        handleTweetModalToggle()
        // handleTweetModalToggle();
        // setScheduleStamp('')

        // setFirstTweetHasMedia(false)
        // setSecondTweetHasMedia(false)
        setFirstTweetHasPoll(false)
        setSecondTweetHasPoll(false)

        setScheduleStamp('')

        // closeTweetModalHandler();

        setAddExtraTweetClicked(false);
        setIsExtraTweetClicked(false);
        setIsBothTextareaExist(false);
        setNewDataStatus(true)
        // console.log(tweetText, "??")
        setOpacity(false)
    }

    let onGifClick = (gif, evt) => {
        evt.preventDefault();

        !addExtraTweetClicked && setGifFile(gif)

        addExtraTweetClicked && setExtraGifFile(gif)

        setIsGifIconClicked(false)
    }

    let handleAddExtraTweet = () => {
        setIsPrimaryTweetClicked(false)
        setAddExtraTweetClicked(!addExtraTweetClicked)

        // setIsPollIconClicked(false)
    }
    // quoteTweetData && quoteTweetData.medias.gif && console.log(quoteTweetData.medias.gif)

    // useEffect(() => {
    //     if (extraTweetText) {
    //         let referencePoint01 = document.querySelector('#header-section')
    //         let referencePoint02 = document.querySelector('#extra-tweet-view')
    //         let calc = (referencePoint01.clientHeight - 53)
    //         // let calc = (referencePoint01.clientHeight - 53) + (referencePoint02.clientHeight - 53)
    //         console.log(referencePoint01.clientHeight, referencePoint02.clientHeight)
    //         calc && setLineHeight(calc)
    //     }
    // }, [extraTweetText])

    useEffect(() => {
        let referencePoint01 = document.querySelector('#header-section')
        let analysingTweetRef = document.querySelector('#analysing-user-tweet-wrapper')
        let calc;
        if (isExtraTweetClicked && !(selectedFile || gifFile)) {
            // let referencePoint01 = document.querySelector('#header-section')
            let referencePoint02 = document.querySelector('#extra-tweet-view')
            calc = (referencePoint01.clientHeight - 53)
            // let calc = (referencePoint01.clientHeight - 53) + (referencePoint02.clientHeight - 53)
            console.log(referencePoint01.clientHeight, referencePoint02.clientHeight)
            calc && setLineHeight(calc)
            console.log('1st')
        } else if ((selectedFile || gifFile) && !isPrimaryTweetClicked) {
            let mediaDiv = document.querySelector('#tweet-compose-container')
            calc = mediaDiv.clientHeight + referencePoint01.clientHeight - 53
            calc && setLineHeight(calc)
            console.log('2nd')
        } else if ((selectedFile || gifFile) && isPrimaryTweetClicked && isBothTextareaExist) {
            let mediaDiv = document.querySelector('#tweet-compose-container')
            let footerDiv = document.querySelector('#footer-section')
            calc = mediaDiv.clientHeight + (referencePoint01.clientHeight - 53) + footerDiv.clientHeight
            calc && setLineHeight(calc)
            console.log('3nd')
        } else if (isBothTextareaExist && isPrimaryTweetClicked) {
            // let referencePoint01 = document.querySelector('#header-section')
            let referencePoint02 = document.querySelector('#extra-tweet-view')

            let footerDiv = document.querySelector('#footer-section')

            calc = footerDiv.clientHeight + referencePoint01.clientHeight - 53
            calc && setLineHeight(calc)
            console.log('4th')
        } 
        // else if(analysingTweetRef) {
        //     // setLineHeight(prevHeight => prevHeight+analysingTweetRef .clientHeight)
        //     setExtraPaddingTop(analysingTweetRef.clientHeight)
        //     console.log(analysingTweetRef.clientHeight, 'analysingTweetRef .clientHeight')
        // }
        // let tweetModal = document.querySelector('#tweet-modal');
        // setModalHeight(tweetModal.clientHeight);

        // console.log(analysingTweetRef, analysingTweetRef.clientHeight)

        // analysingTweetRef && setLineHeight(279)
        // if (analysingTweetRef) {
        //     let chkIfPictureExist = analysingTweetRef.querySelector('.quoted-picture');
        //     let chkIfGifExist = analysingTweetRef.querySelector('.style-gif-border-radius');

        //     if (chkIfPictureExist || chkIfGifExist) setLineHeight(prevHeight => prevHeight + 299)
        // }

        // analysingTweetRef && console.log(analysingTweetRef, analysingTweetRef.clientHeight, tweetModal.clientHeight)

    }, [extraTweetText, isExtraTweetClicked])

    useEffect(() => {
        // quoteTweetData && !quotedFromRetweetModal && setExtraPaddingTop(140.1)
        quoteTweetData && !quotedFromRetweetModal && setExtraPaddingTop((quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) ? 442.1 : 140.1)
        // (quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) && !quotedFromRetweetModal && setExtraPaddingTop(442.1)
        // quoteTweetData && quotedFromRetweetModal && setLineHeight(prevHeight => prevHeight+141)
        quoteTweetData && quotedFromRetweetModal && setLineHeight(prevHeight => (quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) ? prevHeight+420 : prevHeight+141)
        // quoteTweetData && quotedFromRetweetModal && console.log('quoteTweetData && quotedFromRetweetModal && s', lineHeight)
        // quoteTweetData && quotedFromRetweetModal && setExtraPaddingTop(141)
        // quoteTweetData && !quotedFromRetweetModal && console.log(quoteTweetData, 'quoteTweetData && !quotedFromRetweetModal!!')
    }, [quoteTweetData, quotedFromRetweetModal, isPrimaryTweetClicked, isExtraTweetClicked, tweetText, extraTweetText])

    return (
        <div id='tweet-modal'
            // style={{ display: toggleModality ? 'block' : 'none', zIndex: '9999', height: ((isBothTextareaExist && isPrimaryTweetClicked && (selectedFile || gifFile))) ? '731px' : (isBothTextareaExist && isPrimaryTweetClicked && (firstTweetHasPoll) && !isPollIconClickedForExtraTweet) ? '643px' : '', minHeight: (firstTweetHasMedia && secondTweetHasMedia && isPrimaryTweetClicked) ? '1089px' : (firstTweetHasPoll && secondTweetHasPoll && isPollIconClickedForExtraTweet && isPrimaryTweetClicked) ? '936px' : (((extraGifFile && gifFile) || (selectedFile && extraSelectedFile)) && isPrimaryTweetClicked) ? '1104px' : ((extraGifFile || extraSelectedFile) && isPrimaryTweetClicked) ? '731px' : '' }} className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extended-modal-view' : ''} 
            style={{ display: toggleModality ? 'block' : 'none', zIndex: '9999', height: modalHeight && modalHeight }}
        >
            <div className='upper-content'>
                {/* <span id='delete-icon' onClick={closeTweetModalHandler}>{deleteIcon()}</span> */}
                {/* <span id='delete-icon' onClick={closeTweetModalHandler}><Link to='/username'>{deleteIcon()}</Link></span> */}
                <span id='delete-icon' onClick={closeTweetModalHandler}><Link to={`/${currentUser}`}>{deleteIcon()}</Link></span>
                <hr />
            </div>

            <div id='middle-content'>
                {scheduleStamp && scheduleStamp}
                {quoteTweetData && !quotedFromRetweetModal && <RenderUserTweet speceficTweetData={quoteTweetData} currentUser={currentUser} pollVotesCount={pollVotesCount} handlePollVotesCount={handlePollVotesCount} forModal={true} />}
                {quoteTweetData && !quotedFromRetweetModal && <div id='addtional-tweet-extension-line' style={{width: '2px', backgroundColor: 'silver', height: (quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) && '310px', top: (quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) && '47px'}}></div>}
                {/* {quoteTweetData && <div id='addtional-tweet-line' style={{height: ((quoteTweetData.medias.gif && quoteTweetData.medias.gif) || (quoteTweetData.medias.picture && quoteTweetData.medias.picture)) && '324px'}} ></div>} */}
                <div id='header-section'>
                    <img id='profile-pic' src='https://picsum.photos/200/300' />

                    {/* <div id='primary-tweet-view' style={{ opacity: isExtraTweetClicked ? '.6' : '1' }}>{isPollIconClicked ? <TweetTextInput height="42.6px" placeholderText="Ask a question" tweetText={tweetText} setTweetText={setTweetText} setExtraTweetClicked={setIsExtraTweetClicked} setPrimaryTweetClicked={setIsPrimaryTweetClicked} /> : <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={tweetText} setTweetText={setTweetText} setExtraTweetClicked={setIsExtraTweetClicked} setPrimaryTweetClicked={setIsPrimaryTweetClicked} />}</div> */}
                    <div id='primary-tweet-view' style={{ opacity: isExtraTweetClicked ? '.6' : '1' }}>{<TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={quotedFromRetweetModal ? 'Add a comment' : isPollIconClicked ? "Ask a question" : (quoteTweetData && quoteTweetData.length) ? 'Add another Tweet' : "What's happening?"} tweetText={tweetText} setTweetText={setTweetText} setExtraTweetClicked={setIsExtraTweetClicked} setPrimaryTweetClicked={setIsPrimaryTweetClicked} quotedFromRetweetModal={quotedFromRetweetModal} />}</div>
                </div>

                {quoteTweetData && quotedFromRetweetModal && <RenderUserTweet speceficTweetData={quoteTweetData} currentUser={currentUser} pollVotesCount={pollVotesCount} handlePollVotesCount={handlePollVotesCount} forModal={true} quotedFromRetweetModal={quotedFromRetweetModal} />}

                { isBothTextareaExist && <div id='extension-line' style={{ height: lineHeight && lineHeight, width: '2px', backgroundColor: 'silver', position: 'absolute', top: extraPaddingTop ? `${extraPaddingTop}px` : '69px', left: '42px' }}></div>}

                {

                    (!secondTweetHasMedia && !firstTweetHasMedia && !secondTweetHasGif && !firstTweetHasGif && addExtraTweetClicked && !isPrimaryTweetClicked && !firstTweetHasPoll && !secondTweetHasPoll)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {/* {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />} */}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : quoteTweetData ? 'Add another Tweet' : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint00')}
                    </div>
                }

                {
                    // (firstTweetHasMedia || firstTweetHasPoll || (gifFile && isPrimaryTweetClicked))

                    (firstTweetHasMedia || firstTweetHasPoll || firstTweetHasGif)

                    &&

                    <ContentInComposeTweet
                        gifWidth={fromHomePage && '578px'}
                        gifFile={gifFile}
                        removeGifHandler={removeGifFileHandler}
                        selectedFile={selectedFile}
                        removeImageHandler={removeImageHandler}
                        isPollIconClicked={isPollIconClicked}
                        handlePollViewToggle={handlePollIconClicked}
                        inputTextChoice01={inputTextChoice01}
                        setInputTextChoice01={setInputTextChoice01}
                        inputTextChoice02={inputTextChoice02}
                        setInputTextChoice02={setInputTextChoice02}
                        inputTextChoice03={inputTextChoice03}
                        setInputTextChoice03={setInputTextChoice03}
                        inputTextChoice04={inputTextChoice04}
                        setInputTextChoice04={setInputTextChoice04}
                        mediaDescriptionText={mediaDescriptionText}
                        setMediaDescriptionText={setMediaDescriptionText}
                    />
                }

                {

                    // ((firstTweetHasMedia || firstTweetHasPoll) && addExtraTweetClicked && !isPrimaryTweetClicked)

                    ((firstTweetHasMedia || firstTweetHasPoll || firstTweetHasGif) && addExtraTweetClicked && !isPrimaryTweetClicked)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={!firstTweetHasPoll && isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={((!firstTweetHasPoll && isPollIconClicked) || (firstTweetHasPoll && isPollIconClickedForExtraTweet)) ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint01')}
                    </div>
                }

                {

                    (secondTweetHasMedia && !firstTweetHasMedia && !isPrimaryTweetClicked)

                    // ((secondTweetHasMedia || secondTweetHasPoll) && (!firstTweetHasMedia || !firstTweetHasPoll) && !isPrimaryTweetClicked)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint02')}
                    </div>
                }

                {
                    // ((secondTweetHasMedia || secondTweetHasPoll || isPollIconClickedForExtraTweet) && !isPrimaryTweetClicked && isPollIconClicked) || (extraGifFile && !isPrimaryTweetClicked) || ((extraSelectedFile || extraGifFile) && !isPrimaryTweetClicked)

                    ((extraSelectedFile || extraGifFile || isPollIconClickedForExtraTweet) && !isPrimaryTweetClicked)

                    &&
                    <ContentInComposeTweet
                        // gifFile={gifFile}
                        gifWidth={fromHomePage && '578px'}
                        gifFile={extraGifFile && extraGifFile}
                        removeGifHandler={removeGifFileHandler}
                        // selectedFile={selectedFile}
                        selectedFile={extraSelectedFile && extraSelectedFile}
                        removeImageHandler={removeImageHandler}
                        isPollIconClicked={isPollIconClickedForExtraTweet && isPollIconClickedForExtraTweet}
                        handlePollViewToggle={handlePollIconClicked}
                        inputTextChoice01={inputTextChoice05}
                        setInputTextChoice01={setInputTextChoice05}
                        inputTextChoice02={inputTextChoice06}
                        setInputTextChoice02={setInputTextChoice06}
                        inputTextChoice03={inputTextChoice07}
                        setInputTextChoice03={setInputTextChoice07}
                        inputTextChoice04={inputTextChoice08}
                        setInputTextChoice04={setInputTextChoice08}
                        mediaDescriptionText={mediaDescriptionText}
                        setMediaDescriptionText={setMediaDescriptionText}
                    />
                }

                <div id='footer-section'>
                    {/* <TweetPrivacySelected setTweetOptions={setTweetOptions} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} /> */}
                    <PrivacyAndTaggedLocation setTweetOptions={setTweetOptions} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} selectedTaggedPlace={selectedTaggedPlace} />

                    <div id='tweet-additionals' style={{ marginTop: selectedTaggedPlace && '-6px' }}>
                        {/* <TweetMediaOptions gifFile={gifFile} selectedFile={selectedFile} inputRef={inputRef} setIsGifIconClicked={setIsGifIconClicked} isGifIconClicked={isGifIconClicked} handleToggle={handlePollIconClicked} isPollIconClicked={isPollIconClicked} isEmojiIconClicked={isEmojiIconClicked} showPicker={setIsEmojiIconClicked} scheduleToggler={handleScheduleIconClicked} /> */}
                        <TweetMediaOptions gifFile={gifFile} selectedFile={selectedFile} inputRef={inputRef} setIsGifIconClicked={setIsGifIconClicked} isGifIconClicked={isGifIconClicked} handleToggle={handlePollIconClicked} isPollIconClicked={isPollIconClicked} isEmojiIconClicked={isEmojiIconClicked} showPicker={setIsEmojiIconClicked} />

                        {/* <div id='modal-tweet-div'> <div id='extra-tweet-options' style={{ visibility: (extraTweetText) ? 'visible' : (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : (addExtraTweetClicked && tweetText) ? 'hidden' : tweetText ? 'visible' : 'hidden' }}><span className='extra-tweet' onClick={() => setAddExtraTweetClicked(!addExtraTweetClicked)}>+</span> <span className='extra-tweet'>|</span> <span id='radial-progressbar'>{isPrimaryTweetClicked ? <TweetWordCount wordCount={tweetText.length} /> : <TweetWordCount wordCount={extraTweetText.length} />}</span></div> <span id='tweet-now' onClick={handlePublishTweetNow}>tweet</span></div> */}
                        {/* <div id='modal-tweet-div'> <div id='extra-tweet-options' style={{ visibility: (extraTweetText) ? 'visible' : (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : (addExtraTweetClicked && tweetText) ? 'hidden' : tweetText ? 'visible' : 'hidden' }}><span className='extra-tweet' onClick={handleAddExtraTweet}>+</span> <span className='extra-tweet'>|</span> <span id='radial-progressbar'>{isPrimaryTweetClicked ? <TweetWordCount wordCount={tweetText.length} /> : <TweetWordCount wordCount={extraTweetText.length} />}</span></div> <Link to='/username' id='tweet-now' onClick={handlePublishTweetNow}>{scheduleStamp ? 'Schedule' : addExtraTweetClicked ? 'Tweet all' : 'Tweet'}</Link></div> */}
                        <div id='modal-tweet-div'> <div id='extra-tweet-options' style={{ visibility: (extraTweetText) ? 'visible' : (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : (addExtraTweetClicked && tweetText) ? 'hidden' : tweetText ? 'visible' : 'hidden' }}><span className='extra-tweet' onClick={handleAddExtraTweet}>+</span> <span className='extra-tweet'>|</span> <span id='radial-progressbar'>{isPrimaryTweetClicked ? <TweetWordCount wordCount={tweetText.length} /> : <TweetWordCount wordCount={extraTweetText.length} />}</span></div> <Link to={`/${currentUser}`} id='tweet-now' onClick={handlePublishTweetNow}>{scheduleStamp ? 'Schedule' : addExtraTweetClicked ? 'Tweet all' : 'Tweet'}</Link></div>
                    </div>

                    <UploadFile chnageHandler={fileUploadChangeHandler} inputRef={inputRef} />

                    {/* <GridDemo onGifClick={onGifClick} isGifIconClicked={isGifIconClicked} /> */}
                    <GifModal onGifClick={onGifClick} isGifIconClicked={isGifIconClicked} gridWidth={960} gridCollumn={3} />

                    <TweetOptionsDropDown tweetOptions={tweetOptions} />

                    <EmojiPicker isIconClicked={isEmojiIconClicked} tweetText={tweetText} setTweetText={setTweetText} />
                </div>
                {

                    (firstTweetHasMedia && isPrimaryTweetClicked && !secondTweetHasMedia)

                    // ((firstTweetHasMedia || firstTweetHasPoll) && isPrimaryTweetClicked && (!secondTweetHasMedia || !secondTweetHasPoll))

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {/* {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />} */}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint03')}
                    </div>
                }

                {

                    (secondTweetHasMedia && isPrimaryTweetClicked)

                    // ((secondTweetHasMedia || secondTweetHasPoll) && isPrimaryTweetClicked)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {/* {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />} */}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint04')}
                    </div>
                }

                {

                    (!secondTweetHasMedia && !firstTweetHasMedia && isPrimaryTweetClicked && addExtraTweetClicked)

                    // ((!secondTweetHasMedia || !secondTweetHasPoll) && (!firstTweetHasMedia || !firstTweetHasPoll) && isPrimaryTweetClicked && addExtraTweetClicked)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {/* {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />} */}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint05')}
                    </div>
                }

                {
                    (secondTweetHasMedia || secondTweetHasPoll || isPollIconClickedForExtraTweet || extraGifFile || extraSelectedFile) && isPrimaryTweetClicked

                    // (secondTweetHasMedia || isPollIconClickedForExtraTweet) && isPrimaryTweetClicked && !firstTweetHasPoll

                    &&
                    <ContentInComposeTweet
                        // gifFile={gifFile}
                        gifWidth={fromHomePage && '578px'}
                        gifFile={extraGifFile}
                        removeGifHandler={removeGifFileHandler}
                        selectedFile={extraSelectedFile}
                        removeImageHandler={removeImageHandler}
                        isPollIconClicked={isPollIconClickedForExtraTweet}
                        handlePollViewToggle={handlePollIconClicked}
                        inputTextChoice01={inputTextChoice05}
                        setInputTextChoice01={setInputTextChoice05}
                        inputTextChoice02={inputTextChoice06}
                        setInputTextChoice02={setInputTextChoice06}
                        inputTextChoice03={inputTextChoice07}
                        setInputTextChoice03={setInputTextChoice07}
                        inputTextChoice04={inputTextChoice08}
                        setInputTextChoice04={setInputTextChoice08}
                        mediaDescriptionText={mediaDescriptionText}
                        setMediaDescriptionText={setMediaDescriptionText}
                    />
                }
            </div>
        </div>
    )
}

let PrivacyAndTaggedLocation = ({ setTweetOptions, tweetPrivacy, setTweetPrivacy, selectedTaggedPlace }) => {
    return (
        <div id='privacy-tagged-location-wrapper' style={{ height: selectedTaggedPlace && '42px' }}>
            <TweetPrivacySelected setTweetOptions={setTweetOptions} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} />
            {selectedTaggedPlace && <ShowCurrentlyTaggedPlace selectedTaggedPlace={selectedTaggedPlace} fromTweetModal={true} />}
        </div>
    )
}

let TweetMediaOptions = ({ gifFile, selectedFile, inputRef, setIsGifIconClicked, isGifIconClicked, handleToggle, isPollIconClicked, isEmojiIconClicked, showPicker, scheduleToggler }) => {
    let [hovered, setHovered] = useState(null)

    let history = useHistory(null)

    let handleHovered = evt => {
        let hoveredNode = evt.target.id
        setHovered(hoveredNode)
        // console.log(evt.target, hoveredNode, 'hoveredNode!!')
    }

    let handleBlurred = () => setHovered('')

    let onImageIconClicked = evt => inputRef.current.click();

    let onGifIconClicked = evt => setIsGifIconClicked(!isGifIconClicked);

    let emojiIconClicked = () => showPicker(!isEmojiIconClicked);

    let handleScheduleToggler = () => {
        scheduleToggler();
    }

    useEffect(() => setHovered(''), [])

    let HandleLocation = () => history.push('/compose/tweet/place_picker')

    // return <div id='tweet-medias'><div id='image-icon' onClick={onImageIconClicked} style={{ pointerEvents: (isGifIconClicked || isPollIconClicked) ? 'none' : 'auto' }}>{imageIcon()}</div> <div id='gif-icon' style={{ pointerEvents: (selectedFile || isPollIconClicked) ? 'none' : 'auto' }} onClick={onGifIconClicked}>{gifIcon()}</div> <div id='poll-icon' style={{ pointerEvents: (selectedFile || isGifIconClicked) ? 'none' : 'auto' }} onClick={handleToggle}>{pollIcon()}</div> <div id='emoji-icon' onClick={emojiIconClicked}>{copyIcon()}</div> <div id='schedule-icon' onClick={handleScheduleToggler}>{scheduleIcon()}</div></div>
    return (
        <div id='tweet-medias'>
            <div className='media-icons' id='image-icon' onClick={onImageIconClicked} onMouseEnter={handleHovered} onBlur={handleBlurred} style={{ pointerEvents: (isGifIconClicked || isPollIconClicked) ? 'none' : 'auto' }}>
                {imageIcon()}
                {hovered == 'image-icon' && <div className='hoveredText'>Picture</div>}
            </div>
            {/* {hovered == 'image-icon' && <div className='hoveredText'>Picture</div>} */}

            <div className='media-icons' id='gif-icon' onMouseEnter={handleHovered} onBlur={handleBlurred} style={{ pointerEvents: (selectedFile || isPollIconClicked) ? 'none' : 'auto' }} onClick={onGifIconClicked}>
                {gifIcon()}
                {hovered == 'gif-icon' && <div className='hoveredText'>Gif</div>}
            </div>

            <div className='media-icons' id='poll-icon' onMouseEnter={handleHovered} onBlur={handleBlurred} style={{ pointerEvents: (selectedFile || isGifIconClicked) ? 'none' : 'auto' }} onClick={handleToggle}>
                {pollIcon()}
                {hovered == 'poll-icon' && <div className='hoveredText'>Poll</div>}
            </div>

            <div className='media-icons' id='emoji-icon' onMouseEnter={handleHovered} onBlur={handleBlurred} onClick={emojiIconClicked}>
                {copyIcon()}
                {hovered == 'emoji-icon' && <div className='hoveredText'>Emoji</div>}
            </div>

            <Link className='media-icons' to='/tweet/compose/schedule' id='schedule-icon' onMouseEnter={handleHovered} onBlur={handleBlurred}>
                {scheduleIcon()}
                {hovered == 'schedule-icon' && <div className='hoveredText'>Schedule</div>}
            </Link>

            <div className='media-icons' id='handle-location' onMouseEnter={handleHovered} onBlur={handleBlurred} onClick={HandleLocation} style={{ fill: 'rgb(29, 155, 240)' }}>
                {locationTagIcon()}
                {hovered == 'handle-location' && <div className='hoveredText'>Tag Location</div>}
            </div>

        </div>
    )
}


let TweetOptionsDropDown = ({ tweetOptions }) => {
    return (
        <div id='tweet-options' style={{ display: tweetOptions ? 'block' : 'none' }}>
            <h4>Who can reply?</h4>
            <p>Choose who can reply to this Tweet. Anyone mentioned can always reply.</p>

            <div className='options-div' id='opt-01'>
                <span id='svg-01' className='option-svg'>{everybodyIcon('white')}</span> <span className='option-text'>Everybody</span>
            </div>

            <div className='options-div' id='opt-02'>
                <span className='option-svg'>{peopleIcon('white', 'transparent')}</span> <span className='option-text'>People you follow</span>
            </div>

            <div className='options-div' id='opt-03'>
                <span className='option-svg'>{mentionedIcon('white')}</span> <span className='option-text'>Only people you mention</span>
            </div>
        </div>
    )
}

let TweetPrivacySelected = ({ setTweetOptions, tweetPrivacy, setTweetPrivacy }) => {
    // let [tweetPrivacy, setTweetPrivacy] = useState('01');

    useEffect(() => {
        let privacyOptions = document.querySelector('#tweet-options');
        privacyOptions.addEventListener('click', (evt) => {
            let whichOption = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
            if (whichOption.includes('01')) {
                setTweetPrivacy('01');
            } else if (whichOption.includes('02')) {
                setTweetPrivacy('02');
            } else if (whichOption.includes('03')) {
                setTweetPrivacy('03');
            }
            setTweetOptions(false);
        })

    }, [])

    return <span id='options-selected'>{tweetPrivacy == '01' ? tweetPrivacySelected01() : tweetPrivacy == '02' ? tweetPrivacySelected02() : tweetPrivacySelected03()}</span>
}

let TweetTextInput = ({ quotedFromRetweetModal, primaryTweetOnFocused, height, placeholderText, tweetText, setTweetText, setPrimaryTweetClicked, setExtraTweetClicked, setBoth }) => {
    // let testRef = useRef();
    let handleTweetTextChanges = evt => {
        adjustHeight(evt);
        setTweetText(evt.target.value)
    }

    useEffect(() => {
        let tweetInput = document.querySelector('#tweet-input');
        !quotedFromRetweetModal && (tweetInput.style.height = height);
        // setTweetText('')
        // tweetInput.focus()
        // !primaryTweetOnFocused && document.querySelectorAll('#tweet-input')[1].focus()
        // primaryTweetOnFocused && tweetInput.focus()
    }, [height])

    let adjustHeight = (evt) => {
        let element = evt.target;
        element.style.height = height;
        element.style.height = (1 + element.scrollHeight) + "px";
    }

    let handleTextareaWhenFocused = (evt) => {
        let focusedTextarea = evt.target.parentNode;
        if (focusedTextarea) {
            if (focusedTextarea.id == 'primary-tweet-view') {
                setExtraTweetClicked(false)
                setPrimaryTweetClicked(true)
            } else {
                setExtraTweetClicked(true)
                setPrimaryTweetClicked(false)
                setBoth(true);
            }
        }

        // evt.target.focus()
        // testRef.current.focus()

        evt.target.parentNode.style.opacity = '1';
    }

    return <textarea style={{ backgroundColor: 'transparent', border: 'solid 1px silver', borderRadius: '4px' }} rows={quotedFromRetweetModal ? '2' : '4'} id='tweet-input' type='text' maxLength='200' onFocus={handleTextareaWhenFocused} value={tweetText} onChange={handleTweetTextChanges} placeholder={placeholderText} />
}

export let tweetPrivacySelected01 = (color, text) => <span className='privacy-spans'>{text != ' ' && <span className='privacy-svg'>{everybodyIcon(color ? color : 'none')}</span>}<span className='privacy-text'>{text || 'Everybody can reply'}</span></span>

export let tweetPrivacySelected02 = (color, text) => <span className='privacy-spans'>{text != ' ' && <span className='privacy-svg'>{peopleIcon(color ? color : 'rgb(29, 155, 240)')}</span>}<span className='privacy-text'>{text || 'People you follow'}</span></span>

export let tweetPrivacySelected03 = (color, text) => <span className='privacy-spans'>{text != ' ' && <span className='privacy-svg'>{mentionedIcon(color ? color : 'rgb(29, 155, 240)')}</span>}<span className='privacy-text'>{text || 'Only people you mention'}</span></span>

let GridDemo = ({ onGifClick, isGifIconClicked }) => {
    let [gifSearchingText, setGifSearchingText] = useState('')

    let handleGifSearching = (value) => setGifSearchingText(value)

    let [width, setWidth] = useState(window.innerWidth);

    let [fetchedGifs, setFetchedGifs] = useState()

    useEffect(() => {
        gifSearchingText && setFetchedGifs(<FetchSearchedGifs onGifClick={onGifClick} width={width} gifSearchingText={gifSearchingText} />)
        !gifSearchingText && setFetchedGifs(<InitialFetchedGifs onGifClick={onGifClick} width={width} />)
        // setFetchedGifs((offset) => giphyFetch.trending({ offset, limit: 10 }))
        // gifSearchingText && setFetchedGifs((offset) => giphyFetch.search(gifSearchingText, { offset, limit: 10 }))
        // setFetchedGifs((offset) => giphyFetch.search(gifSearchingText, { offset, limit: 10 }))
        // setFetchedGifs(<Grid onGifClick={onGifClick} className='grid-component' fetchGifs={(offset) => giphyFetch.search(gifSearchingText, { offset, limit: 10 })} width={width / 2} columns={2} />)
    }, [gifSearchingText])

    useEffect(() => {
        setWidth('760')
        setFetchedGifs(<InitialFetchedGifs onGifClick={onGifClick} width={width} />)
        // setFetchedGifs(giphyFetch.trending({ limit: 10 }))
        // setFetchedGifs(<Grid onGifClick={onGifClick} className='grid-component' fetchGifs={() => giphyFetch.trending({ offset, limit: 10 })} width={width / 2} columns={2} />)
    }, [])

    // console.log(fetchedGifs, '?!?!')

    return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}>
        <div id='gif-top'>
            <span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span>
            <SearchGif handleGifSearching={handleGifSearching} />
        </div>
        {fetchedGifs}
        {/* <Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchedGifs} width={width / 2} columns={2} /> */}
        {/* {gifSearchingText ? <FetchSearchedGifs onGifClick={onGifClick} width={width} gifSearchingText={gifSearchingText} /> : <InitialFetchedGifs onGifClick={onGifClick} width={width} />} */}
    </div>
}

let FetchSearchedGifs = ({ gifSearchingText, width, onGifClick }) => {
    // let fetchGifs = (offset) => giphyFetch.search(gifSearchingText, { offset, limit: 10 });
    // let fetchGifs = (offset) => giphyFetch.search('dogs', { offset, limit: 10 });
    let fetchGifs = async (offset) => giphyFetch.search(gifSearchingText, { offset, limit: 10 });
    // let fetchGifs = async (offset) => {
    //     // console.log(gifSearchingText, '!!here!!')
    //     return giphyFetch.search(gifSearchingText, { offset, limit: 10 });
    // }
    // useEffect(() => fetchGifs(), [gifSearchingText])
    console.log(gifSearchingText, '!!here!!')
    // let fetchGifs;
    // useEffect(() => fetchGifs = (offset) => giphyFetch.search(gifSearchingText, { offset, limit: 10 }), [gifSearchingText])
    return (
        <Grid onGifClick={onGifClick} className='grid-component' key={gifSearchingText} fetchGifs={fetchGifs} width={width / 2} columns={2} />
    )
}

let InitialFetchedGifs = ({ onGifClick, width }) => {
    let fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    return (
        <Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={2} />
    )
}

let SearchGif = ({ handleGifSearching }) => {
    let [searchText, setSearchText] = useState('')
    let handleSearchText = evt => setSearchText(evt.target.value)
    useEffect(() => searchText && handleGifSearching(searchText), [searchText])
    return (
        <input id='gif-search' placeholder='search your gifs here!!!!' onChange={handleSearchText} />
    )
}

export let UploadFile = ({ chnageHandler, inputRef }) => {
    return <input type='file' ref={inputRef} name='image-file' onChange={chnageHandler} accept="image/png, image/jpeg, svg, jpg" style={{ display: 'none' }} />
}

export default TweetModal


/**
 * 
 * 
 {/* connecting two existing tweets, on load default connector /}
 {(!selectedFile || !gifFile || !firstTweetHasPoll || !firstTweetHasGif) && <p id='line-extension' style={{ display: addExtraTweetClicked && !isPrimaryTweetClicked && !firstTweetHasPoll ? 'block' : 'none' }}></p>}
 {<p id='line-extension-with-two-gifs-and-not-primary-selected' style={{ display: addExtraTweetClicked && !isPollIconClicked && !isPrimaryTweetClicked && !quoteTweetData ? 'block' : 'none' }}></p>}
 {<p id='line-extension-with-two-gifs-and-when-primary-is-selected' style={{ display: addExtraTweetClicked && isPrimaryTweetClicked && firstTweetHasGif ? 'block' : 'none' }}></p>}

 {(firstTweetHasPoll && !isPollIconClickedForExtraTweet) && <p id='line-extension-when-first-tweet-has-poll-and-second-is-none' style={{ display: addExtraTweetClicked && !isPrimaryTweetClicked ? 'block' : 'none' }}></p>}
 {(firstTweetHasPoll && !isPollIconClickedForExtraTweet && isBothTextareaExist && isPrimaryTweetClicked) && <p id='line-extension-when-first-tweet-has-poll-and-second-is-none-and-primary-tweet-is-selected' style={{ display: addExtraTweetClicked && !isPrimaryTweetClicked ? 'block' : 'none' }}></p>}

 {(selectedFile) && <p id='line-extension-with-media' style={{ display: (isBothTextareaExist && isPrimaryTweetClicked) ? 'block' : 'none' }}></p>}
 {(firstTweetHasPoll) && <p id='line-extension-with-poll' style={{ display: (isBothTextareaExist && isPrimaryTweetClicked) ? 'block' : 'none' }}></p>}

 {(tweetText && !selectedFile) && <p id='line-extension-extended' style={{ visibility: (isBothTextareaExist && isPrimaryTweetClicked && !firstTweetHasPoll && !secondTweetHasPoll && !isPollIconClickedForExtraTweet) ? 'visible' : 'hidden' }}></p>}
 {selectedFile && !isPrimaryTweetClicked && <p id='line-extension-extended-with-media-presence' style={{ visibility: (isBothTextareaExist && !isPrimaryTweetClicked) ? 'visible' : 'hidden' }}></p>}
 {/* {selectedFile && !isPrimaryTweetClicked && <p id='line-extension-extended-with-media-presence-for-both-tweets' style={{ visibility: (isBothTextareaExist && !isPrimaryTweetClicked) ? 'visible' : 'hidden' }}></p>} /}
 {selectedFile && !isPrimaryTweetClicked && <p id='line-extension-extended-with-media-presence-for-both-tweets' style={{ visibility: (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : 'hidden' }}></p>}
 {/* {firstTweetHasPoll && isPollIconClickedForExtraTweet && !isPrimaryTweetClicked && !isExtraTweetClicked && <p id='line-extension-extended-with-poll-presence-for-both-tweets-and-primary-is-not-selected' style={{ visibility: (isBothTextareaExist && !isPrimaryTweetClicked) ? 'visible' : 'hidden' }}></p>} /}
 {<p id='line-extension-extended-with-poll-presence-for-both-tweets-and-primary-is-not-selected' style={{ visibility: (isBothTextareaExist && !isPrimaryTweetClicked && firstTweetHasPoll && secondTweetHasPoll && isPollIconClickedForExtraTweet) ? 'visible' : 'hidden' }}></p>}
 * 
 * 
 export let GridDemo = ({ onGifClick, isGifIconClicked }) => {
    let [gifSearchingText, setGifSearchingText] = useState('')

    // var giphySearchApiParams = {
    //     q: gifSearchingText,
    //     limit: 10,
    //     api_key: "sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh",
    //     fmt: "json"
    //   };

    let handleGifSearching = (value) => setGifSearchingText(value)

    let [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setWidth('760')
    }, [])

    // const [width, setWidth] = useState('470px');
    // return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}><div id='gif-top'><span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span><SearchGif handleGifSearching={handleGifSearching} /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={2} /></div>
    // return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}><div id='gif-top'><span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span><SearchGif handleGifSearching={handleGifSearching} /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={gifSearchingText ? fetchSearchedGifs : fetchGifs} width={width / 2} columns={2} /></div>
    return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}>
        <div id='gif-top'>
            <span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span>
            <SearchGif handleGifSearching={handleGifSearching} />
        </div>
        {gifSearchingText ? <FetchSearchedGifs onGifClick={onGifClick} width={width} gifSearchingText={gifSearchingText} /> : <InitialFetchedGifs onGifClick={onGifClick} width={width} />}
    </div>
}
 * 
 * 
 export let GridDemo = ({ onGifClick, isGifIconClicked }) => {
    let [gifSearchingText, setGifSearchingText] = useState('')
    let handleGifSearching = (value) => setGifSearchingText(value)

    // const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    // const [width, setWidth] = useState(window.innerWidth);

    // let fetchGifs = null;
    let fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    let [width, setWidth] = useState(window.innerWidth);

    let fetchSearchedGifs = offset => giphyFetch.search(gifSearchingText, { offset, limit: 10 });

    // useEffect(() => {
    //     if(gifSearchingText.length >=2) {
    //         fetchGifs = (offset) => giphyFetch.search(gifSearchingText, { offset, limit: 10 });
    //         console.log('<<here>>', gifSearchingText, fetchGifs)
    //     } 
    //     // else {
    //     //     // fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    //     // }
    // }, [gifSearchingText])

    useEffect(() => {
        setWidth('760')
        // fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    }, [])

    // const [width, setWidth] = useState('470px');
    // return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}><div id='gif-top'><span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span><SearchGif handleGifSearching={handleGifSearching} /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={2} /></div>
    // return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}><div id='gif-top'><span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span><SearchGif handleGifSearching={handleGifSearching} /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={gifSearchingText ? fetchSearchedGifs : fetchGifs} width={width / 2} columns={2} /></div>
    return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}><div id='gif-top'><span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span><SearchGif handleGifSearching={handleGifSearching} /></div>{gifSearchingText ? <FetchSearchedGifs onGifClick={onGifClick} width={width} gifSearchingText={gifSearchingText} /> : <InitialFetchedGifs onGifClick={onGifClick} width={width} />}</div>
}
 */