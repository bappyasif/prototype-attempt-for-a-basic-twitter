import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useOnHoverOutside from '../../../../user-profile/all-tweets/tweet-top/add-members-into-lists/useOnHoverOutside';
import { ListModalHeader } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components';
import { gettingDataFfromDeepai, makeRequestToRandomDataAPI, updateListOfUsers } from '../render-suggested-people-list';
import ShowSuggestedPersonModal from '../render-suggested-people-list/show-suggested-person-modal';

function RenderLengthyFollowList({listOfRandomUsers}) {
    let history = useHistory(null)

    let renderUsersList = () => listOfRandomUsers && listOfRandomUsers.map(item => <RenderUserInModal key={item.uid} item={item} />)

    return (
        <div id='lengthy-follow-list-container'>
            <ListModalHeader icon={backSvgIcon()} modalTitle={'Connect'} history={history} />
            <div id='header-text'>Suggested for you</div>
            {renderUsersList()}
        </div>
    )
}

export let RenderUserInModal = ({ item }) => {
    let [moreDescriptionText, setMoreDescriptionText] = useState(false)

    let [follow, setFollow] = useState(false)

    let [actionName, setActionName] = useState(null)

    let [showUserCardModal, setShowUserCardModal] = useState(false)

    // let ref = useRef(null)
    // useOnHoverOutside(ref, () => setShowUserCardModal(false))

    let handleFollow = evt => {
        setActionName(evt.target.textContent)

        setSuggestedName && setSuggestedName(item.title)
    }

    let handleHover = () => {
        setShowUserCardModal(true)
    }

    useEffect(() => {
        (item.decsription || item.description) && (item.decsription || item.description).length > 200 && setMoreDescriptionText(true)
    }, [item.decsription, item.description])

    // console.log(moreDescriptionText, 'moreDescriptionText')

    // this works, will be trying a combination
    // useEffect(() => {
    //     setFollow(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)
    // }, [actionName])

    useEffect(() => {
        !showUserCardModal && setFollow(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)
        showUserCardModal && setFollow(actionName == 'Follow' ? true : actionName == 'Unfollow' && false)
        showUserCardModal && actionName == 'Following' && setActionName('')
    }, [actionName])

    return (
        <div id='lengthy-people-list-wrapper' onMouseLeave={() => setShowUserCardModal(false)}>
            <div id='top-portion'>
                <div id='left-side' onMouseEnter={handleHover}>
                    <img id='user-img' src={item.avatar || item.profile_image_url} />
                    <div id='user-infos'>
                        <div id='user-name'>{ !item.name ? (item.first_name + ' ' + item.last_name) : item.name }</div>
                        <div id='user-handle'>{ item.screen_name ? item.screen_name : (item.first_name + '_' + item.last_name).toLowerCase()}</div>
                    </div>
                </div>
                <div id='follow-btn' onClick={handleFollow} style={{ backgroundColor: follow && 'rgba(29, 155, 240, 1)' }}>{follow ? 'Following' : 'Follow'}</div>
            </div>
            {/* <div id='description-text'>{item.decsription && item.decsription.substring(0,62) || 'user description awaits or was not found at this moment....'}</div> */}
            <div id='description-text'>{(moreDescriptionText ? (item.decsription || item.description).slice(0, 200) : (item.decsription || item.description)) || 'user description awaits or was not found at this moment....'}<span className='more-text'>{moreDescriptionText && '...'}</span></div>
            { !showUserCardModal && actionName == 'Following' && <RenderUnfollowModal handleFollow={handleFollow} suggestedName={!item.name ? (item.first_name + ' ' + item.last_name) : item.name} />}
            {showUserCardModal && <ShowSuggestedPersonModal handleFollowSuggested={handleFollow} updatePersonModal={setShowUserCardModal} name={!item.name ? (item.first_name + ' ' + item.last_name) : item.name} handle={item.screen_name ? item.screen_name : (item.first_name + '_' + item.last_name).toLowerCase()} profilePicUrl={item.avatar || item.profile_image_url} followSuggested={follow} descriptionText={item.decsription || item.description} friendsAndFollowersCount={ (item.friends_count || item.followers_count) && [item.friends_count, item.followers_count]} />}
        </div>
    )
}

export let RenderUnfollowModal = ({ handleFollow, suggestedName }) => {
    let actionBtns = ['Unfollow', 'Cancel']

    let renderActionNames = () => actionBtns.map(name => <ActionButton key={name} actionName={name} handleFollow={handleFollow} />)

    return (
        <div id='unfollow-modal-wrapper'>
            <div id='modal-top-section'>
                <div id='modal-header'>Unfollow @<spam id='suggested-name'>{suggestedName}</spam></div>
                <div id='modal-action-description'>Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected.</div>
            </div>
            <div id='action-btns-wrapper'>
                {renderActionNames()}
            </div>
        </div>
    )
}

let ActionButton = ({ actionName, handleFollow }) => {
    return (
        <div className='action-btns' id={'action-btn-' + actionName} onClick={handleFollow} >{actionName}</div>
    )
}

export let backSvgIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

export default RenderLengthyFollowList

// let [listOfUsers, setListOfUsers] = useState([])
    // let [fetchReady, setFetchReady] = useState(true)
    // let [counter, setCounter] = useState(0)

    // let [dataset, setDataset] = useState(null)

    // useEffect(() => {
    //     counter == 20 && setDataset(listOfUsers)
    //     counter >= 21 && setListOfUsers(null)
    // }, [counter])

    // useEffect(() => {
    //     if (listOfUsers && listOfUsers.length == 20 && counter < 20) {
    //         // console.log('chk03')
    //         listOfUsers.forEach((item, _, arr) => {
    //             console.log(counter, 'counter!!')
    //             if (fetchReady) {
    //                 gettingDataFfromDeepai(item, setFetchReady, updateListOfUsers, setCounter, setListOfUsers, arr)
    //             }
    //         })
    //     }
    // }, [listOfUsers])

    // useEffect(() => {
    //     for (let i = 0; i < 20; i++) {
    //         makeRequestToRandomDataAPI(setListOfUsers)
    //     }
    // }, [])