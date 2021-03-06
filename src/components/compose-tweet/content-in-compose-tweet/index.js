import React from 'react'
import { Link } from 'react-router-dom'
import { deleteIcon, descriptionIcon, giphyIcon, tagIcon } from '../../tweet-modal/svg-resources'
import { Gif } from '@giphy/react-components';
import TweetPoll from '../../tweet-modal/tweet-poll'

function ContentInComposeTweet({ selectedFile, removeImageHandler, gifFile, removeGifHandler, isPollIconClicked, handlePollViewToggle, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, mediaDescriptionText, setMediaDescriptionText, gifWidth }) {
    let tweetComposeMediaView = () => <div id='image-view'>
        <span id='remove-image' onClick={selectedFile ? removeImageHandler : removeGifHandler}>{deleteIcon('silver')}</span>

        {selectedFile ? <img width='461px' src={handleMediaFileChecks(selectedFile)} /> : <Gif width={gifWidth ? gifWidth : 580} height={290} gif={gifFile} />}
        
        <div id='picture-info'>
            <Link id='tag-div' to='/tweet/compose/media'><span className='picture-svgs'>{selectedFile ? tagIcon() : giphyIcon()}</span><span id='tag-people'>{selectedFile ? 'Tag people' : <span id='gif-via'>via <span id='giphy-text' style={{ color: 'black', fontSize: '1.1em', fontWeight: '800' }}>GIPHY</span></span>}</span></Link>
            <Link id='description-div' to='/tweet/compose/media'><span className='picture-svgs'>{descriptionIcon()}</span><span id='picture-description'>{mediaDescriptionText}</span></Link>
        </div>
    </div>
    
    return (
        (!isPollIconClicked && selectedFile) || (!isPollIconClicked && gifFile)
            ?
            <div id='tweet-compose-container' style={{ marginTop: (!selectedFile || !gifFile) ? '0px' : "-44px" }}>
                {(selectedFile || gifFile)
                    &&
                    tweetComposeMediaView()
                }
            </div>
            :
            <div id='tweet-compose-container' style={{ marginTop: (!selectedFile || !gifFile) ? '0px' : "-44px" }}>
                <TweetPoll
                    isPollIconClicked={isPollIconClicked}
                    handleToggle={handlePollViewToggle}
                    inputTextChoice01={inputTextChoice01}
                    setInputTextChoice01={setInputTextChoice01}
                    inputTextChoice02={inputTextChoice02}
                    setInputTextChoice02={setInputTextChoice02}
                    inputTextChoice03={inputTextChoice03}
                    setInputTextChoice03={setInputTextChoice03}
                    inputTextChoice04={inputTextChoice04}
                    setInputTextChoice04={setInputTextChoice04}
                />
            </div>
    )
}

export let handleMediaFileChecks = (mediaFile) => {
    let mediaSrc = mediaFile;
    if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
        mediaSrc = URL.createObjectURL(mediaFile)
    }
    return mediaSrc;
}

export default ContentInComposeTweet