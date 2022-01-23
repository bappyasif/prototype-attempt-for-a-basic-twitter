import React, { useState, useRef, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { getDataFromFirestoreSubCollection, updateDataInFirestore } from '../../../firestore-methods'
import useOnClickOutside from '../../../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside'

export let RenderTweetBottomIcons = ({ fromTweetThread, elem, extraTwee, extraEen, tweetData, handleQuoteTweetID, currentUser, handleReplyCount, replyCount, handleAnalysingTweetID, ID, feedParentInitialReplyCount }) => {
    let [hoveredID, setHoveredID] = useState('')
    let [iconClicked, setIconClicked] = useState('')
    let [showModal, setShowModal] = useState(false)
    let [undoRetweet, setUndoRetweet] = useState(false)
    let [counter, setCounter] = useState(0);
    let [replyRouteReady, setReplyRouteReady] = useState(false)
    // let [replyCount, setReplyCount] = useState(0)
    // let [replyCountFlag, setCountReplyFlag] = useState(false)
    let history = useHistory()

    // let handleReplyCount = (val) => {
    //     // setReplyCount(val ? val : 1)
    //     setReplyCount(Number(val + 1))
    //     setCountReplyFlag(true)
    //     setCounter(Number(val + 1))
    //     console.log('checkpoint 2', val)
    // }

    let handleInitialReplyCount = val => {
        console.log(val, 'val!!!!')
        setCounter(val)
        feedParentInitialReplyCount(val)
    }

    let handleIncreaseCount = () => setCounter(prevCount => prevCount+1)

    let handleDecreaseCount = () => setCounter(prevCount => prevCount-1)

    let handleShowModal = () => setShowModal(!showModal)

    let handleUndoTweet = () => setUndoRetweet(!undoRetweet)

    useEffect(() => {
        if(iconClicked == 'like') {
            handleIncreaseCount()
        } else if(iconClicked == 'reply') {
            // replyCount && history.push('/tweet/compose')
        } else if(iconClicked == 'analytics') {
            // alert('here!!')
            handleAnalysingTweetID(ID);
            history.push('/analytics')
        }
    }, [iconClicked])

    // useEffect(() => replyCount && history.push('/tweet/compose'), [replyCount])

    // when its rendering from tweet thread, reply count if there is any should be visibile as well, and it sdong so by updating found replyCount and setting it as counter value
    useEffect(() => replyCount && elem.id == 'reply' && setCounter(replyCount), [tweetData.ID])

    useEffect(() => replyRouteReady && history.push('/tweet/compose'), [replyRouteReady])

    useEffect(() => {
        undoRetweet && handleIncreaseCount()
        counter && !undoRetweet && handleDecreaseCount()
    }, [undoRetweet])

    // useEffect(() => {
    //     // iconClicked == 'reply' && history.push('/tweet/compose')
    //     // iconClicked && replyCountFlag && updateDataInFirestore(currentUser, tweetData.ID, {replyCount: replyCount})
    //     // iconClicked && replyCountFlag && history.push('/tweet/compose')
    // }, [replyCountFlag])

    useEffect(() => currentUser && elem.id == 'reply' && loadInitialReplyCount(), [])

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
        // console.log(evt.target.parentNode.parentNode.parentNode)
        let iconElement = evt.target.parentNode.parentNode.parentNode.id
        setIconClicked(iconElement)
        if(iconClicked == 'retweet') {
            handleShowModal()
            // !undoRetweet && handleCount()
        } else if(iconClicked == 'like') {
            handleDecreaseCount()
        } else if(iconClicked == 'reply') {
            handleQuoteTweetID(tweetData.ID)
            handleQuoteTweetCount()
            setReplyRouteReady(true)
            // HandleQuoteTweetProcess({userID: currentUser, docID: tweetData.ID, whichData: 'replyCount'})
            // updateDataInFirestore(currentUser, tweetData.ID, {replyCount: })
            // history.push('/tweet/compose')
        }
    }

    let loadInitialReplyCount = () => {
        // console.log(fromTweetThread, '<<<<chjecking>>>>')
        !fromTweetThread && tweetData.ID && getDataFromFirestoreSubCollection(currentUser, tweetData.ID, 'replyCount', handleInitialReplyCount )
    }

    let handleQuoteTweetCount = () => {
        getDataFromFirestoreSubCollection(currentUser, tweetData.ID, 'replyCount', handleReplyCount )
        console.log('checkpointy 1', currentUser, tweetData.ID)
    }

    replyCount && console.log(replyCount, 'replyCount!!', counter)

    return (
        <div
            key={elem.id}

            id={extraTwee ? elem.id + '-twee' : extraEen ? elem.id + '-een' : elem.id}

            className='hoverable-div'

            onMouseOver={mouseHoveredIn}
            onMouseOut={mouseHoveredOut}
        >
            {/* <span onClick={handleClicked} style={{fill: undoRetweet && 'greenyellow'}} >{iconClicked == 'like' ? loveIcon() : elem.icon}</span><span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span> */}

            <div className='item-wrapper' onClick={handleClicked} style={{display: 'flex', alignItems: 'center'}}>
                <div style={{ fill: undoRetweet ? 'rgb(29, 155, 240)' : null }} className='item-icon'>{iconClicked == 'like' ? loveIcon() : elem.icon}</div>
                {(counter > 0) && <div className='item-counter' style={{color: 'silver', fontSize: 'large', marginLeft: '4px', position: 'absolute', 'right': '-15px'}}>{counter}</div>}
                {/* {(counter > 0 || replyCount > 0) && <div className='item-counter' style={{color: 'silver', fontSize: 'large', marginLeft: '4px', position: 'absolute', 'right': '-15px'}}>{counter || (elem.ID && replyCount)}</div>} */}
            </div>
            <span style={{ display: hoveredID == elem.id + (extraTwee ? '-twee' : extraEen ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>

            {
                showModal
                &&
                <ShowRetweetModalUI handleShowModal={handleShowModal} handleUndoTweet={handleUndoTweet} undoRetweet={undoRetweet} />
            }
        </div>
    )

}

// let HandleQuoteTweetProcess = ({userID, docID, whichData}) => {
//     let [replyCount, setReplyCount] =  useState(null)
//     let handleReplyCount = (val) => setReplyCount(val);
    
//     useEffect(() => getDataFromFirestoreSubCollection(userID, docID, whichData, handleReplyCount ), [])
//     useEffect(() => replyCount && updateDataInFirestore(currentUser, tweetData.ID, {replyCount: replyCount ? replyCount + 1 : 1}), [replyCount])
    
//     replyCount && history.push('/tweet/compose')

//     return ''
// }

let ShowRetweetModalUI = ({ handleShowModal, undoRetweet, handleUndoTweet }) => {
    let ref = useRef()
    // clocing modal when clicked outside this wrapper with this custom hook
    useOnClickOutside(ref, handleShowModal)

    let renderModalItems = retweetModalItems.map(item => <RenderRetweetModalItem key={item.name} item={item} handleShowModal={handleShowModal} undoRetweet={undoRetweet} handleUndoTweet={handleUndoTweet} />)

    return (
        <div className='retweet-modal-wrapper' ref={ref}>
            {renderModalItems}
        </div>
    )
}

let RenderRetweetModalItem = ({ item, handleShowModal, handleUndoTweet, undoRetweet }) => {

    let handleClick = (evt) => {
        // console.log(evt.target.parentNode.id)
        if (evt.target.parentNode.id == 'Retweet') handleUndoTweet()
        handleShowModal()
    }

    return (
        <div className='action-ui-wrapper' id={item.name} onClick={handleClick}>
            <div className='action-svg'>{item.icon}</div>
            <div className='action-name'>{((undoRetweet && item.name == 'Retweet') ? 'Undo' : '') + item.name}</div>
        </div>
    )
}

let loveIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path></g></svg>

let quoteIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M22.132 7.653c0-.6-.234-1.166-.66-1.59l-3.535-3.536c-.85-.85-2.333-.85-3.182 0L3.417 13.865c-.323.323-.538.732-.63 1.25l-.534 5.816c-.02.223.06.442.217.6.14.142.332.22.53.22.023 0 .046 0 .068-.003l5.884-.544c.45-.082.86-.297 1.184-.62l11.337-11.34c.425-.424.66-.99.66-1.59zm-17.954 8.69l3.476 3.476-3.825.35.348-3.826zm5.628 2.447c-.282.283-.777.284-1.06 0L5.21 15.255c-.292-.292-.292-.77 0-1.06l8.398-8.398 4.596 4.596-8.398 8.397zM20.413 8.184l-1.15 1.15-4.595-4.597 1.15-1.15c.14-.14.33-.22.53-.22s.388.08.53.22l3.535 3.536c.142.142.22.33.22.53s-.08.39-.22.53z"></path></g></svg>

let retweetIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>

let retweetModalItems = [{ name: 'Retweet', icon: retweetIcon() }, { name: 'Quote', icon: quoteIcon() }]

/**
 * 
 * 
 let ShowRetweetModalUI = ({handleShow}) => {
    // let [showModal, setShowModal] = useState(false)
    // let [undoRetweet, setUndoRetweet] = useState(false)

    let ref = useRef()
    // clocing modal when clicked outside this wrapper with this custom hook
    useOnClickOutside(ref, handleShow)
    // useOnClickOutside(ref, () => setShowModal(false))
    // useOnClickOutside(ref, () => setIconClicked(''))

    let handleUndoTweet = () => setUndoRetweet(!undoRetweet)
    
    // let renderModalItems = retweetModalItems.map(item => <RenderRetweetModalItem key={item.name} item={item} setShowModal={setShowModal} />)
    // let renderModalItems = retweetModalItems.map(item => <RenderRetweetModalItem key={item.name} item={item} setIconClicked={setIconClicked} />)
    let renderModalItems = retweetModalItems.map(item => <RenderRetweetModalItem key={item.name} item={item} handleShow={handleShow} undoRetweet={undoRetweet} handleUndoTweet={handleUndoTweet} />)

    return (
        <div className='retweet-modal-wrapper' ref={ref}>
            {renderModalItems}
        </div>
    )
}

let RenderRetweetModalItem = ({item, handleShow, handleUndoTweet, undoRetweet}) => {
    // let [undoRetweet, setUndoRetweet] = useState(false)

    let handleClick = (evt) => {
        console.log(evt.target.parentNode.id)
        if(evt.target.parentNode.id == 'Retweet' && !undoRetweet) {
            handleUndoTweet()
            // setUndoRetweet(true)
            // setIconClicked('')
        } 
        // else {
        //     setUndoRetweet(false)
        // }
        // if(evt.target.parentNode.id == 'Retweet') setUndoRetweet(!undoRetweet)
        // setIconClicked('')
        // setShowModal()
        // handleShow()
    }

    console.log(undoRetweet, '?!')

    return (
        <div className='action-ui-wrapper' id={item.name} onClick={handleClick}>
            <div className='action-svg'>{item.icon}</div>
            <div className='action-name'>{(undoRetweet ? 'Undo' : '')  + item.name}</div>
        </div>
    )
}
 * 
 * 
 let ShowRetweetModalUI = () => {
    let [iconClicked, setIconClicked] = useState(null)
    let handleClicked = evt => setIconClicked(evt.target.id || evt.target.parentNode.id)
    console.log(iconClicked)
    return (
        <div className='retweet-modal-wrapper'>
            <div id='retweet' onClick={handleClicked}>
                <div className='action-svg'>Retweet</div>
                <div className='action-name'>Retweet</div>
            </div>
            <div id='quote' onClick={handleClicked}>Quote</div>
        </div>
    )
}
 * 
 * 
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
 */