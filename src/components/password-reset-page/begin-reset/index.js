import React, { useEffect, useState } from 'react'
import '../styles/begin-reset.css'

function BeginReset() {
    let [userId, setUserId] = useState('');
    let handleChange = (evt) => setUserId(evt.target.value)
    let clickHandler = () => window.open("/verify-user-info", "_blank")
    return (
        <div id='begin-reset'>
            <h2>Find your Twitter account</h2>
            <p>Enter your email, mobile number or username.</p>
            <input type='email' value={userId} onChange={handleChange} />
            <br />
            <input id='search' type='submit' value='Search' onClick={clickHandler} />
        </div>
    )
}

export default BeginReset
