import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { leftArrowSvg } from '../create-lists'
import { handleSearchMemberName, ListModalHeader, ModalOptions, RenderMembersList, SearchComponent } from '../lists-reusable-helper-components'

function SuggestedMembersForList({ listName, currentUser, currentList, handleCurrentList, listMembersCount, currentMembers, handleMembersCount, handleMembersList, handleMembersRemoval, checkMemberExists }) {
    let [memberName, setMemberName] = useState(null)

    let [matchedMembers, setMatchedMembers] = useState(null)
    
    let [doneFlag, setDoneFlag] = useState(false)

    let handleMatchedMembers = list => setMatchedMembers(list)

    let handleMemberName = value => setMemberName(value)

    let handleDoneFlag = () => setDoneFlag(true)
    
    let handleDoneFlagReversal = () => {
        setDoneFlag(false)
    }

    useEffect(() => {
        memberName && handleSearchMemberName(memberName, members, handleMatchedMembers)
    }, [memberName])

    useEffect(() => {
        currentMembers && currentMembers.length > 0 && handleDoneFlag()
        currentMembers.length < 1 && handleDoneFlagReversal()
    }, [currentMembers])
    
    let history = useHistory()

    let handleDone = () => {
        // console.log('done', [...currentMembers], currentList);
        adjustMembersNumber(currentList, currentMembers)
        history.push(`/${currentUser}`)
    }
    
    return (
        <div id='container-for-suggested-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} modalActionFlag={doneFlag} icon={leftArrowSvg()} history={history} modalTitle={'Add to your List'} />
            <SearchComponent searchableMembers={members} handleMemberName={handleMemberName} />            
            <ModalOptions membersCount={currentMembers.length} underlined={'Suggested'} history={history} routeUrl={'/i/lists/members/'} />
            <RenderMembersList listName={listName} isMember={listName ? true : false} handleCount={handleMembersCount} handleMembersList={handleMembersList} membersList={ matchedMembers && matchedMembers.length ? matchedMembers : members} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} />
        </div>
    )
}

export let adjustMembersNumber = (currentList, currentMembers) => {
    // currently choosing TOS from list array, as this is newly created list and added data should go there, instead, we wold use a state variable which would say which list these data should go
    let listTOS = currentList[currentList.length -1];

    listTOS.members = currentMembers.length;
    listTOS.membersList = currentMembers;
}

// dummy list of members to mimic a members list for list to select from
let members = ['user een', 'user twee', 'user drie', 'user vier', 'user vijf', 'user zes', 'user zeven', 'user acht', 'user negen', 'user tien']

let searchIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

export default SuggestedMembersForList