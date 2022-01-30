import React, { useEffect, useState } from "react"

export let ListModalHeader = ({ icon, action, modalTitle, history, modalAction, modalActionFlag }) => {

    let iconAction = () => history.goBack()
    
    // console.log(saveFlag, 'saveflag', flagTest)
    
    return (
        <div id='list-header-wrapper'>
            
            <div id='first-half'>
                <div id='svg-icon' onClick={iconAction}>{icon}</div>
     
                <div id='action-header'>{modalTitle}</div>
            </div>

            <div id='other-half' onClick={modalAction} style={{backgroundColor: modalActionFlag ? 'darkslategray' : 'silver', pointerEvents: !modalActionFlag && 'none'}}>{action}</div>
        </div>
    )
}

export let SearchComponent = ({searchableMembers}) => {
    let [focused, setFocused] = useState(false)
    let handleFocused = () => setFocused(!focused)
    console.log(searchableMembers, 'searchableMembers!!');
    return (
        <div id='search-wrapper' style={{ borderColor: focused && 'rgb(29, 155, 240)' }}>
            <div id='svg-icon'>{searchIconSvg()}</div>
            <label htmlFor='search-suggested-list' />
            <input id='search-suggested-list' placeholder='Search people' onFocus={handleFocused} onBlur={handleFocused} />
        </div>
    )
}

export let ModalOptions = ({ membersCount, underlined, history, routeUrl }) => {

    let [showOtherModal, setShowOtherModal] = useState(false)

    let handleModalOptions = () => setShowOtherModal(true)

    useEffect(() => showOtherModal && history.push(routeUrl), [showOtherModal])

    let renderedOptions = options.map(name => <RenderModalOption key={name} name={name} handleModal={handleModalOptions} membersCount={membersCount} underlined={underlined} />)

    return (
        <div id='modal-options-wrapper'>
            <div className='modal-options'>{renderedOptions}</div>
        </div>
    )
}

let RenderModalOption = ({ name, handleModal, membersCount, underlined }) => {
    
    let handleClick = () => name != underlined ? handleModal() : null

    let showCount = name == 'Members' ? `(${membersCount})` : null;

    return (
        <div className='modal-option' onClick={handleClick}>
     
            <div className='option-name'>{name}{showCount}</div>
     
            {(name == underlined) && <div className='option-underline' style={{ width: (underlined == 'Members') && '105px' }}></div>}
        </div>
    )
}

export let RenderMembersList = ({ updateExistingListData, listName, currentList, handleCount, handleMembersList, membersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    
    //  !!!!CHANGE THIS Not necessary as this renders names of dummy members name!!!!  this directly bringing existing mebers list added from suggested members to add route, rather a better approach will be accessing it from list directly so that there is no confusion where is list data is coming from
    // let renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)

    // !!!! DO THIS, from somewhere else in module but not here!!!! data feedig should be done from currentList => specefic list, which could be distinguished by using a state variable letting us know which list is now currently viewed by user and render list that way
    // let renderListOfMembers = currentList.map(item => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)
    // let selectedList = currentList && currentList.filter(item => item.name == listName && item.membersList)
    // let renderListOfMembers = selectedList && selectedList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)

    let renderListOfMembers;

    if(isMember) {
        // let selectedList = currentList && currentList.filter(item => item.name == listName && item.membersList)
        let selectedList = currentList && currentList.filter(item => item.name == listName).map(item => item.membersList)[0]
        console.log(selectedList, 'selectedList!!')
        renderListOfMembers = selectedList && selectedList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} updateExistingListData={updateExistingListData} listName={listName} />)

    } else {
        // renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)
        renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} />)
    }
    
    return <div id='list-of-members-wrapper'>{renderListOfMembers}</div>
}

export let RenderMember = ({ listName, updateExistingListData, name, handleCount, handleMembersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    let [hovered, setHovered] = useState(false);

    let previouslyExistsCheck = () => {
        // let idx = checkMemberExists(name)
        let idx = checkMemberExists(name, listName)
        return idx >= 0 ? true : false
    }

    let [added, setAdded] = useState(previouslyExistsCheck() || false);

    let [addedFlag, setAddedFlag] = useState(false);

    let handleAdded = () => {
        setAdded(!added)
        setAddedFlag(!addedFlag)
        // console.log('clicked!!')
    }

    let handleHovered = () => setHovered(!hovered)

    useEffect(() => {
        // added && addedFlag && handleMembersList(name)
        added && addedFlag && handleMembersList(name, listName)

        // we need to update currentlist for that specedicly named list from that given currentList
        // isMember && addedFlag && updateExistingListData()
        
        // isMember && addedFlag && handleMembersList(name) // when its in members route we are passing in memebers removal for handleMemebersList, as there is only removal is applicable
        isMember && addedFlag && handleMembersList(name, listName) // when its in members route we are passing in memebers removal for handleMemebersList, as there is only removal is applicable

        !isMember && !added && addedFlag && handleMembersRemoval(name)  // when its in suggested route while clicked showing remove, it remove item from list

        addedFlag && setAddedFlag(false)

    }, [addedFlag])

    // console.log('added', added, 'flag', addedFlag, 'member', isMember, checkMemberExists(name), name)
    // added && addedFlag && console.log('added', added, 'flag', addedFlag, 'member', isMember,checkMemberExists(name), name)

    return <div className='member-info-wrapper' onMouseOver={handleHovered} onMouseOut={handleHovered} style={{ backgroundColor: hovered && 'lightgray' }}>
        <img className='member-photo' src='https://picsum.photos/200/300' />

        <div className='section-wrapper' style={{ textAlign: 'left', marginLeft: '8px' }}>
            
            <div className='member-name'>{name}</div>

            <div className='handle-name' style={{ color: 'silver' }}>@{name.split(' ')[1]}'s handle</div>
            
            <div className='profile-description'>{(name + ' ').repeat(4)}</div>
        </div>
        
        {/* <div className='add-btn' onClick={handleAdded} style={{ backgroundColor: ((checkMemberExists(name) != -1) || added) && 'red', color: ((checkMemberExists(name) != -1) || added) && 'white' }} >{(added || (checkMemberExists(name) != -1)) ? 'Remove' : 'Add'}</div> */}
        <div className='add-btn' onClick={handleAdded} style={{ backgroundColor: ((checkMemberExists(name, listName) != -1) || added) && 'red', color: ((checkMemberExists(name, listName) != -1) || added) && 'white' }} >{(added || (checkMemberExists(name, listName) != -1)) ? 'Remove' : 'Add'}</div>
    </div>
}

let searchIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>