import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';
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
import TopicsPicker from '../topics-picker';

function AllRoutes({ currentUser, handleCurrentUser, handleUpdateStatus, updateData, newID, uniqueID, tweetData, newDataStatus, setNewDataStatus, setChangeLayout }) {
    // let [tweetData, setTweetData] = useState([]);
    let [toggleModality, setToggleModality] = useState(false);
    let [primaryTweetText, setPrimaryTweetText] = useState('');
    let [extraTweetText, setExtraTweetText] = useState('');
    let [tweetPrivacy, setTweetPrivacy] = useState('01');
    let [tweetPublishReady, setTweetPublishReady] = useState(false);
    let [selectedFile, setSelectedFile] = useState();
    let [selectedPictureFileForExtraTweet, setSelectedPictureFileForExtraTweet] = useState();
    let [gifFile, setGifFile] = useState('');
    let [gifFileSelectedForExtraTweet, setGifFileSelectedForExtraTweet] = useState('');
    let [inputTextChoice01, setInputTextChoice01] = useState('');
    let [inputTextChoice02, setInputTextChoice02] = useState('');
    let [inputTextChoice03, setInputTextChoice03] = useState('');
    let [inputTextChoice04, setInputTextChoice04] = useState('');
    let [inputTextChoice05, setInputTextChoice05] = useState('');
    let [inputTextChoice06, setInputTextChoice06] = useState('');
    let [inputTextChoice07, setInputTextChoice07] = useState('');
    let [inputTextChoice08, setInputTextChoice08] = useState('');
    let [scheduleStamp, setScheduleStamp] = useState('');
    let [isScheduleIconClicked, setIsScheduleIconClicked] = useState(true)
    let [mediaFileDescriptionText, setMediaFileDescriptionText] = useState('Description')
    // let [newDataStatus, setNewDataStatus] = useState(false)
    let [opacity, setOpacity] = useState(false)
    let [firstTweetHasMedia, setFirstTweetHasMedia] = useState(false)
    let [secondTweetHasMedia, setSecondTweetHasMedia] = useState(false)
    let [firstTweetHasPoll, setFirstTweetHasPoll] = useState(false)
    let [secondTweetHasPoll, setSecondTweetHasPoll] = useState(false)
    let [userInterests, setUserInterests] = useState([])
    let [sanitizedInterestsData, setSanitizedInterestsData] = useState([])

    // let {url} = useRouteMatch()
    // let {id} = useParams()

    let handleUserInterestsData = (data, name) => {
        setUserInterests(prevData => prevData.concat(data))
    }

    useEffect(() => {
        userInterests && userInterests.forEach((item, idx, arr) => {
            let test = {}
            for (let key in item) {
                arr.forEach(it => {
                    for (let k in it) {
                        if (test.hasOwnProperty(k)) {
                            test[k] = it[k]
                        } else {
                            test[k] = it[k]
                        }
                    }
                })
                console.log(test)
                setSanitizedInterestsData({ interests: test })
            }
        })
    }, [userInterests])

    let handleScheduleIconClicked = () => {
        setIsScheduleIconClicked(!isScheduleIconClicked);
        // if (isPollIconClicked) handlePollIconClicked()
    }

    // let [currentUser, setCurrentUser] = useState('')

    // let handleCurrentUser = (userID) => setCurrentUser(userID)

    // console.log(inputTextChoice01, inputTextChoice02, inputTextChoice03, inputTextChoice04, "showing values from routes")

    console.log('from routes', currentUser)


    let handleTweetModalityToggle = () => setToggleModality(!toggleModality);
    return (
        <Router>
            <Switch>
                {/* <Route exact path='/' component={LandingPageUILogics} /> */}
                <Route exact path='/'>
                    <LandingPageUILogics
                        currentUser={currentUser}
                        handleCurrentUser={handleCurrentUser}
                    />
                </Route>

                {/* <Route path='/login' component={LoginPage} /> */}
                <Route path='/login'>
                    <LoginPage
                        currentUser={currentUser}
                        handleCurrentUser={handleCurrentUser}
                    />
                </Route>

                {/* <Route path='/i/flow/signup' component={SignupPage} /> */}
                <Route path='/i/flow/signup'>
                    <SignupPage
                        currentUser={currentUser}
                        handleCurrentUser={handleCurrentUser}
                        handleData={handleUserInterestsData} 
                        sanitizedData={sanitizedInterestsData}
                    />
                </Route>

                <Route path='/begin-password-reset'>
                    <TopNavigation />
                    <BeginReset />
                </Route>

                <Route path='/verify-user-info'>
                    <TopNavigation />
                    <VerifyUserInfo />
                </Route>

                <Route exact path='/i/topics/picker/home'>
                    <LeftSideNavigationPanel opacity={opacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser}/>
                    <TopicsPicker handleData={handleUserInterestsData} sanitizedData={sanitizedInterestsData} currentUser={currentUser} />
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                </Route>

                <Route exact path='/tweet/compose'>
                    {/* {setChangeLayout(true)} */}
                    <LeftSideNavigationPanel opacity={opacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser}/>
                    <ComposeTweet
                        selectedFile={selectedFile}
                        extraSelectedFile={selectedPictureFileForExtraTweet}
                        setSelectedFile={setSelectedFile}
                        setExtraSelectedFile={setSelectedPictureFileForExtraTweet}
                        gifFile={gifFile}
                        extraGifFile={gifFileSelectedForExtraTweet}
                        setGifFile={setGifFile}
                        setExtraGifFile={setGifFileSelectedForExtraTweet}
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
                        inputTextChoice05={inputTextChoice05}
                        setInputTextChoice05={setInputTextChoice05}
                        inputTextChoice06={inputTextChoice06}
                        setInputTextChoice06={setInputTextChoice06}
                        inputTextChoice07={inputTextChoice07}
                        setInputTextChoice07={setInputTextChoice07}
                        inputTextChoice08={inputTextChoice08}
                        setInputTextChoice08={setInputTextChoice08}
                        scheduleStamp={scheduleStamp}
                        setScheduleStamp={setScheduleStamp}
                        mediaDescriptionText={mediaFileDescriptionText}
                        setMediaDescriptionText={setMediaFileDescriptionText}
                        setNewDataStatus={setNewDataStatus}
                        setChangeLayout={setChangeLayout}
                        setOpacity={setOpacity}
                        opacity={opacity}
                        firstTweetHasMedia={firstTweetHasMedia}
                        setFirstTweetHasMedia={setFirstTweetHasMedia}
                        secondTweetHasMedia={secondTweetHasMedia}
                        setSecondTweetHasMedia={setSecondTweetHasMedia}
                        firstTweetHasPoll={firstTweetHasPoll}
                        setFirstTweetHasPoll={setFirstTweetHasPoll}
                        secondTweetHasPoll={secondTweetHasPoll}
                        setSecondTweetHasPoll={setSecondTweetHasPoll}
                        currentUser={currentUser}
                    />
                    {/* <ProfilePageUpperView /> */}
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                    {/* <RightSideNavigationPanel tweetData={tweetData && tweetData} opacity={opacity} /> */}
                </Route>

                <Route exact path='/tweet/compose/schedule'>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser}/>
                    <TweetScheduler
                        isScheduleIconClicked={isScheduleIconClicked}
                        handleToggle={handleScheduleIconClicked}
                        setScheduleStamp={setScheduleStamp}
                    />
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                <Route exact path='/tweet/compose/media'>
                <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser}/>
                    <EditTweetMediaContents
                        mediaFile={selectedFile}
                        updateMediaFile={setSelectedFile}
                        gifFile={gifFile}
                        mediaDescriptionText={mediaFileDescriptionText}
                        setMediaDescriptionText={setMediaFileDescriptionText}
                    />
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                <Route exact path={`/${currentUser}`}>
                    {/* {setChangeLayout(false)} */}
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                    <ProfilePageUpperView currentUser={currentUser} />
                    <RightSideNavigationPanel tweetData={tweetData} />
                    <UserProfile
                        selectedFile={selectedFile}
                        extraSelectedFile={selectedPictureFileForExtraTweet}
                        setSelectedFile={setSelectedFile}
                        setExtraSelectedFile={setSelectedPictureFileForExtraTweet}
                        gifFile={gifFile}
                        extraGifFile={gifFileSelectedForExtraTweet}
                        setGifFile={setGifFile}
                        setExtraGifFile={setGifFileSelectedForExtraTweet}
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
                        inputTextChoice05={inputTextChoice05}
                        setInputTextChoice05={setInputTextChoice05}
                        inputTextChoice06={inputTextChoice06}
                        setInputTextChoice06={setInputTextChoice06}
                        inputTextChoice07={inputTextChoice07}
                        setInputTextChoice07={setInputTextChoice07}
                        inputTextChoice08={inputTextChoice08}
                        setInputTextChoice08={setInputTextChoice08}
                        setNewDataStatus={setNewDataStatus}
                        newDataStatus={newDataStatus}
                        setChangeLayout={setChangeLayout}
                        uniqueID={uniqueID}
                        newID={newID}
                        updateData={updateData}
                        firstTweetHasMedia={firstTweetHasMedia}
                        setFirstTweetHasMedia={setFirstTweetHasMedia}
                        secondTweetHasMedia={secondTweetHasMedia}
                        setSecondTweetHasMedia={setSecondTweetHasMedia}
                        firstTweetHasPoll={firstTweetHasPoll}
                        setFirstTweetHasPoll={setFirstTweetHasPoll}
                        secondTweetHasPoll={secondTweetHasPoll}
                        setSecondTweetHasPoll={setSecondTweetHasPoll}
                        handleUpdateStatus={handleUpdateStatus}
                        currentUser={currentUser && currentUser}
                    />
                </Route>

                <Route path={`/${currentUser}/profile`}>
                    <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                    {currentUser && <EditProfile currentUser={currentUser} setOpacity={setOpacity} />}
                    {/* <EditProfile currentUser={currentUser} setOpacity={setOpacity} /> */}
                    {/* { currentUserID && <EditProfile currentUser={currentUserID} setOpacity={setOpacity} />} */}
                    {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                </Route>

                <Route path={`/${currentUser}/tweets-and-replies`}>
                    {/* {tweetPublishReady && setTweetPublishReady(false)} */}
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                    {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                    <TweetsAndRepliesPage tweetData={tweetData} />
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                <Route path={`/${currentUser}/media`}>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle}  currentUser={currentUser}/>
                    {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                    <AllMedias tweetData={tweetData} />
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                <Route path={`/${currentUser}/likes`}>

                </Route>
            </Switch>
        </Router>
    )
}

export default AllRoutes