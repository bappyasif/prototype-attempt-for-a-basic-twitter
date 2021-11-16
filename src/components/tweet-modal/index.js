import React, { useEffect, useRef, useState } from 'react'
import { copyIcon, deleteIcon, deleteIconForGif, descriptionIcon, everybodyIcon, gifIcon, imageIcon, mentionedIcon, peopleIcon, pollIcon, scheduleIcon, tagIcon } from './svg-resources';
import './tweet-modal.css'
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid, Gif } from '@giphy/react-components';
import TweetPoll from './tweet-poll';
import EmojiPicker from './emoji-picker';
import TweetScheduler from './schedule-tweet';
import TweetWordCount from './tweet-word-count';
import ContentInComposeTweet from '../compose-tweet/content-in-compose-tweet';
import { Link } from 'react-router-dom';

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function TweetModal({ opacity, setOpacity, setNewDataStatus, isScheduleIconClicked, selectedFile, setSelectedFile, gifFile, setGifFile, toggleModality, handleTweetModalToggle, tweetText, setTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, readyTweetPublish, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, scheduleStamp, setScheduleStamp, mediaDescriptionText, setMediaDescriptionText }) {
    let [isPrimaryTweetClicked, setIsPrimaryTweetClicked] = useState(false);
    let [isExtraTweetClicked, setIsExtraTweetClicked] = useState(false);
    let [addExtraTweetClicked, setAddExtraTweetClicked] = useState(false);
    let [isBothTextareaExist, setIsBothTextareaExist] = useState(false);

    // let [toggleModality, setToggleModality] = useState(false);
    let [tweetOptions, setTweetOptions] = useState(false);

    // let [selectedFile, setSelectedFile] = useState();
    // let [gifFile, setGifFile] = useState('');
    let inputRef = useRef();

    let [isGifIconClicked, setIsGifIconClicked] = useState(false);
    let [isPollIconClicked, setIsPollIconClicked] = useState(false);
    let [isEmojiIconClicked, setIsEmojiIconClicked] = useState(false);
    // let [isScheduleIconClicked, setIsScheduleIconClicked] = useState(false)

    let [firstTweetHasMedia, setFirstTweetHasMedia] = useState(false)
    let [secondTweetHasMedia, setSecondTweetHasMedia] = useState(false)

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

    useEffect(() => {
        setTweetText('')
        setExtraTweetText('')
    }, [])

    useEffect(() => {
        selectedFile && isPrimaryTweetClicked && !addExtraTweetClicked && setFirstTweetHasMedia(true)
        // console.log(firstTweetHasMedia, 'first tweet')

        selectedFile && isExtraTweetClicked && setSecondTweetHasMedia(true);
        // console.log(secondTweetHasMedia, 'second tweet')
    }, [selectedFile])

    firstTweetHasMedia && console.log(firstTweetHasMedia, 'first tweet')

    secondTweetHasMedia && console.log(secondTweetHasMedia, 'second tweet')

    // useEffect(() => {
    //     selectedFile && isPrimaryTweetClicked && !addExtraTweetClicked && setFirstTweetHasMedia(true)
    //     console.log(firstTweetHasMedia, 'first tweet')
    // }, [firstTweetHasMedia])

    // useEffect(() => {
    //     selectedFile && isExtraTweetClicked && setSecondTweetHasMedia(true);
    //     console.log(secondTweetHasMedia, 'second tweet')
    // }, [secondTweetHasMedia])

    useEffect(() => setExtraTweetText(''), [!readyTweetPublish])

    let fileUploadChangeHandler = (evt) => setSelectedFile(evt.target.files[0])

    let removeImageHandler = () => setSelectedFile('')

    let removeGifFileHandler = () => setGifFile('');

    let closeTweetModalHandler = () => {
        // setToggleModality(!toggleModality)
        handleTweetModalToggle();
        setScheduleStamp('')

        setOpacity(false)

        // setTweetText('');
        // setExtraTweetText('');
        // readyTweetPublish(false);
    }

    let handlePollIconClicked = () => setIsPollIconClicked(!isPollIconClicked);

    // let handleScheduleIconClicked = () => {
    //     setIsScheduleIconClicked(!isScheduleIconClicked);
    //     if (isPollIconClicked) handlePollIconClicked()
    // }

    let handlePublishTweetNow = evt => {
        readyTweetPublish(true);
        // setToggleModality(!toggleModality)
        handleTweetModalToggle()

        setScheduleStamp('')

        closeTweetModalHandler();
        // removeImageHandler()
        // setTweetText('');
        // setExtraTweetText('');
        setAddExtraTweetClicked(false);
        setIsExtraTweetClicked(false);
        setIsBothTextareaExist(false);
        setNewDataStatus(true)
        // console.log(tweetText, "??")
        setOpacity(false)
    }

    let onGifClick = (gif, evt) => {
        evt.preventDefault();
        setGifFile(gif);
        setIsGifIconClicked(false)
    }

    let handleAddExtraTweet = () => {
        setIsPrimaryTweetClicked(false)
        setAddExtraTweetClicked(!addExtraTweetClicked)
    }

    return (
        <div id='tweet-modal' style={{ display: toggleModality ? 'block' : 'none', zIndex: '9999', height: isBothTextareaExist && isPrimaryTweetClicked && selectedFile && '731px', minHeight: secondTweetHasMedia && isPrimaryTweetClicked && '1089px' }} className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extended-modal-view' : ''} >
            <div className='upper-content'>
                {/* <span id='delete-icon' onClick={closeTweetModalHandler}>{deleteIcon()}</span> */}
                <span id='delete-icon' onClick={closeTweetModalHandler}><Link to='/username'>{deleteIcon()}</Link></span>
                <hr />
            </div>

            <div id='middle-content'>
                {scheduleStamp && scheduleStamp}
                <div id='header-section'>
                    <img id='profile-pic' src='https://picsum.photos/200/300' />

                    <div id='primary-tweet-view' style={{ opacity: isExtraTweetClicked ? '.6' : '1' }}>{isPollIconClicked ? <TweetTextInput height="42.6px" placeholderText="Ask a question" tweetText={tweetText} setTweetText={setTweetText} setExtraTweetClicked={setIsExtraTweetClicked} setPrimaryTweetClicked={setIsPrimaryTweetClicked} /> : <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={tweetText} setTweetText={setTweetText} setExtraTweetClicked={setIsExtraTweetClicked} setPrimaryTweetClicked={setIsPrimaryTweetClicked} />}</div>
                </div>

                {/* connecting two existing tweets, on load default connector */}
                {!selectedFile && <p id='line-extension' style={{ visibility: addExtraTweetClicked ? 'visible' : 'hidden' }}></p>}
                {selectedFile && <p id='line-extension-with-media' style={{ visibility: (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : 'hidden' }}></p>}

                {/* changing extension connectine line from here, when other factor changes so does this extension cord */}
                {!selectedFile && <p id='line-extension-extended' style={{ visibility: (isBothTextareaExist && isExtraTweetClicked) ? 'visible' : 'hidden' }}></p>}
                {selectedFile && !isPrimaryTweetClicked && <p id='line-extension-extended-with-media-presence' style={{ visibility: (isBothTextareaExist && !isPrimaryTweetClicked) ? 'visible' : 'hidden' }}></p>}
                {selectedFile && !isPrimaryTweetClicked && <p id='line-extension-extended-with-media-presence-for-both-tweets' style={{ visibility: (isBothTextareaExist && !isPrimaryTweetClicked) ? 'visible' : 'hidden' }}></p>}

                {

                    // (!firstTweetHasMedia && addExtraTweetClicked && !isExtraTweetClicked)

                    // (!firstTweetHasMedia && addExtraTweetClicked && !isExtraTweetClicked) || (secondTweetHasMedia && isPrimaryTweetClicked)

                    // (!firstTweetHasMedia && addExtraTweetClicked && !isExtraTweetClicked && !secondTweetHasMedia) || (secondTweetHasMedia && isPrimaryTweetClicked)

                    (!firstTweetHasMedia && addExtraTweetClicked && !isExtraTweetClicked && !secondTweetHasMedia)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint00')}
                    </div>
                }

                {
                    firstTweetHasMedia
                    &&
                    <ContentInComposeTweet
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

                    (firstTweetHasMedia && addExtraTweetClicked && !isPrimaryTweetClicked)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint01')}
                    </div>
                }

                {
                    // secondTweetHasMedia
                    secondTweetHasMedia && !isPrimaryTweetClicked
                    &&
                    <ContentInComposeTweet
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

                <div id='footer-section'>
                    <TweetPrivacySelected setTweetOptions={setTweetOptions} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} />

                    <div id='tweet-additionals'>
                        {/* <TweetMediaOptions gifFile={gifFile} selectedFile={selectedFile} inputRef={inputRef} setIsGifIconClicked={setIsGifIconClicked} isGifIconClicked={isGifIconClicked} handleToggle={handlePollIconClicked} isPollIconClicked={isPollIconClicked} isEmojiIconClicked={isEmojiIconClicked} showPicker={setIsEmojiIconClicked} scheduleToggler={handleScheduleIconClicked} /> */}
                        <TweetMediaOptions gifFile={gifFile} selectedFile={selectedFile} inputRef={inputRef} setIsGifIconClicked={setIsGifIconClicked} isGifIconClicked={isGifIconClicked} handleToggle={handlePollIconClicked} isPollIconClicked={isPollIconClicked} isEmojiIconClicked={isEmojiIconClicked} showPicker={setIsEmojiIconClicked} />

                        {/* <div id='modal-tweet-div'> <div id='extra-tweet-options' style={{ visibility: (extraTweetText) ? 'visible' : (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : (addExtraTweetClicked && tweetText) ? 'hidden' : tweetText ? 'visible' : 'hidden' }}><span className='extra-tweet' onClick={() => setAddExtraTweetClicked(!addExtraTweetClicked)}>+</span> <span className='extra-tweet'>|</span> <span id='radial-progressbar'>{isPrimaryTweetClicked ? <TweetWordCount wordCount={tweetText.length} /> : <TweetWordCount wordCount={extraTweetText.length} />}</span></div> <span id='tweet-now' onClick={handlePublishTweetNow}>tweet</span></div> */}
                        <div id='modal-tweet-div'> <div id='extra-tweet-options' style={{ visibility: (extraTweetText) ? 'visible' : (isBothTextareaExist && isPrimaryTweetClicked) ? 'visible' : (addExtraTweetClicked && tweetText) ? 'hidden' : tweetText ? 'visible' : 'hidden' }}><span className='extra-tweet' onClick={handleAddExtraTweet}>+</span> <span className='extra-tweet'>|</span> <span id='radial-progressbar'>{isPrimaryTweetClicked ? <TweetWordCount wordCount={tweetText.length} /> : <TweetWordCount wordCount={extraTweetText.length} />}</span></div> <Link to='/username' id='tweet-now' onClick={handlePublishTweetNow}>{scheduleStamp ? 'Schedule' : addExtraTweetClicked ? 'Tweet all' : 'Tweet'}</Link></div>
                    </div>

                    <UploadFile chnageHandler={fileUploadChangeHandler} inputRef={inputRef} />

                    <GridDemo onGifClick={onGifClick} isGifIconClicked={isGifIconClicked} />

                    <TweetOptionsDropDown tweetOptions={tweetOptions} />

                    <EmojiPicker isIconClicked={isEmojiIconClicked} tweetText={tweetText} setTweetText={setTweetText} />
                </div>
                {

                    // (!firstTweetHasMedia && isExtraTweetClicked)

                    // (!firstTweetHasMedia && isExtraTweetClicked) || (firstTweetHasMedia && isPrimaryTweetClicked)

                    // (!firstTweetHasMedia && isExtraTweetClicked && !secondTweetHasMedia) || (firstTweetHasMedia && isPrimaryTweetClicked  && !secondTweetHasMedia)

                    // (!secondTweetHasMedia && !firstTweetHasMedia && isExtraTweetClicked) || (!firstTweetHasMedia && isExtraTweetClicked && !secondTweetHasMedia) || (firstTweetHasMedia && isPrimaryTweetClicked && !secondTweetHasMedia)

                    (!firstTweetHasMedia && isExtraTweetClicked && !secondTweetHasMedia) || (firstTweetHasMedia && isPrimaryTweetClicked && !secondTweetHasMedia)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint02')}
                    </div>
                }

                {

                    (secondTweetHasMedia && isPrimaryTweetClicked)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint03')}
                    </div>
                }

                {

                    (!secondTweetHasMedia && !firstTweetHasMedia && isExtraTweetClicked)

                    &&
                    <div id='extra-tweet-view' className={(isBothTextareaExist && isPrimaryTweetClicked) ? 'extra-tweet-bottom-view' : ''} style={{ opacity: isPrimaryTweetClicked ? '.6' : '1', position: 'initial' }}>
                        {(addExtraTweetClicked) && <img id='profile-pic' src='https://picsum.photos/200/300' />}
                        {(addExtraTweetClicked) && <TweetTextInput height="81.6px" placeholderText="What's happening?" tweetText={extraTweetText} setTweetText={setExtraTweetText} setPrimaryTweetClicked={setIsPrimaryTweetClicked} setExtraTweetClicked={setIsExtraTweetClicked} setBoth={setIsBothTextareaExist} />}
                        {console.log('checkpoint04')}
                    </div>
                }

                {
                    secondTweetHasMedia && isPrimaryTweetClicked
                    &&
                    <ContentInComposeTweet
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
            </div>
        </div>
    )
}

let TweetMediaOptions = ({ gifFile, selectedFile, inputRef, setIsGifIconClicked, isGifIconClicked, handleToggle, isPollIconClicked, isEmojiIconClicked, showPicker, scheduleToggler }) => {

    let onImageIconClicked = evt => inputRef.current.click();

    let onGifIconClicked = evt => setIsGifIconClicked(!isGifIconClicked);

    let emojiIconClicked = () => showPicker(!isEmojiIconClicked);

    let handleScheduleToggler = () => {
        scheduleToggler();
    }

    // return <div id='tweet-medias'><div id='image-icon' onClick={onImageIconClicked} style={{ pointerEvents: (isGifIconClicked || isPollIconClicked) ? 'none' : 'auto' }}>{imageIcon()}</div> <div id='gif-icon' style={{ pointerEvents: (selectedFile || isPollIconClicked) ? 'none' : 'auto' }} onClick={onGifIconClicked}>{gifIcon()}</div> <div id='poll-icon' style={{ pointerEvents: (selectedFile || isGifIconClicked) ? 'none' : 'auto' }} onClick={handleToggle}>{pollIcon()}</div> <div id='emoji-icon' onClick={emojiIconClicked}>{copyIcon()}</div> <div id='schedule-icon' onClick={handleScheduleToggler}>{scheduleIcon()}</div></div>
    return <div id='tweet-medias'><div id='image-icon' onClick={onImageIconClicked} style={{ pointerEvents: (isGifIconClicked || isPollIconClicked) ? 'none' : 'auto' }}>{imageIcon()}</div> <div id='gif-icon' style={{ pointerEvents: (selectedFile || isPollIconClicked) ? 'none' : 'auto' }} onClick={onGifIconClicked}>{gifIcon()}</div> <div id='poll-icon' style={{ pointerEvents: (selectedFile || isGifIconClicked) ? 'none' : 'auto' }} onClick={handleToggle}>{pollIcon()}</div> <div id='emoji-icon' onClick={emojiIconClicked}>{copyIcon()}</div><Link to='/tweet/compose/schedule' id='schedule-icon' >{scheduleIcon()}</Link></div>
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

let TweetTextInput = ({ primaryTweetOnFocused, height, placeholderText, tweetText, setTweetText, setPrimaryTweetClicked, setExtraTweetClicked, setBoth }) => {
    // let testRef = useRef();
    let handleTweetTextChanges = evt => {
        adjustHeight(evt);
        setTweetText(evt.target.value)
    }

    useEffect(() => {
        let tweetInput = document.querySelector('#tweet-input');
        tweetInput.style.height = height;
        // setTweetText('')
        // tweetInput.focus()
        // !primaryTweetOnFocused && document.querySelectorAll('#tweet-input')[1].focus()
        // primaryTweetOnFocused && tweetInput.focus()
    }, [])

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

    return <textarea rows='4' id='tweet-input' type='text' maxLength='20' onFocus={handleTextareaWhenFocused} value={tweetText} onChange={handleTweetTextChanges} placeholder={placeholderText} />
}

export let tweetPrivacySelected01 = (color) => <span className='privacy-spans'><span className='privacy-svg'>{everybodyIcon(color ? color : 'none')}</span> <span className='privacy-text'>Everybody can reply</span></span>

export let tweetPrivacySelected02 = (color) => <span className='privacy-spans'><span className='privacy-svg'>{peopleIcon(color ? color : 'rgb(29, 155, 240)')}</span> <span className='privacy-text'>People you follow</span></span>

export let tweetPrivacySelected03 = (color) => <span className='privacy-spans'><span className='privacy-svg'>{mentionedIcon(color ? color : 'rgb(29, 155, 240)')}</span> <span className='privacy-text'>Only people you mention</span></span>

let GridDemo = ({ onGifClick, isGifIconClicked }) => {
    const fetchGifs = (offset) =>
        giphyFetch.trending({ offset, limit: 10 });
    const [width, setWidth] = useState(window.innerWidth);
    // const [width, setWidth] = useState('470px');
    return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}><div id='gif-top'><span id='remove-icon'>{deleteIcon()}</span><input id='gif-search' /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={2} /></div>
}

let UploadFile = ({ chnageHandler, inputRef }) => {
    return <input type='file' ref={inputRef} name='image-file' onChange={chnageHandler} accept="image/png, image/jpeg, svg, jpg" style={{ display: 'none' }} />
}

export default TweetModal
