import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { leftArrowSvg } from '../create-lists'
import { ListModalHeader, ModalOptions, RenderMembersList, SearchComponent, handleSearchMemberName } from '../lists-reusable-helper-components'
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

    useEffect(() => {
        memebrName && handleSearchMemberName(memebrName, currentMembers, handleMatchedMembers)
        !memebrName && setMatchedMembers(null)
    }, [memebrName])
    
    return (
        <div id='container-for-added-members'>
            <ListModalHeader action={'Done'} modalAction={handleDone} icon={leftArrowSvg()} history={history} modalTitle={'Added to your List'} modalActionFlag={true} />
            <SearchComponent searchableMembers={currentMembers} handleMemberName={handleMemberName} />
            <ModalOptions membersCount={currentMembers.length} underlined={'Members'} history={history} routeUrl={'/i/lists/members/suggested'} />
            <RenderMembersList listName={listName} isMember={listName ? true : false} handleMembersRemoval={handleMembersRemoval} handleCount={handleMembersCount} membersList={ matchedMembers || currentMembers } checkMemberExists={checkMemberExists} />
        </div>
    )
}

export default ListOfAddedMembers
