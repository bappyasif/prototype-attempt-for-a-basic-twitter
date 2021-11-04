import React from 'react'

function MediaGallery({ tweetData }) {
    // let allMediaTweets = [...tweetData].filter(elem => elem.imgFile || elem.gifItem)
    // let allMediaTweets = [...tweetData].filter(elem => elem['medias'].picture ? elem['medias'].picture : elem)
    // let allMediaTweets = tweetData && [...tweetData].filter(elem => elem && elem['medias']['picture'])
    // console.log(allMediaTweets, 'media tweets..', tweetData)
    let handleMediaFileChecks = (mediaFile) => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile)
        }
        return mediaSrc.type == 'gif' ? mediaSrc.images.downsized_still.url : mediaSrc
    }
    return (
        <div id='media-gallery-container'>
            <div id='media-gallery'>
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />

                {/* {
                    allMediaTweets.map((item, idx) =>
                        <img
                            className='gallery-view'
                            key={item.tweetText ? item.tweetText : idx}
                            src={handleMediaFileChecks(item.imgFile ? item.imgFile : item.gifItem)}
                        />
                    )
                } */}

            </div>
        </div>
    )
}

export default MediaGallery