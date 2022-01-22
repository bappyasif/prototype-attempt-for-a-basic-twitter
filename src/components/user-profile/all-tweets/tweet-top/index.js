import React, { useEffect, useState, useRef } from 'react'
import { checkMarkSvg } from '../../../topics-picker'
import { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../../../tweet-modal'
import { analyticsIcon, moreIcon } from '../../profile-page/svg-resources'
import useOnClickOutside from '../../../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside'
import { getDataFromFirestoreSubCollection } from '../../../firestore-methods'
import { Redirect, useHistory } from 'react-router-dom'

export let TweeetTop = ({ ID, removeSpeceficArrayItem, updateTweetPrivacy, currentUser, handleAnalysingTweetID, handlePinnedTweetID }) => {
    let [clicked, setClicked] = useState(false)
    let [whichPrivacy, setWhichPrivacy] = useState('')
    let [privacyOption, setPrivacyOption] = useState('')
    let [existingPrivacy, setExistingPrivacy] = useState('')
    let [changedWhoCanReply, setChangedWhoCanReply] = useState(false);
    let [showPinModal, setShowPinModal] = useState(false);
    let [showListModal, setShowListModal] = useState(false);
    let history = useHistory()

    let handleShowListModal = () => setShowListModal(!showListModal)
    
    let handleShowPinModal = () => setShowPinModal(!showPinModal)

    let handleClicked = () => setClicked(!clicked)
    // let rederDropdown = () => moreOptions.map(item => <Rend)
    
    let handleWhoCanReply = () => setChangedWhoCanReply(!changedWhoCanReply)
    
    let handleWhichPrivacy = value => setWhichPrivacy(value)
    
    let handlewhichPrivacyOption = value => setPrivacyOption(value)

    useEffect(() =>  showListModal && history.push('/i/lists/add_member'), [showListModal])
    
    // useEffect(() => whichPrivacy && updateTweetPrivacy(ID, whichPrivacy), [whichPrivacy])
    useEffect(() => {
        // recording newly selected privacy option and updating it both on DOM and Firestore
        whichPrivacy && updateTweetPrivacy(ID, convertOptionsToPrivacy())
        
        // neutralising intial privacy settings
        whichPrivacy && setPrivacyOption(null)
        whichPrivacy && setExistingPrivacy(null)
        
        // whichPrivacy && console.log('privacy running', whichPrivacy, convertOptionsToPrivacy())
    }, [whichPrivacy])
    // console.log(whichPrivacy, 'which privcy')

    // initial loading, for check mark visibility on DOM
    useEffect(() => {
        ID && getDataFromFirestoreSubCollection(currentUser, ID, 'privacy', handlewhichPrivacyOption)
    }, [])

    // converting intial privacyOption to DOM readable text so that chekc mark visibility gets shown on DOM
    useEffect(() => {  
        // privacyOption && updateTweetPrivacy(ID, privacyOption)
        privacyOption && setExistingPrivacy(convertOptionToText())
    }, [privacyOption])

    // converting initial privacy option to text
    let convertOptionToText = () => privacyOption == '01' ? 'Everybody' : privacyOption == '02' ? 'People who you follow' : privacyOption == '03' && 'Only you'
    
    // converting selected privacy text to server compatible option number
    let convertOptionsToPrivacy = () => whichPrivacy == 'Only you' ? '03' : whichPrivacy == 'People who you follow' ? '02' : whichPrivacy == 'Everybody' && '01'

    return (
        <div className='tweet-top'>
            <div className='user-info'>User Name<span>@profile handle</span> <span>-</span> <span>time here</span></div><div className='icon-svg' onClick={handleClicked}>{moreIcon()}</div>
            {clicked && !changedWhoCanReply && <RenderDropdownForTweetMoreOptions ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} handleWhoCanReply={handleWhoCanReply} handleClicked={handleClicked} handleAnalysingTweetID={handleAnalysingTweetID} handleShowPinModal={handleShowPinModal} handleShowListModal={handleShowListModal} />}
            {changedWhoCanReply && <RenderDropdownForWhoCanReply handleClicked={handleClicked} handleWhoCanReply={handleWhoCanReply} whichPrivacy={whichPrivacy} handleWhichPrivacy={handleWhichPrivacy} existingPrivacy={existingPrivacy} />}
            {showPinModal && <PinTweetConfirmationModal handleShowPinModal={handleShowPinModal} ID={ID} handlePinnedTweetID={handlePinnedTweetID} />}
            {/* {showListModal && <AddToListModal />} */}
        </div>
    )
}

// let AddToListModal = () => {
//     return (
//         <div id='add-to-list-container'>
//             <AddToListHeader />
//             <CreateNewList />
//         </div>
//     )
// }

// let CreateNewList = () => {
//     let [showModal, setShowModal] = useState(false)
//     let history = useHistory()

//     useEffect(() => showModal && history.push('/i/lists/create'))

//     let handleClick = () => {
//         console.log('add a new item')
//         setShowModal(true)
//     }
//     return (
//         <div id='create-new-list-wrapper' onClick={handleClick}>Create A new List</div>
//     )
// }

// let AddToListHeader = () => {
//     return (
//         <div id='list-header-wrapper'>
//             <div id='first-half'>
//                 <div id='svg-icon'>{removeIconSvg()}</div>
//                 <div id='action-header'>Pick a list</div>
//             </div>
//             <div id='other-half'>Save</div>
//         </div>
//     )
// }

let PinTweetConfirmationModal = ({handleShowPinModal, ID, handlePinnedTweetID}) => {
    let ref = useRef()
    
    let handleModal = () => {
        handleShowPinModal()
    }

    useOnClickOutside(ref, handleModal)
    
    return (
        <div className='pin-tweet-modal-container' ref={ref}>
            <div className='modal-header'>Pin Tweet to profile?</div>
            <div className='explanation-text'>This will appear at the top of your profile and replace any previously pinned Tweet.</div>
            <ClickableDiv name={'Pin'} handleShowPinModal={handleShowPinModal} ID={ID} handlePinnedTweetID={handlePinnedTweetID} />
            <ClickableDiv name={'Cancel'} handleShowPinModal={handleShowPinModal} />
        </div>
    )
}

let ClickableDiv = ({name, handleShowPinModal, ID, handlePinnedTweetID}) => {
    let handleClick = () => {
        if(name == 'Pin') {
            handlePinnedTweetID(ID)
            handleShowPinModal()
        } else if(name == 'Cancel') {
            handleShowPinModal()
        }
    }
    return (
        <div id={name} className='clickable-div' onClick={handleClick}>{name}</div>
    )
}

let RenderDropdownForWhoCanReply = ({handleClicked, handleWhoCanReply, whichPrivacy, handleWhichPrivacy, existingPrivacy}) => {
    let [isClickedOutside, setIsClickedOutside] = useState(true)
    let clcikedRef = useRef()

    let handleModal = () => {
        setIsClickedOutside(false)
        handleWhoCanReply()
        // handleClicked()
    }
    useOnClickOutside(clcikedRef, handleModal)

    // let renderPrivacy = privacyOptions.map((item, idx) => <RenderPrivacyOption key={item.name} item={item.privacyType} type={item.name} handleClicked={handleClicked} handleWhoCanReply={handleWhoCanReply} whichPrivacy={whichPrivacy} handleWhichPrivacy={handleWhichPrivacy} existingPrivacy={existingPrivacy} />)
    let renderPrivacy = privacyOptions().map((item, idx) => <RenderPrivacyOption key={item.name} item={item.privacyType} type={item.name} handleClicked={handleClicked} handleWhoCanReply={handleWhoCanReply} whichPrivacy={whichPrivacy} handleWhichPrivacy={handleWhichPrivacy} existingPrivacy={existingPrivacy} />)

    return (
        <div className='who-can-reply-container' ref={clcikedRef} style={{display: !isClickedOutside && 'none'}}>
            <div className='header-text'>Who can reply?</div>
            <div className='subheading-text' style={{ fontSize: 'smaller', color: 'sienna' }}>Choose who can reply to this Tweet. Anyone mentioned can always reply.</div>
            <div className='privacy-options' style={{ marginTop: '8px' }}>
                {renderPrivacy}
            </div>
        </div>
    )
}

let RenderPrivacyOption = ({ item, type, handleClicked, handleWhoCanReply, whichPrivacy, handleWhichPrivacy, existingPrivacy }) => {
    let [selected, setSelected] = useState(false)
    let handleSelected = () => {
        setSelected(!selected)
        // handleClicked()
        handleWhoCanReply()
        handleWhichPrivacy(type)
    }
    return (
        <div className='option-container' onClick={handleSelected}>
            {item}
            {(selected || (whichPrivacy == type) || (existingPrivacy == type)) && checkMarkSvg()}
        </div>
    )
}

let RenderDropdownForTweetMoreOptions = ({ ID, removeSpeceficArrayItem, handleWhoCanReply, handleClicked, handleAnalysingTweetID, handleShowPinModal, handleShowListModal }) => {
    let [isClickedOutside, setIsClickedOutside] = useState(true)
    let clcikedRef = useRef()

    // useEffect(() => setIsClickedOutside(true), [ID])

    // calling a hook to decide if mouse is clicked outside point reference or not, and then closing modal
    let handleModal = () => {
        setIsClickedOutside(false)
        // handleClicked()
    }

    useOnClickOutside(clcikedRef, handleModal)

    let renderOptions = moreOptions.map(item => <RenderOptions key={item.title} item={item} ID={ID} removeSpeceficArrayItem={removeSpeceficArrayItem} handleWhoCanReply={handleWhoCanReply} handleClicked={handleClicked} handleAnalysingTweetID={handleAnalysingTweetID} handleShowPinModal={handleShowPinModal} handleShowListModal={handleShowListModal} />)

    return (
        <div id='more-options-dropdown-container' ref={clcikedRef} style={{display: !isClickedOutside && 'none'}}>
            {renderOptions}
        </div>
    )
}

let RenderOptions = ({ item, ID, removeSpeceficArrayItem, handleWhoCanReply, handleClicked, handleAnalysingTweetID, handleShowPinModal, handleShowListModal }) => {
    let [tweetID, setTweetID] = useState('')
    // let [showPinModal, setShowPinModal] = useState(false);

    let history = useHistory()

    // console.log('heree!!')
    let handleClickAction = evt => {
        // evt.target.parentNode.id && console.log( evt.target.id || evt.target.parentNode.id)
        // setting tweet ID with which docID needs to be deleted both from DOM and Firestore
        // (evt.target.id || evt.target.parentNode.id) && setTweetID(evt.target.id || evt.target.parentNode.id)
        // setTweetID(evt.target.id || evt.target.parentNode.id)

        // removing that targetted tweet from profile
        // removeSpeceficArrayItem(ID)
        // console.log(evt.target.id || evt.target.parentNode.id)
        // (evt.target.id || evt.target.parentNode.id) && (evt.target.id || evt.target.parentNode.id) == ID && console.log('here tweetID')

        let test = (evt.target.querySelector('.option-title') || evt.target.parentNode.querySelector('.option-title'))
        // console.log(test, '?!')
        if (test.textContent == 'Change who can reply') {
            handleWhoCanReply()
        } else if (test.textContent == 'Embed tweet') {
            window.open('https://publish.twitter.com/', '_blank')
            // handleClicked()
        } else if (test.textContent == 'Analytics') {
            // <Redirect to={'/analytics'} />
            handleAnalysingTweetID(ID);
            history.push('/analytics')
        } else if (test.textContent == 'Delete') {
            // setTweetID(ID)
            // console.log(ID, 'delete')
            removeSpeceficArrayItem(ID)            
        } else if (test.textContent == 'Pin to your profile') {
            handleShowPinModal()
        } else if(test.textContent == 'Add/Remove @username from Lists') {
            handleShowListModal()
        }

        handleClicked()
    }
    // console.log(tweetID)
    // removing that targetted tweet from profile
    // useEffect(() => tweetID && removeSpeceficArrayItem(tweetID), [tweetID])

    return (
        <div className='option-container' id={item.title == 'Delete' ? ID : null} onClick={handleClickAction}>
            <div className='options-svg'>{item.icon}</div>
            <div className='option-title'>{item.title}</div>
        </div>
    )
}

let removeIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>
let deleteSvg = () => <svg className='profile-page-svg-icons'><g><path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path><path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path></g></svg>
let pinSvg = () => <svg className='profile-page-svg-icons'><g><path d="M20.472 14.738c-.388-1.808-2.24-3.517-3.908-4.246l-.474-4.307 1.344-2.016c.258-.387.28-.88.062-1.286-.218-.406-.64-.66-1.102-.66H7.54c-.46 0-.884.254-1.1.66-.22.407-.197.9.06 1.284l1.35 2.025-.42 4.3c-1.667.732-3.515 2.44-3.896 4.222-.066.267-.043.672.222 1.01.14.178.46.474 1.06.474h3.858l2.638 6.1c.12.273.39.45.688.45s.57-.177.688-.45l2.638-6.1h3.86c.6 0 .92-.297 1.058-.474.265-.34.288-.745.228-.988zM12 20.11l-1.692-3.912h3.384L12 20.11zm-6.896-5.413c.456-1.166 1.904-2.506 3.265-2.96l.46-.153.566-5.777-1.39-2.082h7.922l-1.39 2.08.637 5.78.456.153c1.355.45 2.796 1.78 3.264 2.96H5.104z"></path></g></svg>
let listSvg = () => <svg className='profile-page-svg-icons'><g><path d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zM18.575 22H4.25C3.01 22 2 20.99 2 19.75V5.5c0-1.24 1.01-2.25 2.25-2.25h8.947c.414 0 .75.336.75.75s-.336.75-.75.75H4.25c-.413 0-.75.336-.75.75v14.25c0 .414.337.75.75.75h14.325c.413 0 .75-.336.75-.75v-8.872c0-.414.336-.75.75-.75s.75.336.75.75v8.872c0 1.24-1.01 2.25-2.25 2.25z"></path><path d="M16.078 9.583H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.336.75.75s-.336.75-.75.75zm0 3.867H6.673c-.414 0-.75-.337-.75-.75s.336-.75.75-.75h9.405c.414 0 .75.335.75.75s-.336.75-.75.75zm-4.703 3.866H6.673c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.702c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>
let replySvg = () => <svg className='profile-page-svg-icons'><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
let embedSvg = () => <svg className='profile-page-svg-icons'><g><path d="M23.804 11.5l-6.496-7.25c-.278-.31-.752-.334-1.06-.06-.308.277-.334.752-.058 1.06L22.238 12l-6.047 6.75c-.275.308-.25.782.06 1.06.142.127.32.19.5.19.204 0 .41-.084.558-.25l6.496-7.25c.252-.28.258-.713 0-1zm-23.606 0l6.496-7.25c.278-.31.752-.334 1.06-.06.308.277.334.752.058 1.06L1.764 12l6.047 6.75c.277.308.25.782-.057 1.06-.143.127-.322.19-.5.19-.206 0-.41-.084-.56-.25L.197 12.5c-.252-.28-.257-.713 0-1zm9.872 12c-.045 0-.09-.004-.135-.012-.407-.073-.68-.463-.605-.87l3.863-21.5c.074-.407.466-.674.87-.606.408.073.68.463.606.87l-3.864 21.5c-.065.363-.38.618-.737.618z"></path></g></svg>
let moreOptions = [{ title: 'Delete', icon: deleteSvg() }, { title: 'Pin to your profile', icon: pinSvg() }, { title: 'Add/Remove @username from Lists', icon: listSvg() }, { title: 'Change who can reply', icon: replySvg() }, { title: 'Embed tweet', icon: embedSvg() }, { title: 'Analytics', icon: analyticsIcon() }]
// let privacyOptions = [{name: 'Everybody', privacyType: tweetPrivacySelected01('white') }, { name: 'People who you follow', privacyType: tweetPrivacySelected02('white')}, {name: 'Only you', privacyType: tweetPrivacySelected03('white')}]
let privacyOptions = () => [{name: 'Everybody', privacyType: tweetPrivacySelected01('white') }, { name: 'People who you follow', privacyType: tweetPrivacySelected02('white')}, {name: 'Only you', privacyType: tweetPrivacySelected03('white')}]