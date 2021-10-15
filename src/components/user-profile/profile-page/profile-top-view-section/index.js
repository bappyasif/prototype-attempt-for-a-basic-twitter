import React from 'react'
import { Link } from 'react-router-dom';
import { backIcon, calendarIcon, linkIcon, locationIcon } from '../svg-resources'
import './index.css';

function ProfilePageTopView() {
    return (
        <div id='profile-top-view-container'>
            <div id='header-section'>
                <div id='go-back-to-previous'>{backIcon()}</div>
                <div id='profile-sneak-peak'>
                    <div className='profile-name'>A.B.</div>
                    <div className='total-tweets'>0000 Tweets</div>
                </div>
            </div>
            <div id='header-photo-div'>
                <img id='header-pic' src='https://picsum.photos/200/300' />
            </div>
            <div id='edit-details-div'>
                <img id='profile-pic' src='https://picsum.photos/200/300' />
                {/* <div id='edit-profile'>Edit profile</div> */}
                <Link id='edit-profile' to='/username/profile'>Edit profile</Link>
            </div>
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
        </div>
    )
}

export default ProfilePageTopView
