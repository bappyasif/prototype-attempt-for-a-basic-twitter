import React, { useEffect, useRef, useState } from 'react'
import { copyIcon, deleteIcon, everybodyIcon, gifIcon, imageIcon, mentionedIcon, peopleIcon, pollIcon, scheduleIcon } from '../svg-resources';
import '../../styles/tweet-modal.css'
import {GiphyFetch} from '@giphy/js-fetch-api';
import {Grid, Gif} from '@giphy/react-components';
import TweetPoll from './tweet-poll';
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function TweetModal() {
    let [toggleModality, setToggleModality] = useState(false);
    let [tweetOptions, setTweetOptions] = useState(false);
    let [selectedFile, setSelectedFile] = useState();
    let [gifFile, setGifFile] = useState('');
    let [isGifIconClicked, setIsGifIconClicked] = useState(false);
    // let [isMediaIconsClicked, setIsMediaIconsClicked] = useState(false);
    let [isPollIconClicked, setIsPollIconClicked] = useState(false);
    let inputRef = useRef();

    useEffect(() => {
        let tweetDiv = document.querySelector("#Tweet");
        let leftPanelContainer = document.querySelector("#left-panel-container");
        
        tweetDiv.addEventListener("click", () => {
            if(!toggleModality) {
                setToggleModality(true);
                leftPanelContainer.classList.add("left-opaque");
            } else {
                setToggleModality(false);
                leftPanelContainer.classList.remove("left-opaque");
            }
        });
      }, [toggleModality]);

    useEffect(() => {
        let optionsDiv = document.querySelector('#options-selected');
        optionsDiv.addEventListener('click', () => {
            if(tweetOptions) {
                setTweetOptions(false);
            } else {
                setTweetOptions(true);
            }
        })
        
    }, [tweetOptions])

    let fileUploadChangeHandler = (evt) => setSelectedFile(evt.target.files[0])

    let removeImageHandler = () => setSelectedFile('')

    let removeGifFileHandler = () => setGifFile('');

    let closeTweetModalHandler = () => setToggleModality(!toggleModality)

    let handlePollIconClicked = () => setIsPollIconClicked(!isPollIconClicked);

    let onGifClick = (gif, evt) => {
        evt.preventDefault();
        setGifFile(gif);
        setIsGifIconClicked(false)
    }

    return (
        <div id='tweet-modal' style={{display: toggleModality ? 'block' : 'none'}} >
            <div className='upper-content'>
                <span id='delete-icon' onClick={closeTweetModalHandler}>{deleteIcon()}</span>
                <hr />
            </div>

            <div id='middle-content'>
                <div id='header-section'>
                    <img id='profile-pic' src='https://picsum.photos/200/300' />

                    {/* <TweetTextInput /> */}
                    {/* <TweetTextInput height="81.6px" placeholderText="What's happening?" /> */}
                    {isPollIconClicked ? <TweetTextInput height="42.6px" placeholderText="Ask a question" /> : <TweetTextInput height="81.6px" placeholderText="What's happening?" />}
                </div>
                
                {selectedFile && <div id='image-view'><span id='remove-image' onClick={removeImageHandler}>{deleteIcon()}</span> <img src={URL.createObjectURL(selectedFile)} /></div>}
                
                {gifFile && <div id='gif-view'><span id='remove-gif' onClick={removeGifFileHandler}>{deleteIcon()}</span><Gif gif={gifFile} /></div>}
                
                <TweetPoll isPollIconClicked={isPollIconClicked} handleToggle={handlePollIconClicked} />

                <div id='footer-section'>
                    <TweetPrivacySelected setTweetOptions={setTweetOptions} />
                    
                    <div id='tweet-additionals'>
                        <TweetMediaOptions gifFile={gifFile} selectedFile={selectedFile} inputRef={inputRef} setIsGifIconClicked={setIsGifIconClicked} isGifIconClicked={isGifIconClicked} handleToggle={handlePollIconClicked} isPollIconClicked={isPollIconClicked} />
                        <div id='tweet-now'>+ tweet</div>
                    </div>
                    
                    <UploadFile chnageHandler={fileUploadChangeHandler} inputRef={inputRef} />

                    <GridDemo onGifClick={onGifClick} isGifIconClicked={isGifIconClicked} />
                    
                    <TweetOptionsDropDown tweetOptions={tweetOptions} />
                </div>
            </div>
        </div>
    )
}

let TweetMediaOptions = ({gifFile, selectedFile, inputRef, setIsGifIconClicked, isGifIconClicked, handleToggle, isPollIconClicked}) => {

    // console.log(handleToggle, isPollIconClicked)
    
    let onImageIconClicked = evt => inputRef.current.click();

    let onGifIconClicked = evt => setIsGifIconClicked(!isGifIconClicked);

    return <div id='tweet-medias'><div id='image-icon' onClick={onImageIconClicked} style={{pointerEvents: (isGifIconClicked || isPollIconClicked) ? 'none' : 'auto'}}>{imageIcon()}</div> <div id='gif-icon' style={{pointerEvents: (selectedFile || isPollIconClicked) ? 'none' : 'auto'}} onClick={onGifIconClicked}>{gifIcon()}</div> <div id='poll-icon' style={{pointerEvents: (selectedFile || isGifIconClicked) ? 'none' : 'auto'}} onClick={handleToggle}>{pollIcon()}</div> <div id='emoji-icon'>{copyIcon()}</div> <div id='schedule-icon'>{scheduleIcon()}</div></div>
}


let TweetOptionsDropDown = ({tweetOptions}) => {
    return(
        <div id='tweet-options' style={{display: tweetOptions ? 'block' : 'none'}}>
            <h4>Who can reply?</h4>
            <p>Choose who can reply to this Tweet. Anyone mentioned can always reply.</p>
            {/* <br /> */}
            <div className='options-div' id='opt-01'>
                <span id='svg-01' className='option-svg'>{everybodyIcon('white')}</span> <span className='option-text'>Everybody</span>
            </div>
            {/* <br /> */}
            <div className='options-div' id='opt-02'>
                <span className='option-svg'>{peopleIcon('white')}</span> <span className='option-text'>People you follow</span>
            </div>
            {/* <br /> */}
            <div className='options-div' id='opt-03'>
                <span className='option-svg'>{mentionedIcon('white')}</span> <span className='option-text'>Only people you mention</span>
            </div>
        </div>
    )
}

let TweetPrivacySelected = ({setTweetOptions}) => {
    let [tweetPrivacy, setTweetPrivacy] = useState('01');

    useEffect(() => {
        let privacyOptions = document.querySelector('#tweet-options');
        privacyOptions.addEventListener('click', (evt) => {
            let whichOption = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
            if(whichOption.includes('01')) {
                setTweetPrivacy('01');
            } else if(whichOption.includes('02')) {
                setTweetPrivacy('02');
            } else if(whichOption.includes('03')) {
                setTweetPrivacy('03');
            }
            setTweetOptions(false);
        })
        
    }, [])

    return <span id='options-selected'>{tweetPrivacy == '01' ? tweetPrivacySelected01() : tweetPrivacy == '02' ? tweetPrivacySelected02() : tweetPrivacySelected03()}</span>
}

let TweetTextInput = ({height, placeholderText}) => {
    let [tweetText, setTweetText] = useState('');

    let handleTweetTextChanges = evt => {
        adjustHeight(evt);
        setTweetText(evt.target.value)
    }

    useEffect(() => {
        let tweetInput = document.querySelector('#tweet-input');
        tweetInput.style.height = height;
        setTweetText('')
        // console.log(tweetInput.style.height, "here!!")
    }, [])

    let adjustHeight = (evt) => {
        let element = evt.target;
        // element.style.height = "81.6px";
        element.style.height = height;
        element.style.height = (1+element.scrollHeight)+"px";
    }

    // return <textarea rows='4' id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder="What's happening?" />
    return <textarea rows='4' id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder={placeholderText} />
}

let tweetPrivacySelected01 = () => <span className='privacy-spans'><span className='privacy-svg'>{everybodyIcon('none')}</span> <span className='privacy-text'>Everybody can reply</span></span>

let tweetPrivacySelected02 = () => <span className='privacy-spans'><span className='privacy-svg'>{peopleIcon('rgb(29, 155, 240)')}</span> <span className='privacy-text'>People you follow</span></span>

let tweetPrivacySelected03 = () => <span className='privacy-spans'><span className='privacy-svg'>{mentionedIcon('rgb(29, 155, 240)')}</span> <span className='privacy-text'>Only people you mention</span></span>

let GridDemo = ({onGifClick, isGifIconClicked}) => {
    const fetchGifs = (offset) =>
    giphyFetch.trending({ offset, limit: 10 });
    const [width, setWidth] = useState(window.innerWidth);
    return <div id='gif-container' style={{display: isGifIconClicked ? 'block' : 'none'}}><div id='gif-top'><span id='remove-icon'>{deleteIcon()}</span><input id='gif-search' /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={2} /></div>
}

let UploadFile = ({chnageHandler, inputRef}) => {
    return <input type='file' ref={inputRef} name='image-file' onChange={chnageHandler} accept="image/png, image/jpeg, svg, jpg" style={{display: 'none'}} />
}

export default TweetModal
