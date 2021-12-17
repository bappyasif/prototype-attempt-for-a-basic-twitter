import React from 'react'
import { Link } from 'react-router-dom'

function PageUnavailable() {
    return (
        <div id='container-for-page-unavaliable' style={{background:'linear-gradient(45deg, black, maroon)', color: 'white', height: '100vh'}}>
            <div id='title-text' style={{fontSize: '4em'}}>Page is not found</div>
            <div id='error-div' style={{fontSize: '20em'}}>404</div>
            <p style={{padding: '20px', fontSize: '2em'}}>hmm, it seems like that page you're trying to look for is not available at this moment. Try going back to previous page or <Link to='/login' style={{color: 'aqua'}}>Login</Link> page to start afresh </p>
        </div>
    )
}

export default PageUnavailable
