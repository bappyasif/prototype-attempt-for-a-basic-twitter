import React, { useEffect, useState } from 'react';
import { RenderUnfollowModal } from '../show-lengthy-follow-list';
import ShowSuggestedPersonModal from './show-suggested-person-modal';

function RenderSuggestedPeopleList({ listOfRandomUsers }) {

    let renderFollowThesePeople = () => listOfRandomUsers && listOfRandomUsers.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    return (
        <div id='follow-suggested-people-container'>
            {renderFollowThesePeople()}
        </div>
    )
}

let RenderPeople = ({ item }) => {
    let {name, screen_name, profile_image_url} = {...item}

    let [follows, setFollows] = useState(false)

    let [actionName, setActionName] = useState(null)

    let [followSuggested, setFollowSuggested] = useState(false)

    let [showPersonCardModal, setShowPersonCardModal] = useState(false)

    let handleFollowSuggested = (evt) => {
        setActionName(evt.target.textContent)
    }

    useEffect(() => {
        Math.random() > .51 && setFollows(true)
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
                <img src={profile_image_url} id='user-img' />
                <div id='profile-info'>
                    <div id='user-name'>{name}</div>
                    <div id='user-handle'> @{screen_name} <span id='follow-status'>{follows ? ' Follows you' : ''}</span></div>
                </div>
            </div>
            <div id='follow-btn' onClick={handleFollowSuggested}>{followSuggested ? 'Following' : 'Follow'}</div>
            {actionName == 'Following' && !showPersonCardModal && <RenderUnfollowModal suggestedName={name} handleFollow={handleFollowSuggested} />}
            {showPersonCardModal && <ShowSuggestedPersonModal updatePersonModal={setShowPersonCardModal} name={name} handle={ screen_name } profilePicUrl={profile_image_url} handleFollowSuggested={handleFollowSuggested} followSuggested={followSuggested} descriptionText={item.description} friendsAndFollowersCount={ (item.friends_count || item.followers_count) && [item.friends_count, item.followers_count]} />}
        </div>
    )
}

export let uniqueObjArray = (objArray, checkProp) => [...new Map(objArray.map((item) => [item[checkProp], item])).values()];

export default RenderSuggestedPeopleList;