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
    // let [loadingDone, setLoadingDone] = useState(false);
    // let [gifReady, setGifReady] = useState(null);
    let [gifReady, setGifReady] = useState(false);
    

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
    
    // let updateLoadingStatus = () => setLoadingDone(true)
    // let updateGif = (gifItem) => setGifReady(gifItem)
    let updateGif = () => setGifReady(true)

    

    let renderAdditionalTweetIcons = (item, extra) => {
        return <div className='additionals-icons'>
            {tweetAdditionalIconsArray.map((elem) => <div
                key={elem.id}

                id={extra ? elem.id + `${item.count}extra` : elem.id + `${item.count}tweet`}
                className='hover-div'

                onMouseOver={mouseHoveredIn}
                onMouseOut={mouseHoveredOut}
            >
                <span>{elem.icon}</span> <span style={{ display: extra && hoveredID == elem.id + item.count + 'extra' ? 'flex' : hoveredID == elem.id + item.count + 'tweet' ? 'flex' : 'none' }} className='tooltips-text'>{elem.id}</span>
            </div>)}
        </div>
    }

    let whenExtraTweetExists = (item) =>
        <div id='extra-tweet-portion-container'>
            <div className='left-portion'>
                <img id='profile-pic' src='https://picsum.photos/200/300' />
            </div>
            <div className='right-portion'>
                <div className='profile-details-on-tweet'><div className='user-info'>User Name Goes Here <span>@profile handle goes here</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div></div>
                <div className='tweet-text-on-profile'>{item.extraTweet}</div>

                <div className='additionals-icons'>
                    {tweetAdditionalIconsArray.map((elem) =>
                        <div
                            key={elem.id}
                            id={elem.id + `${item.count}extra`}
                            className='hover-div'
                            onMouseOver={mouseHoveredIn}
                            onMouseOut={mouseHoveredOut}
                        >
                            <span>{elem.icon}</span><span style={{ display: hoveredID == elem.id + item.count + 'extra' ? 'inline-block' : 'none' }} className='tooltips-text'>{elem.id}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

    let whenNoExtraTweet = (item) =>
        <div id='without-extra-tweet-container'>
            <div className='left-portion'>
                <img id='profile-pic' src='https://picsum.photos/200/300' />
            </div>
            <div className='right-portion'>
                <div className='profile-details-on-tweet'><div className='user-info'>User Name Goes Here <span>@profile handle goes here</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div></div>
                <div className='tweet-text-on-profile'>{item.tweetText}</div>

                {/* <div className='tweet-media-on-profile' style={{ display: item.tweetMedia ? 'block' : 'none' }}>{item.tweetMedia}</div> */}
                <div className='tweet-media-on-profile' style={{ display: item.medias.picture ? 'block' : 'none' }}>{showImg(item.medias.picture)}</div>
                
                {/* <div className='tweet-gif-on-profile' style={{ display: item.medias.gif ? 'block' : 'none' }}>{ <MakeGifObjectAvailable gifId={item.medias.gif} />}</div> */}
                {/* {item.medias.gif && <div className='tweet-gif-on-profile' style={{ display: item.medias.gif ? 'block' : 'none' }}>{ <MakeGifObjectAvailable gifId={item.medias.gif}  />}</div>} */}
                
                {/* {loadingDone && <div className='tweet-gif-on-profile' style={{ display: item.medias.gif ? 'block' : 'none' }}>{ <MakeGifObjectAvailable gifId={item.medias.gif} updateLoadingStatus={updateLoadingStatus} />}</div>} */}
                {/* {item.medias.gif && <div className='tweet-gif-on-profile' style={{ display: item.medias.gif ? 'block' : 'none' }}>{ <MakeGifObjectAvailable gifId={item.medias.gif} updateLoadingStatus={updateLoadingStatus} showGif={loadingDone} />}</div>} */}
                {/* {item.medias.gif && <div className='tweet-gif-on-profile' style={{ display: item.medias.gif ? 'block' : 'none' }}>{ <MakeGifObjectAvailable gifId={item.medias.gif} updateLoadingStatus={updateLoadingStatus} showGif={loadingDone} />}</div>} */}
                {item.medias.gif && gifReady && <MakeGifObjectAvailable gifId={item.medias.gif} readyGif={updateGif} /> }

                <div className='tweet-poll-on-profile'>{renderPolls(item)}</div>
                <div className='tweet-privacy-on-profile'>{item.tweetPrivacy}</div>

                {renderAdditionalTweetIcons(item)}
            </div>
            {/* {renderAdditionalTweetIcons(item)} */}
        </div>

    let renderPolls = item => {
        return item.tweetPoll.map(choice => {
            return Object.values(choice).map(value => value ? <div key={value} className='poll-info'><div className='left-view'><span className='poll-progress' style={{ minWidth: '500%' }}>[]</span><p>{value}</p></div><span className='poll-percentage'>50%</span></div> : null)
        })
    }

    // let renderingData = tweetData.map(item=>console.log(item, '?!'))

    let renderingData = tweetData && tweetData.map((item, idx) =>    
    (<div key={item.tweetText ? item.tweetText : idx} id='tweet-container' style={{ display: (item['medias'].picture || item['medias'].gif || item.tweetText || item.extraTweetText) ? 'block' : 'none' }}>

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

let MakeGifObjectAvailable = ({gifId, readyGif}) => {
    let [gif, setGif] = useState(null)
    // let [doneLoading, setDoneLoading] = useState(false)
    
    gif && console.log(gifId, 'gif ID ??', gif.id)
    if(gifId == gif && gif.id) console.log('id equaled')
    
    gifId && getGiphyGifObject(gifId).then(res=>{
        setGif(res)
        console.log('checkpoint01', gifId)
    }).catch(err=>console.log(err.message))
    
    gif && console.log('chekpoint02', gifId)
    gif && readyGif(true)
    
    // return gif && <Gif gif={showGif && showGif} height='290px' width='96%' className='style-gif-border-radius' />
    return gif && <Gif gif={gif} height='290px' width='96%' className='style-gif-border-radius' />
}


// let MakeGifObjectAvailable = ({gifId, updateLoadingStatus, showGif}) => {
//     let [gif, setGif] = useState(null)
//     // let [doneLoading, setDoneLoading] = useState(false)
//     if(gifId == gif) console.log('id equaled')
//     gifId && getGiphyGifObject(gifId).then(res=>{
//         setGif(res);
//         // setGif(true)
//         console.log('checkpoint01', gifId)
//         // updateLoadingStatus(res);
//     }).catch(err=>console.log(err.message))
//     console.log('chekpoint02', gifId)
//     // gif && console.log(gif, 'gif??!!')
//     // gif && updateLoadingStatus();
//     // return gif && <Gif gif={gif} height='290px' width='96%' className='style-gif-border-radius' />
//     return showGif && <Gif gif={gif} height='290px' width='96%' className='style-gif-border-radius' />
// }

let getGiphyGifObject = async (gifId) => {
    try {
        let {data} = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
        console.log('checkoiint03', gifId)
        return data
    } catch (err) {
        console.log(err)
    }
}

export default AllTweetsPage