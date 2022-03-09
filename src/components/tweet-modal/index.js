import React, { useEffect, useRef, useState } from 'react'
import { copyIcon, deleteIcon, everybodyIcon, gifIcon, imageIcon, locationTagIcon, mentionedIcon, peopleIcon, pollIcon, scheduleIcon } from './svg-resources';
import './tweet-modal.css'
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import EmojiPicker from './emoji-picker';
import TweetWordCount from './tweet-word-count';
import ContentInComposeTweet from '../compose-tweet/content-in-compose-tweet';
import { Link, useHistory } from 'react-router-dom';
import { RenderUserTweet } from '../user-profile/all-tweets/tweet-top/analytics-ui';
import GifModal from './gif-modal';
import { ShowCurrentlyTaggedPlace } from '../user-profile/all-tweets/show-tweet-thread';

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function TweetModal({ fromHomePage, quotedFromRetweetModal, selectedTaggedPlace, handlePollVotesCount, pollVotesCount, handleQuoteTweetID, quoteTweetData, currentUser, firstTweetHasMedia, setFirstTweetHasMedia, secondTweetHasMedia, setSecondTweetHasMedia, firstTweetHasPoll, setFirstTweetHasPoll, secondTweetHasPoll, setSecondTweetHasPoll, opacity, setOpacity, setNewDataStatus, isScheduleIconClicked, selectedFile, extraSelectedFile, setSelectedFile, setExtraSelectedFile, gifFile, extraGifFile, setGifFile, setExtraGifFile, toggleModality, handleTweetModalToggle, tweetText, setTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, readyTweetPublish, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, inputTextChoice05, setInputTextChoice05, inputTextChoice06, setInputTextChoice06, inputTextChoice07, setInputTextChoice07, inputTextChoice08, setInputTextChoice08, scheduleStamp, setScheduleStamp, mediaDescriptionText, setMediaDescriptionText }) {
    let [isPrimaryTweetClicked, setIsPrimaryTweetClicked] = useState(false);
    let [isExtraTweetClicked, setIsExtraTweetClicked] = useState(false);
    let [addExtraTweetClicked, setAddExtraTweetClicked] = useState(false);
    let [isBothTextareaExist, setIsBothTextareaExist] = useState(false);
    let [extraPaddingTop, setExtraPaddingTop] = useState(null)
    let [tweetOptions, setTweetOptions] = useState(false);

    let [isGifIconClicked, setIsGifIconClicked] = useState(false);
    let [isPollIconClicked, setIsPollIconClicked] = useState(false);
    let [isPollIconClickedForExtraTweet, setIsPollIconClickedForExtraTweet] = useState(false);
    let [isEmojiIconClicked, setIsEmojiIconClicked] = useState(false);

    let [firstTweetHasGif, setFirstTweetHasGif] = useState(false)
    let [secondTweetHasGif, setSecondTweetHasGif] = useState(false)

    let [lineHeight, setLineHeight] = useState(null)
    let [modalHeight, setModalHeight] = useState(null)

    let inputRef = useRef();

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

    // when picture files aredded in tweets, deciding which part gets those added 'picture files'
    useEffect(() => {
        selectedFile && isPrimaryTweetClicked && !addExtraTweetClicked && setFirstTweetHasMedia(true)
    }, [selectedFile])

    useEffect(() => {
        selectedFile && addExtraTweetClicked && setSecondTweetHasMedia(true);
    }, [addExtraTweetClicked])

    // when poll is added into tweets, deciding which tweet has it in it, so that proper rendering on modal and later on on profile page is done correctly
    useEffect(() => {
        isPollIconClicked && !addExtraTweetClicked && setFirstTweetHasPoll(true)
    }, [isPollIconClicked])

    useEffect(() => addExtraTweetClicked && isPollIconClicked && setSecondTweetHasPoll(true), [addExtraTweetClicked])

    useEffect(() => setExtraTweetText(''), [!readyTweetPublish])

    let fileUploadChangeHandler = (evt) => {
        !addExtraTweetClicked && setSelectedFile(evt.target.files[0])
        addExtraTweetClicked && setExtraSelectedFile(evt.target.files[0])
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
        handleTweetModalToggle()
        
        setFirstTweetHasPoll(false)
        setSecondTweetHasPoll(false)

        setScheduleStamp('')

        setAddExtraTweetClicked(false);
        setIsExtraTweetClicked(false);
        setIsBothTextareaExist(false);
        setNewDataStatus(true)
        
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
    }

    useEffect(() => {
        let referencePoint01 = document.querySelector('#header-section')
        let analysingTweetRef = document.querySelector('#analysing-user-tweet-wrapper')
        let calc;
        if (isExtraTweetClicked && !(selectedFile || gifFile)) {
            calc = (referencePoint01.clientHeight - 53)
            calc && setLineHeight(calc)
        } else if ((selectedFile || gifFile) && !isPrimaryTweetClicked) {
            let mediaDiv = document.querySelector('#tweet-compose-container')
            calc = mediaDiv.clientHeight + referencePoint01.clientHeight - 53
            calc && setLineHeight(calc)
        } else if ((selectedFile || gifFile) && isPrimaryTweetClicked && isBothTextareaExist) {
            let mediaDiv = document.querySelector('#tweet-compose-container')
            let footerDiv = document.querySelector('#footer-section')
            calc = mediaDiv.clientHeight + (referencePoint01.clientHeight - 53) + footerDiv.clientHeight
            calc && setLineHeight(calc)
        } else if (isBothTextareaExist && isPrimaryTweetClicked) {
            let footerDiv = document.querySelector('#footer-section')
            calc = footerDiv.clientHeight + referencePoint01.clientHeight - 53
            calc && setLineHeight(calc)
        }
    }, [extraTweetText, isExtraTweetClicked])

    useEffect(() => {
        quoteTweetData && !quotedFromRetweetModal && setExtraPaddingTop((quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) ? 442.1 : 140.1)
        quoteTweetData && quotedFromRetweetModal && setLineHeight(prevHeight => (quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) ? prevHeight+420 : prevHeight+141)
    }, [quoteTweetData, quotedFromRetweetModal, isPrimaryTweetClicked, isExtraTweetClicked, tweetText, extraTweetText])

    return (
        <div id='tweet-modal'
            style={{ display: toggleModality ? 'block' : 'none', zIndex: '9999', height: modalHeight && modalHeight }}
        >
            <div className='upper-content'>
                <span id='delete-icon' onClick={closeTweetModalHandler}><Link to={`/${currentUser}`}>{deleteIcon()}</Link></span>
                <hr />
            </div>

            <div id='middle-content'>
                {scheduleStamp && scheduleStamp}
                {quoteTweetData && !quotedFromRetweetModal && <RenderUserTweet speceficTweetData={quoteTweetData} currentUser={currentUser} pollVotesCount={pollVotesCount} handlePollVotesCount={handlePollVotesCount} forModal={true} />}
                {quoteTweetData && !quotedFromRetweetModal && <div id='addtional-tweet-extension-line' style={{width: '2px', backgroundColor: 'silver', height: (quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) && '310px', top: (quoteTweetData[0].medias.gif || quoteTweetData[0].medias.picture) && '47px'}}></div>}
                
                <div id='header-section'>
                    <img id='profile-pic' src='https://picsum.photos/200/300' />
                    <div id='primary-tweet-view' style={{ opacity: isExtraTweetClicked ? '.6' : '1' }}>{<TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={quotedFromRetweetModal ? 'Add a comment' : isPollIconClicked ? "Ask a question" : (quoteTweetData && quoteTweetData.length) ? 'Add another Tweet' : "What's happening?"} tweetText={tweetText} setTweetText={setTweetText} setExtraTweetClicked={setIsExtraTweetClicked} setPrimaryTweetClicked={setIsPrimaryTweetClicked} quotedFromRetweetModal={quotedFromRetweetModal} />}</div>
                </div>

                {quoteTweetData && quotedFromRetweetModal && <RenderUserTweet speceficTweetData={quoteTweetData} currentUser={currentUser} pollVotesCount={pollVotesCount} handlePollVotesCount={handlePollVotesCount} forModal={true} quotedFromRetweetModal={quotedFromRetweetModal} />}

                { isBothTextareaExist && <div id='extension-line' style={{ height: lineHeight && lineHeight, width: '2px', backgroundColor: 'silver', position: 'absolute', top: extraPaddingTop ? `${extraPaddingTop}px` : '69px', left: '42px' }}></div>}

                {
                    (!secondTweetHasMedia && !firstTweetHasMedia && !secondTweetHasGif && !firstTweetHasGif && addExtraTweetClicked && !isPrimaryTweetClicked && !firstTweetHasPoll && !secondTweetHasPoll)
                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : quoteTweetData ? 'Add another Tweet' : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                    </div>
                }

                {
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
                    ((firstTweetHasMedia || firstTweetHasPoll || firstTweetHasGif) && addExtraTweetClicked && !isPrimaryTweetClicked)
                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={!firstTweetHasPoll && isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={((!firstTweetHasPoll && isPollIconClicked) || (firstTweetHasPoll && isPollIconClickedForExtraTweet)) ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                    </div>
                }

                {
                    (secondTweetHasMedia && !firstTweetHasMedia && !isPrimaryTweetClicked)
                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                    </div>
                }

                {
                    ((extraSelectedFile || extraGifFile || isPollIconClickedForExtraTweet) && !isPrimaryTweetClicked)
                    &&
                    <ContentInComposeTweet
                        gifWidth={fromHomePage && '578px'}
                        gifFile={extraGifFile && extraGifFile}
                        removeGifHandler={removeGifFileHandler}
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
                    <PrivacyAndTaggedLocation setTweetOptions={setTweetOptions} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} selectedTaggedPlace={selectedTaggedPlace} />

                    <div id='tweet-additionals' style={{ marginTop: selectedTaggedPlace && '-6px' }}>
                        <TweetMediaOptions gifFile={gifFile} selectedFile={selectedFile} inputRef={inputRef} setIsGifIconClicked={setIsGifIconClicked} isGifIconClicked={isGifIconClicked} handleToggle={handlePollIconClicked} isPollIconClicked={isPollIconClicked} isEmojiIconClicked={isEmojiIconClicked} showPicker={setIsEmojiIconClicked} />
                        <div id='modal-tweet-div'> <div id='extra-tweet-options' style={{ visibility: (extraTweetText) ? 'visible' : (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : (addExtraTweetClicked && tweetText) ? 'hidden' : tweetText ? 'visible' : 'hidden' }}><span className='extra-tweet' onClick={handleAddExtraTweet}>+</span> <span className='extra-tweet'>|</span> <span id='radial-progressbar'>{isPrimaryTweetClicked ? <TweetWordCount wordCount={tweetText.length} /> : <TweetWordCount wordCount={extraTweetText.length} />}</span></div> <Link to={`/${currentUser}`} id='tweet-now' onClick={handlePublishTweetNow}>{scheduleStamp ? 'Schedule' : addExtraTweetClicked ? 'Tweet all' : 'Tweet'}</Link></div>
                    </div>

                    <UploadFile chnageHandler={fileUploadChangeHandler} inputRef={inputRef} />

                    <GifModal onGifClick={onGifClick} isGifIconClicked={isGifIconClicked} gridWidth={960} gridCollumn={3} />

                    <TweetOptionsDropDown tweetOptions={tweetOptions} />

                    <EmojiPicker isIconClicked={isEmojiIconClicked} tweetText={tweetText} setTweetText={setTweetText} />
                </div>
                {
                    (firstTweetHasMedia && isPrimaryTweetClicked && !secondTweetHasMedia)
                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                    </div>
                }

                {
                    (secondTweetHasMedia && isPrimaryTweetClicked)
                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                    </div>
                }

                {
                    (!secondTweetHasMedia && !firstTweetHasMedia && isPrimaryTweetClicked && addExtraTweetClicked)
                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height={isPollIconClicked ? "41.6px" : "81.6px"} placeholderText={isPollIconClicked ? "Ask a question...." : "What's happening?"} tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                    </div>
                }

                {
                    (secondTweetHasMedia || secondTweetHasPoll || isPollIconClickedForExtraTweet || extraGifFile || extraSelectedFile) && isPrimaryTweetClicked
                    &&
                    <ContentInComposeTweet
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
    }

    let handleBlurred = () => setHovered('')

    let onImageIconClicked = evt => inputRef.current.click();

    let onGifIconClicked = evt => setIsGifIconClicked(!isGifIconClicked);

    let emojiIconClicked = () => showPicker(!isEmojiIconClicked);

    useEffect(() => setHovered(''), [])

    let HandleLocation = () => history.push('/compose/tweet/place_picker')

    return (
        <div id='tweet-medias'>
            <div className='media-icons' id='image-icon' onClick={onImageIconClicked} onMouseEnter={handleHovered} onBlur={handleBlurred} style={{ pointerEvents: (isGifIconClicked || isPollIconClicked) ? 'none' : 'auto' }}>
                {imageIcon()}
                {hovered == 'image-icon' && <div className='hoveredText'>Picture</div>}
            </div>

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
        evt.target.parentNode.style.opacity = '1';
    }

    return <textarea style={{ backgroundColor: 'transparent', border: 'solid 1px silver', borderRadius: '4px' }} rows={quotedFromRetweetModal ? '2' : '4'} id='tweet-input' type='text' maxLength='200' onFocus={handleTextareaWhenFocused} value={tweetText} onChange={handleTweetTextChanges} placeholder={placeholderText} />
}

export let tweetPrivacySelected01 = (color, text) => <span className='privacy-spans'>{text != ' ' && <span className='privacy-svg'>{everybodyIcon(color ? color : 'none')}</span>}<span className='privacy-text'>{text || 'Everybody can reply'}</span></span>

export let tweetPrivacySelected02 = (color, text) => <span className='privacy-spans'>{text != ' ' && <span className='privacy-svg'>{peopleIcon(color ? color : 'rgb(29, 155, 240)')}</span>}<span className='privacy-text'>{text || 'People you follow'}</span></span>

export let tweetPrivacySelected03 = (color, text) => <span className='privacy-spans'>{text != ' ' && <span className='privacy-svg'>{mentionedIcon(color ? color : 'rgb(29, 155, 240)')}</span>}<span className='privacy-text'>{text || 'Only people you mention'}</span></span>

export let UploadFile = ({ chnageHandler, inputRef }) => {
    return <input type='file' ref={inputRef} name='image-file' onChange={chnageHandler} accept="image/png, image/jpeg, svg, jpg" style={{ display: 'none' }} />
}

export default TweetModal