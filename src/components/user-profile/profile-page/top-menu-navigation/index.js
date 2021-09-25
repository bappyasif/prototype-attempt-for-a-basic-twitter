import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './index.css'

function ProfilePageTopNavigationMenuBar() {
    let [navID, setNavID] = useState('');
    let handleClicks = (evt) => {
        let menuClicked = evt.target.id;
        setNavID(menuClicked)
    }

    useEffect(() => {
        let tweetsElement = document.querySelector('#top-navigation-menu-container');
        // console.log(tweetsElement.firstChild);
        if(navID== '') tweetsElement.firstChild.className = 'menu-active'
        else tweetsElement.firstChild.className = 'menu-default-view'
        // console.log(navID, "??")
    }, [!navID])

    // let renderNavigations = navigationArray.map(item => <Link key={item.id} to={item.id == 'tweets' ? '/user-profile' : '/user-profile/'+item.id} target='_blank' id={item.id} className={navID == item.id ? 'menu-active' : ''} onClick={handleClicks}>{item.name}</Link>)
    let renderNavigations = navigationArray.map((item, idx) => <Link
        key={item.id}
        to={item.id == 'tweets' ? '/user-profile' : '/user-profile/' + item.id}
        id={item.id}
        
        className={navID == item.id ? 'menu-active' : 'menu-default-view'}
        // className={navID == 1 && idx == 0 ? 'menu-active' : 'menu-default-view'}
        // className={navID == item.id ? 'menu-active' : 'menu-default-view'}
        // className={idx == 0 ? 'menu-active' : 'menu-default-view'}
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
