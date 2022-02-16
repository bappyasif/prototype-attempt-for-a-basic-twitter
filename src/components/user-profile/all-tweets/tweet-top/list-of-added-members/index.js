import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
// import { ListModalHeader } from '../add-members-into-lists/ui'
import { leftArrowSvg } from '../create-lists'
import { ListModalHeader, ModalOptions, RenderMembersList, SearchComponent, handleSearchMemberName } from '../lists-reusable-helper-components'
// import { adjustMembersNumber, ModalOptions, RenderMembersList, SearchComponent } from '../suggested-members'
// import { adjustMembersNumber, ModalOptions } from '../suggested-members'
import { adjustMembersNumber } from '../suggested-members'

function ListOfAddedMembers({ listName, handleCurrentList, listMembersCount, handleMembersCount, currentMembers, checkMemberExists, handleMembersList, currentUser, currentList, handleMembersRemoval}) {
    let [memebrName, setMemberName] = useState(null)

    let [matchedMembers, setMatchedMembers] = useState(null)

    let history = useHistory()
    
    let handleMemberName = value => setMemberName(value)

    let handleMatchedMembers = list => setMatchedMembers(list)
    
    let handleDone = () => {
        // console.log('handled done')
        adjustMembersNumber(currentList, currentMembers)
        history.push(`/${currentUser}`)
    }

    // useEffect(() => memebrName && handleSearchMemberName(memebrName, currentMembers, handleMatchedMembers), [memebrName])
    useEffect(() => {
        memebrName && handleSearchMemberName(memebrName, currentMembers, handleMatchedMembers)
        !memebrName && setMatchedMembers(null)
    }, [memebrName])
    
    // console.log(membersList, 'members!!')
    // console.log(listName, currentList, currentMembers, 'fromAddedMembers!!')
    // (matchedMembers && matchedMembers.length) ? matchedMembers : currentMembers
    
    return (
        <div id='container-for-added-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} icon={leftArrowSvg()} history={history} modalTitle={'Added to your List'} modalActionFlag={true} />
            <SearchComponent searchableMembers={currentMembers} handleMemberName={handleMemberName} />
            <ModalOptions membersCount={currentMembers.length} underlined={'Members'} history={history} routeUrl={'/i/lists/members/suggested'} />
            {/* <RenderMembersList listName={listName} isMember={listName ? true : false} handleMembersList={handleMembersList} handleCount={handleMembersCount} membersList={currentMembers} checkMemberExists={checkMemberExists} /> */}
            {/* <RenderMembersList listName={listName} isMember={listName ? true : false} handleMembersRemoval={handleMembersRemoval} handleCount={handleMembersCount} membersList={currentMembers} checkMemberExists={checkMemberExists} /> */}
            <RenderMembersList listName={listName} isMember={listName ? true : false} handleMembersRemoval={handleMembersRemoval} handleCount={handleMembersCount} membersList={ matchedMembers || currentMembers } checkMemberExists={checkMemberExists} />
        </div>
    )
}

export default ListOfAddedMembers
