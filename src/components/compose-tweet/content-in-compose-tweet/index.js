import React from 'react'
import { Link } from 'react-router-dom'
import { deleteIcon, descriptionIcon, tagIcon } from '../../tweet-modal/svg-resources'

import TweetPoll from '../../tweet-modal/tweet-poll'



function ContentInComposeTweet({ selectedFile, removeImageHandler, isPollIconClicked, handlePollViewToggle }) {
    return (
        !isPollIconClicked && selectedFile
        ?
        <div id='tweet-compose-container' style={{marginTop: !selectedFile ? '-20px' : "-44px"}}>
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
        <div id='tweet-compose-container' style={{marginTop: !selectedFile ? '-20px' : "-44px"}}>
            <TweetPoll isPollIconClicked={isPollIconClicked} handleToggle={handlePollViewToggle} />
        </div>
    )
}

export default ContentInComposeTweet