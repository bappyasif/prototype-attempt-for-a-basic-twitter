import React, { useEffect, useState } from 'react'
import { moreIcon, tweetAdditionalIconsArray } from '../profile-page/svg-resources';
// import '../../profile-page/index.css'
import '../../user-profile/profile-page/index.css';

function AllTweetsPage({ tweetData, tweetPublishReady, count, handleCount }) {
    let [hoveredID, setHoveredID] = useState('');
    // let [count, setCount] = useState(1)

    let findWhichIconId = evt => {
        // let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
        return whichIcon
    }

    let mouseHoveredIn = (evt) => {
        let findwhich = findWhichIconId(evt);
        console.log(findwhich)
        setHoveredID(findwhich)
        // findwhich = findwhich ? findwhich : -1
        // if (findwhich != -1) setHoveredID(findwhich)
        // if(hoveredID == findwhich) setHoveredID(findwhich)
        // else setHoveredID(findwhich)
    }

    let mouseHoveredOut = (evt) => {
        setHoveredID('')
    }

    // tweetData = tweetData.reverse();
    // tweetData = [...tweetData].reverse();
    // let reversedTweetData = [...tweetData].reverse();

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

                {/* {renderAdditionalTweetIcons(item, 'extra')} */}
                <div className='additionals-icons'>
                    {tweetAdditionalIconsArray.map((elem) =>
                        <div
                            key={elem.id}
                            id={elem.id + `${item.count}extra`}
                            className='hover-div'
                            onMouseOver={mouseHoveredIn}
                            onMouseOut={mouseHoveredOut}
                        >
                            {/* {console.log(item.count, item)} */}
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
                <div className='tweet-media-on-profile' style={{ display: item.tweetMedia ? 'block' : 'none' }}>{item.tweetMedia}</div>
                <div className='tweet-gif-on-profile' style={{ display: item.tweetGif ? 'block' : 'none' }}>{item.tweetGif}</div>
                <div className='tweet-poll-on-profile'>{renderPolls(item)}</div>
                <div className='tweet-privacy-on-profile'>{item.tweetPrivacy}</div>

                {renderAdditionalTweetIcons(item)}
            </div>
        </div>

    let renderPolls = item => {
        return item.tweetPoll.map(choice => {
            return Object.values(choice).map(value => value ? <div key={value} className='poll-info'><div className='left-view'><span className='poll-progress' style={{ minWidth: '500%' }}>[]</span><p>{value}</p></div><span className='poll-percentage'>50%</span></div> : null)
        })
    }

    let renderingData = tweetData && tweetData.map((item) =>
    (<div key={item.tweetText} id='tweet-container' style={{ display: item ? 'block' : 'none' }}>

        {(item.tweetMedia || item.tweetGif || item.tweetText || item.extraTweetText ) ? whenNoExtraTweet(item) : null}

        <div id='show-connecting-line' style={{ visibility: item.extraTweet && item.tweetText ? 'visible' : 'hidden' }}></div>

        {item.extraTweet ? whenExtraTweetExists(item) : ''}

    </div>))

    return <div id='all-tweets-container'>{renderingData}</div>
}

export default AllTweetsPage
