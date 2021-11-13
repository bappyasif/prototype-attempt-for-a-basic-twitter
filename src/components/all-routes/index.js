import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginPage from '../login-page';
import LeftSideNavigationPanel from '../navigation-panels/left-side';
import BeginReset from '../password-reset-page/begin-reset';
import TopNavigation from '../password-reset-page/top-navigation';
import VerifyUserInfo from '../password-reset-page/verify-user-info';
import ComposeTweet from '../compose-tweet';
import UserProfile from '../user-profile';
import ProfilePageUpperView from '../user-profile/profile-page';
import TweetsAndRepliesPage from '../user-profile/tweets-and-replies-page';
import EditTweetMediaContents from '../edit-tweet-media-contents';
import TweetScheduler from '../tweet-modal/schedule-tweet';
import AllMedias from '../user-profile/all-medias';
import RightSideNavigationPanel from '../navigation-panels/right-side';
import EditProfile from '../user-profile/profile-page/edit-profile';
import LandingPageUILogics from '../landing-page/ui-logics';
import SignupPage from '../signup-page';
import { getAllDocsOnce, readDataInRealtime } from '../firestore-methods';

function AllRoutes({updateData, newID, uniqueID, tweetData, newDataStatus, setNewDataStatus, setChangeLayout }) {
    // let [tweetData, setTweetData] = useState([]);
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
    // let [newDataStatus, setNewDataStatus] = useState(false)
    let [opacity, setOpacity] = useState(false)

    let handleScheduleIconClicked = () => {
        setIsScheduleIconClicked(!isScheduleIconClicked);
        // if (isPollIconClicked) handlePollIconClicked()
    }


    let handleTweetModalityToggle = () => setToggleModality(!toggleModality);
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={LandingPageUILogics} />

                <Route path='/login' component={LoginPage} />

                <Route path='/i/flow/signup' component={SignupPage} />

                <Route path='/begin-password-reset'>
                    <TopNavigation />
                    <BeginReset />
                </Route>

                <Route path='/verify-user-info'>
                    <TopNavigation />
                    <VerifyUserInfo />
                </Route>

                <Route exact path='/tweet/compose'>
                    {/* {setChangeLayout(true)} */}
                    <LeftSideNavigationPanel opacity={opacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
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
                        setNewDataStatus={setNewDataStatus}
                        setChangeLayout={setChangeLayout}
                        setOpacity={setOpacity}
                        opacity={opacity}
                    />
                    {/* <ProfilePageUpperView /> */}
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                    {/* <RightSideNavigationPanel tweetData={tweetData && tweetData} opacity={opacity} /> */}
                </Route>

                <Route exact path='/tweet/compose/schedule'>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <TweetScheduler
                        isScheduleIconClicked={isScheduleIconClicked}
                        handleToggle={handleScheduleIconClicked}
                        setScheduleStamp={setScheduleStamp}
                    />
                    <RightSideNavigationPanel tweetData={tweetData} />
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
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                <Route exact path='/username'>
                    {/* {setChangeLayout(false)} */}
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <ProfilePageUpperView />
                    <RightSideNavigationPanel tweetData={tweetData} />
                    <UserProfile
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        gifFile={gifFile}
                        setGifFile={setGifFile}
                        tweetData={tweetData}
                        primaryTweetText={primaryTweetText}
                        extraTweetText={extraTweetText}
                        tweetPrivacy={tweetPrivacy}
                        tweetPublishReady={tweetPublishReady}
                        setTweetPublishReady={setTweetPublishReady}
                        inputTextChoice01={inputTextChoice01}
                        setInputTextChoice01={setInputTextChoice01}
                        inputTextChoice02={inputTextChoice02}
                        setInputTextChoice02={setInputTextChoice02}
                        inputTextChoice03={inputTextChoice03}
                        setInputTextChoice03={setInputTextChoice03}
                        inputTextChoice04={inputTextChoice04}
                        setInputTextChoice04={setInputTextChoice04}
                        setNewDataStatus={setNewDataStatus}
                        newDataStatus={newDataStatus}
                        setChangeLayout={setChangeLayout}
                        uniqueID={uniqueID}
                        newID={newID}
                        updateData={updateData}
                    />
                </Route>

                <Route path='/username/profile'>
                    <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <EditProfile setOpacity={setOpacity} />
                    <ProfilePageUpperView opacity={opacity} />
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                </Route>

                <Route path='/username/tweets-and-replies'>
                    {/* {tweetPublishReady && setTweetPublishReady(false)} */}
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <ProfilePageUpperView />
                    <TweetsAndRepliesPage tweetData={tweetData} />
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                <Route path='/username/media'>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} />
                    <ProfilePageUpperView />
                    <AllMedias tweetData={tweetData} />
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                <Route path='/username/likes'>

                </Route>
            </Switch>
        </Router>
    )
}

export default AllRoutes