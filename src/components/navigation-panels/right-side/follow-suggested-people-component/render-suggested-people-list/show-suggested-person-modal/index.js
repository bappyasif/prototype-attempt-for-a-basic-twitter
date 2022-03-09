let deepai = require('deepai')
import React, { useEffect, useRef, useState } from 'react'
import useOnHoverOutside from '../../../../../user-profile/all-tweets/tweet-top/add-members-into-lists/useOnHoverOutside'

let ShowSuggestedPersonModal = ({ updatePersonModal, name, handle, profilePicUrl, handleFollowSuggested, followSuggested, descriptionText, friendsAndFollowersCount }) => {
    let ref = useRef(null)
    
    useOnHoverOutside(ref, () => updatePersonModal(false))

    return (
        <div id='suggested-person-modal-container' ref={ref} >
            <PersonMoodalTopSection name={name} handle={handle} profilePicUrl={profilePicUrl} handleFollowSuggested={handleFollowSuggested} followSuggested={followSuggested} />
            <PersonModalDescriptiveInfos name={name} descriptionText={descriptionText} friendsAndFollowersCount={friendsAndFollowersCount} />
        </div>
    )
}

let PersonModalDescriptiveInfos = ({ name, descriptionText, friendsAndFollowersCount }) => {
    let [randomText, setRandomtext] = useState(null)

    let [friendsCount, followersCount] = friendsAndFollowersCount && [...friendsAndFollowersCount]

    useEffect(() => descriptionText && setRandomtext(descriptionText), [name])

    return (
        <div id='descriptive-infos-wrapper'>
            <div id='description-text'>{randomText || 'some description about this account, yada yada yada yada'}</div>
            <div id='follow-and-follower-numbers'>
                <FollowOrFollowerCard name={'Following'} fofCount={friendsCount} />
                <FollowOrFollowerCard name={'Followers'} fofCount={followersCount} />
            </div>
            <MakeStatementAboutAccount />
        </div>
    )
}

let MakeStatementAboutAccount = () => {
    let [chances, setChances] = useState(null)
    useEffect(() => setChances(Math.random() > .5), [])
    return (
        <div id='statement-wrapper'>
            {
                chances
                    ?
                    <FollowedByPeople />
                    :
                    "Not followed by anyone you're following"
            }
        </div>
    )
}

let FollowedByPeople = () => {
    return (
        <div id='followed-by-people-wrapper'>
            <img src='https://picsum.photos/40/40' />
            <div id='name'>Followed by this somebody from your friends list</div>
        </div>
    )
}

let FollowOrFollowerCard = ({ name, fofCount }) => {
    let [denomination, setDenomination] = useState(null)

    let arr01 = ['K', "M"]
    let arr02 = [10, 100, 1000, 10000]

    let makeRandomNumber = () => {
        let randNum = Math.random();

        let rIdx = Math.floor(randNum * arr02.length)

        let rNum = Math.round(randNum * arr02[rIdx])

        let rDen = randNum > .5 && rNum.length <= 2 ? arr01[1] : randNum > .5 && rNum.length <= 3 ? arr01[0] : ''

        setDenomination(fofCount ? fofCount : rNum + rDen)
    }

    useEffect(() => makeRandomNumber(), [name])

    return (
        <div id='card-wrapper'>
            <div id='numbers-denominations'>{denomination || '0000'}</div>
            <div id='card-name'>{name}</div>
        </div>
    )
}

let PersonMoodalTopSection = ({ name, handle, profilePicUrl, handleFollowSuggested, followSuggested }) => {
    return (
        <div id='top-section-wrapper'>
            <div id='left-side'>
                <img src={profilePicUrl} />
                <div id='user-name'>{name}</div>
                <div id='user-handle'>@{handle}</div>
            </div>
            <div id='follow-btn' onClick={handleFollowSuggested}>{followSuggested ? 'Following' : 'Follow'}</div>
        </div>
    )
}

export default ShowSuggestedPersonModal