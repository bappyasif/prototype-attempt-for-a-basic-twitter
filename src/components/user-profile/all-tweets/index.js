import React, { useEffect, useState } from 'react'
import { moreIcon, tweetAdditionalIconsArray } from '../profile-page/svg-resources';
import '../../user-profile/profile-page/index.css';
import { testDownloadBlobFile } from '../../firebase-storage';
import { getAllDocsOnce } from '../../firestore-methods';
import { showGif, showImg } from '..';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';

function AllTweetsPage({ tweetData, onlyMedias, tweetPublishReady, count, handleCount }) {
    let [hoveredID, setHoveredID] = useState('');

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
        return whichIcon
    }

    let mouseHoveredIn = (evt) => {
        let findwhich = findWhichIconId(evt);
        setHoveredID(findwhich)
    }

    let mouseHoveredOut = (evt) => {
        setHoveredID('')
    }

    let renderAdditionalTweetIcons = (idx) => {
        return <div className='additionals-icons'>
            {tweetAdditionalIconsArray.map((elem) => <div
                key={elem.id}

                // id={extra ? elem.id + `${item.count}-${extra}` : elem.id + `${item.count}-${noExtra}`}
                id={idx}
                className='hover-div'

                onMouseOver={mouseHoveredIn}
                onMouseOut={mouseHoveredOut}
            >
                {/* <span>{elem.icon}</span> <span style={{ display: extra && hoveredID == elem.id + item.count + extra ? 'flex' : hoveredID == elem.id + item.count + noExtra ? 'flex' : 'none' }} className='tooltips-text'>{elem.id}</span> */}
                <span>{elem.icon}</span><span style={{ display: hoveredID == elem.id + item.count + extra ? 'flex' : hoveredID == elem.id + item.count + noExtra ? 'flex' : 'none' }} className='tooltips-text'>{elem.id}</span>
            </div>)}
        </div>
    }

    let renderPolls = item => {
        return item.tweetPoll.map(choice => {
            return Object.values(choice).map(value => value ? <div key={value} className='poll-info'><div className='left-view'><span className='poll-progress' style={{ minWidth: '500%' }}>[]</span><p>{value}</p></div><span className='poll-percentage'>50%</span></div> : null)
        })
    }

    let whenExtraTweetExists = (item) => {
        console.log(item.id)
        return <div>
            {/* {renderAdditionalTweetIcons(item, 'extra', null)} */}
            {item.id}
        </div>
    }

    let whenNoExtraTweet = (item) => {
        // console.log(item.id, 'checkpoint 01')
        let ID = item.id
        let content

        if (item.medias.gif || item.medias.picture) {
            content = {
                tweetText: item.tweetText,
                gifFile: item.medias.gif,
                pictureFile: item.medias.picture
            }
        } else {
            content = { tweetText: item.tweetText }
        }

        return <RenderTweetDataComponent id={ID} content={content} />
    }

    // basic idea
    // let whenNoExtraTweet = (item) => {
    //     console.log(item.id)
    //     let ID = item.id
    //     let content = item.tweetText;
    //     <RenderTweetDataComponent id={ID} content={content} />
    // }

    // let whenNoExtraTweet = (item) => {
    //     console.log(item.id)
    //     return <div>
    //         {/* {renderAdditionalTweetIcons(item, null, 'noExtra')} */}
    //         {item.id}
    //     </div>
    // }

    // let renderingData = tweetData.map(item=>console.log(item, '?!'))

    let renderingData = tweetData && tweetData.map((item, idx) =>
    (<div key={item.id} id='tweet-container' style={{ display: (item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? 'block' : 'none' }}>

        {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? whenNoExtraTweet(item) : null}

        <div id='show-connecting-line' style={{ visibility: item.extraTweet && item.tweetText ? 'visible' : 'hidden' }}></div>

        {item.extraTweet ? whenExtraTweetExists(item) : ''}

    </div>))

    let renderMediaTweetsOnly = onlyMedias && onlyMedias.map((item, idx) => {

        return <div key={item.tweetText ? item.tweetText : idx} id='tweet-container' style={{ display: item ? 'block' : 'none' }}>

            {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? whenNoExtraTweet(item) : null}

        </div>
    })

    return <div id='all-tweets-container'>{onlyMedias ? renderMediaTweetsOnly : renderingData.length ? renderingData : ''}</div>
}

let RenderTweetDataComponent = ({ id, content }) => {
    let [hoveredID, setHoveredID] = useState('')
    let { tweetText, gifFile, pictureFile } = { ...content }

    let readyMedia = gifFile ? <MakeGifObjectAvailable gifId={gifFile} /> : pictureFile ? showImg(pictureFile) : ''

    // console.log(id, 'from component')

    // let mouseHoveredIn = evt => console.log(evt.target.parentNode.id, 'in')
    // let mouseHoveredOut = evt => console.log(evt.target.parentNode.id, 'out')

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
        return whichIcon
    }

    let mouseHoveredIn = evt => {
        // console.log('in', evt.target.id, evt.target.parentNode.id)
        let foundElement = findWhichIconId(evt)
        setHoveredID(foundElement)
    }
    let mouseHoveredOut = evt => {
        console.log('out', evt.target.id)
        setHoveredID('')
    }

    let tweetBottomClickableIcons = tweetAdditionalIconsArray.map((elem) =>
        <div
            key={elem.id}

            // id={extra ? elem.id + `${item.count}-${extra}` : elem.id + `${item.count}-${noExtra}`}
            // id={id}
            id={elem.id}
            className='hoverable-div'

            onMouseOver={mouseHoveredIn}
            onMouseOut={mouseHoveredOut}
        >
            {/* <span>{elem.icon}</span> <span style={{ display: extra && hoveredID == elem.id + item.count + extra ? 'flex' : hoveredID == elem.id + item.count + noExtra ? 'flex' : 'none' }} className='tooltips-text'>{elem.id}</span> */}
            {/* <span>{elem.icon}</span><span style={{ display: hoveredID == id ? 'flex' : 'none' }} className='tooltips-text'>{elem.id}</span> */}
            <span>{elem.icon}</span><span style={{ display: hoveredID == elem.id ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>
        </div>)

    return (
        <div className='rendering-tweet-data-container'>
            {/* <div className='tweet-id'>{id}</div> */}
            <div className='left-side'>
                <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
            </div>
            <div className='right-side'>
                <div className='tweet-info'>
                    <div className='tweet-top'>
                        <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                    </div>
                    <div className='tweet-text'>{tweetText}</div>
                    {/* {gifFile} */}
                    {/* {pictureFile} */}
                    <div className='tweet-media-file-content'>{readyMedia}</div>
                    <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons}</div>
                </div>
                <div className='option-icon'>

                </div>
            </div>
        </div>
    )
}

// let RewriteShowGifElement = ({ gifID, updateGifID }) => {
//     console.log(gifID, '<<gif ID>>')
//     // updateGif()
//     updateGifID(gifID)
//     return gifID && <div>{gifID}</div>
// }


let MakeGifObjectAvailable = ({ gifId }) => {
    let [gif, setGif] = useState(null)

    gif && console.log(gifId, 'gif ID ??', gif.id)

    gifId && getGiphyGifObject(gifId).then(res => {
        setGif(res)
        console.log('checkpoint04', gifId)
    }).catch(err => console.log(err.message))

    gif && console.log('chekpoint05', gifId)

    return gif && <Gif gif={gif} height='290px' className='style-gif-border-radius' />

    // return gif && <Gif gif={gif} height='290px' width='96%' className='style-gif-border-radius' />
}

export let getGiphyGifObject = async (gifId) => {
    try {
        let { data } = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
        console.log('checkoiint06', gifId)
        return data
    } catch (err) {
        console.log(err)
    }
}

export default AllTweetsPage