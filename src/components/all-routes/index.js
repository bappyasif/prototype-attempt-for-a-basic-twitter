import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import HomePage from '../user-profile';
import LoginPage from '../login-page';
import LeftSideNavigationPanel from '../navigation-panels/left-side';
import PasswordResetPage from '../password-reset-page';
import BeginReset from '../password-reset-page/begin-reset';
import TopNavigation from '../password-reset-page/top-navigation';
import VerifyUserInfo from '../password-reset-page/verify-user-info';
import ContainerForSignupPage from '../signup-page/containerForLoginPage';
import SignupPageUILogics from '../signup-page/ui-logics';
import TweetCompose, { tweetPrivacySelected01, tweetPrivacySelected02, tweetPrivacySelected03 } from '../tweet-modal';
import ComposeTweet from '../compose-tweet';
import UserProfile from '../user-profile';
import AllTweetsPage from '../user-profile/all-tweets';
import ProfilePageUpperView from '../user-profile/profile-page';
// import AllTweetsPage from '../user-profile/profile-page/all-tweets';
import ProfilePageTopNavigationMenuBar from '../user-profile/profile-page/top-menu-navigation';
import TweetsAndRepliesPage from '../user-profile/tweets-and-replies-page';

function AllRoutes() {
    let [tweetData, setTweetData] = useState([]);
    let [toggleModality, setToggleModality] = useState(false);
    let [primaryTweetText, setPrimaryTweetText] = useState('');
    let [extraTweetText, setExtraTweetText] = useState('');
    let [tweetPrivacy, setTweetPrivacy] = useState('01');
    let [tweetPublishReady, setTweetPublishReady] = useState(false);

    // useEffect(() => {
    //     setTweetData([...tweetData, {tweetText: primaryTweetText, extraTweet: extraTweetText, tweetPrivacy: getPrivacySelectedElement(tweetPrivacy)}])
    // }, [tweetPublishReady])

    // let getPrivacySelectedElement = whichOption => {
    //     switch(whichOption) {
    //         case '01':
    //             return tweetPrivacySelected01()
    //         case '02':
    //             return tweetPrivacySelected02()
    //         case '03':
    //             return tweetPrivacySelected03()
    //         default: console.log('somethigs wrong!!')
    //     }
    // }

    let handleTweetModalityToggle = () => setToggleModality(!toggleModality);
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

                <Route exact path='/tweet/compose'>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    {/* <LeftSideNavigationPanel toggleModality={toggleModality} setToggleModality={setToggleModality} /> */}
                    {/* naming of it could be adjusted appropriately when necessary */}
                    {/* <UserProfile tweetData={tweetData} setTweetData={setTweetData}/> */}
                    {/* <ComposeTweet tweetData={tweetData} setTweetData={setTweetData} toggleModality={toggleModality} setToggleModality={setToggleModality} /> */}
                    <ComposeTweet
                        toggleModality={toggleModality}
                        handleTweetModalToggle={handleTweetModalityToggle}
                        primaryTweetText={primaryTweetText}
                        extraTweetText={extraTweetText}
                        tweetPrivacy={tweetPrivacy}
                        tweetPublishReady={tweetPublishReady}
                        setPrimaryTweetText={setPrimaryTweetText}
                        setExtraTweetText={setExtraTweetText}
                        setTweetPrivacy={setTweetPrivacy}
                        setTweetPublishReady={setTweetPublishReady}
                    />
                    {/* <AllTweetsPage tweetData={tweetData} /> */}
                    {/* {<TweetCompose />} */}
                </Route>

                <Route exact path='/tweet/compose/media'>
                    <LeftSideNavigationPanel />
                    {/* <UserProfile tweetData={tweetData} setTweetData={setTweetData}/> */}
                    {/* another modal alike view for media (text, for now) edit */}
                </Route>

                <Route exact path='/user-profile'>
                    {/* <LeftSideNavigationPanel /> */}
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <ProfilePageUpperView />
                    {/* <UserProfile tweetData={tweetData} setTweetData={setTweetData} /> */}
                    <UserProfile tweetData={tweetData} setTweetData={setTweetData} primaryTweetText={primaryTweetText} extraTweetText={extraTweetText} tweetPrivacy={tweetPrivacy} tweetPublishReady={tweetPublishReady} />
                    {/* {console.log(tweetData)} */}
                    {/* <AllTweetsPage tweetData={tweetData} /> */}
                    {/* <AllTweetsPage tweetData={tweetData} tweetPublishReady={tweetPublishReady} /> */}
                </Route>

                <Route path='/user-profile/tweets-and-replies'>
                    {/* <LeftSideNavigationPanel /> */}
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
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