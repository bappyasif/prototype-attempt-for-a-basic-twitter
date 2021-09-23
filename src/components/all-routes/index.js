import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
// import HomePage from '../user-profile';
import LoginPage from '../login-page';
import PasswordResetPage from '../password-reset-page';
import BeginReset from '../password-reset-page/begin-reset';
import TopNavigation from '../password-reset-page/top-navigation';
import VerifyUserInfo from '../password-reset-page/verify-user-info';
import ContainerForSignupPage from '../signup-page/containerForLoginPage';
import SignupPageUILogics from '../signup-page/ui-logics';
import UserProfile from '../user-profile';

function AllRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={SignupPageUILogics} />
                <Route path='/login' component={LoginPage} />
                {/* <Route path='/begin-password-reset' component={PasswordResetPage} /> */}
                <Route path='/begin-password-reset'>
                    <TopNavigation />
                    <BeginReset />
                </Route>
                <Route path='/verify-user-info'>
                    <TopNavigation />
                    <VerifyUserInfo />
                </Route>
                {/* <Route path='/home' component={HomePage} /> */}
                <Route path='/user-profile' component={UserProfile} />
                <Route path='/tweets' component={UserProfile} />
                {/* <Route path='/tweets' component={AllTweetsPage} /> */}
                <Route path='/tweets-and-replies' component={UserProfile} />
                <Route path='/media' component={UserProfile} />
                <Route path='/likes' component={UserProfile} />
            </Switch>
        </Router>
    )
}

export default AllRoutes
