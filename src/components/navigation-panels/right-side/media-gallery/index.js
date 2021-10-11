import { Gif } from '@giphy/react-components';
import React from 'react'

function MediaGallery({ tweetData }) {
    let allMediaTweets = [...tweetData].filter(elem => elem.imgFile || elem.gifItem)
    // console.log(allMediaTweets, "<>")
    let handleMediaFileChecks = (mediaFile) => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile)
        }
        // console.log(mediaSrc, "??", mediaSrc.images.downsized_still.url)
        return mediaSrc.type == 'gif' ? mediaSrc.images.downsized_still.url : mediaSrc
        // return mediaSrc;
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

                {
                    allMediaTweets.map((item, idx) =>
                        item.imgFile
                            ?
                            <img
                                className='gallery-view'
                                key={item.tweetText ? item.tweetText : idx}
                                src={handleMediaFileChecks(item.imgFile)}
                            />
                            :
                            <img
                                className='gallery-view'
                                key={item.tweetText ? item.tweetText : idx}
                                src={handleMediaFileChecks(item.gifItem)}
                            />
                    )
                }

            </div>
        </div>
    )
}

export default MediaGallery


/**
 *
 *
 <div id='media-gallery-container'>
            {console.log(allMediaTweets, "<>")}
            <div id='media-gallery'>
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />
                <img className='gallery-view' src='https://picsum.photos/200/300' />

                {
                    allMediaTweets.map((item, idx) =>
                        item.imgFile
                            ?
                            <img
                                className='gallery-view'
                                key={item.tweetText ? item.tweetText : idx}
                                src={handleMediaFileChecks(item.imgFile)}
                            />
                            :
                            // <Gif
                            //     style={{ width: '-webkit-fill-available', height: '-webkit-fill-available' }}
                            //     // height='53'
                            //     // width='130'
                            //     // style={{height: '-webkit-fill-available' }}
                            //     className='gallery-view'
                            //     key={item.tweetText ? item.tweetText : idx}
                            //     gif={handleMediaFileChecks(item.gifItem)}
                            // />
                            <img
                                // style={{ width: '-webkit-fill-available', height: '-webkit-fill-available' }}
                                // height='53'
                                // width='130'
                                // style={{height: '-webkit-fill-available' }}
                                className='gallery-view'
                                key={item.tweetText ? item.tweetText : idx}
                                src={handleMediaFileChecks(item.gifItem)}
                            />

                    )
                }

                {/* {
                    allMediaTweets.map((item, idx) => {
                        // console.log(typeof item.tweetMedia)
                        // item.tweetMedia.classList.add('gallery-media')
                        // console.log(item.tweetMedia)
                    })
                } *}

                {/* {
                    allMediaTweets.map((item, idx) => <div
                        // className='gallery-view'
                        key={item.tweetText ? item.tweetText : idx}>
                        {item.tweetMedia || item.tweetGif}
                    </div>
                    )
                } *}

                {/* {allMediaTweets.map((item, idx) => <img
                    className='gallery-view'
                    key={item.tweetText ? item.tweetText : idx}
                    src={handleMediaFileChecks(item.tweetMedia || item.tweetGif)}
                    // src={(item.tweetMedia || item.tweetGif) && handleMediaFileChecks(item.tweetMedia || item.tweetGif)}
                />)
                } *}
            </div>
        </div>

 */