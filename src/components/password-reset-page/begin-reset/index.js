import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/begin-reset.css'

function BeginReset({handleRoute}) {
    let [userId, setUserId] = useState('');
    let handleChange = (evt) => setUserId(evt.target.value)
    // let clickHandler = () => window.open("/verify-user-info", "_blank")
    console.log(userId.length, '<<>>')
    return (
        <div id='begin-reset'>
            <h2>Find your Twitter account</h2>
            <p>Enter your email, mobile number or username.</p>
            <input type='email' value={userId} onChange={handleChange} />
            <br />
            {/* <input id='search' type='submit' value='Search' onClick={clickHandler} /> */}
            <Link id='search' type='submit' value='Search' to='/verify-user-info' style={{pointerEvents: userId.length < 4 && 'none', cursor: userId.length > 3 && 'pointer'}}>Search</Link>
        </div>
    )
}

export default BeginReset
