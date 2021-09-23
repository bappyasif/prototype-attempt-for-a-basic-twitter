import React, { useEffect, useState } from 'react'
import "./index.css";
import ProfilePageTopView from './profile-top-view-section';
import { moreIcon, tweetAdditionalIconsArray } from './svg-resources';
import ProfilePageTopNavigationMenuBar from './top-menu-navigation';

function ProfilePage({ tweetText, extraTweetText, privacySelected, readyTweetPublish, tweetData }) {

    let [hoveredID, setHoveredID] = useState('');

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id
        return whichIcon
    }

    let mouseHoveredIn = (evt) => {
        let findwhich = findWhichIconId(evt);
        findwhich = findwhich ? findwhich : -1
        if (findwhich != -1) setHoveredID(findwhich)
    }

    let mouseHoveredOut = (evt) => {
        let findwhich = findWhichIconId(evt);
        findwhich = findwhich ? findwhich : -1
        if (findwhich != -1) setHoveredID('')
    }

    tweetData = tweetData.filter(data => data.tweetText != '').reverse();
    let renderingData = tweetData.map(item =>
    (<div key={item.tweetText} id='tweet-container'>
        <div className='left-portion'>
            <img id='profile-pic' src='https://picsum.photos/200/300' />
        </div>
        <div className='right-portion'>
            <div className='profile-details-on-tweet'><div className='user-info'>User Name Goes Here <span>@profile handle goes here</span> <span>-</span> <span>time here</span></div><div className='icon-svg'>{moreIcon()}</div></div>
            <div className='tweet-text-on-profile'>{item.tweetText}</div>
            <div className='tweet-privacy-on-profile'>{item.tweetPrivacy}</div>

            <div className='additionals-icons'>
                {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} className='hover-div' onMouseOver={mouseHoveredIn} onMouseOut={mouseHoveredOut}><span>{elem.icon}</span> <span style={{ display: hoveredID == elem.id ? 'inline-block' : 'none' }} className='tooltips-text'>{elem.id}</span></div>)}
                {/* {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} onMouseOver={mouseHoveredIn} onMouseOut={mouseHoveredOut}><span>{elem.icon}</span> <span className={hoveredID == elem.id ? 'tooltips-text' : ''}>{elem.id}</span></div>)} */}
            </div>
        </div>
    </div>))

    return (
        <div id='profile-page-container'>
            <ProfilePageTopView />
            <ProfilePageTopNavigationMenuBar />
            {renderingData}
        </div>
    )
}

export default ProfilePage


/**
 *
 *
    let [hoveredShare, setHoveredShare] = useState(false);
    let [hoveredReply, setHoveredReply] = useState(false)
    let [hoveredRetweet, setHoveredRetweet] = useState(false)
    let [hoveredLike, setHoveredLike] = useState(false)
 // let [hovered, setHovered] = useState(false);

    // let mouseHoveredIn = () => setHovered(true);

    // let mouseHoveredOut = () => setHovered(false);

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id
        return whichIcon
    }

    let handleHovered = (value) => {
        switch (value) {
            case 'reply':
                setHoveredReply(!hoveredReply)
                break
            case 'retweet':
                setHoveredRetweet(!hoveredRetweet)
                break
            case 'like':
                setHoveredLike(!hoveredLike)
                break
            case 'share':
                setHoveredShare(!hoveredShare)
                break
            default: console.log('somethings wrong!!')
        }
    }
 *
 *
     let findWhichIconId = evt => {
        // let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id
        // console.log(whichIcon)
        // if(whichIcon != undefined || whichIcon != '')
        // let findwhich = whichIcon ? whichIcon : -1
        // if(findwhich != -1) return findwhich

        return whichIcon
    }

    let adjustFinding = value => {
        let findwhich = value ? value : -1
        if (findwhich != -1) return findwhich
    }

    let handleHovered = (value) => {
        switch (value) {
            case 'reply':
                setHoveredReply(true)
                break
            case 'retweet':
                setHoveredRetweet(true)
                break
            case 'like':
                setHoveredLike(true)
                break
            case 'share':
                setHoveredShare(true)
                break
            default: console.log('somethings wrong!!')
        }
    }

    let mouseHoveredIn = (evt) => {
        let findwhich = findWhichIconId(evt);
        // findwhich = adjustFinding(findwhich)
        findwhich = findwhich ? findwhich : -1
        if (findwhich != -1) handleHovered(findwhich)
    }

    let mouseHoveredOut = (evt) => {
        let findwhich = findWhichIconId(evt);
        // findwhich = adjustFinding(findwhich)
        findwhich = findwhich ? findwhich : -1
        if (findwhich != -1) handleHovered(findwhich)
    }

    <div className='additionals-icons'>
                {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} onMouseOver={mouseHoveredIn} onMouseOut={mouseHoveredOut}><span>{elem.icon}</span> <span style={{ display: hoveredID == elem.id ? 'block' : 'none' }} className='tooltips-text'>{elem.id}</span></div>)}
                {/* {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} onMouseOver={handleTooltips}><span>{elem.icon}</span> <span className='tooltips-text'>{elem.id}</span></div>)} *}
                {/* {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} onMouseOver={mouseHoveredIn} onMouseOut={mouseHoveredOut}><span>{elem.icon}</span> <span style={{display: hoveredReply || hoveredRetweet ? 'block' : 'none'}} className='tooltips-text'>{elem.id}</span></div>)} *}
                {/* {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} onMouseOver={mouseHoveredIn} onMouseOut={mouseHoveredOut}><span>{elem.icon}</span> <span style={{display: hovered ? 'block' : 'none'}} className='tooltips-text'>{elem.id}</span></div>)} *}
                {/* {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} onMouseOver={mouseHoveredIn} onMouseOut={mouseHoveredOut}><span>{elem.icon}</span> <span style={{display: hovered ? 'block' : 'none'}} className='tooltips-text'>{elem.id}</span></div>)} *}
    </div>
 *
 *
    // console.log(tweetText, readyTweetPublish, tweetData)

    // useEffect(() => {
    //     // if(readyTweetPublish) {
    //     //     // tweetData.concat({primaryTweetText})
    //     //     setTweetData([...tweetData, {primaryTweetText}])
    //     //     console.log(tweetData)
    //     // }
    //     setTweetData([...tweetData, {tweetText: tweetText}])
    //     let renderedData = tweetData.map(data => <div key={data.tweetText}>{data.tweetText}</div>)
    //     setRenderData(renderedData);
    //     console.log(tweetData, renderData)
    // }, [readyTweetPublish])
 */