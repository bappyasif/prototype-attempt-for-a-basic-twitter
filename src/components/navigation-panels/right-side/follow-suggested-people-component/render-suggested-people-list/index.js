import React, { useEffect, useState } from 'react';
import { RenderUnfollowModal } from '../show-lengthy-follow-list';

function RenderSuggestedPeopleList({ contentCreators }) {
    let [uniqueContents, setUniqueContents] = useState([])

    useEffect(() => contentCreators && setUniqueContents(uniqueObjArray(contentCreators)), [contentCreators])
    
    // console.log(contentCreators, 'contentCreatrors!!', uniqueContents)
    // let renderFollowThesePeople = () => contentCreators.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    let renderFollowThesePeople = () => uniqueContents && uniqueContents.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)
    
    return (
        <div id='follow-suggested-people-container'>
            {renderFollowThesePeople()}
        </div>
    )
}

let RenderPeople = ({ item }) => {
    let { name, imgUrl } = { ...item }

    let [nameAdjusted, setNameAdjusted] = useState(null)

    let [follows, setFollows] = useState(false)

    let [actionName, setActionName] = useState(null)

    let [followSuggested, setFollowSuggested] = useState(false)

    let handleFollowSuggested = (evt) => {
        // setFollowSuggested(!followSuggested)
        setActionName(evt.target.textContent)
    }

    let handleNameAdjust = () => {
        if (name.includes(' And ')) {
            let tokenizingNameIfThereIsAnd = name.split(' And ')
            let joinedName = tokenizingNameIfThereIsAnd[0].split(' ')[0].concat(' ', tokenizingNameIfThereIsAnd[1].split(' ')[1])
            setNameAdjusted(joinedName)
            // console.log(joinedName, 'joined!!')
        } else {
            // console.log('not joined!!')
        }
    }

    useEffect(() => {
        Math.random() > .51 && setFollows(true)
        handleNameAdjust()
    }, [])

    useEffect(() => {
        setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)
    }, [actionName])

    return (
        <div className='render-people-wrapper'>
            <div id='user-details'>
                <img src={imgUrl} id='user-img' />
                <div id='profile-info'>
                    <div id='user-name'>{nameAdjusted || name}</div>
                    <div id='user-handle'> @{(nameAdjusted || name).toLowerCase()} <span id='follow-status'>{follows ? ' Follows you' : ''}</span></div>
                </div>
            </div>
            {/* <div id='follow-btn'>Follow</div> */}
            <div id='follow-btn' onClick={handleFollowSuggested}>{followSuggested ? 'Following' : 'Follow'}</div>
            {actionName == 'Following' && <RenderUnfollowModal suggestedName={nameAdjusted || name} handleFollow={handleFollowSuggested} />}
        </div>
    )
}

export let uniqueObjArray = objArray => [...new Map(objArray.map((item) => [item["name"], item])).values()];

export default RenderSuggestedPeopleList;

/**
 * 
 * 
     // let extractUniqueNamesOnly = (name) => {
    //     let idx = uniqueNames.findIndex(n => n = name)
    //     console.log('here!!', idx)
    //     idx == -1 ? setUniqueNames(prev => prev.concat(name)) : null
    // }

    // useEffect(() => contentCreators && contentCreators.forEach(item => extractUniqueNamesOnly(item.name)), [contentCreators])
 */