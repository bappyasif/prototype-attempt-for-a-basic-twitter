import React from 'react'

function MediaGallery({ tweetData }) {
    let allMediaTweets = [...tweetData].filter(elem => elem.tweetMedia || elem.tweetGif)
    // console.log(allMediaTweets, "<>")
    let handleMediaFileChecks = (mediaFile) => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile)
        }
        console.log(mediaSrc, "??")
        return mediaSrc;
    }
    return (
        <div id='media-gallery-container'>
            {console.log(allMediaTweets, "<>")}
            <div id='media-gallery'>
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                {allMediaTweets.map((item, idx) => <img
                    className='gallery-view'
                    key={item.tweetText ? item.tweetText : idx}
                    src={handleMediaFileChecks(item.tweetMedia || item.tweetGif)}
                    // src={(item.tweetMedia || item.tweetGif) && handleMediaFileChecks(item.tweetMedia || item.tweetGif)}
                />)
                }
            </div>
        </div>
    )
}

export default MediaGallery
