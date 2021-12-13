import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './index.css'

function ProfilePageTopNavigationMenuBar({currentUser}) {
    let [navID, setNavID] = useState('');
    // let [route, setRoute] = useState();
    let handleClicks = (evt) => {
        let menuClicked = evt.target.id;
        setNavID(menuClicked)
    }

    // useEffect(() => setRoute(currentUser), [])

    useEffect(() => {
        
        let tweetsElement = document.querySelector('#top-navigation-menu-container');

        if(navID== '') tweetsElement.firstChild.className = 'menu-active'

        else tweetsElement.firstChild.className = 'menu-default-view'

    }, [!navID])

    let renderNavigations = navigationArray.map((item, idx) => <Link
        key={item.id}
        // to={item.id == 'tweets' ? '/username' : '/username/' + item.id}
        to={item.id == 'tweets' ? "/"+currentUser+'/' : "/"+currentUser+'/' + item.id}
        id={item.id}
        className={navID == item.id ? 'menu-active' : 'menu-default-view'}
        onClick={handleClicks}
    >{item.name}</Link>)
    return (
        <nav id='top-navigation-menu-container'>
            {renderNavigations}
        </nav>
    )
}

let navigationArray = [{ id: 'tweets', name: 'Tweets' }, { id: 'tweets-and-replies', name: 'Tweets & replies' }, { id: 'media', name: 'Media' }, { id: 'likes', name: 'Likes' },]

export default ProfilePageTopNavigationMenuBar
