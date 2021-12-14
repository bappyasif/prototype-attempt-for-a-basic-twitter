import React, { useEffect, useState } from 'react'
import BeginReset from './begin-reset'
import TopNavigation from './top-navigation'
import VerifyUserInfo from './verify-user-info'

function PasswordResetPage({ passwordResetRoute, handlePasswordResetRoute }) {
    let [route, setRoute] = useState(window.location.href)
    useEffect(() => setRoute(window.location.href), [window.location.href])
    // useEffect(() => setRoute('begin-password-reset'), [])
    // route && console.log(route, route.includes('verify-user-info'), route.includes('begin-password-reset'))
    let handleRoute = (currentRoute) => setRoute(currentRoute)
    // console.log(passwordResetRoute, '??!!')
    return (
        <div className='reset-container'>
            <TopNavigation />
            {/* <BeginReset />
            <VerifyUserInfo /> */}

            {/* {route && route.includes('begin-password-reset') && <BeginReset handleRoute={handleRoute} />}
            {route && route.includes('verify-user-info') && <VerifyUserInfo />} */}

            {/* {passwordResetRoute == 'begin-password-reset' && <BeginReset />}
            {passwordResetRoute == 'verify-user-info' && <VerifyUserInfo />} */}

            {route && route.includes('begin-password-reset') && <BeginReset handleRoute={handleRoute} />}
            {route && route.includes('verify-user-info') && <VerifyUserInfo />}

        </div>
    )
}

export default PasswordResetPage
