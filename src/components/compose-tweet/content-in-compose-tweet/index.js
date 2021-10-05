import React from 'react'
import { Link } from 'react-router-dom'
import { deleteIcon, descriptionIcon, giphyIcon, tagIcon } from '../../tweet-modal/svg-resources'
import { Gif } from '@giphy/react-components';
import TweetPoll from '../../tweet-modal/tweet-poll'



function ContentInComposeTweet({ selectedFile, removeImageHandler, gifFile, removeGifHandler, isPollIconClicked, handlePollViewToggle }) {
    let handleMediaFileChecks = () => {
        let mediaSrc = selectedFile;
        if (selectedFile instanceof File || selectedFile instanceof Blob || selectedFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(selectedFile)
        }
        return mediaSrc;
    }

    let tweetComposeMediaView = () => <div id='image-view'>
        <span id='remove-image' onClick={selectedFile ? removeImageHandler : removeGifHandler}>{deleteIcon('silver')}</span>
        {/* {selectedFile ? <img src={URL.createObjectURL(selectedFile)} /> : <Gif gif={gifFile} />} */}
        {selectedFile ? <img src={handleMediaFileChecks()} /> : <Gif gif={gifFile} />}
        <div id='picture-info'>
            <Link id='tag-div' to='/tweet/compose/media'><span className='picture-svgs'>{selectedFile ? tagIcon() : giphyIcon()}</span><span id='tag-people'>{selectedFile ? 'Tag people' : <span id='gif-via'>via <span id='giphy-text' style={{color: 'black', fontSize: '1.1em', fontWeight: '800'}}>GIPHY</span></span>}</span></Link>
            <Link id='description-div' to='/tweet/compose/media'><span className='picture-svgs'>{descriptionIcon()}</span><span id='picture-description'>Description</span></Link>
        </div>
    </div>
    return (
        (!isPollIconClicked && selectedFile) || (!isPollIconClicked && gifFile)
            ?
            <div id='tweet-compose-container' style={{ marginTop: !selectedFile || !gifFile ? '-20px' : "-44px" }}>
                {(selectedFile || gifFile)
                    &&
                    tweetComposeMediaView()
                }
            </div>
            :
            <div id='tweet-compose-container' style={{ marginTop: !selectedFile ? '-20px' : "-44px" }}>
                <TweetPoll isPollIconClicked={isPollIconClicked} handleToggle={handlePollViewToggle} />
            </div>
    )
}

export default ContentInComposeTweet


/**
 *
 *
function ContentInComposeTweet({ selectedFile, removeImageHandler, gifFile, removeGifHandler, isPollIconClicked, handlePollViewToggle }) {
    let TweetComposeMediaView = () => <div id='image-view'>
        <span id='remove-image' onClick={selectedFile ? removeImageHandler : removeGifHandler}>{deleteIcon('silver')}</span>
        {selectedFile ? <img src={URL.createObjectURL(selectedFile)} /> : <Gif gif={gifFile} />}
        <div id='picture-info'>
            <Link id='tag-div' to='/tweet/compose/media'><span className='picture-svgs'>{selectedFile ? tagIcon() : 'Giphy'}</span><span id='tag-people'>Tag people</span></Link>
            <Link id='description-div' to='/tweet/compose/media'><span className='picture-svgs'>{descriptionIcon()}</span><span id='picture-description'>Description</span></Link>
        </div>
    </div>
    return (
        !isPollIconClicked && selectedFile
            ?
            <div id='tweet-compose-container' style={{ marginTop: !selectedFile ? '-20px' : "-44px" }}>
                {selectedFile
                    &&
                    <div id='image-view'>
                        <span id='remove-image' onClick={removeImageHandler}>{deleteIcon('silver')}</span>
                        <img src={URL.createObjectURL(selectedFile)} />
                        <div id='picture-info'>
                            <Link id='tag-div' to='/tweet/compose/media'><span className='picture-svgs'>{tagIcon()}</span><span id='tag-people'>Tag people</span></Link>
                            <Link id='description-div' to='/tweet/compose/media'><span className='picture-svgs'>{descriptionIcon()}</span><span id='picture-description'>Description</span></Link>
                        </div>
                    </div>}
            </div>
            :
            <div id='tweet-compose-container' style={{ marginTop: !selectedFile ? '-20px' : "-44px" }}>
                <TweetPoll isPollIconClicked={isPollIconClicked} handleToggle={handlePollViewToggle} />
            </div>
    )
}
 */