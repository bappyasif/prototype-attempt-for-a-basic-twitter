import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useOnClickOutside from '../../../../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside'
import useOnHoverOutside from './useOnHoverOutside'

function AddMemebersIntoLists({ currentList, currentUser }) {
    // let [currentList, setCurrentList] = useState(null)
    // let handleCurrentList = (item) => setCurrentList(prevData => prevData.concat(item))
    return <AddToExistingList currentList={currentList} currentUser={currentUser} />
}

let AddToExistingList = ({ currentList, currentUser }) => {
    let [saveFlag, setSaveFlag] = useState(false)
    let history = useHistory()
    
    let handleSaveFlag = () => setSaveFlag(true)
    
    let handleSavedFlagReversal = () => {
        setSaveFlag(false)
    }
    // let saveFlagToggler = () => setSaveFlag(!saveFlag)

    let handleSave = () => {
        console.log('handle save');
        history.push(`/${currentUser}`)
    }

    return (
        <div id='add-to-list-container'>
            <ListModalHeader icon={removeIconSvg()} action={'Save'} modalTitle={'Pick a list'} history={history} modalAction={handleSave} modalActionFlag={saveFlag} />
            <CreateNewList />
            <ShowAvailableListItems currentList={currentList} handleSaveFlag={handleSaveFlag} toggleSavedFlag={handleSavedFlagReversal} />
            {/* <ShowAvailableListItems currentList={currentList} savedFlagToggler={saveFlagToggler} saveFlag={saveFlag} /> */}
        </div>
    )
}

let ShowAvailableListItems = ({ currentList, handleSaveFlag, toggleSavedFlag }) => {
    let [initialNumbers, setInitialNumbers] = useState([])
    useEffect(() => {
        currentList && currentList.forEach(item => item.members ? setInitialNumbers(p=>p.concat(item.members)) : setInitialNumbers(p=>p.concat(0)))
        // currentList.forEach(item => item.members ? console.log(item.members) : console.log(0))
        // if(currentList) {
        //     currentList.map(item => {
        //         console.log(item)
        //         if(item.members) {
        //             setInitialNumbers(p=>p.concat(item.members))
        //         } else {
        //             setInitialNumbers(p=>p.concat("1"))
        //         }
        //     })
        // }
    }, [currentList])
    console.log(currentList, 'currentlist', initialNumbers)
    // let handleMembersAddition = name => {
    //     let idx = currentList.findIndex(item => item.name == name)
    //     if (idx != -1) {
    //         let assignValue = currentList[idx].members ? (currentList[idx].members.length) + 1 : 1
    //         currentList[idx].members = assignValue
    //     }
    //     console.log(idx, name, currentList[idx].members)
    // }
    let renderLists = currentList.map((list, _, arr) => <RenderList key={list.name} list={list} arr={arr} handleSaveFlag={handleSaveFlag} toggleSavedFlag={toggleSavedFlag} initialNumbers={initialNumbers} />)
    return <div id='available-list-items-container'>{renderLists}</div>
}

let RenderList = ({ list, addMember, arr, handleSaveFlag, toggleSavedFlag, initialNumbers }) => {
    let [addToList, setAddToList] = useState(false)
    let [showThumbnail, setShowThumbnail] = useState(false)
    let [hovered, setHovered] = useState(null)
    let [numberFlag, setNumberFlag] = useState(false);
    let [saveFlagTest, setSaveFlagTest] = useState(false)

    let handleFlag = () => setNumberFlag(!numberFlag)
    
    let handleHovered = evt => {
        let whichList = evt.target.parentNode.querySelector('.list-name') ? evt.target.parentNode.querySelector('.list-name').textContent : null
        // if(whichList) {
        //     setHovered(whichList)
        //     setShowThumbnail(!showThumbnail)
        // }
        setHovered(whichList)
        setShowThumbnail(!showThumbnail)
    }

    let handleAddToList = () => {
        setAddToList(!addToList)
        // handleFlag()
    }

    // making sure save action modal button is changing its style only when none of those rendere list is being selected and also allows mouse event
    useEffect(() => {
        saveFlagTest && handleSaveFlag()
        !saveFlagTest && toggleSavedFlag()
    }, [saveFlagTest])

    useEffect(() => {
        addToList && handleFlag();
        addToList && handleMembersAddition(list.name, "+")
        // addToList && savedFlagToggler();
        // addToList && handleSaveFlag()
        !addToList && numberFlag && handleMembersAddition(list.name, "-");
        // !addToList && numberFlag && savedFlagToggler()
        // !addToList && numberFlag && toggleSavedFlag()
        // !addToList && numberFlag && !saveFlag && savedFlagToggler()
        !addToList && numberFlag && handleFlag();
    }, [addToList])

    // console.log(addToList, numberFlag, 'numbers', initialNumbers, saveFlagTest)

    let handleMembersAddition = (name, action) => {
        let idx = arr.findIndex(item => item.name == name)
        if (idx != -1) {
            memberNumberManipulation(idx, action)
        }
    }

    let memberNumberManipulation = (idx, action) => {
        let assignValue = arr[idx].members ? eval(`${(arr[idx].members)}${action}1`) : 1
        arr[idx].members = assignValue
        // making sure after each manipulation saveFlagTest states are gettig updated if there is no memebers added or not
        checkingArrayForMembers()
    }

    let checkingArrayForMembers = () => {
        let test = arr.filter(item  =>  item.members != -1 && item.members)
        // console.log(test, '<check>')
        // test ? handleSaveFlag() : toggleSavedFlag()
        // console.log(test.length ? true : false, test)

        // updating check flag state variable depending on if there is any memebrs avalable in list or not
        setSaveFlagTest(test.length ? true : false)
    }
    
    return (
        <div className='list-wrapper' onClick={handleAddToList} onMouseLeave={handleHovered}>
            <div className='first-half' onMouseEnter={handleHovered}>
                <div className='img-div'></div>
                <div className='list-info'>
                    <div className='list-name'>{list.name}</div>
                    {list.isPrivate && <div className='privacy-svg'>{lockIconSvg()}</div>}
                </div>
            </div>
            {addToList && <div className='tick-mark-svg'>{tickMarkSvg()}</div>}
            {((list.name == hovered) && showThumbnail) && <ShowListThumbnailCard list={list} handleHovered={handleHovered} />}
        </div>
    )
}

let ShowListThumbnailCard = ({list, handleHovered}) => {
    console.log(list, '?!')
    return (
        <div className='thumbnail-card-wrapper' onMouseLeave={handleHovered}>
            <div className='cover-img'></div>
            <div className='card-info'>
                <div className='list-name'>{list.name}</div>
                <div className='list-description'>{list.description}</div>
                <div className='user-info'>
                    <img className='profile-pic' src={list.pictureUrl}/>
                    <div className='user-name'>user name</div>
                    <div className='user-handle'>@user_handle</div>
                </div>
                <div className='list-numbers'>
                    <div className='members-numbers'>{list.members ? list.members : '0000'}</div>
                    <div className='followers-numbers'>0000</div>
                </div>
            </div>
        </div>
    )
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

export let ListModalHeader = ({ icon, action, modalTitle, history, modalAction, modalActionFlag }) => {
    // let history = useHistory()
    // let [flagTest, setFlagTest] = useState(false)
    
    // useEffect(() => {
    //     !flagTest && saveFlag && setFlagTest(true)
    //     !flagTest && !saveFlag && setFlagTest(false)
    //     flagTest && !saveFlag && setFlagTest(true)
    //     !saveFlag && setFlagTest(false)
    // }, [saveFlag, flagTest])

    let iconAction = () => history.goBack()
    
    // console.log(saveFlag, 'saveflag', flagTest)
    
    return (
        <div id='list-header-wrapper'>
            <div id='first-half'>
                {/* <div id='svg-icon'>{removeIconSvg()}</div> */}
                <div id='svg-icon' onClick={iconAction}>{icon}</div>
                {/* <div id='action-header'>Pick a list</div> */}
                <div id='action-header'>{modalTitle}</div>
            </div>
            {/* <div id='other-half'>Save</div> */}
            <div id='other-half' onClick={modalAction} style={{backgroundColor: modalActionFlag ? 'darkslategray' : 'silver', pointerEvents: !modalActionFlag && 'none'}}>{action}</div>
            {/* <div id='other-half' onClick={modalAction} style={{backgroundColor: flagTest && 'darkslategray', pointerEvents: !flagTest && 'none'}}>{action}</div> */}
        </div>
    )
}

export let removeIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export let lockIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M19.75 7.31h-1.88c-.19-3.08-2.746-5.526-5.87-5.526S6.32 4.232 6.13 7.31H4.25C3.01 7.31 2 8.317 2 9.56v10.23c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V9.56c0-1.242-1.01-2.25-2.25-2.25zm-7 8.377v1.396c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.396c-.764-.3-1.307-1.04-1.307-1.91 0-1.137.92-2.058 2.057-2.058 1.136 0 2.057.92 2.057 2.056 0 .87-.543 1.61-1.307 1.91zM7.648 7.31C7.838 5.06 9.705 3.284 12 3.284s4.163 1.777 4.352 4.023H7.648z"></path></g></svg>

export let tickMarkSvg = () => <svg className='profile-page-svg-icons'><g><path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path></g></svg>

export default AddMemebersIntoLists


/**
 * 
 * 
 let RenderList = ({ list, addMember, arr, handleSaveFlag, toggleSavedFlag }) => {
    let [addToList, setAddToList] = useState(false)
    let [showThumbnail, setShowThumbnail] = useState(false)
    let [hovered, setHovered] = useState(null)
    let [numberFlag, setNumberFlag] = useState(false);

    let handleFlag = () => setNumberFlag(!numberFlag)

    // let ref = useRef()
    // let thumbnailToggler = () => setShowThumbnail(!showThumbnail)
    // useOnHoverOutside(ref, thumbnailToggler)
    // useOnClickOutside(ref, handleHovered)
    // let handleHovered = () => setHovered(!hovered)
    
    let handleHovered = evt => {
        let whichList = evt.target.parentNode.querySelector('.list-name') ? evt.target.parentNode.querySelector('.list-name').textContent : null
        // console.log(whichList)
        // if(whichList) {
        //     setHovered(whichList)
        //     setShowThumbnail(!showThumbnail)
        // }
        setHovered(whichList)
        setShowThumbnail(!showThumbnail)
    }

    // useEffect(() => {
    //     if(hovered != list.name) {
    //         setShowThumbnail(false)
    //         console.log('checkpoint uno')
    //     }
    // }, [hovered])
    // onMouseEnter={handleHovered}

    let handleAddToList = () => setAddToList(!addToList)

    useEffect(() => {
        // addToList && addMember(list.name)
        addToList && handleMembersAddition(list.name, "+")
        addToList && handleFlag();
        // addToList && handleSaveFlag()
        // !addToList && handleMembersAddition(list.name, "-")
    }, [addToList])

    useEffect(() => {
        // numberFlag && !addToList && toggleSavedFlag()
        // numberFlag && !addToList && handleSaveFlag()
        numberFlag && !addToList && handleMembersAddition(list.name, "-")
        !addToList && console.log('><>><>')
        // numberFlag && handleFlag()
    }, [numberFlag])

    // useEffect(() => {
    //     list.name && setNumberFlag(false)
    // }, [list])

    console.log(addToList, numberFlag, 'numbers')

    let handleMembersAddition = (name, action) => {
        let idx = arr.findIndex(item => item.name == name)
        if (idx != -1) {
            memberNumberManipulation(idx, action)
            // action == '+' ? handleSaveFlag() : toggleSavedFlag()
            // action == '+' ? console.log('if') : console.log('else')
        }
        // action == '+' ? handleSaveFlag() : toggleSavedFlag()
        // action == '-' ? console.log('if') : console.log('else')
        // console.log(idx, name, arr[idx].members)
    }

    let memberNumberManipulation = (idx, action) => {
        let assignValue = arr[idx].members ? eval(`${(arr[idx].members)}${action}1`) : 1
        arr[idx].members = assignValue
        // let assignValue = arr[idx].members ? (arr[idx].members) + 1 : 1
        // arr[idx].members = assignValue
    }
    
    return (
        <div className='list-wrapper' onClick={handleAddToList} onMouseLeave={handleHovered}>
            <div className='first-half' onMouseEnter={handleHovered}>
                <div className='img-div'></div>
                <div className='list-info'>
                    <div className='list-name'>{list.name}</div>
                    {list.isPrivate && <div className='privacy-svg'>{lockIconSvg()}</div>}
                </div>
            </div>
            {addToList && <div className='tick-mark-svg'>{tickMarkSvg()}</div>}
            {/* {hovered && <ShowListThumbnailCard name={name} handleHovered={handleHovered} />} /}
            {((list.name == hovered) && showThumbnail) && <ShowListThumbnailCard list={list} handleHovered={handleHovered} />}
            {/* {(showThumbnail) && <ShowListThumbnailCard list={list} handleHovered={handleHovered} />} /}
        </div>
    )
}
 */