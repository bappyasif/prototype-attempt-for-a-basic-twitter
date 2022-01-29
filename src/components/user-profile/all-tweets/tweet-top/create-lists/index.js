import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ListModalHeader } from '../add-members-into-lists/ui';

import { ListCoverPhoto, MakeListPrivate, TextareaComponentWithCount } from './ui';

function CreateLists({handleCurrentList}) {
    let [listName, setListName] = useState('');
    let [listDescription, setListDescription] = useState('')
    let [isListPrivate, setIsListPrivate] = useState(false);
    let [modalActionFlag, setModalActionFlag] = useState(false);
    let history = useHistory()

    useEffect(() => {
        if (listName && listDescription) setModalActionFlag(true)
        if (listName.length == 0 || listDescription.length == 0) setModalActionFlag(false)
    }, [listName, listDescription])

    let handleIsListPrivate = (val) => setIsListPrivate(val)

    let handleListName = val => setListName(val)

    let handleListDescription = val => setListDescription(val)

    // let makingDataReady = () => [].concat({name: listName, description: listDescription, isPrivate: isListPrivate, listPictureUrl: 'https://picsum.photos/200/300'})

    let handleModalAction = () => {
        history.push('/i/lists/members/suggested')
        handleCurrentList({name: listName, description: listDescription, isPrivate: isListPrivate, pictureUrl: 'https://picsum.photos/200/300'})
    }

    // console.log(listName, listDescription, isListPrivate)
    return (
        <div id='create-lists-container'>
            {/* <ListModalHeader icon={leftArrowSvg()} action={'Next'} modalTitle={'Create a new List'} iconAction={handleSvgIconAction} /> */}
            <ListModalHeader icon={leftArrowSvg()} action={'Next'} modalTitle={'Create a new List'} history={history} modalAction={handleModalAction} modalActionFlag={modalActionFlag} />
            <ListCoverPhoto />
            <ListInformations handleListName={handleListName} handleListDescription={handleListDescription} handleIsListPrivate={handleIsListPrivate} />
        </div>
    )
}

let ListInformations = ({handleListDescription, handleListName, handleIsListPrivate}) => {
    return (
        <div id='list-information-wrapper'>
            <TextareaComponentWithCount maxLength={25} rows={1} name={'Name'} feedDataToParent={handleListName} />
            <TextareaComponentWithCount maxLength={100} rows={2} name={'Description'} feedDataToParent={handleListDescription} />
            <MakeListPrivate feedDataToParent={handleIsListPrivate} />
        </div>
    )
}

export let handleMediaFileFormats = (mediaFile) => {
    let mediaSrc = mediaFile;
    if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
        mediaSrc = URL.createObjectURL(mediaFile);
    }
    return mediaSrc;
}

export let leftArrowSvg = () => <svg className='profile-page-svg-icons'><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

// let cameraIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>

export default CreateLists
