import React, { useEffect, useState } from 'react'
import { deleteIcon, everybodyIcon, mentionedIcon, peopleIcon } from '../svg-resources';
import '../../styles/tweet-modal.css'

function TweetModal() {
    let [toggleModality, setToggleModality] = useState(false);
    let [tweetText, setTweetText] = useState('');
    let [tweetOptions, setTweetOptions] = useState(false);
    let [tweetPrivacy, setTweetPrivacy] = useState('');

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
      }, [!toggleModality]);

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
            console.log(whichOption)
        })
    }, [])

    let handleTweetTextChanges = evt => setTweetText(evt.target.value)

    return (
        <div id='tweet-modal' style={{display: toggleModality ? 'block' : 'none'}} >
            <div className='upper-content'>
                <span id='delete-icon'>{deleteIcon()}</span>
                <hr />
            </div>
            <div id='middle-content'>
                <div id='header-section'>
                    <img id='profile-pic' src='https://picsum.photos/200/300' />
                    <input id='tweet-input' type='text' value={tweetText} onChange={handleTweetTextChanges} placeholder="What's happening?" />
                </div>
                <div id='footer-section'>
                    {/* <span>{everybodyIcon()}</span> <span>everybody can reply</span> */}
                    <span id='options-selected'>click here</span>
                    <div id='tweet-options' style={{display: tweetOptions ? 'block' : 'none'}}>
                        <h4>Who can reply?</h4>
                        <p>Choose who can reply to this Tweet. Anyone mentioned can always reply.</p>
                        {/* <br /> */}
                        <div className='options-div' id='opt-01'>
                            <span className='option-svg'>{everybodyIcon()}</span> <span className='option-text'>Everybody</span>
                        </div>
                        {/* <br /> */}
                        <div className='options-div' id='opt-02'>
                            <span className='option-svg'>{peopleIcon()}</span> <span className='option-text'>People you follow</span>
                        </div>
                        {/* <br /> */}
                        <div className='options-div' id='opt-03'>
                            <span className='option-svg'>{mentionedIcon()}</span> <span className='option-text'>Only people you mention</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetModal
