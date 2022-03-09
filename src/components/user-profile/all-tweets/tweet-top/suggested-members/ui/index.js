import React, { useEffect, useState } from "react"

export let RenderMember = ({ listName, updateExistingListData, name, handleCount, handleMembersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    let [hovered, setHovered] = useState(false);

    let previouslyExistsCheck = () => {
        let idx = checkMemberExists(name, listName)
        return idx >= 0 ? true : false
    }

    let [added, setAdded] = useState(previouslyExistsCheck() || false);

    let [addedFlag, setAddedFlag] = useState(false);

    let handleAdded = () => {
        setAdded(!added)
        setAddedFlag(!addedFlag)
    }

    let handleHovered = () => setHovered(!hovered)

    useEffect(() => {
        added && addedFlag && handleMembersList(name, listName)

        // we need to update currentlist for that specedicly named list from that given currentList
        // isMember && addedFlag && updateExistingListData()
        
        // isMember && addedFlag && handleMembersList(name) // when its in members route we are passing in memebers removal for handleMemebersList, as there is only removal is applicable
        isMember && addedFlag && handleMembersList(name, listName) // when its in members route we are passing in memebers removal for handleMemebersList, as there is only removal is applicable

        !isMember && !added && addedFlag && handleMembersRemoval(name)  // when its in suggested route while clicked showing remove, it remove item from list

        addedFlag && setAddedFlag(false)

    }, [addedFlag])

    return <div className='member-info-wrapper' onMouseOver={handleHovered} onMouseOut={handleHovered} style={{ backgroundColor: hovered && 'lightgray' }}>
        <img className='member-photo' src='https://picsum.photos/200/300' />

        <div className='section-wrapper' style={{ textAlign: 'left', marginLeft: '8px' }}>
            
            <div className='member-name'>{name}</div>

            <div className='handle-name' style={{ color: 'silver' }}>@{name.split(' ')[1]}'s handle</div>
            
            <div className='profile-description'>{(name + ' ').repeat(4)}</div>
        </div>
        
        <div className='add-btn' onClick={handleAdded} style={{ backgroundColor: ((checkMemberExists(name, listName) != -1) || added) && 'red', color: ((checkMemberExists(name, listName) != -1) || added) && 'white' }} >{(added || (checkMemberExists(name, listName) != -1)) ? 'Remove' : 'Add'}</div>
    </div>
}