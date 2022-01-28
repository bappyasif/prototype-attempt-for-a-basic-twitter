import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams, Redirect } from 'react-router-dom';
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
import PasswordResetPage from '../password-reset-page';
import PageUnavailable from '../404-page';
import AnalyticsUI from '../user-profile/all-tweets/tweet-top/analytics-ui';
import AddMemebersIntoLists from '../user-profile/all-tweets/tweet-top/add-members-into-lists';
import CreateLists from '../user-profile/all-tweets/tweet-top/create-lists';
import SuggestedMembersForList from '../user-profile/all-tweets/tweet-top/suggested-members';
import ListOfAddedMembers from '../user-profile/all-tweets/tweet-top/list-of-added-members';
import ShowListExistingMembers from '../user-profile/all-tweets/tweet-top/add-members-into-lists/show-existing-members-list';
import ShowTweetThread from '../user-profile/all-tweets/show-tweet-thread';
import TagLocation from '../user-profile/all-tweets/show-tweet-thread/tag-location';
import RetweetsWithCommentsThread from '../user-profile/all-tweets/retweet-with-comments-thread';

function AllRoutes({ updateSomeDataInUserDocs, handleRepliedTweets, quotesListFromRetweet, handleQuotesListFromRetweet, quotedFromRetweetModal, handleQuotedFromRetweetModal, currentUserProfileInfo, updateRepliedTweetsOnThread, repliedTweetsIDs, handleLoadingTweetsIDs, taggedPlaceInfoInUserProfile, selectedTaggedPlace, handleSelectedTaggedPlace, repliedTweets, threadedTweetData, handleThreadedTweetData, pollVotesCount, handlePollVotesCount, handleQuoteTweetData, checkMemberExists, handleMembersRemoval, membersList, handleMembersList, listMembersCount, handleMembersCount, currentList, handleCurrentList, currentlyPinnedTweetID, showPinnedTweetTag, handlePinnedTweetID, handleReplyCount, replyCount, quoteTweetID, quoteTweetData, handleQuoteTweetID, analysingTweetData, handleAnalysingTweetID, analysingTweetID, updateTweetPrivacy, removeSpeceficArrayItem, currentUser, handleCurrentUser, handleUpdateStatus, updateData, newID, uniqueID, tweetData, newDataStatus, setNewDataStatus, setChangeLayout }) {
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
    let [scheduledTimeStamp, setScheduledTimeStamp] = useState('')
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
    // let [currentRoute, setCurrentRoute] = useState('')
    // let [protectedRoute, setProtectedRoute] = useState(false)
    // let [passwordResetRoute, setPasswordResetRoute] = useState('begin-password-reset')

    // let handlePasswordResetRoute = currentRoute => setPasswordResetRoute(currentRoute)

    // let {url} = useRouteMatch()
    // let {id} = useParams()

    // let handleScheduleIconClicked = () => setIsScheduleIconClicked(true)

    // useEffect(() => {
    //     setCurrentRoute(window.location.href)
    // }, [])

    // useEffect(() => {
    //     currentRoute && console.log(currentRoute, '?!')
    //     currentRoute && currentRoute.split('/')[5] == 'compose' && console.log('here!!')
    // }, [currentRoute])

    // useEffect(() => {
    //     currentRoute && console.log(currentRoute.split('/'), '<<ccurrent route>>', currentRoute.split('/')[3].length)
    //     let restrictedRoute = currentRoute.split('/')[3]
    //     if(!currentUser && restrictedRoute) {
    //         setTimeout(() => {
    //             console.log('running....')
    //             setProtectedRoute(true)
    //             return <Redirect to={'/login'}/>
    //         }, 4000)
    //     }
    // }, [currentRoute])

    useEffect(() => {
        scheduleStamp && console.log(scheduleStamp.props.children[2].props.children)
        scheduleStamp && setScheduledTimeStamp(scheduleStamp.props.children[2].props.children)
    }, [scheduleStamp])

    // useEffect(() => !tweetPublishReady && setScheduledTimeStamp(''), [tweetPublishReady])

    // useEffect(() => isScheduleIconClicked && handleTweetModalityToggle(), [isScheduleIconClicked])
    // useEffect(() => isScheduleIconClicked && setToggleModality(true), [isScheduleIconClicked])

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
        // setIsScheduleIconClicked(!isScheduleIconClicked);
        setIsScheduleIconClicked(true);
        // if (isPollIconClicked) handlePollIconClicked()
    }

    // useEffect(() => {
    //     !newDataStatus && toggleModality && quoteTweetID && handleQuoteTweetData(null)
    // }, [toggleModality])

    // let [currentUser, setCurrentUser] = useState('')

    // let handleCurrentUser = (userID) => setCurrentUser(userID)

    // console.log(inputTextChoice01, inputTextChoice02, inputTextChoice03, inputTextChoice04, "showing values from routes")

    console.log(toggleModality, 'from routes', currentUser)


    let handleTweetModalityToggle = () => {
        setToggleModality(!toggleModality);
        // setToggleModality(true);
        // console.log('its here')
    }

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
                <Route exact path={'/analytics'}>
                    <AnalyticsUI analysingTweetID={analysingTweetID} analysingTweetData={analysingTweetData} currentUser={currentUser} handlePollVotesCount={handlePollVotesCount} />
                </Route>

                <Route exact path={'/i/lists/add_member'}>
                    <AddMemebersIntoLists currentList={currentList} currentUser={currentUser} />
                </Route>

                <Route exact path={'/i/lists/create'}>
                    <CreateLists handleCurrentList={handleCurrentList} />
                </Route>

                <Route exact path={'/i/list/members/'}>
                    <ShowListExistingMembers handleMembersList={handleMembersRemoval} currentMembers={membersList} checkMemberExists={checkMemberExists} currentList={currentList} />
                </Route>

                <Route exact path={'/i/lists/members/'}>
                    <ListOfAddedMembers currentList={currentList} currentUser={currentUser} handleCurrentList={handleCurrentList} listMembersCount={listMembersCount} handleMembersCount={handleMembersCount} currentMembers={membersList} checkMemberExists={checkMemberExists} handleMembersList={handleMembersRemoval} currentList={currentList} />
                </Route>

                <Route exact path={'/i/lists/members/suggested'}>
                    <SuggestedMembersForList currentUser={currentUser} handleCurrentList={handleCurrentList} listMembersCount={listMembersCount} handleMembersCount={handleMembersCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} currentMembers={membersList} currentList={currentList} />
                </Route>

                <Route exact path={'/status/tweetID'}>
                    <ShowTweetThread threadedTweetData={threadedTweetData} currentUser={currentUser} uniqueID={uniqueID} updateData={updateData} primaryTweetText={primaryTweetText} setPrimaryTweetText={setPrimaryTweetText} selectedFile={selectedFile} setSelectedFile={setSelectedFile} selectedGif={gifFile} setSelectedGif={setGifFile} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} removeSpeceficArrayItem={removeSpeceficArrayItem} repliedTweetsIDs={repliedTweetsIDs} handleLoadingTweetsIDs={handleLoadingTweetsIDs} handlePinnedTweetID={handlePinnedTweetID} updateTweetPrivacy={updateTweetPrivacy} updateRepliedTweetsOnThread={updateRepliedTweetsOnThread} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleReplyCount={handleReplyCount} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} quotesListFromRetweet={quotesListFromRetweet} />
                </Route>

                <Route exact path={'/retweets/with_comments'}>
                    <RetweetsWithCommentsThread currentUser={currentUser} quotedTweetID={quoteTweetID} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} handleThreadedTweetData={handleThreadedTweetData} />
                </Route>

                <Route exact path={'/compose/tweet/place_picker'}>
                    <TagLocation currentUser={currentUser} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} taggedPlaceInfoInUserProfile={taggedPlaceInfoInUserProfile} />
                </Route>

                {/* {
                protectedRoute && <Redirect to='/login'>
                    <LoginPage
                        currentUser={currentUser}
                        handleCurrentUser={handleCurrentUser}
                    />
                    <h4>!!</h4>
                </Redirect>
                } */}

                {/* {
                    protectedRoute && <Redirect to={{pathname: '/login'}}>
                        <Link to={'/login'}>Login</Link>
                    </Redirect>
                } */}

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
                    <PasswordResetPage />
                    {/* <PasswordResetPage passwordResetRoute={passwordResetRoute} handlePasswordResetRoute={handlePasswordResetRoute} /> */}
                </Route>

                <Route path='/verify-user-info'>
                    <PasswordResetPage />
                    {/* <PasswordResetPage passwordResetRoute={passwordResetRoute} handlePasswordResetRoute={handlePasswordResetRoute} /> */}
                    {/* <TopNavigation />
                    <VerifyUserInfo /> */}
                </Route>

                <Route exact path='/i/topics/picker/home'>
                    <LeftSideNavigationPanel opacity={opacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                    <TopicsPicker handleData={handleUserInterestsData} sanitizedData={sanitizedInterestsData} currentUser={currentUser} />
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                </Route>

                <Route exact path='/tweet/compose'>
                    {/* {setChangeLayout(true)} */}
                    <LeftSideNavigationPanel opacity={opacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
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
                        quoteTweetData={quoteTweetData}
                        handleQuoteTweetID={handleQuoteTweetID}
                        pollVotesCount={pollVotesCount}
                        handlePollVotesCount={handlePollVotesCount}
                        selectedTaggedPlace={selectedTaggedPlace}
                        quotedFromRetweetModal={quotedFromRetweetModal}
                    />
                    {/* <ProfilePageUpperView /> */}
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                    {/* <RightSideNavigationPanel tweetData={tweetData && tweetData} opacity={opacity} /> */}
                </Route>

                <Route exact path='/tweet/compose/schedule'>
                    <LeftSideNavigationPanel opacity={opacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                    <TweetScheduler
                        isScheduleIconClicked={isScheduleIconClicked}
                        handleToggle={handleScheduleIconClicked}
                        setScheduleStamp={setScheduleStamp}
                    // handleTweetModalityToggle={handleTweetModalityToggle}
                    />
                    <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                </Route>

                <Route exact path='/tweet/compose/media'>
                    <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                    <EditTweetMediaContents
                        mediaFile={selectedFile}
                        updateMediaFile={setSelectedFile}
                        gifFile={gifFile}
                        mediaDescriptionText={mediaFileDescriptionText}
                        setMediaDescriptionText={setMediaFileDescriptionText}
                    />
                    <RightSideNavigationPanel tweetData={tweetData} />
                </Route>

                {
                    currentUser
                        ?
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
                                setPrimaryTweetText={setPrimaryTweetText}
                                extraTweetText={extraTweetText}
                                setExtraTweetText={setExtraTweetText}
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
                                scheduledTimeStamp={scheduledTimeStamp}
                                setScheduledTimeStamp={setScheduledTimeStamp}
                                removeSpeceficArrayItem={removeSpeceficArrayItem}
                                updateTweetPrivacy={updateTweetPrivacy}
                                handleAnalysingTweetID={handleAnalysingTweetID}
                                handleQuoteTweetID={handleQuoteTweetID}
                                quoteTweetData={quoteTweetData}
                                quoteTweetID={quoteTweetID}
                                handleReplyCount={handleReplyCount}
                                replyCount={replyCount}
                                handlePinnedTweetID={handlePinnedTweetID}
                                showPinnedTweetTag={showPinnedTweetTag}
                                currentlyPinnedTweetID={currentlyPinnedTweetID}
                                handlePollVotesCount={handlePollVotesCount}
                                handleThreadedTweetData={handleThreadedTweetData}
                                repliedTweets={repliedTweets}
                                selectedTaggedPlace={selectedTaggedPlace}
                                currentUserProfileInfo={currentUserProfileInfo}
                                handleQuotedFromRetweetModal={handleQuotedFromRetweetModal}
                                quotedFromRetweetModal={quotedFromRetweetModal}
                                quotesListFromRetweet={quotesListFromRetweet}
                                handleQuotesListFromRetweet={handleQuotesListFromRetweet}
                                handleRepliedTweets={handleRepliedTweets}
                                updateSomeDataInUserDocs={updateSomeDataInUserDocs}
                            />
                        </Route>
                        :
                        // <Redirect to='/login' />
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/profile`}>
                            <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                            {currentUser && <EditProfile currentUser={currentUser} setOpacity={setOpacity} />}
                            {/* <EditProfile currentUser={currentUser} setOpacity={setOpacity} /> */}
                            {/* { currentUserID && <EditProfile currentUser={currentUserID} setOpacity={setOpacity} />} */}
                            {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                            <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} />
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/tweets-and-replies`}>
                            {/* {tweetPublishReady && setTweetPublishReady(false)} */}
                            <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                            {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                            <TweetsAndRepliesPage currentUser={currentUser} tweetData={tweetData} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} quoteTweetData={quoteTweetData} quoteTweetID={quoteTweetID} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} showPinnedTweetTag={showPinnedTweetTag} currentlyPinnedTweetID={currentlyPinnedTweetID} />
                            <RightSideNavigationPanel tweetData={tweetData} />
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                        // <Redirect to='/login' />
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/media`}>
                            <LeftSideNavigationPanel toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                            {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                            {/* <AllMedias tweetData={tweetData} handleAnalysingTweetID={handleAnalysingTweetID} /> */}
                            <AllMedias tweetData={tweetData} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} />
                            <RightSideNavigationPanel tweetData={tweetData} />
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/likes`}>

                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                <Route path={'*'}>
                    {/* {setTimeout(() => {
                        console.log('runnig....')
                        return <PageUnavailable />
                    }, 4000)} */}
                    {!currentUser && <PageUnavailable />}
                </Route>
            </Switch>
        </Router>
    )
}

export default AllRoutes