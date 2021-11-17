import React, { useEffect, useState } from 'react'
import { moreIcon, tweetAdditionalIconsArray } from '../profile-page/svg-resources';
import '../../user-profile/profile-page/index.css';
import { getPrivacySelectedElement, showGif, showImg } from '..';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';

function AllTweetsPage({ tweetData, onlyMedias }) {

    // let renderPolls = item => {
    //     return item.tweetPoll.map(choice => {
    //         return Object.values(choice).map(value => value ? <div key={value} className='poll-info'><div className='left-view'><span className='poll-progress' style={{ minWidth: '500%' }}>[]</span><p>{value}</p></div><span className='poll-percentage'>50%</span></div> : null)
    //     })
    // }

    // let whenExtraTweetExists = (item) => {
    //     console.log(item.id)
    //     return <div>
    //         {/* {renderAdditionalTweetIcons(item, 'extra', null)} */}
    //         {item.id}
    //     </div>
    // }

    let renderTweet = (item) => {
        // item.extraTweet && console.log(item.id, 'checkpoint 01', item.extraTweet)
        let ID = item.id
        let content

        // item.privacy && console.log(item.privacy, 'found privacy!!')

        if (item.medias.gif || item.medias.picture) {
            content = {
                tweetText: item.tweetText,
                extraTweet: item.extraTweet,
                gifFile: item.medias.gif,
                pictureFile: item.medias.picture,
                tweetPrivacy: item.privacy,
                firstTweetHasMedia: item.firstTweetHasMedia,
                secondTweetHasMedia: item.secondTweetHasMedia,
                tweetPoll: item.tweetPoll
            }
        } else {
            content = { tweetText: item.tweetText, extraTweet: item.extraTweet, tweetPrivacy: item.privacy, tweetPoll: item.tweetPoll }
        }

        return <RenderTweetDataComponent content={content} />
    }

    let renderingData = tweetData && tweetData.map((item, idx) =>
    (<div key={item.id} id='tweet-container' style={{ display: (item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? 'block' : 'none' }}>

        {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null}

        {/* <div id='show-connecting-line' style={{ visibility: item.extraTweet && item.tweetText ? 'visible' : 'hidden' }}></div> */}

        {/* {item.extraTweet ? whenExtraTweetExists(item) : ''} */}

    </div>))

    let renderMediaTweetsOnly = onlyMedias && onlyMedias.map((item, idx) => {

        return <div key={item.tweetText ? item.tweetText : idx} id='tweet-container' style={{ display: item ? 'block' : 'none' }}>

            {(item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? renderTweet(item) : null}

        </div>
    })

    return <div id='all-tweets-container'>{onlyMedias ? renderMediaTweetsOnly : renderingData.length ? renderingData : ''}</div>
}

let RenderTweetDataComponent = ({ content }) => {
    let [hoveredID, setHoveredID] = useState('')
    let { tweetText, extraTweet, gifFile, pictureFile, tweetPrivacy, firstTweetHasMedia, secondTweetHasMedia, tweetPoll} = { ...content }

    let renderPolls = poll => {
        // console.log(poll[0])
        return poll.map(choice => {
            return Object.values(choice).map(value => value ? <div key={value} className='poll-info'><div className='left-view'><span className='poll-progress' style={{ minWidth: '500%' }}>[]</span><p>{value}</p></div><span className='poll-percentage'>50%</span></div> : null)
        })
    }

    // extraTweet && console.log(extraTweet, 'extraTweet??')
    // console.log(tweetPrivacy, 'privacy!!', content)
    // (firstTweetHasMedia && firstTweetHasMedia || secondTweetHasMedia && secondTweetHasMedia) && console.log(firstTweetHasMedia, secondTweetHasMedia, 'tweet medias')
    // console.log(firstTweetHasMedia, secondTweetHasMedia, 'tweet medias')
    tweetPoll.choice01 && console.log(tweetPoll, 'tweetpoll', tweetPoll['choice01'])

    let readyMedia = gifFile ? <MakeGifObjectAvailable gifId={gifFile} /> : pictureFile ? showImg(pictureFile) : ''

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
        return whichIcon
    }

    let mouseHoveredIn = evt => {
        // console.log('in', evt.target.id, evt.target.parentNode.id)
        let foundElement = findWhichIconId(evt)
        // console.log(foundElement, 'which?!')
        setHoveredID(foundElement)
    }
    let mouseHoveredOut = evt => {
        // console.log('out', evt.target.id)
        setHoveredID('')
    }

    // let tweetBottomClickableIcons = tweetAdditionalIconsArray.map((elem) =>
    //     <div
    //         key={elem.id}

    //         id={elem.id}

    //         className='hoverable-div'

    //         onMouseOver={mouseHoveredIn}
    //         onMouseOut={mouseHoveredOut}
    //     >
    //         <span>{elem.icon}</span><span style={{ display: hoveredID == elem.id ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>
    //     </div>)

    let tweetBottomClickableIcons = (extraEen, extraTwee) => tweetAdditionalIconsArray.map((elem) =>
        <div
            key={elem.id}

            id={extraTwee ? elem.id +'-twee' : extraEen ? elem.id +'-een' : elem.id}

            className='hoverable-div'

            onMouseOver={mouseHoveredIn}
            onMouseOut={mouseHoveredOut}
        >
            <span>{elem.icon}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>
        </div>)

    let whenWithoutExtraTweet = () => <div className='rendering-tweet-data-container'>
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

                {/* {(pictureFile || gifFile) && <div className='tweet-media-file-content'>{readyMedia}</div>} */}
                <div className='tweet-media-file-content'>{readyMedia}</div>
                {/* <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons}</div> */}

                {renderPolls(tweetPoll)}
                
                {getPrivacySelectedElement(tweetPrivacy, 'white')}

                <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons()}</div>
            </div>
        </div>
    </div>

    let whenWithExtraTweet = () => {
        return <div className='rendering-tweet-data-container'>
            {/* <div className='tweet-id'>{id}</div> */}

            <div className='when-has-extra-tweet'>

                <div className='tweet-extra-info-een'>
                    <div className='left-side'>
                        <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
                    </div>

                    <div className='right-side'>

                        <div className='tweet-top'>
                            <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                        </div>

                        <div className='tweet-text'>{tweetText}</div>

                        {/* <div className='tweet-media-file-content'>{readyMedia}</div> */}
                        {/* {<div className='tweet-media-file-content'>{firstTweetHasMedia && !secondTweetHasMedia ? readyMedia : readyMedia}</div>} */}
                        {<div className='tweet-media-file-content'>{firstTweetHasMedia && readyMedia}</div>}

                        {getPrivacySelectedElement(tweetPrivacy, 'white')}

                        <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons('-een')}</div>
                    </div>
                    {/* <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons}</div> */}
                </div>

                {/* <div id='show-connecting-line' className='extended-line-in-tweet' style={{height: '107.9px', transform: 'translate(25px, -105.5px)'}}></div> */}
                {/* <div id='show-connecting-line' className='extended-line-in-tweet'></div> */}

                {!firstTweetHasMedia && <div id='show-connecting-line' className='extended-line-in-tweet' style={{height: '107.9px', transform: 'translate(25px, -105.5px)'}}></div>}
                {firstTweetHasMedia && <div id='show-connecting-line' className='extended-line-in-tweet' style={{height: '438.9px', transform: 'translate(25px, -435.5px)'}}></div>}

                <div className='tweet-extra-info-twee'>

                    <div className='left-side'>
                        <img className='in-tweet-profile-pic' src='https://picsum.photos/200/300' />
                    </div>

                    <div className='right-side'>

                        <div className='tweet-top'>
                            <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div>
                        </div>

                        <div className='extra-tweet-text'>{extraTweet}</div>

                        {/* {(pictureFile || gifFile) && <div className='tweet-media-file-content'>{readyMedia}</div>} */}
                        {/* <div className='tweet-media-file-content'>{readyMedia}</div> */}
                        {<div className='tweet-media-file-content'>{secondTweetHasMedia && readyMedia}</div>}

                        {getPrivacySelectedElement(tweetPrivacy, 'white')}

                        <div className='tweet-bottom-clickable-icons'>{tweetBottomClickableIcons(null, '-twee')}</div>

                    </div>
                </div>
            </div>
        </div>
    }

    return (
        extraTweet
            ?
            whenWithExtraTweet()
            :
            whenWithoutExtraTweet()
    )
}

let MakeGifObjectAvailable = ({ gifId }) => {
    let [gif, setGif] = useState(null)

    // gif && console.log(gifId, 'gif ID ??', gif.id)

    gifId && getGiphyGifObject(gifId).then(res => {
        setGif(res)
        // console.log('checkpoint04', gifId)
    }).catch(err => console.log(err.message))

    // gif && console.log('chekpoint05', gifId)

    return gif && <Gif gif={gif} height='290px' className='style-gif-border-radius' />
}

export let getGiphyGifObject = async (gifId) => {
    try {
        let { data } = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
        // console.log('checkoiint06', gifId)
        return data
    } catch (err) {
        console.log(err)
    }
}

export default AllTweetsPage