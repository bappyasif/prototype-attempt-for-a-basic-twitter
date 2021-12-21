import React, { useState } from 'react'

export let RenderTweetBottomIcons = ({ elem, extraTwee, extraEen, tweetData }) => {
    let [hoveredID, setHoveredID] = useState('')
    let [iconClicked, setIconClicked] = useState('')

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
        return whichIcon
    }

    let mouseHoveredIn = evt => {
        // console.log('in', evt.target.id, evt.target.parentNode.id)
        let foundElement = findWhichIconId(evt)
        // console.log(foundElement, 'which?!')
        setHoveredID(foundElement)
    }
    let mouseHoveredOut = evt => {
        // console.log('out', evt.target.id)
        setHoveredID('')
    }

    let handleClicked = (evt) => {
        // console.log(evt.target.parentNode.parentNode)
        let iconElement = evt.target.parentNode.parentNode.id
        setIconClicked(iconElement)
    }

    // iconClicked && console.log(iconClicked, '?!')

    // let shareableData = () => {
    //     let shareDataObject = {
    //         title: 'sharing from web app',
    //         url: window.location.href,
    //         text: tweetData.tweetText
    //     }
    //     // let shareDataObject = navigator.share({
    //     //     title: document.title,
    //     //     text: 'Hello World',
    //     //     url: 'https://developer.mozilla.org',
    //     //   });
    //     return shareDataObject
    // }

    // let checkingIfDataShareable = () => {
    //     let isShareable = navigator.canShare && navigator.canShare(tweetData.tweetText)
    //     // let isShareable = navigator.canShare
    //     return isShareable
    // }

    // let sharingData = () => {
    //     if(checkingIfDataShareable()) {
    //         navigator.share(shareableData)
    //     } else {
    //         navigator.share(shareableData)
    //         .then(()=>console.log('success!!'))
    //         .catch(console.error)
    //         // alert('data unshareable')
    //     }

    // }

    let handleShare = evt => {
        console.log(iconClicked, 'share!!', tweetData)
        // sharingData()
        // if(navigator.share) {
        //     console.log('supports share')
        //     navigator.share({text: 'yeah.what'})
        //     .then(()=>console.log('successfull'))
        //     .catch(err=>console.log(err.message))
        // }
    }

    return (
        <div
            key={elem.id}

            id={extraTwee ? elem.id + '-twee' : extraEen ? elem.id + '-een' : elem.id}

            className='hoverable-div'

            onMouseOver={mouseHoveredIn}
            onMouseOut={mouseHoveredOut}
        >
            <span onClick={iconClicked == 'share' ? handleShare : handleClicked} style={{ fill: iconClicked == 'like' ? 'red' : iconClicked == 'retweet' && 'lightGreen' }}>{iconClicked == 'like' ? loveIcon() : elem.icon}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>
            {/* <span onClick={handleClicked} style={{color: 'red', fill: iconClicked == 'like' && 'red'}}>{loveIcon()}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span> */}
        </div>
    )

}

let loveIcon = () => <svg className='profile-page-svg-icons'><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>