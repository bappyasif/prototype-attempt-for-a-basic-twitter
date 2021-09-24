import React, { useEffect, useState } from 'react'
import LeftSideNavigationPanel from '../../navigation-panels/left-side';
import AllTweetsPage from './all-tweets';
import "./index.css";
import ProfilePageTopView from './profile-top-view-section';
import { moreIcon, tweetAdditionalIconsArray } from './svg-resources';
import ProfilePageTopNavigationMenuBar from './top-menu-navigation';

function ProfilePageUpperView({ tweetData }) {
    // let [menuSelected, setMenuSelected] = useState();
    // if(menuSelected == 01 && <Component01 />)
    // if(menuSelected == 02 && <Component02 />)

    return (
        <div id='profile-page-upperview-container'>
            {/* <LeftSideNavigationPanel /> */}
            <ProfilePageTopView />
            <ProfilePageTopNavigationMenuBar />
            {/* {renderingData} */}
            {/* <AllTweetsPage tweetData={tweetData} /> */}
        </div>
    )
}

export default ProfilePageUpperView

/**
 * 
 * 
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
                {/* {tweetAdditionalIconsArray.map(elem => <div key={elem.id} id={elem.id} onMouseOver={mouseHoveredIn} onMouseOut={mouseHoveredOut}><span>{elem.icon}</span> <span className={hoveredID == elem.id ? 'tooltips-text' : ''}>{elem.id}</span></div>)} *}
                </div>
                </div>
            </div>))
 */