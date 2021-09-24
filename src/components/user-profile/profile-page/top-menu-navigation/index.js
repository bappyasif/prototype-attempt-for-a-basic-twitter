import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './index.css'

function ProfilePageTopNavigationMenuBar() {
    let [navID, setNavID] = useState('');
    let handleClicks = (evt) => {
        let menuClicked = evt.target.id;
        setNavID(menuClicked)
    }

    let renderNavigations = navigationArray.map(item => <Link key={item.id} to={item.id == 'tweets' ? '/user-profile' : '/user-profile/'+item.id} target='_blank' id={item.id} className={navID == item.id ? 'menu-active' : ''} onClick={handleClicks}>{item.name}</Link>)
    return (
        <nav id='top-navigation-menu-container'>
            {renderNavigations}
        </nav>
    )
}

let navigationArray = [{id: 'tweets', name: 'Tweets'}, {id: 'tweets-and-replies', name: 'Tweets & replies'}, {id: 'media', name: 'Media'}, {id: 'likes', name: 'Likes'},]

export default ProfilePageTopNavigationMenuBar
