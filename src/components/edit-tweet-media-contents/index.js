import React from 'react'
import { backIcon } from '../user-profile/profile-page/svg-resources'
import './styles.css'

function EditTweetMediaContents() {
    return (
        <div id='media-editing-container'>
            <div id='header-section'>
                <div id='top-portion'>
                    <div id='left-side'>
                        <div id='svg-icon'>{backIcon()}</div>
                        <p id='header-text'>Edit Photo</p>
                    </div>
                    <div id='right-side'>
                        <button id='save-button'>Save</button>
                    </div>
                </div>
                <div id='bottom-portion'>
                    <div id='svg-icon'>{cropIcon()}</div>
                    <div id='alt-div'>ALT</div>
                </div>
            </div>
        </div>
    )
}

let cropIcon = () => <svg width='24px' height='24px'><g><path d="M3.5 5.25H2c-.414 0-.75.336-.75.75s.336.75.75.75h1.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm18.5 12H7.5c-.414 0-.75-.337-.75-.75V2c0-.414-.336-.75-.75-.75s-.75.336-.75.75v14.5c0 1.24 1.01 2.25 2.25 2.25H22c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-4 2.5c-.414 0-.75.336-.75.75V22c0 .414.336.75.75.75s.75-.336.75-.75v-1.5c0-.414-.336-.75-.75-.75z"></path><path d="M8.5 6.75h8c.414 0 .75.337.75.75v8c0 .414.336.75.75.75s.75-.336.75-.75v-8c0-1.24-1.01-2.25-2.25-2.25h-8c-.414 0-.75.336-.75.75s.336.75.75.75z"></path></g></svg>

export default EditTweetMediaContents
