import React, { useEffect, useRef, useState } from 'react'
import { copyIcon, deleteIcon, everybodyIcon, gifIcon, imageIcon, mentionedIcon, peopleIcon, pollIcon, scheduleIcon } from '../svg-resources';
import '../../styles/tweet-modal.css'
import {GiphyFetch} from '@giphy/js-fetch-api';
import {Grid, Gif} from '@giphy/react-components';
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function TweetModal() {
    let [toggleModality, setToggleModality] = useState(false);
    let [tweetText, setTweetText] = useState('');
    let [tweetOptions, setTweetOptions] = useState(false);
    let [tweetPrivacy, setTweetPrivacy] = useState('01');
    let [selectedFile, setSelectedFile] = useState();
    let [isFilePicked, setIsFilePicked] = useState(false);
    let [gifFile, setGifFile] = useState('');
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

    useEffect(() => {
        let privacyOptions = document.querySelector('#tweet-options');
        privacyOptions.addEventListener('click', (evt) => {
            let whichOption = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
            // console.log(whichOption.includes('01'), evt.target)
            if(whichOption.includes('01')) {
                // let test = () => <span><span className='privacy-svg'>{everybodyIcon()}</span> <span className='privacy-text'>Everybody can reply</span></span>
                // setTweetPrivacy(test())
                setTweetPrivacy('01');
                console.log(tweetPrivacy, 'here')
            } else if(whichOption.includes('02')) {
                setTweetPrivacy('02');
            } else if(whichOption.includes('03')) {
                setTweetPrivacy('03');
            }
            setTweetOptions(false);
            // setToggleModality(false);
        })
        
    }, [])

    // let handleTweetTextChanges = evt => setTweetText(evt.target.value)
    let handleTweetTextChanges = evt => {
        adjustHeight(evt);
        setTweetText(evt.target.value)
    }

    let adjustHeight = (evt) => {
        let element = evt.target;
        element.style.height = "81.6px";
        element.style.height = (1+element.scrollHeight)+"px";
        // let el = evt.target;
        // el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "170px";
    }

    // let tweetMedias = <div id='tweet-medias'>{imageIcon()} {gifIcon()} {pollIcon()} {copyIcon()} {scheduleIcon()}</div>
    // let tweetMedias = <div id='tweet-medias'><div id='image-icon'>{imageIcon()}</div> <div id='gif-icon' style={{pointerEvents: isFilePicked ? 'none' : 'auto'}}>{gifIcon()}</div> <div id='poll-icon'>{pollIcon()}</div> <div id='emoji-icon'>{copyIcon()}</div> <div id='schedule-icon'>{scheduleIcon()}</div></div>
    // let tweetMedias = <div id='tweet-medias'><div id='image-icon'>{imageIcon()}</div> <div id='gif-icon' style={{pointerEvents: 'none'}}>{gifIcon()}</div> <div id='poll-icon'>{pollIcon()}</div> <div id='emoji-icon'>{copyIcon()}</div> <div id='schedule-icon'>{scheduleIcon()}</div></div>
    let tweetMedias = <div id='tweet-medias'><div id='image-icon'>{imageIcon()}</div> <div id='gif-icon' style={{pointerEvents: selectedFile ? 'none' : 'auto'}}>{gifIcon()}</div> <div id='poll-icon'>{pollIcon()}</div> <div id='emoji-icon'>{copyIcon()}</div> <div id='schedule-icon'>{scheduleIcon()}</div></div>

    useEffect(() => {
        let tweetMedias = document.querySelector('#tweet-medias');
        tweetMedias.addEventListener('click', (evt) => {
            let isClickedNodeId = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id;
            // console.log(isClickedNodeId, evt.target)
            if(isClickedNodeId == 'image-icon') {
                inputRef.current.click();
            } else if(isClickedNodeId == 'gif-icon') {
                console.log('here!!')
            }
        })
    }, [])



    // let imageUploadOnClick = () => inputRef.current.click();

    let fileUploadChangeHandler = (evt) => {
        console.log('here!!')
        // inputRef.current.click();
        // if()
        setSelectedFile(evt.target.files[0])
        setIsFilePicked(true);
        if(!selectedFile) setIsFilePicked(false)
        // setIsFilePicked(selectedFile ? true : false);
    }

    let removeImageHandler = () => {
        setSelectedFile('')
    }

    let onGifClick = (gif, evt) => {
        console.log('gif here!!')
        evt.preventDefault();
        setGifFile(gif);
        console.log('gif here!!')
    }

    return (
        <div id='tweet-modal' style={{display: toggleModality ? 'block' : 'none'}} >
            <div className='upper-content'>
                <span id='delete-icon'>{deleteIcon()}</span>
                <hr />
            </div>
            <div id='middle-content'>
                <div id='header-section'>
                    <img id='profile-pic' src='https://picsum.photos/200/300' />

                    <textarea rows='4' id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder="What's happening?" />
                </div>
                {/* <div id='image-view'>{selectedFile && <img src={URL.createObjectURL(selectedFile)} />}</div> */}
                {selectedFile && <div id='image-view'><span id='remove-image' onClick={removeImageHandler}>{deleteIcon()}</span> <img src={URL.createObjectURL(selectedFile)} /></div>}
                <div id='footer-section'>
                    {/* <span>{everybodyIcon()}</span> <span>everybody can reply</span> */}
                    <span id='options-selected'>{tweetPrivacy == '01' ? tweetPrivacySelected01() : tweetPrivacy == '02' ? tweetPrivacySelected02() : tweetPrivacySelected03()}</span>
                    <div id='tweet-additionals'>
                        {/* <div id='tweet-medias'></div> */}
                        {tweetMedias}
                        <div id='tweet-now'>+ tweet</div>
                    </div>
                    <UploadFile chnageHandler={fileUploadChangeHandler} inputRef={inputRef} />
                    {/* {gifFile && gifFile} */}
                    {gifFile && <div id='gif-view'><span id='remove-gif'>{deleteIcon()}</span><Gif gif={gifFile} /></div>}
                    <GridDemo onGifClick={onGifClick} />
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
                </div>
            </div>
        </div>
    )
}

let tweetPrivacySelected01 = () => <span className='privacy-spans'><span className='privacy-svg'>{everybodyIcon('none')}</span> <span className='privacy-text'>Everybody can reply</span></span>

let tweetPrivacySelected02 = () => <span className='privacy-spans'><span className='privacy-svg'>{peopleIcon('rgb(29, 155, 240)')}</span> <span className='privacy-text'>People you follow</span></span>

let tweetPrivacySelected03 = () => <span className='privacy-spans'><span className='privacy-svg'>{mentionedIcon('rgb(29, 155, 240)')}</span> <span className='privacy-text'>Only people you mention</span></span>

let GridDemo = ({onGifClick}) => {
    const fetchGifs = (offset) =>
    giphyFetch.trending({ offset, limit: 10 });
    const [width, setWidth] = useState(window.innerWidth);
    // return <Grid fetchGifs={fetchGifs} width={width} columns={4} gutter={6} />
    // return <Grid fetchGifs={fetchGifs} width={width / 2.26} columns={2} />
    return <div id='gif-container'><div id='gif-top'><span id='remove-icon'>{deleteIcon()}</span><input id='gif-search' /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={2} /></div>
}

let UploadFile = ({chnageHandler, inputRef}) => {
    return <input type='file' ref={inputRef} name='image-file' onChange={chnageHandler} accept="image/png, image/jpeg, svg, jpg" style={{display: 'none'}} />
}

export default TweetModal
