import { collection, getFirestore } from '@firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import FirebaseApp from './firebase-configs';
import { addSpecificDataIntoFirestoreCollection, getDataFromFirestoreSubCollection, createSubCollectionForCurrentUser, deleteDocFromFirestore, getAllDocsOnce, getSomeDataFromUserMainDocument, readDataDescendingOrder, readDataInDescendingORderFromSubCollection, readDataInRealtime, updateDataInFirestore, updateSomeDataWithinUserMainDocument } from './firestore-methods';
import { v4 as uuid } from 'uuid'
import LandingPageUILogics from './landing-page/ui-logics';

function ComponentsContainer() {
    let [countForTweetContainer, setCountForTweetContainer] = useState([])
    let [changeLayout, setChangeLayout] = useState(false);
    // let [userDocs, setUserDocs] = useState([getAllDocsOnce()]);
    let [userDocs, setUserDocs] = useState([]);
    // let [userDocs, setUserDocs] = useState();
    let [newDataStatus, setNewDataStatus] = useState(false)
    let [dataLoading, setDataLoading] = useState(true)
    let [uniqueID, setUniqueID] = useState()
    let [rerenderDOM, setRerenderDOM] = useState(false)
    let [currentUser, setCurrentUser] = useState('')
    let [analysingTweetID, setAnalysingTweetID] = useState(null)
    let [analysingTweetData, setAnalysingTweetData] = useState(null)
    let [quoteTweetID, setQuoteTweetID] = useState(false)
    let [quoteTweetData, setQuoteTweetData] = useState(null)
    let [replyCount, setReplyCount] = useState(0)
    let [pinnedTweetID, setPinnedTweetID] = useState(null)
    let [pinnedTweetData, setPinnedTweetData] = useState(null)
    let [initialPinnedTweetData, setInitialPinnedTweetData] = useState(null)
    let [userDocsFlag, setUserDocsFlag] = useState(false)
    let [pinnedTweetIndex, setPinnedTweetIndex] = useState(null)
    let [previousPinnedTweetID, setPreviousPinnedTweetID] = useState(null)
    let [regainedDocs, setRegainedDocs] = useState(null)
    let [showPinnedTweetTag, setShowPinnedTweetTag] = useState(false)
    let [currentlyPinnedTweetID, setCurrentlyPinnedTweetID] = useState(false);
    // let [pinnedTweetFlag, setPinnedTweetFlag] = useState(false)
    // let [newlYPinnedTweetID, setNewlyPinneedTweetID] = useState(null)
    let [whichListIsUpdated, setWhichListIsUpdated] = useState('')
    let [currentList, setCurrentList] = useState([])
    let [countAddedMembers, setCountAddedMembers] = useState(0)
    let [membersList, setMembersList] = useState([])
    let [pollVotesCount, setPollVotesCount] = useState({})
    let [threadedTweetData, setThreadedTweetData] = useState(null)
    let [repliedTweets, setRepliedTweets] = useState(null)
    let [selectedTaggedPlace, setselectedTaggedPlace] = useState([])
    let [taggedPlaceInfoInUserProfile, setTaggedPlaceInfoInProfile] = useState(null)
    let [removeFromTweetThread, setRemoveFromTweetThread] = useState(false)
    let [repliedTweetsIDs, setRepliedTweetsIDs] = useState(null)
    let [updateRepliedTweetsOnThread, setUpdateRepliedTweetsOnThread] = useState(null)
    let [currentUserProfileInfo, setCurrentUserProfileInfo] = useState(null)
    let [quotedFromRetweetModal, setQuotedFromRetweetModal] = useState(null)
    let [quotesListFromRetweet, setQuotesListFromRetweet] = useState(null)
    let [existingRepliedTweetIDs, setExistingRepliedTweetIDs] = useState(null)
    let [nowDeletingTweetID, setNowDeletingTweetID] = useState(null)
    let [deletingTweetQuotedID, setDeletingTweetQuotedID] = useState(null)
    let [existingRetweetedQuotesList, setExistingRetweetedQuotesList] = useState(null)

    // vnxOMhbaq8ObeFIE56GNPDQanig1

    // console.log(repliedTweets, '<<<<repliedTweets list from Container>>>>')

    let handleExistingRetweetedQuotesList = dataset => setExistingRetweetedQuotesList(dataset)

    let handleExistingRepliedTweetIDs = (foundIDs) => setExistingRepliedTweetIDs(foundIDs)

    let handleQuotesListFromRetweet = dataset => dataset && setQuotesListFromRetweet([].concat(...dataset))

    let handleQuotedFromRetweetModal = () => setQuotedFromRetweetModal(!quotedFromRetweetModal)

    let handleCurrentUserProfileInfo = dataset => setCurrentUserProfileInfo(dataset)

    let handleLoadingTweetsIDs = data => {
        console.log(data, '<<<<repliedTweets list from Container>>>>')
        setRepliedTweetsIDs(data)
    }

    let handleInitialDeviceLocation = value => {
        // console.log('initially loading device location', value)
        setselectedTaggedPlace(value)
    }

    let handleTaggedPlaceInfoInProfile = (value) => {
        // console.log(value, 'taggedPlaceValueCheck')
        setTaggedPlaceInfoInProfile(value);
        // setRunOnce(true)
    }

    let handleSelectedTaggedPlace = data => {
        console.log(data, 'whatitseemslike?!')
        data ? setselectedTaggedPlace([].concat(data)) : setselectedTaggedPlace(data)
        // setselectedTaggedPlace([].concat(data))
        // selectedTaggedPlace.length > 3 ? setselectedTaggedPlace(null) : setselectedTaggedPlace(prevData => [...prevData, data])
        // setselectedTaggedPlace(prevData => [...prevData, data])
        // setselectedTaggedPlace({...selectedTaggedPlace, data})
        // setselectedTaggedPlace(name)
    }

    let handleRepliedTweets = values => {
        console.log(values, 'chk01 from componentContainer!!')
        // setRepliedTweets([...values])
        setRepliedTweets(values)
        handleReplyCount(values.length)
    }

    let handleThreadedTweetData = (dataset) => setThreadedTweetData(dataset)

    let handlePollVotesCount = (elem, value) => {
        setPollVotesCount({...pollVotesCount, [elem]: value+1});
    }

    let updateExistingListData = (name) => {
        // console.log('from update::', name)
        let newList = currentList.map(item => {
            // console.log(item, item.name, name, 'cheks u[date')
            if(item.name == name) {
                item.members = membersList.length;
                item.membersList = membersList;
                console.log(item, item.name, 'cheks update', membersList)
            }
            return item
        })
        console.log(newList, 'newList?>?>', whichListIsUpdated)
        setCurrentList(newList)
    }

    // console.log(membersList, currentList, 'list fromContainer!!', whichListIsUpdated)

    let handleMembersRemoval = name => {
        let idx = membersList.findIndex(item => item == name)
        // console.log(membersList, idx, name)
        setMembersList(prevList => prevList.slice(0, idx).concat(prevList.slice(idx+1)))
        // setWhichListIsUpdated()
        // updateExistingListData()
    }

    let checkMemberExists = (name) => {
        let idx = membersList.findIndex(item => item == name)
        // console.log(idx)
        return idx
    }

    let handleMembersList = (name) => {
        setMembersList(prevList => prevList.findIndex(item => item == name) != -1 ? prevList : prevList.concat(name))
        // setWhichListIsUpdated(name)
        // membersList.length && updateExistingListData()
        // updateExistingListData()        
    }

    let handleMembersAddedCount = (added) => setCountAddedMembers(prevCount => added ? prevCount + 1 : prevCount - 1)

    let handleCurrentList = (item) => {
        console.log(item, 'adding List!!')
        // setWhichListIsUpdated(item.name)
        setCurrentList(prevData => prevData.concat(item))
        // setCurrentList(prevData => [].concat(item))
    }

    let tweetDataRefetched = data => setRegainedDocs(data)

    let handleInitialPinnedTweetDataLoader = dataset => setInitialPinnedTweetData(dataset)

    let handlePinnedTweetID = val => setPinnedTweetID(val);

    let handlePinnedTweetData = dataset => setPinnedTweetData(dataset)

    let handleReplyCount = (val) => {
        console.log(val, 'hadnleReplyCount!!')
        setReplyCount(val);
    }

    let handleQuoteTweetID = value => setQuoteTweetID(value)

    let handleQuoteTweetData = dataset => setQuoteTweetData(dataset)

    let handleAnalysingTweetID = value => {
        setAnalysingTweetID(value)
        console.log('herehere!!', value)
    }

    let handleCurrentUser = (userID) => setCurrentUser(userID)

    // currentUser && console.log(currentUser, '<<current user>>')

    // let updateDOM = (frmWhr) => {
    //     setRerenderDOM(true);
    //     console.log('<< ::fromWhere:: >>', frmWhr)
    // }

    let updateSomeDataInUserDocs = (idx, whichData, newValue, checkStr) => {
        let newlyMappedUserDocs = userDocs.map(item => {
            if(item.id == idx) {
                item[whichData] = newValue
            }
            return item;
        })
        setUserDocs(newlyMappedUserDocs);
        // console.log(newlyMappedUserDocs, 'newlyMappedUserDocs', whichData, idx, newValue, checkStr)
    }

    // useEffect(() => countAddedMembers && whichListIsUpdated && updateExistingListData(whichListIsUpdated), [countAddedMembers])
    // useEffect(() => membersList.length && whichListIsUpdated && updateExistingListData(whichListIsUpdated), [membersList])

    // repliedTweetsIDs && console.log(repliedTweetsIDs, repliedTweets, 'repliedTweetsIDs!! from cc')

    // console.log(quotesListFromRetweet, threadedTweetData, 'whgats happeninf!!')

    // quotedFromRetweetModal && quoteTweetData && console.log(quoteTweetID, quoteTweetData, 'quotedFromRetweetModal!!', quotesListFromRetweet)

    useEffect(() => {
        if(existingRepliedTweetIDs && nowDeletingTweetID && deletingTweetQuotedID) {
            let newList = existingRepliedTweetIDs.filter(id=> id != nowDeletingTweetID)
            console.log(newList, 'newList!!')
            updateDataInFirestore(currentUser, deletingTweetQuotedID, {repliedTweets: newList})
        }
    }, [existingRepliedTweetIDs])

    useEffect(() => {
        if(nowDeletingTweetID && deletingTweetQuotedID && existingRetweetedQuotesList) {
            let newList = existingRetweetedQuotesList.filter(id => id != nowDeletingTweetID)
            updateDataInFirestore(currentUser, deletingTweetQuotedID, {listOfRetweetedQuotes: newList})
            updateSomeDataInUserDocs(deletingTweetQuotedID, 'listOfRetweetedQuotes', newList, 'from retweet quotes delete')
            console.log(newList, 'newList from retweet!!')
        }
    }, [existingRetweetedQuotesList])

    useEffect(() => quotedFromRetweetModal && quoteTweetID && currentUser && getDataFromFirestoreSubCollection(currentUser, quoteTweetID, 'listOfRetweetedQuotes', handleQuotesListFromRetweet), [quotedFromRetweetModal])

    useEffect(() => threadedTweetData && handleQuotesListFromRetweet(threadedTweetData.listOfRetweetedQuotes), [threadedTweetData])
    
    // useEffect(() => quotedFromRetweetModal && quoteTweetData && console.log(quoteTweetID, quoteTweetData, 'quotedFromRetweetModal!!'), [quotedFromRetweetModal])

    useEffect(() => {
        repliedTweetsIDs && console.log(threadedTweetData, repliedTweetsIDs, 'repliedTweetsIDs from Container')
        repliedTweetsIDs && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.ID, {repliedTweets: repliedTweetsIDs})
        repliedTweetsIDs && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.ID, {replyCount: repliedTweetsIDs.length})
        // repliedTweetsIDs && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.quotedTweetID, {repliedTweets: repliedTweetsIDs})
        // repliedTweetsIDs && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.quotedTweetID, {replyCount: repliedTweetsIDs.length})
    }, [repliedTweetsIDs])

    useEffect(() => {
        let filteredList =  removeFromTweetThread && threadedTweetData && repliedTweetsIDs && repliedTweetsIDs.filter(id => id != removeFromTweetThread);
        filteredList && console.log(filteredList, '!!!!', threadedTweetData)
        filteredList && setRepliedTweetsIDs(filteredList)
        // currentUser && filteredList && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.quotedTweetID, {repliedTweets: filteredList})
        // currentUser && filteredList && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.quotedTweetID, {replyCount: filteredList.length})
    }, [removeFromTweetThread])

    useEffect(() => {
        currentUser && selectedTaggedPlace && selectedTaggedPlace[0] && getSomeDataFromUserMainDocument(currentUser, handleTaggedPlaceInfoInProfile, 'deviceLocation')
        
        currentUser && selectedTaggedPlace && console.log(selectedTaggedPlace, 'tagged?!')
        // selectedTaggedPlace[3] && setselectedTaggedPlace([])
        // currentUser && selectedTaggedPlace[0] && taggedPlaceNameInUserProfile && updateSomeDataWithinUserMainDocument(currentUser, {deviceLocation: selectedTaggedPlace})
    }, [selectedTaggedPlace])

    useEffect(() => {
        if(!taggedPlaceInfoInUserProfile) {
            console.log('tagged place data undefined!!!!')
            currentUser && updateSomeDataWithinUserMainDocument(currentUser, {deviceLocation: selectedTaggedPlace})
        } else {
            console.log(taggedPlaceInfoInUserProfile, 'tagged place data found!!')
            // setselectedTaggedPlace(taggedPlaceInfoInUserProfile)
            // runOnce && setselectedTaggedPlace(taggedPlaceInfoInUserProfile)
            // runOnce && setRunOnce(false)
        }
        // currentUser && updateSomeDataWithinUserMainDocument(currentUser, {deviceLocation: selectedTaggedPlace})

        // currentUser && selectedTaggedPlace[0] && taggedPlaceNameInUserProfile && updateSomeDataWithinUserMainDocument(currentUser, {deviceLocation: selectedTaggedPlace})
    }, [taggedPlaceInfoInUserProfile])

    useEffect(() => currentList && setMembersList([]), [currentList])

    // useEffect(() => quoteTweetData && repliedTweetsIDs && handleReplyCount(repliedTweetsIDs.length), [repliedTweetsIDs])

    // useEffect(() => rerenderDOM && makingDataReadyInDescendingOrder(), [rerenderDOM])

    useEffect(() => {
        // currentUser && makingDataReadyInDescendingOrder(currentUser);
        setUniqueID(uuid())
        // setRerenderDOM(false)
        // setCountForTweetContainer(uuid())
        // setCountForTweetContainer(String(new Date().getTime()))

        // getting session stored auth persistence state, if there is any in sesion storage
        let browserStorage = window.sessionStorage;
        // let sessionID = browserStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]')
        let sessionID = JSON.parse(browserStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]'))
        sessionID && console.log(browserStorage, sessionID, sessionID.uid)
        sessionID && handleCurrentUser(sessionID.uid)

        // getting local storage for local auth persistence entry, if there is any
        let localStorage = window.localStorage;
        let localSession = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]'))
        localSession && console.log(localStorage, localSession, localSession.uid)
        localSession && handleCurrentUser(localSession.uid)

        // creating some dummy list to use when needed
        handleCurrentList({name: 'test list', description: 'listDescription', isPrivate: true, listPictureUrl: 'https://picsum.photos/200/300'})
        handleCurrentList({name: 'list test', description: 'listDescription', isPrivate: false, listPictureUrl: 'https://picsum.photos/200/300'})

        // looking for initially set device place location, and when found updating selectedTagedPLace state

    }, [])

    useEffect(() => {
        currentUser && makingDataReadyFromSubCollectionInDescendingOrder(currentUser)
        // search for pinned tweet, in firestore user collection
        currentUser && getSomeDataFromUserMainDocument(currentUser, handleInitialPinnedTweetDataLoader, 'pinnedTweet')
        // currentUser && getSomeDataFromUserMainDocument(currentUser, handleTaggedPlaceInfoInProfile, 'deviceLocation')
        currentUser && getSomeDataFromUserMainDocument(currentUser, handleInitialDeviceLocation, 'deviceLocation')
        // getting user profile info, so that information is available throughtout component!!
        currentUser && getSomeDataFromUserMainDocument(currentUser, handleCurrentUserProfileInfo, 'profileInfo')
    }, [currentUser])

    let updateData = data => {
        // when there is two picture files in a tweet, spanned over two tweets together, we had to do some cleanign up to do before rendering it on DOM, otherwise a duplicate node is getting rendered
        let checkDuplicate = userDocs.filter(obj => {
            // console.log(obj.id == data.id, 'found id!!')
            return obj.id == data.id
        })

        // makinf sure when two picture exists, just insertn it in dataset but not rendering it
        if (data.secondTweetHasMedia && checkDuplicate.length == 0) {
            // console.log('do nothing', checkDuplicate)
            // setUserDocs(userDocs)
            userDocs.unshift(data)
        } else if (data.secondTweetHasMedia && checkDuplicate.length == 1) {
            // when found duplicate entry, taking it out and rendering it on DOM
            userDocs.splice(0, 1)
            userDocs.unshift(data)
            // console.log(userDocs, ' ---- from update ---- dd ', data)
            // setUserDocs(userDocs)
        } else {
            // for all other use cases add it on front and render it on DOM
            userDocs.unshift(data)
            // setUserDocs(userDocs)
        }
        setUserDocs(userDocs)
        console.log(userDocs, ' ---- from update ---- ', data)
        generateOneNewID();
        setUserDocsFlag(true)

        // adjusting dataset if there is any pinned tweet exist in user profile
        // pinnedTweetID && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        // console.log(checkDuplicate, 'checking duplicate')
    }

    let makingDataReadyFromSubCollectionInDescendingOrder = (currentUser) => {
        readDataInDescendingORderFromSubCollection(currentUser, setUserDocs)
    }

    useEffect(() => {
        newDataStatus && console.log('it running!!')
        // newDataStatus && makingDataReadyInDescendingOrder();

    }, [newDataStatus])

    let handleCount = (val) => {
        // setCountForTweetContainer(uuid());
        // setCountForTweetContainer(val);
        setCountForTweetContainer(String(new Date().getTime()))
        setRerenderDOM(false)
        // updateDOM();
    }

    let generateOneNewID = () => setUniqueID(uuid())

    // let removeFromListOfRetweetedQuotesForQuotedTweetDocument = speceficData => {
    //     let newList
    // }

    let removeFromRepliedListInFirestoreFromQuotedTweetDocument = (idx) => {
        let specificData = userDocs.filter(item => item.id == idx)
        // console.log(specificData, specificData[0].replyCount, 'found!!', quoteTweetID)
        let speceficValue = userDocs.filter(item => item.id == specificData[0].quoteTweetID)
        // updateSomeDataInUserDocs(idx, 'replyCount', (specificData[0].replyCount - 1))
        // console.log(speceficValue, speceficValue[0].replyCount, 'found!!', quoteTweetID)
        let decideNewValue = (speceficValue[0] && speceficValue[0].replyCount > 0) ? (speceficValue[0].replyCount - 1) : 0
        // console.log(speceficValue, 'speceficValue!!', specificData)
        // if(speceficValue[0] && !speceficValue[0].retweetedQuote)
        if(speceficValue[0]) {
            console.log(speceficValue, speceficValue[0].replyCount, 'found!!', quoteTweetID)
            // updateDataInFirestore(currentUser, speceficValue[0].id, {replyCount: (speceficValue[0].replyCount - 1)})
            // updateSomeDataInUserDocs((speceficValue[0] && speceficValue[0].id), 'replyCount', decideNewValue, 'from delete')
            // getDataFromFirestoreSubCollection(currentUser, (speceficValue[0] && speceficValue[0].id), 'repliedTweets', handleExistingRepliedTweetIDs)
            
            speceficValue[0].retweetedQuote && updateDataInFirestore(currentUser, speceficValue[0].id, {replyCount: (speceficValue[0].replyCount - 1)})
            speceficValue[0].retweetedQuote && updateSomeDataInUserDocs((speceficValue[0] && speceficValue[0].id), 'replyCount', decideNewValue, 'from delete')
            speceficValue[0].retweetedQuote && getDataFromFirestoreSubCollection(currentUser, (speceficValue[0] && speceficValue[0].id), 'repliedTweets', handleExistingRepliedTweetIDs)

            !speceficValue[0].retweetedQuote && getDataFromFirestoreSubCollection(currentUser, speceficValue[0].id, 'listOfRetweetedQuotes', handleExistingRetweetedQuotesList)
            // !speceficValue[0].retweetedQuote && updateSomeDataInUserDocs((speceficValue[0] && speceficValue[0].id), 'listOfRetweetedQuotes', decideNewValue, 'from delete')
            
            // !speceficValue[0].retweetedQuote && updateDataInFirestore(currentUser, speceficValue[0].id, {replyCount: (speceficValue[0].replyCount - 1)})
            // !speceficValue[0].retweetedQuote && updateSomeDataInUserDocs((speceficValue[0] && speceficValue[0].id), 'replyCount', decideNewValue, 'from delete')
            // !speceficValue[0].retweetedQuote && getDataFromFirestoreSubCollection(currentUser, (speceficValue[0] && speceficValue[0].id), 'repliedTweets', handleExistingRepliedTweetIDs)
            setNowDeletingTweetID(idx)
            setDeletingTweetQuotedID(speceficValue[0].id)
        } 
        // else {
        //     removeFromListOfRetweetedQuotesForQuotedTweetDocument(speceficValue[0])
        // }
    }

    let removeSpeceficArrayItem = idx => {
        // idx = 'fb34e41b-60ab-4541-a99e-65d2d6181102'
        console.log(threadedTweetData, idx, '<<<<from remove!!>>>>', repliedTweetsIDs)
        idx && setRemoveFromTweetThread(idx)

        // let specificData = userDocs.filter(item => item.id == idx)
        // let speceficValue = userDocs.filter(item => item.id == specificData[0].quoteTweetID)
        // // updateSomeDataInUserDocs(idx, 'replyCount', (specificData[0].replyCount - 1))
        // let decideNewValue = (speceficValue[0] && speceficValue[0].replyCount > 0) ? (speceficValue[0].replyCount - 1) : 0
        // if(speceficValue[0]) {
        //     updateDataInFirestore(currentUser, speceficValue[0].id, {replyCount: (speceficValue[0].replyCount - 1)})
        //     updateSomeDataInUserDocs((speceficValue[0] && speceficValue[0].id), 'replyCount', decideNewValue, 'from delete')
        //     getDataFromFirestoreSubCollection(currentUser, (speceficValue[0] && speceficValue[0].id), 'repliedTweets', handleExistingRepliedTweetIDs)
        //     setNowDeletingTweetID(idx)
        //     setDeletingTweetQuotedID(speceficValue[0].id)
        // }

        // removing this intended tweet to be removed from quoted tweet repliedTweets list so that it gets flushed out and not causing in adjusting correct reply count for next add or remove process
        removeFromRepliedListInFirestoreFromQuotedTweetDocument(idx);

        setUserDocs(prevData => {
            let foundIndex = userDocs && userDocs.findIndex(item => item.id == idx)
            
            // updating records in firestore as well
            deleteDocFromFirestore(currentUser, idx)

            let updatedDataset = prevData.slice(0, foundIndex).concat(prevData.slice(foundIndex+1))

            // updateSomeDataInUserDocs(idx, 'replyCount', updatedDataset.length)

            // updating userdocs for DOM node rendering
            return updatedDataset
        })
        // let foundIndex = userDocs && userDocs.findIndex(item => item.id == idx)
        //     console.log(foundIndex, 'found!!')
    }

    let updateTweetPrivacy = (idx, privacyOption) => {
        let foundIndex = userDocs.findIndex(item => item.id == idx)
        // updating this change in tweet thread as well
        repliedTweetsIDs && setUpdateRepliedTweetsOnThread([idx, privacyOption])
        // updating this in existing tweets currently on DOM
        setUserDocs(prevData => prevData.map(item => item.id == idx ? {...item, privacy: privacyOption} : {...item}))
        updateDataInFirestore(currentUser, idx, {privacy: privacyOption})
    }

    let getSpeceficItemFromUserDocs = (idx, dataLoader) => {
        let tweetAnalysing = userDocs.filter(item => item.id == idx)
        dataLoader(tweetAnalysing)
    }

    // useEffect(() => analysingTweetID && getSpeceficItemFromUserDocs(), [analysingTweetID])
    useEffect(() => analysingTweetID && getSpeceficItemFromUserDocs(analysingTweetID, setAnalysingTweetData), [analysingTweetID])

    useEffect(() =>  {
        // when wuoteTweetID is available get dta from Firestore and update quoteTweetData
        quoteTweetID && getSpeceficItemFromUserDocs(quoteTweetID, setQuoteTweetData)
        // quoteTweetID && getDataFromFirestoreSubCollection(currentUser, quoteTweetID, 'repliedTweets', handleRepliedTweets)
        // when there is no quoteTweetID available resets to null or assign as such
        !quoteTweetID && setQuoteTweetData(null)
    }, [quoteTweetID])

    useEffect(() => {
        quoteTweetData && getDataFromFirestoreSubCollection(currentUser, quoteTweetID, 'repliedTweets', handleRepliedTweets)
        // quoteTweetData && alert('wtf!!')
        quotedFromRetweetModal && quoteTweetData && console.log(quoteTweetID, quoteTweetData, 'quotedFromRetweetModal!!')
    }, [quoteTweetData])

    useEffect(() => {
        pinnedTweetID && getSpeceficItemFromUserDocs(pinnedTweetID, handlePinnedTweetData)
        // pinnedTweetID && removeSpeceficArrayItem(pinnedTweetID);
        // keeping track whether a new pinned id is detected after already existing pinned tweet id
        // pinnedTweetID && setPreviousPinnedTweetID(pinnedTweetID);
    }, [pinnedTweetID])

    useEffect(() => {
        // pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
        // if(pinnedTweetData) pinnedTweetData[0].index = pinnedTweetIndex
        // pinnedTweetData && removeSpeceficArrayItem(pinnedTweetID);
        // pinnedTweetData && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        // pinnedTweetData && updateUserDocsItems(pinnedTweetID)
        pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
        // pinnedTweetData && makingDataReadyFromSubCollectionInDescendingOrder(currentUser)
        // pinnedTweetData && setPinnedTweetFlag(true)
        pinnedTweetData && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        pinnedTweetData && readDataInDescendingORderFromSubCollection(currentUser, tweetDataRefetched)
        // pinnedTweetData && setPinnedTweetData(null)
        // pinnedTweetData && alert('??')
    }, [pinnedTweetData])

    useEffect(() => {
        regainedDocs && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        regainedDocs && console.log('here!!', regainedDocs, userDocs)
        regainedDocs && setShowPinnedTweetTag(true)
        regainedDocs && setCurrentlyPinnedTweetID(pinnedTweetID)
        regainedDocs && adjustDocsFromRecentlyFetchedDataset()
    }, [regainedDocs])

    let adjustDocsFromRecentlyFetchedDataset = () => {
        let temp = regainedDocs.filter(item => item.id != pinnedTweetID)
        let readyDocs = [].concat(pinnedTweetData[0], temp)
        // console.log(readyDocs);
        readyDocs && setUserDocs(readyDocs)
    }

    // useEffect(() => {
    //     pinnedTweetFlag && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
    //     pinnedTweetFlag && setPinnedTweetFlag(false)
    //     pinnedTweetFlag && pinnedTweetData && setPinnedTweetData(null)
    // }, [pinnedTweetFlag])

    let updateUserDocsItems = idx => {
        setUserDocs(prevData => {
            let foundIndex = userDocs && userDocs.findIndex(item => item.id == idx)

            // updating userdocs for DOM node rendering
            return prevData.slice(0, foundIndex).concat(prevData.slice(foundIndex+1))
        })
    }

    let adjustUserDocsDataset = (pinnedID, pinnedData) => {
        console.log('dataset updating....', pinnedData)
        setUserDocs(prevData => {
            let temp = prevData.filter((item, idx) => {
                // setPinnedTweetIndex(idx)
                return item.id != pinnedID
            })
            return [].concat(pinnedData, temp)
        })
    }

    useEffect(() => {
        initialPinnedTweetData && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        // initialPinnedTweetData && setPreviousPinnedTweetID(initialPinnedTweetData.id)
        initialPinnedTweetData && setShowPinnedTweetTag(true)
        initialPinnedTweetData && setCurrentlyPinnedTweetID(initialPinnedTweetData.id)
    }, [initialPinnedTweetData])

    useEffect(() => {
        // userDocsFlag && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        // userDocsFlag && (pinnedTweetData || initialPinnedTweetData) && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        
        // if there is a new pinned tweet adjust accordingly otherwise adjust with initial pinned tweet data
        if (pinnedTweetData) {
            userDocsFlag && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData)
        } else if(initialPinnedTweetData) {
            userDocsFlag && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        }
        
        userDocsFlag && setUserDocsFlag(false)

    }, [userDocsFlag])

    // currentUser && removeSpeceficArrayItem()
    // userDocs && console.log(userDocs.length, 'removed??', userDocs)

    // quoteTweetID && console.log(quoteTweetID, 'quoteID')
    // pinnedTweetData && console.log(pinnedTweetData, 'pinned tweet data here!!');
    // initialPinnedTweetData && console.log(initialPinnedTweetData, 'initial pinned!!')
    // pinnedTweetID && console.log(pinnedTweetID, 'tweet ID', userDocs)
    // currentList && console.log(currentList, 'currentList')
    // console.log(pollVotesCount, '?!')
    // console.log(repliedTweets, '!!repliedTweets', threadedTweetData)
    // console.log(selectedTaggedPlace, 'selectedTaggedPlace', taggedPlaceInfoInUserProfile)
    // console.log(updateRepliedTweetsOnThread, 'updateRepliedTweetsOnThread!!')
    // console.log(quotesListFromRetweet, 'quotesListFromRetweet', quotedFromRetweetModal, threadedTweetData)

    return (
        <div id='components-container' style={{ display: 'flex', justifyContent: changeLayout ? 'space-between' : 'space-around', paddingRight: changeLayout ? '69px' : '' }}>
            {/* {<AllRoutes updateData={updateData} newID={generateOneNewID} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} />} */}
            {<AllRoutes currentUser={currentUser} handleCurrentUser={handleCurrentUser} updateData={updateData} newID={generateOneNewID} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} analysingTweetID={analysingTweetID} handleAnalysingTweetID={handleAnalysingTweetID} analysingTweetData={analysingTweetData} handleQuoteTweetID={handleQuoteTweetID} quoteTweetData={quoteTweetData} quoteTweetID={quoteTweetID} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} showPinnedTweetTag={showPinnedTweetTag} currentlyPinnedTweetID={currentlyPinnedTweetID} currentList={currentList} handleCurrentList={handleCurrentList} listMembersCount={countAddedMembers} handleMembersCount={handleMembersAddedCount} membersList={membersList} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} handleQuoteTweetData={handleQuoteTweetData} handlePollVotesCount={handlePollVotesCount} pollVotesCount={pollVotesCount} handleThreadedTweetData={handleThreadedTweetData} threadedTweetData={threadedTweetData} repliedTweets={repliedTweets} selectedTaggedPlace={(selectedTaggedPlace) || taggedPlaceInfoInUserProfile} handleSelectedTaggedPlace={handleSelectedTaggedPlace} taggedPlaceInfoInUserProfile={taggedPlaceInfoInUserProfile} repliedTweetsIDs={repliedTweetsIDs} handleLoadingTweetsIDs={handleLoadingTweetsIDs} updateRepliedTweetsOnThread={updateRepliedTweetsOnThread} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} quotedFromRetweetModal={quotedFromRetweetModal} quotesListFromRetweet={quotesListFromRetweet} handleQuotesListFromRetweet={handleQuotesListFromRetweet} handleRepliedTweets={handleRepliedTweets} updateSomeDataInUserDocs={updateSomeDataInUserDocs} updateExistingListData={updateExistingListData} />}
            {/* { dataLoading && <AllRoutes tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} count={countForTweetContainer} handleCount={handleCount} setChangeLayout={setChangeLayout} />} */}
        </div>
    )
}

// export let generateOneNewID = () => setUniqueID(uuid())

export default ComponentsContainer



/**
 * 
 * 
     // let makingDataReadyInDescendingOrder = () => {
    //     // uniqueID && console.log(uniqueID, 'is it?!')
    //     readDataDescendingOrder().then(res => {
    //         console.log(res, 'sorted?!')
    //         setUserDocs(res)
    //         // setDataLoading(false)
    //     }).catch(err => console.log('error in useEffect fetching', err.message))
    // }

    // useEffect(() => generateOneNewID(), [userDocs])
 * 
 * 
 
    // useEffect(() => {
    //     // if(pinnedTweetIndex && pinnedTweetData[0]) pinnedTweetData[0].index = pinnedTweetIndex
    //     pinnedTweetData && pinnedTweetIndex && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
    // }, [pinnedTweetIndex])

    // useEffect(() => {
    //     // previousPinnedTweetID == pinnedTweetID && console.log('different id')

    //     // whenever ther is newer tweet pinned iD kepping it updated in firestore as well
    //     // (previousPinnedTweetID) && pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})

    //     // // adding back previously pinned tweet ID back into firestore
    //     // previousPinnedTweetID && pinnedTweetData && updateDataInFirestore(currentUser, previousPinnedTweetID, pinnedTweetData[0])
    // }, [previousPinnedTweetID])
 * 
 * 
 useEffect(() => {
        pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
        pinnedTweetData && setUserDocs(prevData => {
            // ([pinnedTweetData[0], prevData.filter(item => item.id != pinnedTweetID)])
            let temp = prevData.filter(item => item.id != pinnedTweetID)
            return [].concat(pinnedTweetData[0], temp)
        })
        // if(pinnedTweetData) {
        //     let temp = [pinnedTweetData[0], userDocs.slice(0)]
        //     console.log(temp, '<><>')
        //     // setUserDocs(temp)
        // }
        // pinnedTweetData && setUserDocs(prevData => [].concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.slice(0, 0).concat(pinnedTweetData[0]).concat(prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.slice(0, 0).concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => prevData.unshift(pinnedTweetData[0]))
        // pinnedTweetData && setUserDocs(prevData => prevData.splice(0, 0, pinnedTweetData[0]))
        // pinnedTweetData && setUserDocs(prevData => {
        //     let temp = []
        //     let prevSliced = prevData.slice(1)
        //     temp = temp.concat(pinnedTweetData[0], prevSliced)
        //     return temp
        // })
        // pinnedTweetData && setUserDocs(prevData => [...prevData.slice(0, 0)].concat(pinnedTweetData[0], prevData.slice(1)))
        // pinnedTweetData && setUserDocs(prevData => [].concat(pinnedTweetData[0], prevData.slice(1)))
        // let temp = []
        // pinnedTweetData && userDocs.forEach(item => temp.push(item))
        // pinnedTweetData && temp.shift()
        // pinnedTweetData && temp.unshift(pinnedTweetData[0])
        // temp && setUserDocs(temp)
        // let temp = [...userDocs].shift()
        // temp.unshift(pinnedTweetData[0])
        // setUserDocs(temp)

        // if(pinnedTweetData) {
        //     let temp = []
        //     temp = [...userDocs]
        //     temp.shift()
        //     temp.unshift(pinnedTweetData[0])
        //     setUserDocs(temp)
        // }
    }, [pinnedTweetData])
 */