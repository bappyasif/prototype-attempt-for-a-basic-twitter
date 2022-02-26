let deepai = require('deepai');
import React, { useEffect, useState } from 'react';
import { RenderUnfollowModal } from '../show-lengthy-follow-list';
import useReuseableDataExtraction from '../useReuseableDataExtraction';
import ShowSuggestedPersonModal, { makeRequest } from './show-suggested-person-modal';

function RenderSuggestedPeopleList({ listOfRandomUsers }) {

    let renderFollowThesePeople = () => listOfRandomUsers && listOfRandomUsers.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    return (
        <div id='follow-suggested-people-container'>
            {renderFollowThesePeople()}
        </div>
    )
}

let RenderPeople = ({ item }) => {
    // let { first_name, last_name, avatar, uid } = { ...item }

    // let name = first_name + ' ' + last_name

    let {name, screen_name, profile_image_url} = {...item}

    let [nameAdjusted, setNameAdjusted] = useState(null)

    let [follows, setFollows] = useState(false)

    let [actionName, setActionName] = useState(null)

    let [followSuggested, setFollowSuggested] = useState(false)

    let [showPersonCardModal, setShowPersonCardModal] = useState(false)

    let handleFollowSuggested = (evt) => {
        setActionName(evt.target.textContent)
    }

    // let handleNameAdjust = () => {
    //     setNameAdjusted(name.split(' ').join('_'))
    // }

    useEffect(() => {
        Math.random() > .51 && setFollows(true)
        // handleNameAdjust()
    }, [])

    useEffect(() => {
        // when its coming from suggested peoople container
        !showPersonCardModal && setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)

        // changing action strings appropriately when  its coming from showPersonCardModal
        showPersonCardModal && setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Following' && false)

        // making action string null so that it doesnt invoke unfollow modal when showPersonCardModal is no longer in view
        showPersonCardModal && actionName == 'Following' && setActionName('')
    }, [actionName])

    return (
        <div className='render-people-wrapper' onMouseLeave={() => setShowPersonCardModal(false)}>
            <div id='user-details' onMouseEnter={() => setShowPersonCardModal(true)}>
                {/* <img src={avatar || profile_image_url} id='user-img' /> */}
                <img src={profile_image_url} id='user-img' />
                <div id='profile-info'>
                    <div id='user-name'>{name}</div>
                    <div id='user-handle'> @{screen_name} <span id='follow-status'>{follows ? ' Follows you' : ''}</span></div>
                    {/* <div id='user-handle'> @{ screen_name || (nameAdjusted || name).toLowerCase()} <span id='follow-status'>{follows ? ' Follows you' : ''}</span></div> */}
                </div>
            </div>
            {/* <div id='follow-btn'>Follow</div> */}
            <div id='follow-btn' onClick={handleFollowSuggested}>{followSuggested ? 'Following' : 'Follow'}</div>
            {actionName == 'Following' && !showPersonCardModal && <RenderUnfollowModal suggestedName={name} handleFollow={handleFollowSuggested} />}
            {showPersonCardModal && <ShowSuggestedPersonModal updatePersonModal={setShowPersonCardModal} name={name} handle={ screen_name } profilePicUrl={profile_image_url} handleFollowSuggested={handleFollowSuggested} followSuggested={followSuggested} descriptionText={item.description} friendsAndFollowersCount={ (item.friends_count || item.followers_count) && [item.friends_count, item.followers_count]} />}

            {/* {actionName == 'Following' && !showPersonCardModal && <RenderUnfollowModal suggestedName={name || nameAdjusted} handleFollow={handleFollowSuggested} />}
            {showPersonCardModal && <ShowSuggestedPersonModal updatePersonModal={setShowPersonCardModal} name={name} handle={ screen_name || (nameAdjusted || name).toLowerCase()} profilePicUrl={avatar} handleFollowSuggested={handleFollowSuggested} followSuggested={followSuggested} descriptionText={item.decsription || item.description} />} */}
        </div>
    )
}

export let uniqueObjArray = (objArray, checkProp) => [...new Map(objArray.map((item) => [item[checkProp], item])).values()];

// export let uniqueObjArray = objArray => [...new Map(objArray.map((item) => [item["name"], item])).values()];

export default RenderSuggestedPeopleList;

/**
 * 
 * 
 * 
 // let [listOfUsers, setListOfUsers] = useState([])
    // let [fetchReady, setFetchReady] = useState(true)
    // let [counter, setCounter] = useState(0)
    // let [dataset, setDataset] = useState(null)

    // let test = counter == 4 && useReuseableDataExtraction(4, listOfUsers)

    // console.log(test, '?!?!')

    // useEffect(() => {
    //     counter == 4 && setDataset(listOfUsers)
    //     counter >= 4 && setListOfUsers([])
    // }, [counter])

    // ttthis works but trying ousomething different, which will run only once for both modules and renderr it from there
    // useEffect(() => {
    //     if (listOfUsers.length == 4 && counter < 5) {
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
    //     for (let i = 0; i < 5; i++) {
    //         makeRequestToRandomDataAPI(setListOfUsers)
    //     }
    // }, [])

    // console.log(listOfUsers, 'listOfUsers')
    // console.log(listOfRandomUsers, 'listOfRandomUsers')
 * 
 * 
 export let updateListOfUsers = (uuid, descText, listUpdaterHook, listOfUsers) => {
    let newList = listOfUsers && listOfUsers.map(item => {
        if (item.uid == uuid) {
            item.decsription = descText
        }
        return item
    })
    // setListOfUsers(newList)
    listUpdaterHook(newList)
}

export let gettingDataFfromDeepai = (item, setFetchReady, updateListOfUsers, setCounter, listUpdaterHook, listOfUsers) => {
    setFetchReady(false)
    // console.log('chk04')
    let handle = setTimeout(() => {
        let userName = item.first_name + ' ' + item.last_name;
        makeRequest(userName, updateListOfUsers, item.uid, setFetchReady, setCounter, listUpdaterHook, listOfUsers)
        // console.log('chk05')
    }, 1000)
    // console.log('cchck01')
    return () => clearTimeout(handle)
}

export let makeRequestToRandomDataAPI = (updateUsers) => {
    let url = 'https://random-data-api.com/api/users/random_user'
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            updateUsers(prevData => prevData.concat(data))
        })
        .catch(err => console.log(err.code, err.message))
}
 */