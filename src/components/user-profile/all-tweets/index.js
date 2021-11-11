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
        console.log(item.id)
        return <div>
            {/* {renderAdditionalTweetIcons(item, null, 'noExtra')} */}
            {item.id}
        </div>
    }

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

let RewriteShowGifElement = ({gifID, updateGifID}) => {
    console.log(gifID, '<<gif ID>>')
    // updateGif()
    updateGifID(gifID)
    return gifID && <div>{gifID}</div>
}


let MakeGifObjectAvailable = ({gifId}) => {
    let [gif, setGif] = useState(null)
    
    gif && console.log(gifId, 'gif ID ??', gif.id)
    
    gifId && getGiphyGifObject(gifId).then(res=>{
        setGif(res)
        console.log('checkpoint01', gifId)
    }).catch(err=>console.log(err.message))
    
    gif && console.log('chekpoint02', gifId)
    
    return gif && <Gif gif={gif} height='290px' width='96%' className='style-gif-border-radius' />
}

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