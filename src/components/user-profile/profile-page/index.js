import React from 'react'
import "./index.css";
import ProfilePageTopView from './profile-top-view-section';
import ProfilePageTopNavigationMenuBar from './top-menu-navigation';

function ProfilePageUpperView({opacity}) {

    return (
        <div id='profile-page-upperview-container' style={{opacity: opacity ? '.2' : 1}}>
            <ProfilePageTopView />
            <ProfilePageTopNavigationMenuBar />
        </div>
    )
}

export default ProfilePageUpperView