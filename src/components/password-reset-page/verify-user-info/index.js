import React, { useState } from 'react'
import '../styles/verify-user-info.css'

function VerifyUserInfo() {
    let [userId, setUserId] = useState('');
    let handleChange = (evt) => setUserId(evt.target.value)
    return (
        <div id='verify-user-info-container'>
            <h2>Verify your personal information</h2>
            <p>Enter your email address to continue.</p>
            <input type='email' value={userId} onChange={handleChange} placeholder='Email address' />
            <br />
            <input type='submit' value='Submit' />
            <a href='https://help.twitter.com/en/forms/account-access/regain-access' target='_blank'>I dont have access to this informtion</a>
        </div>
    )
}

export default VerifyUserInfo
