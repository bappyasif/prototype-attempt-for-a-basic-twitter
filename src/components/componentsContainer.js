import React, { Component, useEffect, useState } from 'react'
import AllRoutes from './all-routes'
import { addSpecificDataIntoFirestoreCollection, getDataFromFirestoreSubCollection, createSubCollectionForCurrentUser, deleteDocFromFirestore, getAllDocsOnce, getSomeDataFromUserMainDocument, readDataDescendingOrder, readDataInDescendingORderFromSubCollection, readDataInRealtime, updateDataInFirestore, updateSomeDataWithinUserMainDocument } from './firestore-methods';
import { v4 as uuid } from 'uuid'
import useReuseableDataExtraction from './navigation-panels/right-side/follow-suggested-people-component/useReuseableDataExtraction';

function ComponentsContainer() {
    let [changeLayout, setChangeLayout] = useState(false);
    let [userDocs, setUserDocs] = useState([]);
    let [newDataStatus, setNewDataStatus] = useState(false)
    let [uniqueID, setUniqueID] = useState()
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
    let [regainedDocs, setRegainedDocs] = useState(null)
    let [showPinnedTweetTag, setShowPinnedTweetTag] = useState(false)
    let [currentlyPinnedTweetID, setCurrentlyPinnedTweetID] = useState(false);
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
    let [listName, setListName] = useState(null)
    let [adjustListData, setAdjustListData] = useState(false)
    let [listOfRandomUsers, setListOfRandomUsers] = useState([])
    let [explicitTrendSearchText, setExplicitTrendSearchText] = useState(null)
    let [likedTweets, setLikedTweets] = useState([])

    let addToLikedTweets = (newTweet) => setLikedTweets(prevTweets => prevTweets.concat(newTweet))
    
    let handleLikedTweets = (id) => {
        let newList = userDocs.map(item => {
            if(item.id == id) {
                item.liked = true
                let findIdx = likedTweets.findIndex(item => item.id == id)
                findIdx == -1 && addToLikedTweets(item)
            }
            return item
        })
        setUserDocs(newList)
        // console.log('aadd')
    }

    let removeFromLikedTweets = (tweetID) => {
        let newFilteredList = likedTweets.filter(item => item.id != tweetID)
        setLikedTweets(newFilteredList)
        // console.log('delete')
        let newList = userDocs.map(item => {
            if(item.id == tweetID) {
                item.liked = false
            }
            return item
        })
        setUserDocs(newList)
    }

    let handleExplicitTrendSearchText = (value) => setExplicitTrendSearchText(value)

    // uncomment this to extract data again
    let data = useReuseableDataExtraction()
    
    useEffect(() => data && setListOfRandomUsers(data), [data])

    let handleListName = value => setListName(value)

    let handleExistingRetweetedQuotesList = dataset => setExistingRetweetedQuotesList(dataset)

    let handleExistingRepliedTweetIDs = (foundIDs) => {
        setExistingRepliedTweetIDs(foundIDs)
    }

    let handleQuotesListFromRetweet = dataset => dataset && setQuotesListFromRetweet([].concat(...dataset))

    let handleQuotedFromRetweetModal = () => setQuotedFromRetweetModal(!quotedFromRetweetModal)

    let handleCurrentUserProfileInfo = dataset => setCurrentUserProfileInfo(dataset)

    let handleLoadingTweetsIDs = data => {
        setRepliedTweetsIDs(data)
    }

    let handleInitialDeviceLocation = value => {
        setselectedTaggedPlace(value)
    }

    let handleTaggedPlaceInfoInProfile = (value) => {
        setTaggedPlaceInfoInProfile(value);
    }

    let handleSelectedTaggedPlace = data => {
        // console.log(data, 'whatitseemslike?!')
        data ? setselectedTaggedPlace([].concat(data)) : setselectedTaggedPlace(data)
    }

    let handleRepliedTweets = values => {
        setRepliedTweets(values)
        handleReplyCount(values.length)
    }

    let handleThreadedTweetData = (dataset) => setThreadedTweetData(dataset)

    let handlePollVotesCount = (elem, value) => {
        setPollVotesCount({...pollVotesCount, [elem]: value+1});
    }

    let updateExistingListData = (name, newData) => {
        let newList = currentList.map(item => {
            if(item.name == name) {
                item.members = (newData && newData.length) || membersList.length;
                item.membersList = newData || membersList;
            }
            return item
        })
        // console.log(newList, 'newList?>?>', whichListIsUpdated)
        setCurrentList(newList)
    }

    let handleMembersRemoval = (membersName, listName) => {
        // when members removal is happening for a specefic list from given currentList, it will go through if block or else when its happening for general memebers removal from adding memebers route it will go through else block
        if (listName) {
            let filteredListCurrentMembers = currentList.filter(item => item.name == listName).map(item => item.membersList)[0]
            let idx = filteredListCurrentMembers.findIndex(item => item == membersName);
            let afterRemovalMembersList = filteredListCurrentMembers.slice(0, idx).concat(filteredListCurrentMembers.slice(idx+1))
            setMembersList(afterRemovalMembersList)
            updateExistingListData(listName, afterRemovalMembersList)
        } else {
            let idx = membersList.findIndex(item => item == membersName)

            setMembersList(prevList => prevList.slice(0, idx).concat(prevList.slice(idx+1))) 
        }
        listName && setAdjustListData(true);
    }

    let checkMemberExists = (memberName, listName) => {
        let idx;

        if(listName) {
            let filteredListCurrentMembers = currentList.filter(item => item.name == listName).map(item => item.membersList)[0]
            idx = filteredListCurrentMembers.findIndex(item => item == memberName)
        } else {
            idx = membersList.findIndex(item => item == memberName) 
        }

        return idx
    }

    let handleMembersList = (membersName, listName) => {
        if(listName) {
            let filteredListCurrentMembers = currentList.filter(item => item.name == listName).map(item => item.membersList)[0]
            let manipulatedList = filteredListCurrentMembers.findIndex((item, _, arr) => item == membersName) != -1 ? arr : arr.concat(membersName)
            setMembersList(manipulatedList)
        } else if(!membersName && !listName) {
            setMembersList([])
        } else {
            setMembersList(prevList => prevList.findIndex(item => item == membersName) != -1 ? prevList : prevList.concat(membersName))
        }

        listName && setAdjustListData(true)       
    }

    let handleMembersAddedCount = (added) => setCountAddedMembers(prevCount => added ? prevCount + 1 : prevCount - 1)

    let handleCurrentList = (item) => {
        setCurrentList(prevData => prevData.concat(item))
    }

    let tweetDataRefetched = data => setRegainedDocs(data)

    let handleInitialPinnedTweetDataLoader = dataset => setInitialPinnedTweetData(dataset)

    let handlePinnedTweetID = val => setPinnedTweetID(val);

    let handlePinnedTweetData = dataset => setPinnedTweetData(dataset)

    let handleReplyCount = (val) => {
        setReplyCount(val);
    }

    let handleQuoteTweetID = value => setQuoteTweetID(value)

    let handleQuoteTweetData = dataset => setQuoteTweetData(dataset)

    let handleAnalysingTweetID = value => {
        setAnalysingTweetID(value)
    }

    let handleCurrentUser = (userID) => setCurrentUser(userID)

    let updateSomeDataInUserDocs = (idx, whichData, newValue, checkStr) => {
        let newlyMappedUserDocs = userDocs.map(item => {
            if(item.id == idx) {
                item[whichData] = newValue
            }
            return item;
        })
        setUserDocs(newlyMappedUserDocs);
    }

    // when tweets are deleted from likes routes, they also jneeds to be flushed from likedTweets list
    useEffect(() => {
        if(nowDeletingTweetID && likedTweets.length) {
            let newList = likedTweets.filter(item => item.id != nowDeletingTweetID)
            setLikedTweets(newList)
        }
    }, [nowDeletingTweetID, likedTweets])

    useEffect(() => {
        adjustListData && membersList && listName && updateExistingListData(listName)
        adjustListData && !membersList.length && listName && setAdjustListData(false)
        adjustListData && membersList && listName && setMembersList([])
    }, [adjustListData])

    // deleting nowDeletingTweetID from DOM nodes and also from firetore within deletingTweetQuotedID
    useEffect(() => {
        if(existingRepliedTweetIDs && nowDeletingTweetID && deletingTweetQuotedID) {
            let newList = existingRepliedTweetIDs.filter(id => id != nowDeletingTweetID)
            
            updateDataInFirestore(currentUser, deletingTweetQuotedID, {repliedTweets: newList})
            
            updateSomeDataInUserDocs(deletingTweetQuotedID, 'repliedTweets', newList)
        }
    }, [existingRepliedTweetIDs])

    useEffect(() => {
        if(nowDeletingTweetID && deletingTweetQuotedID && existingRetweetedQuotesList) {
            let newList = existingRetweetedQuotesList.filter(id => id != nowDeletingTweetID)
            updateDataInFirestore(currentUser, deletingTweetQuotedID, {listOfRetweetedQuotes: newList})
            updateSomeDataInUserDocs(deletingTweetQuotedID, 'listOfRetweetedQuotes', newList, 'from retweet quotes delete')
        }
    }, [existingRetweetedQuotesList])

    useEffect(() => quotedFromRetweetModal && quoteTweetID && currentUser && getDataFromFirestoreSubCollection(currentUser, quoteTweetID, 'listOfRetweetedQuotes', handleQuotesListFromRetweet), [quotedFromRetweetModal])

    useEffect(() => {
        threadedTweetData && handleQuotesListFromRetweet(threadedTweetData.listOfRetweetedQuotes)
    }, [threadedTweetData])

    useEffect(() => {
        repliedTweetsIDs && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.ID, {repliedTweets: repliedTweetsIDs})
        repliedTweetsIDs && threadedTweetData && updateDataInFirestore(currentUser, threadedTweetData.ID, {replyCount: repliedTweetsIDs.length})
    }, [repliedTweetsIDs])

    useEffect(() => {
        let filteredList =  removeFromTweetThread && threadedTweetData && repliedTweetsIDs && repliedTweetsIDs.filter(id => id != removeFromTweetThread);
        filteredList && setRepliedTweetsIDs(filteredList)
    }, [removeFromTweetThread])

    useEffect(() => {
        currentUser && selectedTaggedPlace && selectedTaggedPlace[0] && getSomeDataFromUserMainDocument(currentUser, handleTaggedPlaceInfoInProfile, 'deviceLocation')
    }, [selectedTaggedPlace])

    useEffect(() => {
        if(!taggedPlaceInfoInUserProfile) {
            currentUser && updateSomeDataWithinUserMainDocument(currentUser, {deviceLocation: selectedTaggedPlace})
        }
    }, [taggedPlaceInfoInUserProfile])

    useEffect(() => currentList && setMembersList([]), [currentList])

    useEffect(() => {
        setUniqueID(uuid())
        // getting session stored auth persistence state, if there is any in sesion storage
        let browserStorage = window.sessionStorage;
        let sessionID = JSON.parse(browserStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]'))
        sessionID && handleCurrentUser(sessionID.uid)

        // getting local storage for local auth persistence entry, if there is any
        let localStorage = window.localStorage;
        let localSession = JSON.parse(localStorage.getItem('firebase:authUser:AIzaSyByV2He0B3nM9bIQSgMuVhb8DNmYLxEZJ0:[DEFAULT]'))
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
            return obj.id == data.id
        })

        // making sure when two picture exists, just insertn it in dataset but not rendering it
        if (data.secondTweetHasMedia && checkDuplicate.length == 0) {
            userDocs.unshift(data)
        } else if (data.secondTweetHasMedia && checkDuplicate.length == 1) {
            // when found duplicate entry, taking it out and rendering it on DOM
            userDocs.splice(0, 1)
            userDocs.unshift(data)
        } else {
            // for all other use cases add it on front and render it on DOM
            userDocs.unshift(data)
        }
        setUserDocs(userDocs)
        generateOneNewID();
        setUserDocsFlag(true)

        // adjusting dataset if there is any pinned tweet exist in user profile
        // pinnedTweetID && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
    }

    let makingDataReadyFromSubCollectionInDescendingOrder = (currentUser) => {
        readDataInDescendingORderFromSubCollection(currentUser, setUserDocs)
    }

    let generateOneNewID = () => setUniqueID(uuid())

    let removeFromRepliedListInFirestoreFromQuotedTweetDocument = (idx) => {
        let specificData = userDocs.filter(item => item.id == idx)

        let speceficValue = userDocs.filter(item => item.id == specificData[0].quoteTweetID)
       
        let decideNewValue = (speceficValue[0] && speceficValue[0].replyCount > 0) ? (speceficValue[0].replyCount - 1) : 0

        if(speceficValue[0]) {
            updateDataInFirestore(currentUser, speceficValue[0].id, {replyCount: (speceficValue[0].replyCount - 1)})
            updateSomeDataInUserDocs((speceficValue[0] && speceficValue[0].id), 'replyCount', decideNewValue, 'from delete')
            getDataFromFirestoreSubCollection(currentUser, (speceficValue[0] && speceficValue[0].id), 'repliedTweets', handleExistingRepliedTweetIDs)
            
            speceficValue[0].retweetedQuote && updateDataInFirestore(currentUser, speceficValue[0].id, {replyCount: (speceficValue[0].replyCount - 1)})
            speceficValue[0].retweetedQuote && updateSomeDataInUserDocs((speceficValue[0] && speceficValue[0].id), 'replyCount', decideNewValue, 'from delete')
            speceficValue[0].retweetedQuote && getDataFromFirestoreSubCollection(currentUser, (speceficValue[0] && speceficValue[0].id), 'repliedTweets', handleExistingRepliedTweetIDs)

            !speceficValue[0].retweetedQuote && getDataFromFirestoreSubCollection(currentUser, speceficValue[0].id, 'listOfRetweetedQuotes', handleExistingRetweetedQuotesList)
            
            setNowDeletingTweetID(idx)
            setDeletingTweetQuotedID(speceficValue[0].id)
        } 
    }

    let removeSpeceficArrayItem = idx => {
        idx && setRemoveFromTweetThread(idx)

        // removing this intended tweet to be removed from quoted tweet repliedTweets list so that it gets flushed out and not causing in adjusting correct reply count for next add or remove process
        removeFromRepliedListInFirestoreFromQuotedTweetDocument(idx);

        setUserDocs(prevData => {
            let foundIndex = userDocs && userDocs.findIndex(item => item.id == idx)
            
            // updating records in firestore as well
            deleteDocFromFirestore(currentUser, idx)

            let updatedDataset = prevData.slice(0, foundIndex).concat(prevData.slice(foundIndex+1))

            // updating userdocs for DOM node rendering
            return updatedDataset
        })
    }

    let hideFirstPollReplyFromDomAsAnIndividualTweet = (idx) => {
        let newList = userDocs.filter(item => item.id != idx)
        setUserDocs(newList)
    }

    let updateTweetPrivacy = (idx, privacyOption) => {
        let foundIndex = userDocs.findIndex(item => item.id == idx)
        // updating this change in tweet thread as well
        repliedTweetsIDs && setUpdateRepliedTweetsOnThread([idx, privacyOption])
        // updating this in existing tweets currently on DOM
        setUserDocs(prevData => prevData.map(item => item.id == idx ? {...item, privacy: privacyOption} : {...item}))
        updateDataInFirestore(currentUser, idx, {privacy: privacyOption})
        if (likedTweets.length) {
            setLikedTweets(prevData => prevData.map(item => item.id == idx ? {...item, privacy: privacyOption} : {...item}))
        }
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
    }, [quoteTweetData])

    useEffect(() => {
        pinnedTweetID && getSpeceficItemFromUserDocs(pinnedTweetID, handlePinnedTweetData)
        // keeping track whether a new pinned id is detected after already existing pinned tweet id
        // pinnedTweetID && setPreviousPinnedTweetID(pinnedTweetID);
    }, [pinnedTweetID])

    useEffect(() => {
        pinnedTweetData && addSpecificDataIntoFirestoreCollection(currentUser, {pinnedTweet: pinnedTweetData[0]})
        pinnedTweetData && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        pinnedTweetData && readDataInDescendingORderFromSubCollection(currentUser, tweetDataRefetched)
    }, [pinnedTweetData])

    useEffect(() => {
        regainedDocs && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData[0])
        regainedDocs && setShowPinnedTweetTag(true)
        regainedDocs && setCurrentlyPinnedTweetID(pinnedTweetID)
        regainedDocs && adjustDocsFromRecentlyFetchedDataset()
    }, [regainedDocs])

    let adjustDocsFromRecentlyFetchedDataset = () => {
        let temp = regainedDocs.filter(item => item.id != pinnedTweetID)
        let readyDocs = [].concat(pinnedTweetData[0], temp)
        readyDocs && setUserDocs(readyDocs)
    }

    let adjustUserDocsDataset = (pinnedID, pinnedData) => {
        setUserDocs(prevData => {
            let temp = prevData.filter((item, idx) => {
                return item.id != pinnedID
            })
            return [].concat(pinnedData, temp)
        })
    }

    useEffect(() => {
        initialPinnedTweetData && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        initialPinnedTweetData && setShowPinnedTweetTag(true)
        initialPinnedTweetData && setCurrentlyPinnedTweetID(initialPinnedTweetData.id)
    }, [initialPinnedTweetData])

    useEffect(() => {      
        // if there is a new pinned tweet adjust accordingly otherwise adjust with initial pinned tweet data
        if (pinnedTweetData) {
            userDocsFlag && adjustUserDocsDataset(pinnedTweetID, pinnedTweetData)
        } else if(initialPinnedTweetData) {
            userDocsFlag && adjustUserDocsDataset(initialPinnedTweetData.id, initialPinnedTweetData)
        }
        
        userDocsFlag && setUserDocsFlag(false)

    }, [userDocsFlag])

    return (
        <div id='components-container' style={{position: 'relative'}}>
            {<AllRoutes currentUser={currentUser} handleCurrentUser={handleCurrentUser} updateData={updateData} newID={generateOneNewID} uniqueID={uniqueID} tweetData={userDocs && userDocs} newDataStatus={newDataStatus} setNewDataStatus={setNewDataStatus} setChangeLayout={setChangeLayout} removeSpeceficArrayItem={removeSpeceficArrayItem} updateTweetPrivacy={updateTweetPrivacy} analysingTweetID={analysingTweetID} handleAnalysingTweetID={handleAnalysingTweetID} analysingTweetData={analysingTweetData} handleQuoteTweetID={handleQuoteTweetID} quoteTweetData={quoteTweetData} quoteTweetID={quoteTweetID} handleReplyCount={handleReplyCount} replyCount={replyCount} handlePinnedTweetID={handlePinnedTweetID} showPinnedTweetTag={showPinnedTweetTag} currentlyPinnedTweetID={currentlyPinnedTweetID} currentList={currentList} handleCurrentList={handleCurrentList} listMembersCount={countAddedMembers} handleMembersCount={handleMembersAddedCount} membersList={membersList} handleMembersList={handleMembersList} handleMembersRemoval={handleMembersRemoval} checkMemberExists={checkMemberExists} handleQuoteTweetData={handleQuoteTweetData} handlePollVotesCount={handlePollVotesCount} pollVotesCount={pollVotesCount} handleThreadedTweetData={handleThreadedTweetData} threadedTweetData={threadedTweetData} repliedTweets={repliedTweets} selectedTaggedPlace={(selectedTaggedPlace) || taggedPlaceInfoInUserProfile} handleSelectedTaggedPlace={handleSelectedTaggedPlace} taggedPlaceInfoInUserProfile={taggedPlaceInfoInUserProfile} repliedTweetsIDs={repliedTweetsIDs} handleLoadingTweetsIDs={handleLoadingTweetsIDs} updateRepliedTweetsOnThread={updateRepliedTweetsOnThread} currentUserProfileInfo={currentUserProfileInfo} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} quotedFromRetweetModal={quotedFromRetweetModal} quotesListFromRetweet={quotesListFromRetweet} handleQuotesListFromRetweet={handleQuotesListFromRetweet} handleRepliedTweets={handleRepliedTweets} updateSomeDataInUserDocs={updateSomeDataInUserDocs} updateExistingListData={updateExistingListData} listName={listName} handleListName={handleListName} listOfRandomUsers={listOfRandomUsers} handleExplicitTrendSearchText={handleExplicitTrendSearchText} explicitTrendSearchText={explicitTrendSearchText} hideFirstPollReply={hideFirstPollReplyFromDomAsAnIndividualTweet} likedTweets={likedTweets} handleLikedTweets={handleLikedTweets} removeFromLikedTweets={removeFromLikedTweets} />}
        </div>
    )
}

export default ComponentsContainer