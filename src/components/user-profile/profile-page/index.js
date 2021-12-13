import React from 'react'
import "./index.css";
import ProfilePageTopView from './profile-top-view-section';
import ProfilePageTopNavigationMenuBar from './top-menu-navigation';

function ProfilePageUpperView({opacity,  currentUser}) {

    return (
        <div id='profile-page-upperview-container' style={{opacity: opacity ? '.2' : 1}}>
            <ProfilePageTopView  currentUser={currentUser} />
            <ProfilePageTopNavigationMenuBar currentUser={currentUser}/>
        </div>
    )
}

export default ProfilePageUpperView