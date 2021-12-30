import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ListModalHeader } from '../add-members-into-lists'

function CreateLists({handleCurrentList}) {
    let [listName, setListName] = useState('');
    let [listDescription, setListDescription] = useState('')
    let [isListPrivate, setIsListPrivate] = useState(false);
    let history = useHistory()

    // let handleSvgIconAction = () => history.goBack()
    let handleIsListPrivate = (val) => setIsListPrivate(val)
    let handleListName = val => setListName(val)
    let handleListDescription = val => setListDescription(val)

    let makingDataReady = () => [].concat({name: listName, description: listDescription, isPrivate: isListPrivate})

    let handleModalAction = () => history.push('/i/lists/members/suggested')

    // console.log(listName, listDescription, isListPrivate)
    return (
        <div id='create-lists-container'>
            {/* <ListModalHeader icon={leftArrowSvg()} action={'Next'} modalTitle={'Create a new List'} iconAction={handleSvgIconAction} /> */}
            <ListModalHeader icon={leftArrowSvg()} action={'Next'} modalTitle={'Create a new List'} history={history} modalAction={handleModalAction} />
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

let MakeListPrivate = ({feedDataToParent}) => {
    return (
        <div className='make-list-private-wrapper'>
            <div id='left-side'>
                <div id='action-title'>Make private</div>
                <div id='sub-text'>When you make a List private, only you can see it.</div>
            </div>
            <CheckboxComponent feedDataToParent={feedDataToParent} />
        </div>
    )
}

export let CheckboxComponent = ({feedDataToParent}) => {
    let [checked, setChecked] = useState(false)
    let handleChange = () => setChecked(!checked)
    useEffect(() => feedDataToParent(checked), [checked])
    return (
        // <input className='checkbox-input' type={'checkbox'} onChange={handleChange} value={checked} defaultChecked />
        <input className='checkbox-input' type={'checkbox'} onChange={handleChange} value={checked} />
    )
}

export let TextareaComponentWithCount = ({ maxLength, rows, name, feedDataToParent }) => {
    let [textAreaLength, setTextAreaLength] = useState()
    
    let [focused, setFocused] = useState(false)

    let handleTextAreaFocused = () => setFocused(!focused)

    let handleTextAreaLength = val => setTextAreaLength(val)
    
    return (
        <div className='textarea-wrapper' style={{borderColor: focused && 'rgb(29, 155, 240)'}}>
            <TextAreaUpperDeck name={name} length={textAreaLength} maxLength={maxLength} focused={focused} />
            <TextareaComponent maxLength={maxLength} rows={rows} handleLength={handleTextAreaLength} handleFocused={handleTextAreaFocused} name={name} focused={focused} feedDataToParent={feedDataToParent} />
        </div>
    )
}

let TextAreaUpperDeck = ({name, length, maxLength, focused}) => {
    return (
        <div className='upper-deck-wrapper' style={{visibility: focused ? 'visible' : 'hidden'}}>
            <div className='title-text'>{name}</div>
            <div className='text-area-count-side' style={{fontSize: 'smaller'}}>{length}/{maxLength}</div>
        </div>
    )
}

let TextareaComponent = ({ name, maxLength, rows, handleLength, handleFocused, focused, feedDataToParent }) => {
    let [text, setText] = useState('')

    let handleChange = evt => setText(evt.target.value)
    
    useEffect(() => {
        handleLength(text.length)
        text && feedDataToParent(text)
    }, [text])

    return <textarea maxLength={maxLength} onChange={handleChange} placeholder={!focused ? name : ''} rows={rows} value={text} onFocus={handleFocused} onBlur={handleFocused} />
}

let ListCoverPhoto = () => {
    let [photo, setPhoto] = useState();

    let photoRef = useRef();

    let handleClick = () => {
        // console.log('hear hear!!')
        photoRef.current.click();
    }

    let handlePhotoChange = evt => {
        let photoSelected = evt.target.files[0];
        setPhoto(photoSelected)
    }

    return (
        <div id='list-cover-photo-wrapper'>
            {photo && <img id='list-photo' src={handleMediaFileFormats(photo)} />}
            <div id='camera-icon' onClick={handleClick}>{cameraIconSvg()}</div>
            <input type='file' onChange={handlePhotoChange} name='image-file' ref={photoRef} accept="image/png, image/jpeg, svg, jpg" style={{ display: 'none' }} />
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

let cameraIconSvg = () => <svg className='profile-page-svg-icons'><g><path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>

export default CreateLists
