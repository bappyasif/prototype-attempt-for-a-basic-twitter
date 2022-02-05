import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { ListModalHeader } from '../add-members-into-lists'
import { leftArrowSvg } from '../create-lists'

function SuggestedMembersForList({ currentUser, currentList, handleCurrentList, listMembersCount, currentMembers, handleMembersCount, handleMembersList, handleMembersRemoval, checkMemberExists }) {
    // let [countAddedMembers, setCountAddedMembers] = useState(0)
    // let handleMembersAddedCount = (added) => setCountAddedMembers(prevCount => added ? prevCount + 1 : prevCount - 1)
    
    let [doneFlag, setDoneFlag] = useState(false)

    let handleDoneFlag = () => setDoneFlag(true)
    
    let handleDoneFlagReversal = () => {
        setDoneFlag(false)
    }

    useEffect(() => {
        currentMembers && currentMembers.length > 0 && handleDoneFlag()
        currentMembers.length < 1 && handleDoneFlagReversal()
    }, [currentMembers])

    // console.log(currentList, '....<<>>....', currentMembers)
    
    let history = useHistory()
    let handleDone = () => {
        console.log('done', [...currentMembers], currentList);
        
        // let listTOS = currentList[currentList.length -1]
        // listTOS.members = [...currentMembers]

        // let listTOS = currentList[currentList.length -1]
        // listTOS.members = currentMembers.length
        // handleCurrentList([...currentMembers])

        adjustMembersNumber(currentList, currentMembers)
        history.push(`/${currentUser}`)
    }
    return (
        <div id='container-for-suggested-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} modalActionFlag={doneFlag} icon={leftArrowSvg()} history={history} modalTitle={'Add to your List'} />
            <SearchComponent />
            <ModalOptions membersCount={currentMembers.length} underlined={'Suggested'} history={history} routeUrl={'/i/lists/members/'} />
            <RenderMembersList isMember={false} handleCount={handleMembersCount} handleMembersList={handleMembersList} membersList={members} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} />
        </div>
    )
}

export let adjustMembersNumber = (currentList, currentMembers) => {
    let listTOS = currentList[currentList.length -1];
    listTOS.members = currentMembers.length;
    listTOS.membersList = currentMembers;
}

export let SearchComponent = () => {
    let [focused, setFocused] = useState(false)
    let handleFocused = () => setFocused(!focused)
    return (
        <div id='search-wrapper' style={{ borderColor: focused && 'rgb(29, 155, 240)' }}>
            <div id='svg-icon'>{searchIconSvg()}</div>
            <label htmlFor='search-suggested-list' />
            <input id='search-suggested-list' placeholder='Search people' onFocus={handleFocused} onBlur={handleFocused} />
        </div>
    )
}

export let ModalOptions = ({ membersCount, underlined, history, routeUrl }) => {
    // let [showExistingMembersModal, setShowExistingMembersModal] = useState(false)
    let [showOtherModal, setShowOtherModal] = useState(false)

    // let history = useHistory()

    // let handleExistingMembers = () => setShowOtherModal(true)
    let handleModalOptions = () => setShowOtherModal(true)

    // useEffect(() => showOtherModal && history.push('/i/lists/members/'), [showOtherModal])
    useEffect(() => showOtherModal && history.push(routeUrl), [showOtherModal])

    let renderedOptions = options.map(name => <RenderModalOption key={name} name={name} handleModal={handleModalOptions} membersCount={membersCount} underlined={underlined} />)

    return (
        <div id='modal-options-wrapper'>
            <div className='modal-options'>{renderedOptions}</div>
        </div>
    )
}

let RenderModalOption = ({ name, handleModal, membersCount, underlined }) => {
    // let handleClick = () => name == 'Members' ? handleModal() : null
    let handleClick = () => name != underlined ? handleModal() : null

    let showCount = name == 'Members' ? `(${membersCount})` : null;

    return (
        <div className='modal-option' onClick={handleClick}>
            <div className='option-name'>{name}{showCount}</div>
            {/* {(name == 'Suggested') && <div className='option-underline'></div>} */}
            {(name == underlined) && <div className='option-underline' style={{ width: (underlined == 'Members') && '105px' }}></div>}
        </div>
    )
    // return <div className='modal-option' onClick={handleClick} style={{textDecoration: (name == 'Suggested') && 'underline', textDecorationColor: (name == 'Suggested') && 'rgb(29, 155, 240)'}} >{name}</div>
}

export let RenderMembersList = ({ handleCount, handleMembersList, membersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    let renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)
    // let renderListOfMembers = members.map(name => <SuggestedMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} />)
    return <div id='list-of-members-wrapper'>{renderListOfMembers}</div>
}

let RenderMember = ({ name, handleCount, handleMembersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    let [hovered, setHovered] = useState(false);
    // let [added, setAdded] = useState(false);
    // let [added, setAdded] = useState(!checkMemberExists(name) || false);
    let previouslyExistsCheck = () => {
        let idx = checkMemberExists(name)
        return idx >= 0 ? true : false
    }
    // let [added, setAdded] = useState(previouslyExistsCheck());
    let [added, setAdded] = useState(previouslyExistsCheck() || false);
    // let [added, setAdded] = useState(checkMemberExists(name) != -1 ? checkMemberExists(name) : false );
    let [addedFlag, setAddedFlag] = useState(false);

    let handleAdded = () => {
        setAdded(!added)
        // setAdded(prevVal => !prevVal)
        setAddedFlag(!addedFlag)
        console.log('clicked!!')
    }

    let handleHovered = () => setHovered(!hovered)

    useEffect(() => {
        added && addedFlag && handleMembersList(name)
        
        isMember && addedFlag && handleMembersList(name) // when its in members route we are passing in memebers removal for handleMemebersList, as there is only removal is applicable

        !isMember && !added && addedFlag && handleMembersRemoval(name)  // when its in suggested route while clicked showing remove, it remove item from list

        addedFlag && setAddedFlag(false)

        // added && addedFlag && handleModalActionFlag()

        // !added && !addedFlag && reverseModalActionFlag()

        // !isMember && added && addedFlag && handleMembersList(name)
        // added && !addedFlag && isMember && handleMembersList(name)
        // isMember && handleMembersList(name)
        // isMember && added && handleMembersList(name)
        // added && addedFlag && setAddedFlag(false)
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
        <div className='add-btn' onClick={handleAdded} style={{ backgroundColor: ((checkMemberExists(name) != -1) || added) && 'red', color: ((checkMemberExists(name) != -1) || added) && 'white' }} >{(added || (checkMemberExists(name) != -1)) ? 'Remove' : 'Add'}</div>
    </div>
}

let members = ['user een', 'user twee', 'user drie', 'user vier', 'user vijf', 'user zes', 'user zeven', 'user acht', 'user negen', 'user tien']

let options = ['Members', 'Suggested']

let searchIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

export default SuggestedMembersForList


/**
 * 
 * 
 let [hovered, setHovered] = useState(false);
    // let [added, setAdded] = useState(false);
    let [added, setAdded] = useState(!checkMemberExists(name) || false);
    // let [added, setAdded] = useState(false || checkMemberExists(name));
    let [addedFlag, setAddedFlag] = useState(false);

    let handleAdded = () => {
        setAdded(!added)
        // setAdded(prevVal => !prevVal)
        // setAddedFlag(true)
        setAddedFlag(!addedFlag)
        // console.log('clicked!!')
    }

    let handleHovered = () => setHovered(!hovered)

    // useEffect(() =>  added && addedFlag && setAdded(false))

    // useEffect(() => {
    //     added && addedFlag && handleMembersList(name)
    //     !isMember && !added && addedFlag && handleMembersRemoval(name)
    //     addedFlag && setAddedFlag(false)
    // }, [addedFlag])

    useEffect(() => {
        added && addedFlag && handleMembersList(name)
        // !isMember && added && addedFlag && handleMembersList(name)
        // isMember && added && addedFlag && handleMembersList(name)

        !isMember && !added && addedFlag && handleMembersRemoval(name)
        // !isMember && addedFlag && handleMembersRemoval(name)
        addedFlag && setAddedFlag(false)
        // added && addedFlag && setAdded(!added)
        // addedFlag && setAdded(!added)
    }, [addedFlag])

    added && addedFlag && console.log('added', added, 'flag', addedFlag, 'member', isMember)
 * 
 * 
 let RenderMember = ({ name, handleCount, handleMembersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    let [hovered, setHovered] = useState(false);
    let [added, setAdded] = useState(false);
    let [addedFlag, setAddedFlag] = useState(false);

    let handleAdded = () => {
        // setAdded(!added)
        setAdded(prevVal => !prevVal)
        setAddedFlag(true)
        console.log('clicked!!')
        // isMember && handleMembersList(name)
    }

    console.log('added', added, 'flag', addedFlag, 'member', isMember)

    // useEffect(() => is)

    // let handleAdded = () => {
    //     !isMember && setAdded(!added)
    //     !isMember && setAddedFlag(true)
    // }

    let handleHovered = () => setHovered(!hovered)
    
    // useEffect(() => {
    //     !isMember && addedFlag && handleCount(added)
    //     !isMember && addedFlag && setAddedFlag(false)
    //     !isMember && addedFlag && handleMembersList(name)
    // }, [addedFlag])

    useEffect(() => {
        added && addedFlag && handleMembersList(name)
        !isMember && addedFlag && handleMembersRemoval(name)
        addedFlag && setAddedFlag(false)
        added && addedFlag && setAdded(!added)
    }, [addedFlag])

    // useEffect(() => {
    //     // !isMember && addedFlag && handleCount(added)
    //     // !isMember && addedFlag && handleMembersList(name)
    //     added && addedFlag && handleMembersList(name)
    //     !isMember && addedFlag && !added && handleMembersRemoval(name)
    //     addedFlag && setAddedFlag(false)
    // }, [addedFlag])

    // useEffect(() => {
    //     !isMember && addedFlag && handleCount(added)
    //     // !isMember && addedFlag && handleMembersList(name)
    //     addedFlag && handleMembersList(name)
    //     !isMember && !added && addedFlag && handleMembersRemoval(name)
    //     addedFlag && setAddedFlag(false)
    // }, [addedFlag])

    // useEffect(() => {
    //     !isMember && addedFlag && handleCount(added)
    //     !isMember && addedFlag && handleMembersList(name)
    //     !isMember && !added && addedFlag && handleMembersRemoval(name)
    //     addedFlag && setAddedFlag(false)
    // }, [addedFlag])

    // useEffect(() => {
    //     addedFlag && handleCount(added)
    //     addedFlag && handleMembersList(name)
    //     !added && addedFlag && handleMembersRemoval(name)
    //     addedFlag && setAddedFlag(false)
    // }, [addedFlag])

    // useEffect(() => added && handleMembersRemoval(name), [added])

    // useEffect(() => updateCount())

    // useEffect(() => handleCount(added), [added])
    
    return <div className='member-info-wrapper' onMouseOver={handleHovered} onMouseOut={handleHovered} style={{ backgroundColor: hovered && 'lightgray' }}>
        <img className='member-photo' src='https://picsum.photos/200/300' />
        <div className='section-wrapper' style={{ textAlign: 'left', marginLeft: '8px'}}>
            <div className='member-name'>{name}</div>
            <div className='handle-name' style={{ color: 'silver' }}>@{name.split(' ')[1]}'s handle</div>
            <div className='profile-description'>{(name + ' ').repeat(4)}</div>
        </div>
        <div className='add-btn' onClick={handleAdded} style={{backgroundColor: ((checkMemberExists(name) != -1) || added) && 'red', color: ((checkMemberExists(name) != -1) || added) && 'white'}} >{(added || (checkMemberExists(name) != -1)) ? 'Remove' : 'Add'}</div>
        {/* <div className='add-btn' onClick={handleAdded} style={{backgroundColor: (added || (checkMemberExists(name) != -1)) && 'red', color: (added || (checkMemberExists(name) != -1)) && 'white'}} >{(added || (checkMemberExists(name) != -1)) ? 'Remove' : 'Add'}</div> /}
        {/* <div className='add-btn' onClick={handleAdded} style={{backgroundColor: added && 'red', color: added && 'white'}} >{added ? 'Remove' : 'Add'}</div> /}
        {/* <div className='add-btn' onClick={handleAdded} style={{backgroundColor: added && 'red', color: added && 'white'}} >{(isMember || added) ? 'Remove' : 'Add'}</div> /}
        </div>
    }
 */