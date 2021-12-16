import React from 'react'
import {getGiphyGifObject} from '../../../user-profile/all-tweets'

function MediaGallery({ tweetData }) {
    // let allMediaTweets = tweetData && [...tweetData].filter((elem, idx) => (elem['medias']['picture'] && elem['medias']['picture'] || elem['medias']['gif'] && elem['medias']['gif']) && idx <= 6)
    let allMediaTweets = tweetData && [...tweetData].filter((elem) => (elem['medias']['picture'] && elem['medias']['picture'] || elem['medias']['gif'] && elem['medias']['gif'])).filter((_, idx) => idx < 6)
    console.log(allMediaTweets, 'media tweets..', tweetData)

    return (
        <div id='media-gallery-container'>
            <div id='media-gallery'>
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />

                {
                    allMediaTweets
                    ?
                    allMediaTweets.map((item, idx) =>
                        item.medias.gif
                        ?
                        <MakeReadyGifPicture key={item.id} gifId={item.medias.gif} />
                        :
                        <img
                            className='gallery-view'
                            key={item.id}
                            src={ handleMediaFileChecks(item['medias'].picture)}
                        />
                    )
                    :
                    <div id='loader-spinner'>
                        loading....
                    </div>
                }

            </div>
        </div>
    )
}

let MakeReadyGifPicture = ({gifId}) => {
    let [gifData, setGifData] = React.useState('');
    getGiphyGifObject(gifId)
    .then(res => setGifData(res))
    .catch(err=>console.log(err.message, 'from media-gallery giphy fetch'))

    return gifData && <img key={gifId} className='gallery-view' src={handleMediaFileChecks(gifData)} />
}

let handleMediaFileChecks = (mediaFile) => {
    let mediaSrc = mediaFile;
    if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
        mediaSrc = URL.createObjectURL(mediaFile)
    }
    
    // console.log(mediaSrc, 'here', mediaSrc.type)

    return mediaSrc.type == 'gif' ? mediaSrc.images.downsized_still.url : mediaSrc
}

export default MediaGallery