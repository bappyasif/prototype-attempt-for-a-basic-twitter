import React from 'react'
import { useHistory } from 'react-router-dom'
import { ListModalHeader } from '../add-members-into-lists'
import { leftArrowSvg } from '../create-lists'
import { ModalOptions, RenderMembersList, SearchComponent } from '../suggested-members'

function ListOfAddedMembers({handleCurrentList, listMembersCount, handleMembersCount, currentMembers, checkMemberExists, handleMembersList}) {
    let history = useHistory()
    let handleDone = () => console.log('handle done')
    // console.log(membersList, 'members!!')
    return (
        <div id='container-for-added-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} icon={leftArrowSvg()} history={history} modalTitle={'Add to your List'} />
            <SearchComponent />
            <ModalOptions membersCount={currentMembers.length} underlined={'Members'} history={history} routeUrl={'/i/lists/members/suggested'} />
            <RenderMembersList isMember={true} handleMembersList={handleMembersList} handleCount={handleMembersCount} membersList={currentMembers} checkMemberExists={checkMemberExists} />
        </div>
    )
}

export default ListOfAddedMembers
