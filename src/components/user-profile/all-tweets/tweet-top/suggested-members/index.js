import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// import { ListModalHeader } from '../add-members-into-lists/ui'
import { leftArrowSvg } from '../create-lists'
import { ListModalHeader, RenderMembersList, SearchComponent } from '../lists-reusable-helper-components'
import { RenderMember } from './ui'

function SuggestedMembersForList({ listName, currentUser, currentList, handleCurrentList, listMembersCount, currentMembers, handleMembersCount, handleMembersList, handleMembersRemoval, checkMemberExists }) {
    
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
        // console.log('done', [...currentMembers], currentList);

        adjustMembersNumber(currentList, currentMembers)
        // handleMembersList([])
        history.push(`/${currentUser}`)
    }
    return (
        <div id='container-for-suggested-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} modalActionFlag={doneFlag} icon={leftArrowSvg()} history={history} modalTitle={'Add to your List'} />
            <SearchComponent searchableMembers={members} />            
            <ModalOptions membersCount={currentMembers.length} underlined={'Suggested'} history={history} routeUrl={'/i/lists/members/'} />
            <RenderMembersList listName={listName} isMember={false} handleCount={handleMembersCount} handleMembersList={handleMembersList} membersList={members} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} />
        </div>
    )
}

export let adjustMembersNumber = (currentList, currentMembers) => {
    // currently choosing TOS from list array, as this is newly created list and added data should go there, instead, we wold use a state variable which would say which list these data should go
    let listTOS = currentList[currentList.length -1];
    // !!!!DO THIS it doesnt have to be because its always chooses last entried list as per implementation!!! rather use list name to which these added memebers list should go to

    listTOS.members = currentMembers.length;
    listTOS.membersList = currentMembers;
    console.log(currentList, currentMembers, 'list members!!')
}

// export let SearchComponent = () => {
//     let [focused, setFocused] = useState(false)
//     let handleFocused = () => setFocused(!focused)
//     return (
//         <div id='search-wrapper' style={{ borderColor: focused && 'rgb(29, 155, 240)' }}>
//             <div id='svg-icon'>{searchIconSvg()}</div>
//             <label htmlFor='search-suggested-list' />
//             <input id='search-suggested-list' placeholder='Search people' onFocus={handleFocused} onBlur={handleFocused} />
//         </div>
//     )
// }

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

// export let RenderMembersList = ({ updateExistingListData, listName, currentList, handleCount, handleMembersList, membersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    
//     //  !!!!CHANGE THIS Not necessary as this renders names of dummy members name!!!!  this directly bringing existing mebers list added from suggested members to add route, rather a better approach will be accessing it from list directly so that there is no confusion where is list data is coming from
//     // let renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)

//     // !!!! DO THIS, from somewhere else in module but not here!!!! data feedig should be done from currentList => specefic list, which could be distinguished by using a state variable letting us know which list is now currently viewed by user and render list that way
//     // let renderListOfMembers = currentList.map(item => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)
//     // let selectedList = currentList && currentList.filter(item => item.name == listName && item.membersList)
//     // let renderListOfMembers = selectedList && selectedList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)

//     let renderListOfMembers;

//     if(isMember) {
//         // let selectedList = currentList && currentList.filter(item => item.name == listName && item.membersList)
//         let selectedList = currentList && currentList.filter(item => item.name == listName).map(item => item.membersList)[0]
//         console.log(selectedList, 'selectedList!!')
//         renderListOfMembers = selectedList && selectedList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} updateExistingListData={updateExistingListData} listName={listName} />)

//     } else {
//         // renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)
//         renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} />)
//     }
    
//     return <div id='list-of-members-wrapper'>{renderListOfMembers}</div>
// }

// dummy list of members to mimic a members list for list to select from
let members = ['user een', 'user twee', 'user drie', 'user vier', 'user vijf', 'user zes', 'user zeven', 'user acht', 'user negen', 'user tien']

let options = ['Members', 'Suggested']

let searchIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

export default SuggestedMembersForList