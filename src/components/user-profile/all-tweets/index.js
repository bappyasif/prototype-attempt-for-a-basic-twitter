import React, { useEffect, useState } from 'react'
import { moreIcon, tweetAdditionalIconsArray } from '../profile-page/svg-resources';
// import '../../profile-page/index.css'
import '../../user-profile/profile-page/index.css';

function AllTweetsPage({ tweetData, tweetPublishReady, count, handleCount }) {
    let [hoveredID, setHoveredID] = useState('');
    // let [count, setCount] = useState(1)

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id
        return whichIcon
    }

    let mouseHoveredIn = (evt) => {
        // console.log(evt.target.parentNode, 'in')
        // console.log(idx, id)
        let findwhich = findWhichIconId(evt);
        findwhich = findwhich ? findwhich : -1
        if (findwhich != -1) setHoveredID(findwhich)
    }

    let mouseHoveredOut = (evt) => {
        // console.log(evt.target.parentNode, 'out')
        // console.log(idx, id)
        let findwhich = findWhichIconId(evt);
        findwhich = findwhich ? findwhich : -1
        if (findwhich != -1) setHoveredID('')
    }

    tweetData = tweetData.reverse();
    // tweetData = tweetData.filter(data => Object.values(data) != null).reverse();
    // tweetData = tweetData.filter(data => {
    //     console.log((Object.values(data)).length, Object.values(data))
    //     return Object.values(data) != null && data.tweetPrivacy
        
    // }).reverse();
    // tweetData = tweetData.filter(data => (data.tweetText || data.extraTweetText ) && (data.tweetMedia  || data.tweetGif )).reverse();

    // tweetData = tweetData.filter(data => (data.tweetPrivacy && data.tweetText!=''|| data.extraTweetText!='' || data.tweetMedia!=null  || data.tweetGif!=null)).reverse();

    // tweetData = tweetData.filter(data => (data.tweetMedia!=''  && data.tweetGif!='' && data.tweetText!='' && data.extraTweetText!='')).reverse();

    // tweetData = tweetData.filter(data => (data.tweetText!=''|| data.extraTweetText!='' || data.tweetMedia!=null  || data.tweetGif!=null)).reverse();

    // useEffect(() => handleCount(), [count])

    let whenExtraTweetExists = (item) =>
        <div id='extra-tweet-portion-container'>
            {/* {console.log('here??')} */}
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
                            onMouseOver={(evt) => mouseHoveredIn(evt)}
                            onMouseOut={(evt) => mouseHoveredOut(evt)}
                        >
                            {/* {console.log(item.count, item)} */}
                            <span>{elem.icon}</span><span style={{ display: hoveredID == elem.id + item.count+'extra' ? 'inline-block' : 'none' }} className='tooltips-text'>{elem.id}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

    let whenNoExtraTweet = (item) =>
        <div id='without-extra-tweet-container'>
            {/* {console.log('here!!')} */}
            <div className='left-portion'>
                <img id='profile-pic' src='https://picsum.photos/200/300' />
            </div>
            <div className='right-portion'>
                <div className='profile-details-on-tweet'><div className='user-info'>User Name Goes Here <span>@profile handle goes here</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div></div>
                <div className='tweet-text-on-profile'>{item.tweetText}</div>
                <div className='tweet-media-on-profile' style={{display: item.tweetMedia ? 'block' : 'none'}}>{item.tweetMedia}</div>
                <div className='tweet-gif-on-profile' style={{display: item.tweetGif ? 'block' : 'none'}}>{item.tweetGif}</div>
                {/* <div className='tweet-media-on-profile'>{item.tweetMedia ? item.tweetMedia : ''}</div> */}
                <div className='tweet-privacy-on-profile'>{item.tweetPrivacy}</div>

                <div className='additionals-icons'>
                    {tweetAdditionalIconsArray.map((elem) => <div
                        key={elem.id}
                        // id={elem.id}
                        id={elem.id + `${item.count}tweet`}
                        className='hover-div'
                        onMouseOver={(evt) => mouseHoveredIn(evt)}
                        onMouseOut={(evt) => mouseHoveredOut(evt)}
                    >
                        {/* {console.log(item)} */}
                        {/* <span>{elem.icon}</span> <span style={{ display: hoveredID == elem.id? 'inline-block' : 'none' }} className='tooltips-text'>{elem.id}</span> */}
                        <span>{elem.icon}</span> <span style={{ display: hoveredID == elem.id + item.count+'tweet' ? 'inline-block' : 'none' }} className='tooltips-text'>{elem.id}</span>
                    </div>)}
                </div>
            </div>
        </div>

    let renderingData = tweetData.map((item) =>
    (<div key={item.tweetText} id='tweet-container'>
        {/* {whenNoExtraTweet(item)} */}
        {(item.tweetText || item.extraTweetText || item.tweetMedia  || item.tweetGif) ? whenNoExtraTweet(item) : null}
        {/* {item.tweetText || item.extraTweetText || item.tweetMedia  || item.tweetGif && whenNoExtraTweet(item)} */}
        {/* {console.log(item)} */}
        <div id='show-connecting-line' style={{ visibility: item.extraTweet && item.tweetText ? 'visible' : 'hidden' }}></div>
        {item.extraTweet ? whenExtraTweetExists(item) : ''}

    </div>))

    // let showMediasOnTweet = () => <div className='tweet-media-on-profile' style={{display: (item.tweetMedia || item.tweetGif) ? 'block' : 'none'}}>
    //     <div id='remove-element'></div>
    //     <div id='media-content'>{item.tweetMedia ? item.tweetMedia : item.tweetGif}</div>
    //     <div></div>
    // </div>
    return <div id='all-tweets-container'>{renderingData}</div>
}

export default AllTweetsPage
