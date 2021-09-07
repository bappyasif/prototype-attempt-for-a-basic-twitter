import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LoginPage from '../login-page';
import ContainerForSignupPage from '../signup-page/containerForLoginPage';
import SignupPageUILogics from '../signup-page/ui-logics';

function AllRoutes() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={SignupPageUILogics} />
                <Route path='/login' component={LoginPage} />
            </Switch>
        </Router>
    )
}

export default AllRoutes
