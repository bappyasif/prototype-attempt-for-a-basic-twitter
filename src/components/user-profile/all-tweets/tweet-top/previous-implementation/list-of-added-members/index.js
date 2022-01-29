import React from 'react'
import { useHistory } from 'react-router-dom'
import { ListModalHeader } from '../add-members-into-lists'
import { leftArrowSvg } from '../create-lists'
import { adjustMembersNumber, ModalOptions, RenderMembersList, SearchComponent } from '../suggested-members'

function ListOfAddedMembers({handleCurrentList, listMembersCount, handleMembersCount, currentMembers, checkMemberExists, handleMembersList, currentUser, currentList}) {
    let history = useHistory()
    let handleDone = () => {
        console.log('handled done')
        adjustMembersNumber(currentList, currentMembers)
        history.push(`/${currentUser}`)
    }
    // console.log(membersList, 'members!!')
    return (
        <div id='container-for-added-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} icon={leftArrowSvg()} history={history} modalTitle={'Added to your List'} modalActionFlag={true} />
            <SearchComponent />
            <ModalOptions membersCount={currentMembers.length} underlined={'Members'} history={history} routeUrl={'/i/lists/members/suggested'} />
            <RenderMembersList isMember={true} handleMembersList={handleMembersList} handleCount={handleMembersCount} membersList={currentMembers} checkMemberExists={checkMemberExists} />
        </div>
    )
}

export default ListOfAddedMembers
