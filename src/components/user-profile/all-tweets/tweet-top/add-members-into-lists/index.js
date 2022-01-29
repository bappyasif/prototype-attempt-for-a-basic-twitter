import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useOnClickOutside from '../../../../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside'
import { ListModalHeader, RenderList } from './ui'
import useOnHoverOutside from './useOnHoverOutside'

function AddMemebersIntoLists({ currentList, currentUser, updateExistingListData }) {

    return <AddToExistingList currentList={currentList} currentUser={currentUser} updateExistingListData={updateExistingListData} />
}

let AddToExistingList = ({ currentList, currentUser, updateExistingListData }) => {
    let [saveFlag, setSaveFlag] = useState(false)
    let history = useHistory()
    
    let handleSaveFlag = () => setSaveFlag(true)
    
    let handleSavedFlagReversal = () => {
        setSaveFlag(false)
    }

    let handleSave = () => {
        // console.log('handle save');
        history.push(`/${currentUser}`)
    }

    return (
        <div id='add-to-list-container'>
            <ListModalHeader icon={removeIconSvg()} action={'Save'} modalTitle={'Pick a list'} history={history} modalAction={handleSave} modalActionFlag={saveFlag} />
            <CreateNewList />
            <ShowAvailableListItems updateExistingListData={updateExistingListData} currentList={currentList} handleSaveFlag={handleSaveFlag} toggleSavedFlag={handleSavedFlagReversal} />
            {/* <ShowAvailableListItems currentList={currentList} savedFlagToggler={saveFlagToggler} saveFlag={saveFlag} /> */}
        </div>
    )
}

export let ShowAvailableListItems = ({ currentList, handleSaveFlag, toggleSavedFlag, updateExistingListData }) => {
    let [initialNumbers, setInitialNumbers] = useState([])
    
    // useEffect(() => {
    //     currentList && currentList.forEach(item => item.members ? setInitialNumbers(p=>p.concat(item.members)) : setInitialNumbers(p=>p.concat(0)))

    // }, [currentList])
    
    console.log(currentList, 'currentlist', initialNumbers)
    
    let renderLists = currentList.map((list, _, arr) => <RenderList key={list.name} list={list} arr={arr} handleSaveFlag={handleSaveFlag} toggleSavedFlag={toggleSavedFlag} initialNumbers={initialNumbers} updateExistingListData={updateExistingListData} />)
    
    return <div id='available-list-items-container'>{renderLists}</div>
}

let CreateNewList = () => {
    let [showModal, setShowModal] = useState(false)
    let history = useHistory()

    useEffect(() => showModal && history.push('/i/lists/create'))

    let handleClick = () => {
        // console.log('add a new item')
        setShowModal(true)
    }
    return (
        <div id='create-new-list-wrapper' onClick={handleClick}>Create A new List</div>
    )
}

export let removeIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export let lockIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M19.75 7.31h-1.88c-.19-3.08-2.746-5.526-5.87-5.526S6.32 4.232 6.13 7.31H4.25C3.01 7.31 2 8.317 2 9.56v10.23c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V9.56c0-1.242-1.01-2.25-2.25-2.25zm-7 8.377v1.396c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.396c-.764-.3-1.307-1.04-1.307-1.91 0-1.137.92-2.058 2.057-2.058 1.136 0 2.057.92 2.057 2.056 0 .87-.543 1.61-1.307 1.91zM7.648 7.31C7.838 5.06 9.705 3.284 12 3.284s4.163 1.777 4.352 4.023H7.648z"></path></g></svg>

export let tickMarkSvg = () => <svg className='profile-page-svg-icons'><g><path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path></g></svg>

export default AddMemebersIntoLists