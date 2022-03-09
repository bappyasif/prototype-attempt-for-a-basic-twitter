import React, { useState, useRef, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { getDataFromFirestoreSubCollection } from '../../../firestore-methods'
import useOnClickOutside from '../../../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside'

export let RenderTweetBottomIcons = ({ handleLikedTweets, changedCount, removeFromLikedTweets, tweetType, currentCountInFirestore, listOfRetweetedQuotes, quotesListFromRetweet, handleQuotedFromRetweetModal, fromTweetThread, elem, extraTwee, extraEen, tweetData, handleQuoteTweetID, currentUser, handleReplyCount, replyCount, handleAnalysingTweetID, ID, feedParentInitialReplyCount, repliedTweetsIDs }) => {
    let [hoveredID, setHoveredID] = useState('')
    let [iconClicked, setIconClicked] = useState('')
    let [showModal, setShowModal] = useState(false)
    let [undoRetweet, setUndoRetweet] = useState(false)
    let [counter, setCounter] = useState(0);
    let [replyRouteReady, setReplyRouteReady] = useState(false)
    let history = useHistory(null)

    let handleIncreaseCount = () => setCounter(prevCount => prevCount+1)

    let handleDecreaseCount = () => setCounter(prevCount => prevCount-1)

    let handleShowModal = () => setShowModal(!showModal)

    let handleUndoTweet = () => setUndoRetweet(!undoRetweet)

    useEffect(() => changedCount != -1  && elem.id == 'reply' && setCounter(changedCount), [changedCount])

    useEffect(() => repliedTweetsIDs && elem.id == 'reply' && setCounter(repliedTweetsIDs.length), [repliedTweetsIDs])

    useEffect(() => quotesListFromRetweet && elem.id == 'retweet' && setCounter(quotesListFromRetweet.length), [quotesListFromRetweet])

    useEffect(() => {
        if(iconClicked == "like" || iconClicked == "like-twee") {
            handleIncreaseCount()
        } else if(iconClicked == 'reply' || iconClicked == 'reply-twee') {

        } else if(iconClicked.includes('analytics')) {
            handleAnalysingTweetID(ID);
            history.push('/analytics')
        }
    }, [iconClicked])

    // when its rendering from tweet thread, reply count if there is any should be visibile as well, and it sdong so by updating found replyCount and setting it as counter value
    useEffect(() => replyCount && elem.id == 'reply' && setCounter(replyCount), [tweetData.ID])

    useEffect(() => replyRouteReady && history.push('/tweet/compose'), [replyRouteReady])

    useEffect(() => currentUser && elem.id == 'retweet' && listOfRetweetedQuotes && setCounter(listOfRetweetedQuotes.length), [listOfRetweetedQuotes])

    useEffect(() => {
        undoRetweet && handleIncreaseCount()
        counter && !undoRetweet && handleDecreaseCount()
    }, [undoRetweet])

    let findWhichIconId = evt => {
        let whichIcon = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id;
        return whichIcon
    }

    let mouseHoveredIn = evt => {
        let foundElement = findWhichIconId(evt)
        setHoveredID(foundElement)
    }

    let mouseHoveredOut = evt => {
        setHoveredID('')
    }

    let handleClicked = (evt) => {
        let iconElement = evt.target.parentNode.id || evt.target.parentNode.parentNode.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.parentNode.id|| evt.target.parentNode.parentNode.parentNode.parentNode.parentNode.id
        setIconClicked(iconElement)

        if(iconElement == 'retweet' || iconElement == 'retweet-twee') {
            handleShowModal()
        } else if(iconElement == 'like' || iconElement == 'like-twee') {
            handleDecreaseCount()
            tweetData.liked ? removeFromLikedTweets(tweetData.ID) : handleLikedTweets(tweetData.ID)
        } else if(iconElement == 'reply' || iconElement == 'reply-twee') {
            handleQuoteTweetID(tweetData.ID)
            handleQuoteTweetCount()
            setReplyRouteReady(true)
        }
        // console.log(iconElement, 'iconElement', evt.target)
    }

    let handleQuoteTweetCount = () => {
        getDataFromFirestoreSubCollection(currentUser, tweetData.ID, 'replyCount', handleReplyCount )
        // console.log('checkpointy 1', currentUser, tweetData.ID)
    }

    return (
        <div
            key={elem.id}

            id={tweetType == 'twee' ? elem.id + '-twee' : tweetType == 'een' ? elem.id + '-een' : elem.id}

            className='hoverable-div'

            onMouseOver={mouseHoveredIn}

            onMouseOut={mouseHoveredOut}
        >
            <div className='item-wrapper' onClick={handleClicked} style={{display: 'flex', alignItems: 'center'}}>
                <div style={{ fill: undoRetweet ? 'rgb(29, 155, 240)' : null }} className='item-icon'>{((iconClicked == 'like' || iconClicked == 'like-twee') && tweetData.liked || (elem.id == 'like' && tweetType != 'een' && tweetData.liked || elem.id == 'like' && tweetType == 'twee'  && tweetData.liked)) ? loveIcon() : elem.icon}</div>
                {(counter > 0) && <div className='item-counter' style={{color: 'silver', fontSize: 'large', marginLeft: '4px', position: 'absolute', 'right': '-15px'}}>{counter}</div>}
            </div>

            <span style={{ display: hoveredID == elem.id + (tweetType == 'twee' ? '-twee' : tweetType == 'een' ? '-een' : '') ? 'flex' : 'none' }} className='hoverable-div-tooltips-text'>{elem.id}</span>

            {
                showModal
                &&
                <ShowRetweetModalUI handleShowModal={handleShowModal} handleUndoTweet={handleUndoTweet} undoRetweet={undoRetweet} handleQuoteTweetID={handleQuoteTweetID} tweetData={tweetData} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} />
            }
        </div>
    )

}

let ShowRetweetModalUI = ({ handleShowModal, undoRetweet, handleUndoTweet, handleQuoteTweetID, tweetData, handleQuotedFromRetweetModal }) => {
    let ref = useRef()
    // clocing modal when clicked outside this wrapper with this custom hook
    useOnClickOutside(ref, handleShowModal)

    let renderModalItems = retweetModalItems.map(item => <RenderRetweetModalItem key={item.name} item={item} handleShowModal={handleShowModal} undoRetweet={undoRetweet} handleUndoTweet={handleUndoTweet} handleQuoteTweetID={handleQuoteTweetID} tweetData={tweetData} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} />)

    return (
        <div className='retweet-modal-wrapper' ref={ref}>
            {renderModalItems}
        </div>
    )
}

let RenderRetweetModalItem = ({ item, handleShowModal, handleUndoTweet, undoRetweet, handleQuoteTweetID, tweetData, handleQuotedFromRetweetModal }) => {
    let history = useHistory(null);

    let handleClick = (evt) => {
        let nodeID = evt.target.parentNode.id
        if(nodeID == 'Quote') {
            handleQuoteTweetID(tweetData.ID)
            history.push('/tweet/compose')
            handleQuotedFromRetweetModal()
        }
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