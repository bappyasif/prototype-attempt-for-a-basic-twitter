import React, { useEffect, useState } from "react"

export let ListModalHeader = ({ icon, action, modalTitle, history, modalAction, modalActionFlag }) => {

    let iconAction = () => history.goBack()
    
    return (
        <div id='list-header-wrapper'>
            
            <div id='first-half'>
                <div id='svg-icon' onClick={iconAction}>{icon}</div>
     
                <div id='action-header'>{modalTitle}</div>
            </div>

            <div id='other-half' onClick={modalAction} style={{backgroundColor: modalActionFlag ? 'darkslategray' : 'silver', pointerEvents: !modalActionFlag && 'none'}}>{action}</div>
        </div>
    )
}

export let SearchComponent = ({searchableMembers, handleMemberName, fromExplore, handleSearchText, setSearchResultsModalHook, savingPrevSearchText}) => {
    let [inputText, setInputText] = useState(null)

    let [focused, setFocused] = useState(false)
    
    // let handleFocused = () => setFocused(!focused)
    let handleFocused = () => {
        fromExplore && setSearchResultsModalHook(true)
        // fromExplore && savingPrevSearchText && handleSearchText(savingPrevSearchText)
        setFocused(!focused)
    }
    
    let handleInputText = evt => setInputText(evt.target.value)

    // let handleInputText = evt => {
    //     setInputText(evt.target.value)
    //     fromExplore && handleSearchText(evt.target.value)
    // }

    useEffect(() => {
        !fromExplore && handleMemberName(inputText)
        inputText && fromExplore && handleSearchText(inputText)
    }, [inputText])

    // console.log(searchableMembers, 'searchableMembers!!');
    
    return (
        <div id='search-wrapper' style={{ borderColor: focused && 'rgb(29, 155, 240)' }}>
            <div id='svg-icon'>{searchIconSvg()}</div>
            <label htmlFor='search-suggested-list' />
            <input id='search-suggested-list' placeholder='Search people' onFocus={handleFocused} onBlur={handleFocused} onChange={handleInputText} autoComplete='off' />
        </div>
    )
}

export let handleSearchMemberName = (searchingName, existingMembers, showFoundMatchedMembers) => {
    let testMatches = existingMembers.map(name => name.includes(searchingName) && name)
    // showFoundMatchedMembers(testMatches.map(name => name && name))
    showFoundMatchedMembers(testMatches.filter(name => name && name))
    console.log(testMatches, 'ready!!', existingMembers)
}

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

export let RenderMembersList = ({ updateExistingListData, listName, currentList, handleCount, handleMembersList, membersList, handleMembersRemoval, checkMemberExists, isMember }) => {

    let renderListOfMembers;

    if(isMember) {
        // let selectedList = currentList && currentList.filter(item => item.name == listName && item.membersList)
        let selectedList = currentList && currentList.filter(item => item.name == listName).map(item => item.membersList)[0]
        // console.log(selectedList, 'selectedList!!')
        renderListOfMembers = selectedList && selectedList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} updateExistingListData={updateExistingListData} listName={listName} />)

    } else {
        // renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} isMember={isMember} />)
        // console.log(membersList, 'list!!')
        // renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} />)
        renderListOfMembers = membersList.map(name => <RenderMember key={name} name={name} handleCount={handleCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} />)
    }
    
    return <div id='list-of-members-wrapper'>{renderListOfMembers}</div>
}

export let RenderMember = ({ listName, updateExistingListData, name, handleCount, handleMembersList, handleMembersRemoval, checkMemberExists, isMember }) => {
    let [hovered, setHovered] = useState(false);

    let previouslyExistsCheck = () => {
        // let idx = checkMemberExists(name)
        let idx = checkMemberExists(name, listName)
        return idx >= 0 ? true : false
    }

    let [added, setAdded] = useState(previouslyExistsCheck() || false);

    let [addedFlag, setAddedFlag] = useState(false);

    let handleAdded = () => {
        setAdded(!added)
        setAddedFlag(!addedFlag)
        // console.log('clicked!!')
    }

    let handleHovered = () => setHovered(!hovered)

    useEffect(() => {
        added && addedFlag && handleMembersList(name, listName)
        
        isMember && addedFlag && handleMembersList(name, listName) // when its in members route we are passing in memebers removal for handleMemebersList, as there is only removal is applicable

        !isMember && !added && addedFlag && handleMembersRemoval(name)  // when its in suggested route while clicked showing remove, it remove item from list

        addedFlag && setAddedFlag(false)

    }, [addedFlag])

    return <div className='member-info-wrapper' onMouseOver={handleHovered} onMouseOut={handleHovered} onBlur={() => setHovered(false)} style={{ backgroundColor: hovered && 'lightgray' }}>
        <img className='member-photo' src='https://picsum.photos/200/300' />

        <div className='section-wrapper' style={{ textAlign: 'left', marginLeft: '20px' }}>
            
            <div className='member-name'>{name}</div>

            <div className='handle-name' style={{ color: 'silver' }}>@{name && name.split(' ')[1]}'s handle</div>
            
            <div className='profile-description'>{(name + ' ').repeat(4)}</div>
        </div>
        
        <div className='add-btn' onClick={handleAdded} style={{ backgroundColor: ((checkMemberExists(name, listName) != -1) || added) && 'red', color: ((checkMemberExists(name, listName) != -1) || added) && 'white' }} >{(added || (checkMemberExists(name, listName) != -1)) ? 'Remove' : 'Add'}</div>
    </div>
}

let searchIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

let options = ['Members', 'Suggested']

/**
 * 
 * 
 // export let handleSearchMemberName = (searchingName, existingMembers) => {
//     let testMatches = existingMembers.map(name => name.includes(searchingName) && name)

//     let searchTokens = searchingName && searchingName.split('')

//     let test = searchingName && existingMembers.map(name => {
//         let tokens = name.split('')
//         let allMatches = tokens.map(v => searchTokens.includes(v)).filter(v=>v)
//         // let fragmentMatch = allMatches.every(v => name.includes(v))
//         // console.log(fragmentMatch, allMatches, 'checks!!', searchTokens)
//         // return fragmentMatch && name;
//         return allMatches && name;
//     })
    
//     console.log(test, 'ready!!', existingMembers)
//     // console.log(searchingName, existingMembers, 'ready data!!', testMatches, anotherTest)
// }

// export let handleSearchMemberName = (searchingName, existingMembers) => {
//     let testMatches = existingMembers.map(name => name.includes(searchingName) && name)

//     let searchTokens = searchingName && searchingName.split('')

//     let test = searchingName && existingMembers.map(name => {
//         let tokens = name.split('')
//         let allMatches = tokens.map(v => searchTokens.includes(v)).filter(v=>v)
//         // let fragmentMatch = allMatches.every(v => name.includes(v))
//         // console.log(fragmentMatch, allMatches, 'checks!!', searchTokens)
//         // return fragmentMatch && name;
//         return allMatches && name;
//     })
    
//     console.log(test, 'ready!!', existingMembers)
//     // console.log(searchingName, existingMembers, 'ready data!!', testMatches, anotherTest)
// }

// export let handleSearchMemberName = (searchingName, existingMembers) => {
//     // let [matchedNames, setMatchedNames] = useState([])
//     let testMatches = existingMembers.map(name => name.includes(searchingName) && name)
//     // setMatchedNames(testMatches)
//     let searchTokens = searchingName && searchingName.split('')
//     let anotherTest = searchTokens && existingMembers.map(name => {
//         let tokens = name.split('')
//         // let matches = tokens.some(v => searchTokens.some(val => val == v))
//         // let matches = tokens.map(v => searchTokens.some(val => val == v))
//         let matches = tokens.map(v => searchTokens.every(val => val == v))
//         return matches && name
//     })
//     console.log(searchingName, existingMembers, 'ready data!!', testMatches, anotherTest)
// }
 */