import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { backIcon, calendarIcon, linkIcon, locationIcon } from '../svg-resources'
import {getUserProfileData} from '../../../firestore-methods'
import './index.css';
import { useEffect } from 'react';

function ProfilePageTopView({currentUser}) {
    let [userProfileData, setUserProfileData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    
    let uploadData = (data) => setUserProfileData(data);
    useEffect(() => currentUser && getUserProfileData(currentUser, uploadData), [])
    
    useEffect(() => {
        // let data = userProfileData.filter(item => Object.keys(item) == 'content');
        // let data = userProfileData && Object.keys(userProfileData).filter(key => key == 'content').reduce((curr, key) => Object.assign(curr, {[key] : userProfileData[key]}, {}))
        // setFilteredData(data);

        let data = userProfileData && userProfileData.map(item => Object.keys(item).filter(key => key == 'content').reduce((curr, key) => Object.assign(curr, {[key]: item[key]}), {}))
        setFilteredData(data);

    }, [userProfileData])

    // console.log(userProfileData, 'data ready from topView', currentUser, filteredData, Object.keys(userProfileData))
    
    let renderUserData = () => {
        return (
            (userProfileData.length
            &&
            filteredData.length)
            ?
            <div id='profile-info-section'>
                <div id='handle-info'>
                    <div className='profile-name'>{filteredData && filteredData[0].content || 'A.B'}</div>
                    <div id='profile-handle'>@userhandle</div>
                </div>
                <div id='profile-bio'>{filteredData && filteredData[1].content || 'A.B'}</div>
                <div id='profile-info'>
                    <div id='profile-location'>
                        <div id='location-svg'>{locationIcon()}</div>
                        <span id='loaction-text'>{filteredData && filteredData[2].content || 'A.B'}</span>
                    </div>
                    <div id='website-info'>
                        <span>{linkIcon()}</span>
                        <span>{filteredData && filteredData[3].content || 'A.B'}</span>
                    </div>
                    <div id='joined-info'>
                        <span id='calendar-svg'>{calendarIcon()}</span>
                        <span>Joined {filteredData && filteredData[5].content || 'A.B'}</span>
                    </div>
                </div>
                <div id='profile-reach-info'>
                    <a id='profile-following'>
                        <div className='audience-numbers'>0000 <span className='audience-reach-type'>Following</span></div>
                    </a>
                    <a id='profile-follower'>
                        <div className='audience-numbers'>0000 <span className='audience-reach-type'>Followers</span></div>
                    </a>
                </div>
            </div>
            :
            <div id='profile-info-section'>
                <div id='handle-info'>
                    <div className='profile-name'>A.B.</div>
                    <div id='profile-handle'>@bappyasif</div>
                </div>
                <div id='profile-bio'>profile sample bio goes here as an example</div>
                <div id='profile-info'>
                    <div id='profile-location'>
                        <div id='location-svg'>{locationIcon()}</div>
                        <span id='loaction-text'>Capital, Country</span>
                    </div>
                    <div id='website-info'>
                        <span>{linkIcon()}</span>
                        <span>www.some.website.co</span>
                    </div>
                    <div id='joined-info'>
                        <span id='calendar-svg'>{calendarIcon()}</span>
                        <span>Joined Month Year</span>
                    </div>
                </div>
                <div id='profile-reach-info'>
                    <a id='profile-following'>
                        <div className='audience-numbers'>0000 <span className='audience-reach-type'>Following</span></div>
                    </a>
                    <a id='profile-follower'>
                        <div className='audience-numbers'>0000 <span className='audience-reach-type'>Followers</span></div>
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div id='profile-top-view-container'>
            <div id='header-section'>
                <div id='go-back-to-previous'>{backIcon()}</div>
                <div id='profile-sneak-peak'>
                    <div className='profile-name'>{filteredData[0] && filteredData[0].content || 'A.B.'}</div>
                    <div className='total-tweets'>0000 Tweets</div>
                </div>
            </div>
            <div id='header-photo-div'>
                {/* <img id='header-pic' src='https://picsum.photos/200/300' /> */}
                {<img id='header-pic' src={(filteredData[7] && filteredData[7].content)} /> || <img id='header-pic' src='https://picsum.photos/200/300' />}
            </div>
            <div id='edit-details-div'>
                {/* <img id='profile-pic' src='https://picsum.photos/200/300' /> */}
                {<img id='profile-pic' src={(filteredData[6] && filteredData[6].content)} /> || <img id='profile-pic' src='https://picsum.photos/200/300' />}
                {/* <div id='edit-profile'>Edit profile</div> */}
                {/* <Link id='edit-profile' to='/username/profile'>Edit profile</Link> */}
                <Link id='edit-profile' to={`/${currentUser}/profile`}>Edit profile</Link>
            </div>
            {/* {renderUserData()} */}
            <div id='profile-info-section'>
                <div id='handle-info'>
                    <div className='profile-name'>{filteredData[0] && filteredData[0].content || 'A.B.'}</div>
                    <div id='profile-handle'>@userhandle</div>
                </div>
                <div id='profile-bio'>{filteredData[1] && filteredData[1].content || 'profile sample bio goes here as an example'}</div>
                <div id='profile-info'>
                    <div id='profile-location'>
                        <div id='location-svg'>{locationIcon()}</div>
                        <span id='loaction-text'>{filteredData[2] && filteredData[2].content || 'A.B.'}</span>
                    </div>
                    <div id='website-info'>
                        <span>{linkIcon()}</span>
                        <span>{filteredData[3] && filteredData[3].content || 'A.B.'}</span>
                    </div>
                    <div id='joined-info'>
                        <span id='calendar-svg'>{calendarIcon()}</span>
                        <span>{filteredData[5] && filteredData[5].content || 'A.B.'}</span>
                    </div>
                </div>
                <div id='profile-reach-info'>
                    <a id='profile-following'>
                        <div className='audience-numbers'>0000 <span className='audience-reach-type'>Following</span></div>
                    </a>
                    <a id='profile-follower'>
                        <div className='audience-numbers'>0000 <span className='audience-reach-type'>Followers</span></div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageTopView
