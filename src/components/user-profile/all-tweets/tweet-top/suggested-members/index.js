import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { ListModalHeader } from '../add-members-into-lists'
import { leftArrowSvg } from '../create-lists'

function SuggestedMembersForList() {
    let history = useHistory()
    let handleDone = () => console.log('done')
    return (
        <div id='container-for-suggested-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} icon={leftArrowSvg()} history={history} modalTitle={'Add to your List'} />
            <SearchComponent />
            <ModalOptions />
        </div>
    )
}

let SearchComponent = () => {
    return (
        <div id='search-wrapper'>
            <div id='svg-icon'>{searchIconSvg()}</div>
            <label htmlFor='search-suggested-list' />
            <input id='search-suggested-list' placeholder='Search people' />
        </div>
    )
}

let ModalOptions = () => {
    let [showExistingMembersModal, setShowExistingMembersModal] = useState(false)

    let history = useHistory()

    let handleExistingMembers = () => setShowExistingMembersModal(true)

    useEffect(() => showExistingMembersModal && history.push('/i/lists/members/'))

    let renderedOptions = options.map(name => <RenderModalOption key={name} name={name} handleModal={handleExistingMembers} />)
    return (
        <div id='modal-options-wrapper'>
            <div className='modal-options'>{renderedOptions}</div>
            <SuggestedMembersList />
        </div>
    )
}

let RenderModalOption = ({name, handleModal}) => {
    let handleClick = () => name == 'Members' ? handleModal() : null
    return <div className='modal-option' onClick={handleClick}>{name}</div>
}

let SuggestedMembersList = () => {
    let renderListOfMembers = members.map(name => <SuggestedMember key={name} name={name} />)
    return <div id='list-of-members-wrapper'>{renderListOfMembers}</div>
}

let SuggestedMember = ({name}) => {
    return name
}

let members = ['user een', 'user twee', 'user drie', 'user vier', 'user vijf', 'user zes', 'user zeven', 'user acht', 'user negen', 'user tien']

let options = ['Members', 'Suggested']

let searchIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

export default SuggestedMembersForList
