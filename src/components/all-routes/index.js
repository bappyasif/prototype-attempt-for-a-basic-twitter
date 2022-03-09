import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../login-page';
import LeftSideNavigationPanel from '../navigation-panels/left-side';
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
import SignupPage from '../signup-page'
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
import TrendsModal from '../navigation-panels/right-side/current-trends/trends-modal';
import RenderLengthyFollowList from '../navigation-panels/right-side/follow-suggested-people-component/show-lengthy-follow-list';
import RenderHomePageView from '../navigation-panels/left-side/home-page';
import RenderExplorePage from '../navigation-panels/left-side/explore-page';
import ExplicitTrendsOnClick from '../navigation-panels/right-side/explicit-trends-on-click';
import LikedTweets from '../user-profile/liked-tweets';

function AllRoutes({ removeFromLikedTweets, likedTweets, handleLikedTweets, hideFirstPollReply, handleExplicitTrendSearchText, explicitTrendSearchText, listOfRandomUsers, listName, handleListName, updateExistingListData, updateSomeDataInUserDocs, handleRepliedTweets, quotesListFromRetweet, handleQuotesListFromRetweet, quotedFromRetweetModal, handleQuotedFromRetweetModal, currentUserProfileInfo, updateRepliedTweetsOnThread, repliedTweetsIDs, handleLoadingTweetsIDs, taggedPlaceInfoInUserProfile, selectedTaggedPlace, handleSelectedTaggedPlace, repliedTweets, threadedTweetData, handleThreadedTweetData, pollVotesCount, handlePollVotesCount, handleQuoteTweetData, checkMemberExists, handleMembersRemoval, membersList, handleMembersList, listMembersCount, handleMembersCount, currentList, handleCurrentList, currentlyPinnedTweetID, showPinnedTweetTag, handlePinnedTweetID, handleReplyCount, replyCount, quoteTweetID, quoteTweetData, handleQuoteTweetID, analysingTweetData, handleAnalysingTweetID, analysingTweetID, updateTweetPrivacy, removeSpeceficArrayItem, currentUser, handleCurrentUser, handleUpdateStatus, updateData, newID, uniqueID, tweetData, newDataStatus, setNewDataStatus, setChangeLayout }) {
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
    let [opacity, setOpacity] = useState(false)
    let [firstTweetHasMedia, setFirstTweetHasMedia] = useState(false)
    let [secondTweetHasMedia, setSecondTweetHasMedia] = useState(false)
    let [firstTweetHasPoll, setFirstTweetHasPoll] = useState(false)
    let [secondTweetHasPoll, setSecondTweetHasPoll] = useState(false)
    let [userInterests, setUserInterests] = useState([])
    let [sanitizedInterestsData, setSanitizedInterestsData] = useState([])
    
    useEffect(() => {
        scheduleStamp && console.log(scheduleStamp.props.children[2].props.children)
        scheduleStamp && setScheduledTimeStamp(scheduleStamp.props.children[2].props.children)
    }, [scheduleStamp])

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
        setIsScheduleIconClicked(true);
    }

    let handleTweetModalityToggle = () => {
        setToggleModality(!toggleModality);
    }

    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <LandingPageUILogics
                        currentUser={currentUser}
                        handleCurrentUser={handleCurrentUser}
                    />
                </Route>

                <Route exact path={'/explicit_trends/'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <ExplicitTrendsOnClick explicitTrendSearchText={explicitTrendSearchText} handleExplicitTrendSearchText={handleExplicitTrendSearchText} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/home'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <RenderHomePageView
                            currentUser={currentUser} tweetText={primaryTweetText} extraTweetText={extraTweetText} gifFile={gifFile}
                            extraGifFile={gifFileSelectedForExtraTweet} selectedFile={selectedFile} extraSelectedFile={selectedPictureFileForExtraTweet}
                            setExtraTweetText={setExtraTweetText} setTweetText={setPrimaryTweetText} setGifFile={setGifFile} setExtraGifFile={setGifFileSelectedForExtraTweet}
                            setSelectedFile={setSelectedFile} setExtraSelectedFile={setSelectedPictureFileForExtraTweet} tweetPrivacy={tweetPrivacy} tweetPublishReady={tweetPublishReady} setTweetPrivacy={setTweetPrivacy} setTweetPublishReady={setTweetPublishReady}
                            inputTextChoice01={inputTextChoice01} setInputTextChoice01={setInputTextChoice01} inputTextChoice02={inputTextChoice02} setInputTextChoice02={setInputTextChoice02}
                            inputTextChoice03={inputTextChoice03} setInputTextChoice03={setInputTextChoice03} inputTextChoice04={inputTextChoice04} setInputTextChoice04={setInputTextChoice04}
                            inputTextChoice05={inputTextChoice05} setInputTextChoice05={setInputTextChoice05} inputTextChoice06={inputTextChoice06} setInputTextChoice06={setInputTextChoice06}
                            inputTextChoice07={inputTextChoice07} setInputTextChoice07={setInputTextChoice07} inputTextChoice08={inputTextChoice08} setInputTextChoice08={setInputTextChoice08}
                            scheduleStamp={scheduleStamp} setScheduleStamp={setScheduleStamp} mediaDescriptionText={mediaFileDescriptionText} setMediaDescriptionText={setMediaFileDescriptionText} setNewDataStatus={setNewDataStatus}
                            firstTweetHasMedia={firstTweetHasMedia} setFirstTweetHasMedia={setFirstTweetHasMedia} secondTweetHasMedia={secondTweetHasMedia} setSecondTweetHasMedia={setSecondTweetHasMedia}
                            firstTweetHasPoll={firstTweetHasPoll} setFirstTweetHasPoll={setFirstTweetHasPoll} secondTweetHasPoll={secondTweetHasPoll} setSecondTweetHasPoll={setSecondTweetHasPoll}
                        />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/explore'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <RenderExplorePage />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/analytics'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={true} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <AnalyticsUI analysingTweetID={analysingTweetID} analysingTweetData={analysingTweetData} currentUser={currentUser} handlePollVotesCount={handlePollVotesCount} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={true} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/i/lists/add_member'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={true} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <AddMemebersIntoLists handleListName={handleListName} currentList={currentList} currentUser={currentUser} updateExistingListData={updateExistingListData} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={true} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/i/lists/create'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={true} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <CreateLists handleCurrentList={handleCurrentList} handleMembersList={handleMembersList} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={true} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/i/list/members/'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={true} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <ShowListExistingMembers updateExistingListData={updateExistingListData} listName={listName} currentList={currentList} handleMembersList={handleMembersRemoval} currentMembers={membersList} checkMemberExists={checkMemberExists} currentList={currentList} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={true} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/i/lists/members/'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={true} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <ListOfAddedMembers listName={listName} currentList={currentList} currentUser={currentUser} handleCurrentList={handleCurrentList} listMembersCount={listMembersCount} handleMembersCount={handleMembersCount} currentMembers={membersList} checkMemberExists={checkMemberExists} handleMembersRemoval={handleMembersRemoval} currentList={currentList} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={true} listOfRandomUsersv={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/i/lists/members/suggested'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <SuggestedMembersForList listName={listName} currentUser={currentUser} handleCurrentList={handleCurrentList} listMembersCount={listMembersCount} handleMembersCount={handleMembersCount} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} currentMembers={membersList} currentList={currentList} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/i/connect_people'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <RenderLengthyFollowList listOfRandomUsers={listOfRandomUsers} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/status/tweetID'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <ShowTweetThread threadedTweetData={threadedTweetData} currentUser={currentUser} uniqueID={uniqueID} updateData={updateData} primaryTweetText={primaryTweetText} setPrimaryTweetText={setPrimaryTweetText} selectedFile={selectedFile} setSelectedFile={setSelectedFile} selectedGif={gifFile} setSelectedGif={setGifFile} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} removeSpeceficArrayItem={removeSpeceficArrayItem} repliedTweetsIDs={repliedTweetsIDs} handleLoadingTweetsIDs={handleLoadingTweetsIDs} handlePinnedTweetID={handlePinnedTweetID} updateTweetPrivacy={updateTweetPrivacy} updateRepliedTweetsOnThread={updateRepliedTweetsOnThread} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleReplyCount={handleReplyCount} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} quotesListFromRetweet={quotesListFromRetweet} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} threadedTweetData={{threadedTweetData}} currentUserProfileInfo={currentUserProfileInfo} />
                    </div>
                </Route>

                <Route exact path={'/retweets/with_comments'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <RetweetsWithCommentsThread currentUser={currentUser} quotedTweetID={quoteTweetID} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} updateTweetPrivacy={updateTweetPrivacy} handlePinnedTweetID={handlePinnedTweetID} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/compose/tweet/place_picker'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <TagLocation currentUser={currentUser} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} taggedPlaceInfoInUserProfile={taggedPlaceInfoInUserProfile} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path={'/settings/trends'}>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={true} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <TrendsModal />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={true} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route path='/login'>
                    <LoginPage
                        currentUser={currentUser}
                        handleCurrentUser={handleCurrentUser}
                    />
                </Route>

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
                </Route>

                <Route path='/verify-user-info'>
                    <PasswordResetPage />
                </Route>

                <Route exact path='/i/topics/picker/home'>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <TopicsPicker handleData={handleUserInterestsData} sanitizedData={sanitizedInterestsData} currentUser={currentUser} />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path='/tweet/compose'>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <ComposeTweet
                            selectedFile={selectedFile} extraSelectedFile={selectedPictureFileForExtraTweet} setSelectedFile={setSelectedFile} setExtraSelectedFile={setSelectedPictureFileForExtraTweet} gifFile={gifFile} extraGifFile={gifFileSelectedForExtraTweet} setGifFile={setGifFile} setExtraGifFile={setGifFileSelectedForExtraTweet} toggleModality={toggleModality} handleTweetModalToggle={setToggleModality}

                            primaryTweetText={primaryTweetText} extraTweetText={extraTweetText} setPrimaryTweetText={setPrimaryTweetText} setExtraTweetText={setExtraTweetText} tweetPrivacy={tweetPrivacy} tweetPublishReady={tweetPublishReady} setTweetPrivacy={setTweetPrivacy} setTweetPublishReady={setTweetPublishReady}

                            inputTextChoice01={inputTextChoice01} setInputTextChoice01={setInputTextChoice01} inputTextChoice02={inputTextChoice02} setInputTextChoice02={setInputTextChoice02} inputTextChoice03={inputTextChoice03} setInputTextChoice03={setInputTextChoice03} inputTextChoice04={inputTextChoice04} setInputTextChoice04={setInputTextChoice04}

                            inputTextChoice05={inputTextChoice05} setInputTextChoice05={setInputTextChoice05} inputTextChoice06={inputTextChoice06} setInputTextChoice06={setInputTextChoice06} inputTextChoice07={inputTextChoice07} setInputTextChoice07={setInputTextChoice07} inputTextChoice08={inputTextChoice08} setInputTextChoice08={setInputTextChoice08}

                            scheduleStamp={scheduleStamp} setScheduleStamp={setScheduleStamp} mediaDescriptionText={mediaFileDescriptionText} setMediaDescriptionText={setMediaFileDescriptionText}

                            setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} setOpacity={setOpacity} opacity={opacity} currentUser={currentUser} quoteTweetData={quoteTweetData} handleQuoteTweetID={handleQuoteTweetID}

                            firstTweetHasMedia={firstTweetHasMedia} setFirstTweetHasMedia={setFirstTweetHasMedia} secondTweetHasMedia={secondTweetHasMedia} setSecondTweetHasMedia={setSecondTweetHasMedia} firstTweetHasPoll={firstTweetHasPoll} setFirstTweetHasPoll={setFirstTweetHasPoll} secondTweetHasPoll={secondTweetHasPoll} setSecondTweetHasPoll={setSecondTweetHasPoll}

                            pollVotesCount={pollVotesCount} handlePollVotesCount={handlePollVotesCount} selectedTaggedPlace={selectedTaggedPlace} quotedFromRetweetModal={quotedFromRetweetModal} currentUserProfileInfo={currentUserProfileInfo}
                        />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path='/tweet/compose/schedule'>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <TweetScheduler
                            isScheduleIconClicked={isScheduleIconClicked}
                            handleToggle={handleScheduleIconClicked}
                            setScheduleStamp={setScheduleStamp}
                        />
                        <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                <Route exact path='/tweet/compose/media'>
                    <div className='constant-view-of-backdrop'>
                        <LeftSideNavigationPanel toggleModality={toggleModality} setOpacity={setOpacity} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                        <EditTweetMediaContents
                            mediaFile={selectedFile}
                            updateMediaFile={setSelectedFile}
                            gifFile={gifFile}
                            mediaDescriptionText={mediaFileDescriptionText}
                            setMediaDescriptionText={setMediaFileDescriptionText}
                        />
                        <RightSideNavigationPanel tweetData={tweetData} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                    </div>
                </Route>

                {
                    currentUser
                        ?
                        <Route exact path={`/${currentUser}`}>
                            <div className='constant-view-of-backdrop'>
                                <LeftSideNavigationPanel toggleModality={toggleModality} setOpacity={setOpacity} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                                <ProfilePageUpperView currentUser={currentUser} />
                                <RightSideNavigationPanel tweetData={tweetData} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                            </div>
                            <UserProfile
                                selectedFile={selectedFile} extraSelectedFile={selectedPictureFileForExtraTweet} setSelectedFile={setSelectedFile} setExtraSelectedFile={setSelectedPictureFileForExtraTweet}

                                gifFile={gifFile} extraGifFile={gifFileSelectedForExtraTweet} setGifFile={setGifFile} setExtraGifFile={setGifFileSelectedForExtraTweet} hideFirstPollReply={hideFirstPollReply}

                                tweetData={tweetData} primaryTweetText={primaryTweetText} setPrimaryTweetText={setPrimaryTweetText} extraTweetText={extraTweetText} handleLikedTweets={handleLikedTweets} removeFromLikedTweets={removeFromLikedTweets}

                                setExtraTweetText={setExtraTweetText} tweetPrivacy={tweetPrivacy} tweetPublishReady={tweetPublishReady} setTweetPublishReady={setTweetPublishReady}

                                inputTextChoice01={inputTextChoice01} setInputTextChoice01={setInputTextChoice01} inputTextChoice02={inputTextChoice02} setInputTextChoice02={setInputTextChoice02}

                                inputTextChoice03={inputTextChoice03} setInputTextChoice03={setInputTextChoice03} inputTextChoice04={inputTextChoice04} setInputTextChoice04={setInputTextChoice04}

                                inputTextChoice05={inputTextChoice05} setInputTextChoice05={setInputTextChoice05} inputTextChoice06={inputTextChoice06} setInputTextChoice06={setInputTextChoice06}

                                inputTextChoice07={inputTextChoice07} setInputTextChoice07={setInputTextChoice07} inputTextChoice08={inputTextChoice08} setInputTextChoice08={setInputTextChoice08}

                                setNewDataStatus={setNewDataStatus} newDataStatus={newDataStatus} setChangeLayout={setChangeLayout} uniqueID={uniqueID} newID={newID} updateData={updateData}

                                firstTweetHasMedia={firstTweetHasMedia} setFirstTweetHasMedia={setFirstTweetHasMedia} secondTweetHasMedia={secondTweetHasMedia} setSecondTweetHasMedia={setSecondTweetHasMedia}

                                firstTweetHasPoll={firstTweetHasPoll} setFirstTweetHasPoll={setFirstTweetHasPoll} secondTweetHasPoll={secondTweetHasPoll} setSecondTweetHasPoll={setSecondTweetHasPoll} handleUpdateStatus={handleUpdateStatus} currentUser={currentUser && currentUser}

                                scheduledTimeStamp={scheduledTimeStamp} setScheduledTimeStamp={setScheduledTimeStamp} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID}

                                quoteTweetData={quoteTweetData} quoteTweetID={quoteTweetID} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} showPinnedTweetTag={showPinnedTweetTag} currentlyPinnedTweetID={currentlyPinnedTweetID} handlePollVotesCount={handlePollVotesCount} handleThreadedTweetData={handleThreadedTweetData} repliedTweets={repliedTweets}

                                selectedTaggedPlace={selectedTaggedPlace} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} quotedFromRetweetModal={quotedFromRetweetModal} quotesListFromRetweet={quotesListFromRetweet} handleQuotesListFromRetweet={handleQuotesListFromRetweet} handleRepliedTweets={handleRepliedTweets} updateSomeDataInUserDocs={updateSomeDataInUserDocs}
                            />
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/profile`}>
                            <div className='constant-view-of-backdrop'>
                                <LeftSideNavigationPanel opacity={opacity} setOpacity={setOpacity} toggleModality={toggleModality} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                                {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                                <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                            </div>
                            {currentUser && <EditProfile currentUser={currentUser} setOpacity={setOpacity} />}
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/tweets-and-replies`}>
                            <div className='constant-view-of-backdrop'>
                                <LeftSideNavigationPanel toggleModality={toggleModality} setOpacity={setOpacity} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                                {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                                <RightSideNavigationPanel tweetData={tweetData} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                            </div>
                            <TweetsAndRepliesPage currentUser={currentUser} hideFirstPollReply={hideFirstPollReply} tweetData={tweetData} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} quoteTweetData={quoteTweetData} quoteTweetID={quoteTweetID} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} showPinnedTweetTag={showPinnedTweetTag} currentlyPinnedTweetID={currentlyPinnedTweetID} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} handleLikedTweets={handleLikedTweets} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} removeFromLikedTweets={removeFromLikedTweets} />
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/media`}>
                            <div className='constant-view-of-backdrop'>
                                <LeftSideNavigationPanel toggleModality={toggleModality} setOpacity={setOpacity} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                                {currentUser && <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />}
                                <RightSideNavigationPanel tweetData={tweetData} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                            </div>
                            <AllMedias currentUser={currentUser} tweetData={tweetData} handlePinnedTweetID={handlePinnedTweetID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} currentUserProfileInfo={currentUserProfileInfo} handleLikedTweets={handleLikedTweets} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} removeFromLikedTweets={removeFromLikedTweets} />
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                {
                    currentUser
                        ?
                        <Route path={`/${currentUser}/likes`}>
                            <div className='constant-view-of-backdrop'>
                                <LeftSideNavigationPanel toggleModality={toggleModality} setOpacity={setOpacity} handleTweetModalToggle={handleTweetModalityToggle} currentUser={currentUser} />
                                <ProfilePageUpperView opacity={opacity} currentUser={currentUser} />
                                <RightSideNavigationPanel tweetData={tweetData} opacity={opacity} hideFirstPollReply={hideFirstPollReply} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} />
                            </div>
                            <LikedTweets likedTweets={likedTweets} currentUser={currentUser} handleLikedTweets={handleLikedTweets} removeFromLikedTweets={removeFromLikedTweets} handleThreadedTweetData={handleThreadedTweetData} handlePinnedTweetID={handlePinnedTweetID} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} handleAnalysingTweetID={handleAnalysingTweetID} currentUserProfileInfo={currentUserProfileInfo} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} />
                        </Route>
                        :
                        setTimeout(() => <Redirect to='/login' />, 4000)
                }

                <Route path={'*'}>
                    {!currentUser && <PageUnavailable />}
                </Route>
            </Switch>
        </Router>
    )
}

export default AllRoutes