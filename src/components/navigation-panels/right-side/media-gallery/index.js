import React from 'react'
import { GifDemo } from '../../../user-profile';
import {GiphyFetch} from '@giphy/js-fetch-api'

function MediaGallery({ tweetData }) {
    let [readyGif, setReadyGif] = React.useState(null)

    // let allMediaTweets = [...tweetData].filter(elem => elem.imgFile || elem.gifItem)
    // let allMediaTweets = [...tweetData].filter(elem => elem['medias'].picture ? elem['medias'].picture : elem)
    let allMediaTweets = tweetData && [...tweetData].filter(elem => elem['medias']['picture'] || elem['medias']['gif'])
    // console.log(allMediaTweets, 'media tweets..', tweetData)
    // making ready gif element
    // allMediaTweets.forEach(el => el['medias'].gif && getGifFromID(el['medias'].gif))

    let handleMediaFileChecks = (mediaFile) => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile)
        }
        
        // console.log(mediaSrc, 'here', mediaSrc.type)

        return mediaSrc.type == 'gif' ? mediaSrc.images.downsized_still.url : mediaSrc
    }

    let getGifFromID = (gifId) => {
        new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId).then(data=>{
            setReadyGif(data.data)
        })
        return readyGif && handleMediaFileChecks(readyGif)
    }

   

    // let getGifFromID = (gifId) => {
    //     console.log('gif id:', gifId)
    //     // setReadyGif(GifDemo(gifId))
    //     GifDemo(gifId)
    // }

    // readyGif && console.log(readyGif, 'ready-gif')

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
                        <img
                            className='gallery-view'
                            key={item.tweetText ? item.tweetText : idx}
                            // src={handleMediaFileChecks(item['medias'].picture ? item['medias'].picture : item['medias'].gif)}
                            src={ item['medias'].picture ? handleMediaFileChecks(item['medias'].picture) : getGifFromID(item['medias'].gif)}
                            // src={handleMediaFileChecks(item['medias'].picture ? item['medias'].picture : item['medias'].gif && getGifFromID(item['medias'].gif))}
                            // src={handleMediaFileChecks(item['medias'].picture ? item['medias'].picture : readyGif && getGifFromID(item['medias'].gif))}
                            // src={handleMediaFileChecks(item['medias'].picture ? item['medias'].picture : !readyGif ? getGifFromID(item['medias'].gif) : readyGif)}
                            // src={handleMediaFileChecks(item['medias'].picture ? item['medias'].picture : readyGif && readyGif)}
                            // src={item['medias'].picture ? handleMediaFileChecks(item['medias'].picture) : item['medias'].gif ? handleMediaFileChecks(readyGif && readyGif) : getGifFromID(item['medias'].gif)}
                        />
                    )
                    :
                    <div id='loader-spinner'>
                        loading....
                    </div>
                }

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

// let getGifFromID = (gifId) => {
//     // new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId).then(data=>setReadyGif(data))
//     new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId).then(data=>{
//         // console.log(data, 'here data')
//         setReadyGif(data.data)
//     })
//     // readyGif && console.log('gif img', handleMediaFileChecks(readyGif))
//     return readyGif && handleMediaFileChecks(readyGif)
    
//     // let getGif = async () => {
//     //     // let {gifObject} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
//     //     let {gifObject} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
//     //     setReadyGif(gifObject)
//     //     console.log(gifObject, 'gifObject', gifId, readyGif)
//     // }
//     // getGif();
// }

// let handleMediaFileChecks = (mediaFile) => {
//     let mediaSrc = mediaFile;
//     if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
//         mediaSrc = URL.createObjectURL(mediaFile)
//     }
    
//     console.log(mediaSrc, 'here', mediaSrc.type)

//     return mediaSrc.type == 'gif' ? mediaSrc.images.downsized_still.url : mediaSrc
//     // else {
//     //     // getGifFromID(!'https://'.includes(mediaFile) && mediaFile);
//     //     getGifFromID(mediaFile.length <= 14 && mediaFile);
//     //     console.log('here?!', mediaFile)
//     // }
//     // // return mediaSrc.type == 'gif' ? mediaSrc.images.downsized_still.url : mediaSrc
    
//     // // return readyGif.type == 'gif' ? mediaSrc.images.downsized_still.url : mediaSrc
//     // let retunUrl;
//     // if(readyGif) {
//     //     console.log('here??')
//     //     retunUrl = readyGif.images.downsized_still.url
//     //     console.log('here!!')
//     // } else {
//     //     retunUrl = mediaSrc
//     // }
    
//     // return retunUrl && retunUrl;
//     // return mediaSrc;
// }

export default MediaGallery