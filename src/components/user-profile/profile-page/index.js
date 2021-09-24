import React from 'react'
import "./index.css";
import ProfilePageTopView from './profile-top-view-section';
import ProfilePageTopNavigationMenuBar from './top-menu-navigation';

function ProfilePageUpperView() {

    return (
        <div id='profile-page-upperview-container'>
            <ProfilePageTopView />
            <ProfilePageTopNavigationMenuBar />
        </div>
    )
}

export default ProfilePageUpperView