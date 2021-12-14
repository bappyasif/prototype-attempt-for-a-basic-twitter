import React, { useEffect, useState } from 'react'
import { sendingPasswordResetEmail } from '../../firebase-auths';
import '../styles/verify-user-info.css'

function VerifyUserInfo() {
    let [userId, setUserId] = useState('');
    let [announcement, setAnnouncement] = useState('')
    
    let handleChange = (evt) => setUserId(evt.target.value)
    
    let handlePasswordReset = () => {
        console.log('resetting password!!')
        // sending password reset email
        sendingPasswordResetEmail(userId, setAnnouncement)
    }

    useEffect(() => userId.length == 0 && setAnnouncement(''), [userId])
    
    return (
        <div id='verify-user-info-container'>
            {announcement && <div id="announcement-div">{announcement}</div>}
            <h2>Verify your personal information</h2>
            <p>Enter your email address to continue.</p>
            <input type='email' value={userId} onChange={handleChange} placeholder='Email address' />
            <br />
            <input type='submit' value='Submit' onClick={handlePasswordReset} />
            <a href='https://help.twitter.com/en/forms/account-access/regain-access' target='_blank'>I dont have access to this informtion</a>
        </div>
    )
}

export default VerifyUserInfo
