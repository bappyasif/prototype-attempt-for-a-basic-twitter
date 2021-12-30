import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function AddMemebersIntoLists({currentList}) {
    // let [currentList, setCurrentList] = useState(null)
    // let handleCurrentList = (item) => setCurrentList(prevData => prevData.concat(item))
    return <AddToExistingList currentList={currentList} />
}

let AddToExistingList = ({currentList}) => {
    let history = useHistory()
    let handleSave = () => console.log('handle save')
    return (
        <div id='add-to-list-container'>
            <ListModalHeader icon={removeIconSvg()} action={'Save'} modalTitle={'Pick a list'} history={history} modalAction={handleSave} />
            <CreateNewList />
            <ShowCurrentListItems currentList={currentList} />
        </div>
    )
}

let ShowCurrentListItems = ({currentList}) => {
    console.log(currentList, 'currentlist')
}

let CreateNewList = () => {
    let [showModal, setShowModal] = useState(false)
    let history = useHistory()

    useEffect(() => showModal && history.push('/i/lists/create'))

    let handleClick = () => {
        console.log('add a new item')
        setShowModal(true)
    }
    return (
        <div id='create-new-list-wrapper' onClick={handleClick}>Create A new List</div>
    )
}

export let ListModalHeader = ({icon, action, modalTitle, history, modalAction}) => {
    // let history = useHistory()
    let iconAction = () => history.goBack()
    return (
        <div id='list-header-wrapper'>
            <div id='first-half'>
                {/* <div id='svg-icon'>{removeIconSvg()}</div> */}
                <div id='svg-icon' onClick={iconAction}>{icon}</div>
                {/* <div id='action-header'>Pick a list</div> */}
                <div id='action-header'>{modalTitle}</div>
            </div>
            {/* <div id='other-half'>Save</div> */}
            <div id='other-half' onClick={modalAction}>{action}</div>
        </div>
    )
}

export let removeIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default AddMemebersIntoLists
