import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {getUserBirthDate, getUserProfileData, updateDataInDocument, updateUserProfileDataInDocument} from '../../../firestore-methods'
import EditBirthdate from './edit-birthdate'
import './styles.css'

function EditProfile({currentUser, setOpacity}) {
    let [hovered, setHovered] = useState('')
    let [photoElement, setPhotoElement] = useState('https://picsum.photos/200/300')
    let [profileData, setProfileData] = useState([])
    let handleDataLoader = (data) => setProfileData(data)

    useEffect(() => getUserProfileData(currentUser, handleDataLoader), [])

    // console.log(profileData, 'profile data!!')

    let inputRef = useRef();
    
    let handleMouseEnter = evt => {
        let findWhich = evt.target.id || evt.target.parentNode.id
        // console.log(evt.target, 'enter', findWhich)
        setHovered(findWhich)
    }
    
    let handleMouseLeave = evt => {
        setHovered('')
    }

    let handleClick = evt => {
        inputRef.current.click();
    }

    let handleChange = evt => {
        let fileSelected = evt.target.files[0]
        setPhotoElement(fileSelected)
        // console.log(fileSelected)
    }

    let handleMediaFileFormats = (mediaFile) => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile);
        }
        return mediaSrc;
    }

    useEffect(() => setOpacity(true), [])
    // let decideSvgVisualsClassnames = () => photoElement ? '' : 'additive'

    let handleData = () => {
        profileData && updateUserProfileDataInDocument(currentUser, {profileInfo: profileData})
        profileData && 'running update?!'
    }

    return (
        <div id='edit-profile-container'>
            <div id='header-section'>
                <Link id='remove-icon' to='/username'>{removeIcon()}</Link>
                <div id='edit-profile-text'>Edit profile</div>
                <Link id='save-edit-profile-changes' to='/username' onClick={handleData}>Save</Link>
            </div>
            <div id='body-section'>
                <div id='profile-visuals' style={{maxHeight: '249px'}}>
                    <div id='profile-cover-photo' style={{backgroundColor: photoElement == '' && 'darkslategray'}}>
                        {/* <img id='cover-photo' src='https://picsum.photos/200/300' /> */}
                        <input type='file' onChange={handleChange} name='image-file' ref={inputRef} accept="image/png, image/jpeg, svg, jpg" style={{ display: 'none' }} />

                        {photoElement && <img id='cover-photo' src={handleMediaFileFormats(photoElement)} />}
                        {/* <img id='cover-photo' src={handleMediaFileFormats(photoElement ? photoElement : 'https://picsum.photos/200/300')} /> */}

                        <div id='svg-visuals' style={{ transform: photoElement == '' && 'translate(10px, 76px)' }}>
                            {/* <div className='camera-icon'>{cameraIcon()}</div>
                            <div className='remove-icon-svg'>{removeIcon(true)}</div> */}
                            <div id='cover-camera' className='camera-icon' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                {cameraIcon()}
                                <div id='cover-camera-icon-tooltips' style={{ display: hovered == 'cover-camera' ? 'block' : 'none' }}>Add Photo</div>
                            </div>
                            <div id='cover-remove' className='remove-icon-svg' onClick={() => setPhotoElement('')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                {removeIcon(true)}
                                <div id='cover-remove-icon-tooltips' style={{ display: hovered == 'cover-remove' ? 'block' : 'none' }}>Remove Photo</div>
                            </div>
                        </div>
                    </div>
                    <div id='profile-photo-div' style={{backgroundColor: photoElement == '' && 'darkslategray'}}>
                        {/* <img id='profile-photo' src='https://picsum.photos/200/300' /> */}
                        {photoElement && <img id='profile-photo' src={handleMediaFileFormats(photoElement)} />}
                        <div id='profile-camera' className='camera-icon' style={{ transform: photoElement == '' && 'translate(0px, 42px)' }} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {cameraIcon()}
                            <div id='profile-camera-icon-tooltips' style={{ display: hovered == 'profile-camera' ? 'block' : 'none' }}>Add Photo</div>
                        </div>
                    </div>
                </div>
                <div id='profile-infos' style={{padding: '8px'}}>
                    {returnAnEditableTextarea(hovered, setHovered, currentUser, profileData, handleDataLoader)}
                </div>
            </div>
        </div>
    )
}

let returnAnEditableTextarea = (hovered, setHovered, currentUserID, profileData, handleDataLoader) => {
    let generateProfileEditableInfos = profileData && profileData.map((item, idx) => <ReturnComponent key={item.title} index={idx} currentUser={currentUserID} item={item} hovered={hovered} setHovered={setHovered} profileData={profileData} handleDataLoader={handleDataLoader} />)
    return generateProfileEditableInfos
}

let ReturnComponent = ({ index, currentUser, item, hovered, setHovered, profileData, handleDataLoader, birthDate }) => {
    let [test, setTest] = useState('')
    let [length, setLength] = useState(item.content.length);
    let [show, setShow] = useState(false);
    let [showCalendar, setShowCalendar] = useState(false);

    let handleChange = evt => {
        setTest(evt.target.value);
        item.content = evt.target.value;        
    }

    useEffect(() => {
        setLength(test.length || item.content.length)
    }, [test])

    let handleCalendar = () => {
        // console.log('show calendar!!')
        setShowCalendar(true)
    }

    let handleCancel = () => {
        item = profileData[4]
        setShowCalendar(false)
        // console.log(profileData, 'cancel!!', showCalendar)
    }

    useEffect(() => {
        !showCalendar && console.log(profileData, 'cancel!!', showCalendar)
        !showCalendar && getUserProfileData(currentUser, handleDataLoader) // this re renders data, not ideal but works somewhat!!
    }, [showCalendar])

    let convertDateIntoString = data => {
        let dateString = ''
        // let keepOriginal = Object.assign({}, item.content);

        let dateTokens = data.split('-');
        dateString = `${dateTokens[0]} ${dateTokens[1]}, ${dateTokens[2]}`
        console.log(data, 'convert it', dateString, 'original', profileData, showCalendar)
        item.content = dateString;
    }

    return (
        <div key={item.title} className='editable-text-area-container'>
            <div className='top-fragment'>
                {/* {showCalendar && item.title == 'Birth date' && <input type='date' />} */}
                <div className='editable-item-title' style={{ color: item.title == 'Birth date' ? 'gray' : show ? 'rgb(29, 155, 240)' : 'gray' }}>{item.title} {item.title == 'Birth date' && <span> - <span id='change-user-birth-date' style={{ color: 'rgb(29, 155, 240)' }}>{showCalendar ? <div onClick={handleCancel}>Cancel</div> : <div onClick={item.title == 'Birth date' && handleCalendar}>Edit</div>}</span></span>}</div>
                <div style={{ display: show ? 'block' : 'none' }} className='track-word-counts'>{item.title == 'Birth date' ? '' : length + '/'}{item.maxLength ? item.maxLength : ''}</div>
            </div>

            {(!showCalendar)
            ?
            <textarea readOnly={item.title == 'Birth date' ? true : false} maxLength={item.maxLength} id={item.title} className='editable-item-content' value={test ? test : item.content} onChange={handleChange} rows={item.title == 'Bio' ? 4 : 2} onFocus={() => setShow(true)} onBlur={() => setShow(false)} />
            :
            <EditBirthdate item={item} convertDateIntoString={convertDateIntoString} showCalendar={showCalendar}/>
            }
        </div>
    )
}

let cameraIcon = () => <svg width='24px' height='24px' stroke='whiteSmoke' fill='whiteSmoke'><g><path opacity='.6' d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path stroke='whiteSmoke' fillOpacity='.4' d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>

let removeIcon = (fill) => <svg width='24px' height='24px' fill={fill ? 'whiteSmoke' : ''}><g><path opacity={fill ? '.6' : ''} d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default EditProfile


/**
 *
 *
 <div key={item.title} className='editable-text-area-container'>
            <div className='top-fragment'>
                <div className='editable-item-title' style={{color: show && !item.title == 'Birth date' ? 'rgb(29, 155, 240)' : 'gray'}}>{item.title} {item.title == 'Birth date' && <span> - <span id='change-user-birth-date' style={{color: 'rgb(29, 155, 240)'}}>Edit</span></span>}</div>
                <div style={{ display: show || item.title == 'Birth date' ? 'block' : 'none' }} className='track-word-counts'>{item.title == 'Birth date' ? '' : length+'/'}{item.maxLength ? item.maxLength : ''}</div>
            </div>
            <textarea readOnly={item.title == 'Birth date' ? true : false} maxLength={item.maxLength} className='editable-item-content' value={test ? test : item.content} onChange={handleChange} rows={item.title == 'Bio' ? 4 : 2} onFocus={() => setShow(true)} onBlur={() => setShow(false)} />
        </div>
 *
 *
 let ReturnAnEditableTextarea = () => {
    let [test, setTest] = useState('')
    let handleChange = evt => setTest(evt.target);
    let generateProfileEditableInfos = userObject.map(item => <div key={item.title} className='editable-text-area-container'>
        <div className='textarea-title'>{item.title}</div>
        <textarea value={test ? test : item.content} onChange={handleChange} />
    </div>)
    return generateProfileEditableInfos
}
 */