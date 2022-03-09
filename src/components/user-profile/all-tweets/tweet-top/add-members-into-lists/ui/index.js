import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { lockIconSvg, tickMarkSvg } from "..";
import useOnHoverOutside from "../useOnHoverOutside";
import {handleMediaFileFormats} from '../../create-lists/index'

export let RenderList = ({ list, addMember, arr, handleSaveFlag, toggleSavedFlag, initialNumbers, updateExistingListData, handleListName }) => {
    let [addToList, setAddToList] = useState(false)

    let [showThumbnail, setShowThumbnail] = useState(false)
    
    let [numberFlag, setNumberFlag] = useState(false);
    
    let [saveFlagTest, setSaveFlagTest] = useState(false)

    let [currentlyHovering, setCurrentlyHovering] = useState(null)

    let handleFlag = () => setNumberFlag(!numberFlag)

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
        
        !addToList && numberFlag && handleMembersAddition(list.name, "-");
        
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

        // updating check flag state variable depending on if there is any memebrs avalable in list or not
        setSaveFlagTest(test.length ? true : false)
    }

    let handleModal = () => {
        setShowThumbnail(!showThumbnail)
        setCurrentlyHovering(list.name)
    }

    let ref = useRef(null);

    useOnHoverOutside(ref, () => setShowThumbnail(false))
    
    return (
        <div className='list-wrapper' onClick={handleAddToList} ref={ref} id={list.name + Math.random()} onMouseLeave={() => setShowThumbnail(false)}>
            <div className='first-half' onMouseEnter={handleModal} onBlur={() => setShowThumbnail(false)}>
                <div className='img-div'></div>
                <div className='list-info'>
                    <div className='list-name'>{list.name}</div>
                    {list.isPrivate && <div className='privacy-svg'>{lockIconSvg()}</div>}
                </div>
            </div>
            {addToList && <div className='tick-mark-svg'>{tickMarkSvg()}</div>}
            {showThumbnail && currentlyHovering == list.name && <ShowListThumbnailCard list={list} handleModal={setShowThumbnail} handleListName={handleListName} />}
        </div>
    )
}

let ShowListThumbnailCard = ({list, handleModal, handleListName}) => {
    let history = useHistory();

    let handleClick = () => {
        handleListName(list.name)
        history.push('/i/list/members/')
    }
    
    return (
        <div className='thumbnail-card-wrapper' onClick={handleClick} onMouseLeave={() => handleModal(false)}>
            {list.coverPhoto ? <img className='cover-img' src={handleMediaFileFormats(list.coverPhoto)} /> : <div className='cover-img'></div>}
            <div className='card-info'>
                <div className='list-name'>{list.name}</div>
                <div className='list-description'>{list.description}</div>
                <div className='user-info'>
                    <img className='profile-pic' src="https://random.imagecdn.app/500/150" />
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