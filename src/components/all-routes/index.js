import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
// import HomePage from '../user-profile';
import LoginPage from '../login-page';
import LeftSideNavigationPanel from '../navigation-panels/left-side';
import PasswordResetPage from '../password-reset-page';
import BeginReset from '../password-reset-page/begin-reset';
import TopNavigation from '../password-reset-page/top-navigation';
import VerifyUserInfo from '../password-reset-page/verify-user-info';
import ContainerForSignupPage from '../signup-page/containerForLoginPage';
import SignupPageUILogics from '../signup-page/ui-logics';
import UserProfile from '../user-profile';
import AllTweetsPage from '../user-profile/all-tweets';
import ProfilePageUpperView from '../user-profile/profile-page';
// import AllTweetsPage from '../user-profile/profile-page/all-tweets';
import ProfilePageTopNavigationMenuBar from '../user-profile/profile-page/top-menu-navigation';
import TweetsAndRepliesPage from '../user-profile/tweets-and-replies-page';

function AllRoutes() {
    let [tweetData, setTweetData] = useState([]);
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={SignupPageUILogics} />

                <Route path='/login' component={LoginPage} />
                
                <Route path='/begin-password-reset'>
                    <TopNavigation />
                    <BeginReset />
                </Route>

                <Route path='/verify-user-info'>
                    <TopNavigation />
                    <VerifyUserInfo />
                </Route>

                <Route exact path='/user-profile'>
                    <LeftSideNavigationPanel />
                    <ProfilePageUpperView />
                    <UserProfile tweetData={tweetData} setTweetData={setTweetData}/>
                    <AllTweetsPage tweetData={tweetData} />
                </Route>

                <Route path='/user-profile/tweets-and-replies'>
                    <LeftSideNavigationPanel />
                    <ProfilePageUpperView />
                    <TweetsAndRepliesPage tweetData={tweetData} />
                </Route>

                <Route path='/user-profile/media'>
                    
                </Route>

                <Route path='/user-profile/likes'>
                    
                </Route>
            </Switch>
        </Router>
    )
}

export default AllRoutes


/**
 * 
 * 
 function AllRoutes() {
    let [tweetData, setTweetData] = useState([]);
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={SignupPageUILogics} />

                <Route path='/login' component={LoginPage} />
                
                <Route path='/begin-password-reset'>
                    <TopNavigation />
                    <BeginReset />
                </Route>

                <Route path='/verify-user-info'>
                    <TopNavigation />
                    <VerifyUserInfo />
                </Route>

                <Route exact path='/user-profile'>
                    <LeftSideNavigationPanel />
                    <ProfilePageUpperView />
                    <UserProfile tweetData={tweetData} setTweetData={setTweetData}/>
                    {/* <UserProfile tweetData={props.tweetData} setTweetData={props.setTweetData}/> *}
                    {/* <UserProfile /> *}
                    </Route>

                    {/* <Route exact path='/user-profile/'>
                        <UserProfile tweetData={tweetData} setTweetData={setTweetData}/>
                    </Route> *}
    
                    <Route path='/user-profile/tweets-and-replies' render={props=> <TweetsAndRepliesPage tweetData={tweetData} />}>
                        <LeftSideNavigationPanel />
                        <ProfilePageUpperView />
                        <TweetsAndRepliesPage tweetData={tweetData} />
                        {/* <TweetsAndRepliesPage tweetData={props.tweetData} /> *}
                        {/* <TweetsAndRepliesPage /> *}
                    </Route>
    
                    <Route path='/user-profile/media'>
                        
                    </Route>
    
                    <Route path='/user-profile/likes'>
                        
                    </Route>
                </Switch>
            </Router>
        )
    }
 */