import React, { useEffect, useRef, useState } from 'react'
import { copyIcon, deleteIcon, everybodyIcon, gifIcon, imageIcon, mentionedIcon, peopleIcon, pollIcon, scheduleIcon } from '../svg-resources';
import '../../styles/tweet-modal.css'
import {GiphyFetch} from '@giphy/js-fetch-api';
import {Grid} from '@giphy/react-components';
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function TweetModal() {
    let [toggleModality, setToggleModality] = useState(false);
    let [tweetText, setTweetText] = useState('');
    let [tweetOptions, setTweetOptions] = useState(false);
    let [tweetPrivacy, setTweetPrivacy] = useState('01');
    let [selectedFile, setSelectedFile] = useState();
    let [isFilePicked, setIsFilePicked] = useState(false);
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
    let tweetMedias = <div id='tweet-medias'><div id='image-icon'>{imageIcon()}</div> <div id='gif-icon'>{gifIcon()}</div> <div id='poll-icon'>{pollIcon()}</div> <div id='emoji-icon'>{copyIcon()}</div> <div id='schedule-icon'>{scheduleIcon()}</div></div>

    useEffect(() => {
        let tweetMedias = document.querySelector('#tweet-medias');
        tweetMedias.addEventListener('click', (evt) => {
            let isClickedNodeId = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id;
            // console.log(isClickedNodeId, evt.target)
            if(isClickedNodeId == 'image-icon') {
                inputRef.current.click();
            }
        })
    }, [])

    // let imageUploadOnClick = () => inputRef.current.click();

    let fileUploadChangeHandler = (evt) => {
        setSelectedFile(evt.target.files[0])
        setIsFilePicked(true);
    }

    let showImageOnTweet = () => {
        // let fr = new FileReader();
        // fr.readAsArrayBuffer(selectedFile);
        // fr.readAsArrayBuffer(new Blob([selectedFile]));
        // fr.readAsArrayBuffer(new Blob([selectedFile], {type: "image/png"}));
        // fr.readAsArrayBuffer(new Blob([selectedFile], {type: "image"}));
        // console.log(fr)
        // // return fr
        // console.log(selectedFile, "??")
        let image = document.createElement('img');
        image.srcObject = selectedFile;

        // image.src = URL.createObjectURL(selectedFile);
        console.log(image, "<>?")   

        //     image.srcObject = selectedFile;
            
        //     // return image
        //     return image.srcObject
        // for(let i=0; i < selectedFile.length; i++) {
        //     let image = document.createElement('img');
        //     // image.src = URL.createObjectURL(selectedFile[i]);
        //     image.srcObject = selectedFile[i];
        //     // console.log(image, '??')
        //     return image
        // }
        // const ImageElem = document.createElement('img');
        // image.src = URL.createObjectURL(selectedFile);
        // ImageElem.srcObject = selectedFile
        // return <ImageElem />
        // console.log(image);
        // let imageView = document.querySelector('#image-view')
        // imageView.append(ImageElem);
        // return ImageElem;
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
                    {/* <input id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder="What's happening?" /> */}
                    {/* <textarea contentEditable rows='4' id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder="What's happening?" /> */}
                    {/* <textarea onKeyUp={adjustHeight} rows='4' id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder="What's happening?" /> */}
                    <textarea rows='4' id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder="What's happening?" />
                    {/* <div id='image-view'>{isFilePicked ? selectedFile : ''}</div> */}
                    {/* <div id='image-view'>{console.log(selectedFile)}</div> */}
                    <div id='image-view'>{showImageOnTweet()}</div>
                    {/* <div id='image-view'>{isFilePicked ? showImageOnTweet() : ''}</div> */}
                    {/* <div id='image-view'>{isFilePicked ? <img src={showImageOnTweet()} /> : ''}</div> */}
                    {/* <div id='image-view'>{<img src={showImageOnTweet()} />}</div> */}
                </div>
                <div id='footer-section'>
                    {/* <span>{everybodyIcon()}</span> <span>everybody can reply</span> */}
                    <span id='options-selected'>{tweetPrivacy == '01' ? tweetPrivacySelected01() : tweetPrivacy == '02' ? tweetPrivacySelected02() : tweetPrivacySelected03()}</span>
                    <div id='tweet-additionals'>
                        {/* <div id='tweet-medias'></div> */}
                        {tweetMedias}
                        <div id='tweet-now'>+ tweet</div>
                    </div>
                    <UploadFile chnageHandler={fileUploadChangeHandler} inputRef={inputRef} />
                    <GridDemo />
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
    return <Grid fetchGifs={fetchGifs} width={width} columns={4} gutter={6} />
}

let UploadFile = ({chnageHandler, inputRef}) => {
    return <input type='file' ref={inputRef} name='image-file' onChange={chnageHandler} accept="image/png, image/jpeg, svg, jpg" style={{display: 'none'}} />
}

export default TweetModal
