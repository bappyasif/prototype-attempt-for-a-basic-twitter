import React from 'react'
import { useHistory } from 'react-router-dom'
import { removeIconSvg } from '..'
import { RenderMembersList } from '../../suggested-members'

function ShowListExistingMembers({handleMembersList, currentMembers, checkMemberExists, currentUser}) {
    return (
        <div id='list-existing-members-container'>
            <HeaderModal />
            <RenderMembersList isMember={true} handleMembersList={handleMembersList} membersList={currentMembers} checkMemberExists={checkMemberExists} />
        </div>
    )
}

let HeaderModal = () => {
    let history = useHistory()

    return (
        <div id='modal-header-wrapper'>
            <div id='svg-icon' onClick={()=>history.goBack()}>{removeIconSvg()}</div>
            <div id='modal-title'>List members</div>
        </div>
    )
}

export default ShowListExistingMembers
