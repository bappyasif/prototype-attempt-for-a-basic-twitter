import React from 'react'
import { useHistory } from 'react-router-dom'
// import { ListModalHeader } from '../add-members-into-lists/ui'
import { leftArrowSvg } from '../create-lists'
import { ListModalHeader, RenderMembersList, SearchComponent } from '../lists-reusable-helper-components'
// import { adjustMembersNumber, ModalOptions, RenderMembersList, SearchComponent } from '../suggested-members'
import { adjustMembersNumber, ModalOptions } from '../suggested-members'

function ListOfAddedMembers({ listName, handleCurrentList, listMembersCount, handleMembersCount, currentMembers, checkMemberExists, handleMembersList, currentUser, currentList}) {
    let history = useHistory()
    let handleDone = () => {
        console.log('handled done')
        adjustMembersNumber(currentList, currentMembers)
        history.push(`/${currentUser}`)
    }
    // console.log(membersList, 'members!!')
    console.log(listName, currentList, currentMembers, 'fromAddedMembers!!')
    return (
        <div id='container-for-added-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} icon={leftArrowSvg()} history={history} modalTitle={'Added to your List'} modalActionFlag={true} />
            <SearchComponent searchableMembers={currentMembers} />
            <ModalOptions membersCount={currentMembers.length} underlined={'Members'} history={history} routeUrl={'/i/lists/members/suggested'} />
            <RenderMembersList listName={listName} isMember={true} handleMembersList={handleMembersList} handleCount={handleMembersCount} membersList={currentMembers} checkMemberExists={checkMemberExists} />
        </div>
    )
}

export default ListOfAddedMembers
