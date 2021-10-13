import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function EditProfile() {
    // let [test, setTest] = useState('')
    return (
        <div id='edit-profile-container'>
            <div id='header-section'>
                <div id='remove-icon'>{removeIcon()}</div>
                <div id='edit-profile-text'>Edit profile</div>
                <Link id='save-edit-profile-changes'>Save</Link>
            </div>
            <div id='body-section'>
                <div id='profile-visuals'>
                    <div id='profile-cover-photo'>
                        <img id='cover-photo' src='https://picsum.photos/200/300' />
                        <div id='svg-visuals'>
                            {/* <div className='camera-icon'>{cameraIcon()}</div>
                            <div className='remove-icon-svg'>{removeIcon(true)}</div> */}
                            <div className='camera-icon'>
                                {cameraIcon()}
                                <div id='cover-camera-icon-tooltips'>Add Photo</div>
                            </div>
                            <div className='remove-icon-svg'>
                                {removeIcon(true)}
                                <div id='cover-remove-icon-tooltips'>Remove Photo</div>
                            </div>
                        </div>
                    </div>
                    <div id='profile-photo-div'>
                        <img id='profile-photo' src='https://picsum.photos/200/300' />
                        <div className='camera-icon'>
                            {cameraIcon()}
                            <div id='profile-camera-icon-tooltips'>Add Photo</div>
                        </div>
                    </div>
                </div>
                <div id='profile-infos'>
                    {returnAnEditableTextarea()}
                    {/* <ReturnAnEditableTextarea /> */}
                    {/* <ReturnAnEditableTextarea test={test} setTest={setTest} /> */}
                </div>
            </div>
        </div>
    )
}

let userObject = [
    {
        content: 'AB',
        title: 'Name',
        maxLength: 50
    },
    {
        content: 'Some text shadowing user profile bio',
        title: 'Bio',
        maxLength: 160
    },
    {
        content: 'Capital, Country',
        title: 'Location',
        maxLength: 13
    },
    {
        content: 'some.web.site.co',
        title: 'Website',
        maxLength: 100
    },
    {
        content: 'Month Day, Year',
        title: 'Birth date'
    },

]

let returnAnEditableTextarea = () => {
    let generateProfileEditableInfos = userObject.map(item => <ReturnComponent key={item.title} item={item} />)
    return generateProfileEditableInfos
}

let ReturnComponent = ({ item }) => {
    let [test, setTest] = useState('')
    let [length, setLength] = useState(item.content.length);
    let [show, setShow] = useState(false);

    let handleChange = evt => {
        setTest(evt.target.value);
        // setLength(test.length || item.content.length)
    }

    useEffect(() => {
        setLength(test.length || item.content.length)
    }, [test])

    return (
        <div key={item.title} className='editable-text-area-container'>
            <div className='top-fragment'>
                <div className='editable-item-title' style={{ color: item.title == 'Birth date' ? 'gray' : show ? 'rgb(29, 155, 240)' : 'gray' }}>{item.title} {item.title == 'Birth date' && <span> - <span id='change-user-birth-date' style={{ color: 'rgb(29, 155, 240)' }}>Edit</span></span>}</div>
                <div style={{ display: show ? 'block' : 'none' }} className='track-word-counts'>{item.title == 'Birth date' ? '' : length + '/'}{item.maxLength ? item.maxLength : ''}</div>
            </div>
            <textarea readOnly={item.title == 'Birth date' ? true : false} maxLength={item.maxLength} className='editable-item-content' value={test ? test : item.content} onChange={handleChange} rows={item.title == 'Bio' ? 4 : 2} onFocus={() => setShow(true)} onBlur={() => setShow(false)} />
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