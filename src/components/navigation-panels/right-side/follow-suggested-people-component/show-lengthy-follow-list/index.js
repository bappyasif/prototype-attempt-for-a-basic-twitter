import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ListModalHeader } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components';
import { gettingDataFfromDeepai, makeRequestToRandomDataAPI, updateListOfUsers } from '../render-suggested-people-list';

function RenderLengthyFollowList() {
    let history = useHistory(null)

    let [listOfUsers, setListOfUsers] = useState([])
    let [fetchReady, setFetchReady] = useState(true)
    let [counter, setCounter] = useState(0)

    let [dataset, setDataset] = useState(null)

    useEffect(() => {
        counter == 20 && setDataset(listOfUsers)
        counter >= 21 && setListOfUsers(null)
    }, [counter])

    useEffect(() => {
        if (listOfUsers && listOfUsers.length == 20 && counter < 20) {
            // console.log('chk03')
            listOfUsers.forEach((item, _, arr) => {
                console.log(counter, 'counter!!')
                if (fetchReady) {
                    gettingDataFfromDeepai(item, setFetchReady, updateListOfUsers, setCounter, setListOfUsers, arr)
                }
            })
        }
    }, [listOfUsers])

    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            makeRequestToRandomDataAPI(setListOfUsers)
        }
    }, [])

    // let renderUsersList = () => listOfUsers && listOfUsers.map(item => <RenderUserInModal key={item.uid} item={item} />)

    let renderUsersList = () => (listOfUsers || dataset).map(item => <RenderUserInModal key={item.uid} item={item} />)

    return (
        <div id='lengthy-follow-list-container'>
            <ListModalHeader icon={backSvgIcon()} modalTitle={'Connect'} history={history} />
            <div id='header-text'>Suggested for you</div>
            {renderUsersList()}
        </div>
    )
}

let RenderUserInModal = ({ item }) => {
    

    let [follow, setFollow] = useState(false)

    let [actionName, setActionName] = useState(null)

    let handleFollow = evt => {
        // console.log(evt.target.textContent, 'checks!!')
        setActionName(evt.target.textContent)

        setSuggestedName(item.title)
    }

    useEffect(() => {
        setFollow(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)
    }, [actionName])

    return (
        <div id='lengthy-people-list-wrapper'>
            <div id='top-portion'>
                <div id='left-side'>
                    <img id='user-img' src={item.avatar} />
                    <div id='user-infos'>
                        <div id='user-name'>{item.first_name + ' ' + item.last_name}</div>
                        <div id='user-handle'>{(item.first_name + '_' + item.last_name).toLowerCase()}</div>
                    </div>
                </div>
                {/* <div id='follow-btn' onClick={handleFollow} style={{ backgroundColor: follow == 'Follow' && 'rgba(29, 155, 240, 1)' }}>{follow == 'Follow' ? 'Following' : 'Follow'}</div> */}
                <div id='follow-btn' onClick={handleFollow} style={{ backgroundColor: follow && 'rgba(29, 155, 240, 1)' }}>{follow ? 'Following' : 'Follow'}</div>
            </div>
            {/* <div id='book-review'>{item.reviewList || 'book review awaits or was not found at this moment....'}</div> */}
            <div id='description-text'>{item.decsription || 'user description awaits or was not found at this moment....'}</div>
            {actionName == 'Following' && <RenderUnfollowModal handleFollow={handleFollow} suggestedName={item.first_name + ' ' + item.last_name} />}
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