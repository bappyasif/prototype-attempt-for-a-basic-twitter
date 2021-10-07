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
import EditTweetMediaContents from '../edit-tweet-media-contents';
import TweetScheduler from '../tweet-modal/schedule-tweet';

function AllRoutes({ count, handleCount }) {
    let [tweetData, setTweetData] = useState([]);
    let [toggleModality, setToggleModality] = useState(false);
    let [primaryTweetText, setPrimaryTweetText] = useState('');
    let [extraTweetText, setExtraTweetText] = useState('');
    let [tweetPrivacy, setTweetPrivacy] = useState('01');
    let [tweetPublishReady, setTweetPublishReady] = useState(false);
    let [selectedFile, setSelectedFile] = useState();
    let [gifFile, setGifFile] = useState('');
    let [inputTextChoice01, setInputTextChoice01] = useState('');
    let [inputTextChoice02, setInputTextChoice02] = useState('');
    let [inputTextChoice03, setInputTextChoice03] = useState('');
    let [inputTextChoice04, setInputTextChoice04] = useState('');
    let [scheduleStamp, setScheduleStamp] = useState('');
    let [isScheduleIconClicked, setIsScheduleIconClicked] = useState(true)
    let [mediaFileDescriptionText, setMediaFileDescriptionText] = useState('Description')

    // useEffect(() => console.log(scheduleStamp, '?!'), [scheduleStamp])

    let handleScheduleIconClicked = () => {
        setIsScheduleIconClicked(!isScheduleIconClicked);
        // if (isPollIconClicked) handlePollIconClicked()
    }

    // let [count, setCount] = useState(0)

    // let handleCount = () => setCount(count+1);

    // useEffect(() => handleCount, [])

    // let handleTextChangesForChoice01 = value => setInputTextChoice01(value)

    // let handleTextChangesForChoice02 = value => setInputTextChoice02(value)

    // let handleTextChangesForChoice03 = value => setInputTextChoice03(value)

    // let handleTextChangesForChoice04 = value => setInputTextChoice04(value)


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
                    <ComposeTweet
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        gifFile={gifFile}
                        setGifFile={setGifFile}
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
                        inputTextChoice01={inputTextChoice01}
                        setInputTextChoice01={setInputTextChoice01}
                        inputTextChoice02={inputTextChoice02}
                        setInputTextChoice02={setInputTextChoice02}
                        inputTextChoice03={inputTextChoice03}
                        setInputTextChoice03={setInputTextChoice03}
                        inputTextChoice04={inputTextChoice04}
                        setInputTextChoice04={setInputTextChoice04}
                        scheduleStamp={scheduleStamp}
                        setScheduleStamp={setScheduleStamp}
                        mediaDescriptionText={mediaFileDescriptionText}
                        setMediaDescriptionText={setMediaFileDescriptionText}
                    />
                </Route>

                <Route exact path='/tweet/compose/schedule'>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <TweetScheduler
                        isScheduleIconClicked={isScheduleIconClicked}
                        handleToggle={handleScheduleIconClicked}
                        setScheduleStamp={setScheduleStamp}
                    />
                </Route>

                <Route exact path='/tweet/compose/media'>
                    <LeftSideNavigationPanel />
                    <EditTweetMediaContents
                        mediaFile={selectedFile}
                        updateMediaFile={setSelectedFile}
                        gifFile={gifFile}
                        mediaDescriptionText={mediaFileDescriptionText}
                        setMediaDescriptionText={setMediaFileDescriptionText}
                    />
                </Route>

                <Route exact path='/user-profile'>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <ProfilePageUpperView />
                    <UserProfile
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        gifFile={gifFile}
                        setGifFile={setGifFile}
                        count={count}
                        handleCount={handleCount}
                        tweetData={tweetData}
                        setTweetData={setTweetData}
                        primaryTweetText={primaryTweetText}
                        extraTweetText={extraTweetText}
                        tweetPrivacy={tweetPrivacy}
                        tweetPublishReady={tweetPublishReady}
                        inputTextChoice01={inputTextChoice01}
                        setInputTextChoice01={setInputTextChoice01}
                        inputTextChoice02={inputTextChoice02}
                        setInputTextChoice02={setInputTextChoice02}
                        inputTextChoice03={inputTextChoice03}
                        setInputTextChoice03={setInputTextChoice03}
                        inputTextChoice04={inputTextChoice04}
                        setInputTextChoice04={setInputTextChoice04}
                    />
                    {/* <UserProfile tweetData={tweetData} setTweetData={setTweetData} primaryTweetText={primaryTweetText} extraTweetText={extraTweetText} tweetPrivacy={tweetPrivacy} tweetPublishReady={tweetPublishReady} /> */}
                </Route>

                <Route path='/user-profile/tweets-and-replies'>
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