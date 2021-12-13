import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { downloadProfilePictureUrlFromStorage, uploadUserProfilePictureToStorage } from '../../../firebase-storage'
import {getUserBirthDate, getUserProfileData, updateDataInDocument, updateUserProfileDataInDocument} from '../../../firestore-methods'
import EditBirthdate from './edit-birthdate'
import ReuseableModal from './reuseable-modal'
import './styles.css'

function EditProfile({currentUser, setOpacity}) {
    let [hovered, setHovered] = useState('')
    let [photoElementForCover, setPhotoElementForCover] = useState('https://picsum.photos/200/300')
    let [photoElementForProfile, setPhotoElementForProfile] = useState('https://picsum.photos/200/300')
    let [profileData, setProfileData] = useState([])
    let [check, setCheck] = useState(null)
    let [dimModal, setDimModal] = useState(false)
    let [profilePictureUploaded, setIsProfilePictureUploaded] = useState(false);
    let [coverPictureUploaded, setIsCoverPictureUploaded] = useState(false);
    let [profilePictureUrl, setProfilePictureUrl] = useState('')
    let [coverPictureUrl, setCoverPictureUrl] = useState('')
    let [activateOpacityForProfile, setActivateOpacityForProfile] = useState(false)
    let [activateOpacityForCover, setActivateOpacityForCover] = useState(false)

    let coverPictureInputRef = useRef();
    let profilePictureInputRef = useRef();

    let handleDataLoader = (data) => {
        setProfileData(data)
        setCheck(data)
    }

    let updateProfilePictureUrl = (url) => {
        setProfilePictureUrl(url)
        // setProfileData(prevData => prevData.concat({content: url, title: 'profilePicture'}))
        changeDataInsideDatasetWithoutMutationInDuplicate({content: url, title: 'profilePicture'}, 6)
    }

    let updateCoverPictureUrl = (url) => {
        setCoverPictureUrl(url)
        // setProfileData(prevData => prevData.concat({content: url, title: 'coverPicture'}))
        changeDataInsideDatasetWithoutMutationInDuplicate({content: url, title: 'coverPicture'}, 7)
    }

    profilePictureUrl && console.log(profilePictureUrl, profileData)
    coverPictureUrl && console.log(coverPictureUrl, profileData)

    useEffect(() => profilePictureUrl && setActivateOpacityForProfile(false), [profilePictureUrl])

    useEffect(() => coverPictureUrl && setActivateOpacityForCover(false), [coverPictureUrl])

    useEffect(() => {
        profilePictureUploaded && downloadProfilePictureUrlFromStorage(currentUser, updateProfilePictureUrl)

    }, [profilePictureUploaded])

    useEffect(() => coverPictureUploaded && downloadProfilePictureUrlFromStorage(currentUser, updateCoverPictureUrl, 'coverPhoto'), [coverPictureUploaded])

    // let handleDimLuminosityInEditProfile = () => setDimModal(true)

    // let handleReviveLuminosityInEditProfile = () => setDimModal(false)

    let toggleEditProfileLuminosity = () => setDimModal(!dimModal)

    // just adds one more to existing data set
    // let mergeData = (data) => setProfileData([...profileData, data])

    // there is no longer that problem, but data in duplicate still gets mutated fue to push and pop
    // let mergeData = (data) => {
    //     profileData.pop();
    //     profileData.push(data)
    //     setProfileData(profileData)
    // }

    // though solves that issue, but still causing mutation in duplicate data set which i intend to avert
    // let mergeData = (data) => {
    //     profileData.slice(0, 4);
    //     profileData.concat(data)
    //     setProfileData(profileData)
    // }

    // causes no more mutation in duplicate
    let mergeData = (data) => {
        setProfileData(prevData => prevData.slice(0, -1).concat(data))
    }

    // more sophisticated approach when data needs to be updated without mutation, somewhere other than on edges in data set
    let changeDataInsideDatasetWithoutMutationInDuplicate = (data, idx) => {
        setProfileData(prevData => {
            // let idx = prevData.findIndex(entry => entry.id == id);
            console.log(idx, 'which index', data)
            return prevData.slice(0, idx).concat([data], prevData.slice(idx+1))
        })
    }

    let deleteData = idx => {
        setProfileData(prevData => prevData.slice(0, idx))
        // updateUserProfileDataInDocument(currentUser, {profileInfo: profileData})
    }

    useEffect(() => {
        // not deleting from server, but its here to show that it could have been done!!
        // profileData.length == 4 && updateUserProfileDataInDocument(currentUser, {profileInfo: profileData})
        // profileData && setPhotoElementForProfile(profileData[7])
        // profileData[7] && console.log(profileData[7].coverPicture)
        profileData[7] && setPhotoElementForCover(profileData[7].content)
        profileData[6] && setPhotoElementForProfile(profileData[6].content)
    }, [profileData])


    useEffect(() => getUserProfileData(currentUser, handleDataLoader), [])

    // console.log(profileData, 'profile data!!')
    
    let handleMouseEnter = evt => {
        let findWhich = evt.target.id || evt.target.parentNode.id
        // console.log(evt.target, 'enter', findWhich)
        setHovered(findWhich)
    }
    
    let handleMouseLeave = evt => {
        setHovered('')
    }

    let handleClick = evt => {
        coverPictureInputRef.current.click();
    }

    let handlePictureForProfile = () => profilePictureInputRef.current.click()

    let handleProfilePictureUploaded = () => setIsProfilePictureUploaded(true)

    let handleCoverPictureUploaded = () => setIsCoverPictureUploaded(true)

    let handleChange = evt => {
        let fileSelected = evt.target.files[0]
        setPhotoElementForCover(fileSelected)
        // console.log(fileSelected)
        uploadUserProfilePictureToStorage(fileSelected, currentUser, handleCoverPictureUploaded, 'coverPhoto')
        setActivateOpacityForCover(true)
    }

    let handleChangeforProfile = evt => {
        let fileSelected = evt.target.files[0];
        setPhotoElementForProfile(fileSelected)
        uploadUserProfilePictureToStorage(fileSelected, currentUser, handleProfilePictureUploaded)
        setActivateOpacityForProfile(true)
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
        // profilePictureUrl && updateUserProfileDataInDocument(currentUser, {})
    }

    // style={{backgroundColor: dimModal && 'rgba(0, 0, 0, 0.11)'}}

    return (
        <div id='edit-profile-container' >
            <div id='header-section'>
                {/* <Link id='remove-icon' to='/username'>{removeIcon()}</Link> */}
                <Link id='remove-icon' to={`/${currentUser}`}>{removeIcon()}</Link>
                <div id='edit-profile-text'>Edit profile</div>
                {/* <Link id='save-edit-profile-changes' to='/username' onClick={handleData} style={{opacity: (activateOpacityForProfile || activateOpacityForCover) &&  .5, pointerEvents: (activateOpacityForProfile || activateOpacityForCover) && 'none'}}>Save</Link> */}
                <Link id='save-edit-profile-changes' to={`/${currentUser}`} onClick={handleData} style={{opacity: (activateOpacityForProfile || activateOpacityForCover) &&  .5, pointerEvents: (activateOpacityForProfile || activateOpacityForCover) && 'none'}}>Save</Link>
            </div>
            <div id='body-section'>
                <div id='profile-visuals' style={{maxHeight: '249px'}}>
                    <div id='profile-cover-photo' style={{backgroundColor: photoElementForCover == '' && 'darkslategray'}}>
                        {/* <img id='cover-photo' src='https://picsum.photos/200/300' /> */}
                        <input type='file' onChange={handleChange} name='image-file' ref={coverPictureInputRef} accept="image/png, image/jpeg, svg, jpg" style={{ display: 'none' }} />

                        {/* {photoElementForCover && <img id='cover-photo' src={handleMediaFileFormats((profileData && profileData[7].coverPicture) || photoElementForCover)} />} */}
                        {photoElementForCover && <img id='cover-photo' src={handleMediaFileFormats(photoElementForCover)} />}
                        {/* <img id='cover-photo' src={handleMediaFileFormats(photoElement ? photoElement : 'https://picsum.photos/200/300')} /> */}

                        <div id='svg-visuals' style={{ transform: photoElementForCover == '' && 'translate(10px, 76px)' }}>
                            {/* <div className='camera-icon'>{cameraIcon()}</div>
                            <div className='remove-icon-svg'>{removeIcon(true)}</div> */}
                            <div id='cover-camera' className='camera-icon' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{pointerEvents: activateOpacityForCover && 'none'}}>
                                {cameraIcon()}
                                <div id='cover-camera-icon-tooltips' style={{ display: hovered == 'cover-camera' ? 'block' : 'none' }}>Add Photo</div>
                            </div>
                            <div id='cover-remove' className='remove-icon-svg' onClick={() => setPhotoElementForCover('')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                {removeIcon(true)}
                                <div id='cover-remove-icon-tooltips' style={{ display: hovered == 'cover-remove' ? 'block' : 'none' }}>Remove Photo</div>
                            </div>
                        </div>
                    </div>
                    
                    <input type='file' onChange={handleChangeforProfile} name='image-file' ref={profilePictureInputRef} accept="image/png, image/jpeg, svg, jpg" style={{ display: 'none' }} />
                    {/* {photoElementForProfile && <img id='profile-photo' src={handleMediaFileFormats(photoElementForProfile)} />} */}
                    <div id='profile-photo-div' style={{backgroundColor: photoElementForProfile == '' && 'darkslategray', pointerEvents: activateOpacityForProfile && 'none'}}>
                        {/* <img id='profile-photo' src='https://picsum.photos/200/300' /> */}
                        {photoElementForProfile && <img id='profile-photo' src={handleMediaFileFormats(photoElementForProfile)} />}
                        <div id='profile-camera' className='camera-icon' style={{ transform: photoElementForProfile == '' && 'translate(0px, 42px)' }} onClick={handlePictureForProfile} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            {cameraIcon()}
                            <div id='profile-camera-icon-tooltips' style={{ display: hovered == 'profile-camera' ? 'block' : 'none' }}>Add Photo</div>
                        </div>
                    </div>
                </div>
                <div id='profile-infos' style={{padding: '8px', position: 'relative'}}>
                    {returnAnEditableTextarea(hovered, setHovered, currentUser, profileData, handleDataLoader, check, mergeData, changeDataInsideDatasetWithoutMutationInDuplicate, deleteData, toggleEditProfileLuminosity)}
                </div>
            </div>
        </div>
    )
}

let returnAnEditableTextarea = (hovered, setHovered, currentUserID, profileData, handleDataLoader, check, mergeData, changeData, deleteData, toggleEditProfileLuminosity) => {
    let generateProfileEditableInfos = profileData && profileData.map((item, idx) => idx < 5 && <ReturnComponent key={item.title} index={idx} currentUser={currentUserID} item={item} hovered={hovered} setHovered={setHovered} profileData={profileData} handleDataLoader={handleDataLoader} check={check} mergeData={mergeData} changeData={changeData} deleteData={deleteData} toggleLuminosity={toggleEditProfileLuminosity} />)
    return generateProfileEditableInfos
}

let ReturnComponent = ({ index, currentUser, item, hovered, setHovered, profileData, handleDataLoader, check, mergeData, changeData, deleteData, toggleLuminosity }) => {
    let [test, setTest] = useState('')
    let [length, setLength] = useState(item.content.length);
    let [show, setShow] = useState(false);
    let [startEditBirthdate, setStartEditBirthdate] = useState(false);
    let [showDateComponent, setShowDateComponent] = useState(false);

    let handleChange = evt => {
        setTest(evt.target.value);
        // item.content = evt.target.value; // this causes unwanted mutation
        // rather using safe mutation
        changeData({content: evt.target.value, title: item.title}, index)
    }

    useEffect(() => {
        setLength(test.length || item.content.length)
    }, [test])

    let handleShowModal = () => {
        // console.log('show calendar!!')
        setStartEditBirthdate(true)
        toggleLuminosity()
    }

    let handleShowDateComponent = () => setShowDateComponent(true);

    let handleCancelDateComponent = () => {
        setShowDateComponent(false)
        item = profileData[4]
        setStartEditBirthdate(false)
    }

    let handleCancelModal = () => {
        // item = profileData[4]
        setStartEditBirthdate(false)
        // console.log(profileData, 'cancel!!', showCalendar)
        toggleLuminosity()
        
    }

    useEffect(() => {
        !startEditBirthdate && console.log(profileData, 'cancel!!', startEditBirthdate, check)
        // this re renders data from firestore once again, not ideal but works somewhat!! and also know as pessimistic update
        // !showCalendar && getUserProfileData(currentUser, handleDataLoader)

        // using optimistic way to update data, from an mirror image of original before any data mutation by user after loading
        // check && !showCalendar && mergeData({content: check[4].content, title: 'Birth date'})

        // using optimistic way to update data, from an mirror image of original before any data mutation by user after loading, with using changeData, as it is more uniform way of doing this than split edges
        check && !startEditBirthdate && changeData({content: check[4].content, title: 'Birth date'}, index)
    }, [startEditBirthdate])

    let convertDateIntoString = data => {
        let dateString = ''
        // let keepOriginal = Object.assign({}, item.content);

        let dateTokens = data.split('-');
        dateString = `${dateTokens[0]} ${dateTokens[1]}, ${dateTokens[2]}`
        console.log(data, 'convert it', dateString, 'original', profileData, startEditBirthdate)
        // item.content = dateString;   // if i uncomment here, this would change data set at hand
        // mergeData({content: dateString, title: 'Birth date'}) // this simply adds one more to data set but keeps duplicate unmutated!!
        // mergeData({content: dateString, title: 'Birth date'})  // this works just fine, but specific to edges in data set
        changeData({content: dateString, title: item.title}, index) // this should also work as this is more uniform approach, regardless of data position in dataset
    }

    return (
        <div key={item.title} className='editable-text-area-container' style={{minHeight: '53px'}}>
            <div className='top-fragment'>
                {/* {showCalendar && item.title == 'Birth date' && <input type='date' />} */}
                <div className='editable-item-title' style={{ color: item.title == 'Birth date' ? 'gray' : show ? 'rgb(29, 155, 240)' : 'gray', display: 'flex' }}>{item.title} {item.title == 'Birth date' && <span style={{display: 'flex', marginLeft: '4px'}}> - <span id='change-user-birth-date' style={{ color: 'rgb(29, 155, 240)' }}>{showDateComponent ? <div onClick={handleCancelDateComponent} style={{marginLeft: '4px'}}>Cancel</div> : <div onClick={item.title == 'Birth date' && handleShowModal} style={{marginLeft: '4px'}}>Edit</div>}</span></span>}</div>
                <div style={{ display: show ? 'block' : 'none' }} className='track-word-counts'>{item.title == 'Birth date' ? '' : length + '/'}{item.maxLength ? item.maxLength : ''}</div>
            </div>

            {(!startEditBirthdate && item.content)
            ?
            <textarea readOnly={item.title == 'Birth date' ? true : false} maxLength={item.maxLength} id={item.title} className='editable-item-content' value={test ? test : item.content} onChange={handleChange} rows={item.title == 'Bio' ? 4 : 2} onFocus={() => setShow(true)} onBlur={() => setShow(false)} />
            :
            // <EditBirthdate item={item} convertDateIntoString={convertDateIntoString} startEditBirthdate={startEditBirthdate} changeData={changeData} currentUser={currentUser} deleteData={deleteData} />
            showDateComponent
            ?
            <EditBirthdate item={item} convertDateIntoString={convertDateIntoString} startEditBirthdate={startEditBirthdate} changeData={changeData} currentUser={currentUser} deleteData={deleteData} />
            :
            startEditBirthdate  && !showDateComponent && <ReuseableModal title='Edit date of birth?' description='This can only be changed a few times.' handleCancelModal={handleCancelModal} handleAction={handleShowDateComponent} />
            }
        </div>
    )
}

let cameraIcon = () => <svg width='24px' height='24px' stroke='whiteSmoke' fill='whiteSmoke'><g><path opacity='.6' d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path><path stroke='whiteSmoke' fillOpacity='.4' d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path></g></svg>

let removeIcon = (fill) => <svg width='24px' height='24px' fill={fill ? 'whiteSmoke' : ''}><g><path opacity={fill ? '.6' : ''} d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default EditProfile