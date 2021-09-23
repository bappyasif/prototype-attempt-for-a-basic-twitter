import React, { useState } from 'react'
import './index.css'

function ProfilePageTopNavigationMenuBar() {
    let [navID, setNavID] = useState('');
    let handleClicks = (evt) => {
        let menuClicked = evt.target.id;
        // console.log(menuClicked)
        setNavID(menuClicked)
    }

    let renderNavigations = navigationArray.map(item => <a key={item.id} id={item.id} className={navID == item.id ? 'menu-active' : ''} onClick={handleClicks}>{item.name}</a>)
    return (
        <nav id='top-navigation-menu-container'>
            {renderNavigations}
        </nav>
    )
}

let navigationArray = [{id: 'tweets', name: 'Tweets'}, {id: 'tweets-and-replies', name: 'Tweets & replies'}, {id: 'media', name: 'Media'}, {id: 'likes', name: 'Likes'},]

export default ProfilePageTopNavigationMenuBar
