import React, { useEffect, useState } from 'react';
import { getDataFromFirestoreSubCollection } from '../../../firestore-methods';
import { HeaderComponent, RenderThreadWithExistingQuotedTweetWhenQuotedFromRetweet } from '../show-tweet-thread';

function RetweetsWithCommentsThread({quotedTweetID, currentUser, handleAnalysingTweetID, handleQuoteTweetID, handleQuotedFromRetweetModal, handleThreadedTweetData, currentUserProfileInfo, updateTweetPrivacy, handlePinnedTweetID}) {
    return (
        <div id='retweeted-quote-thread-container'>
            <HeaderComponent headerText={'Quote Tweets'} />
            <RenderRetweetedQuotesListings quotedTweetID={quotedTweetID} currentUser={currentUser} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} updateTweetPrivacy={updateTweetPrivacy} handlePinnedTweetID={handlePinnedTweetID} />
        </div>
    )
}

let RenderRetweetedQuotesListings = ({currentUser ,quotedTweetID, handleAnalysingTweetID, handleQuoteTweetID, handleQuotedFromRetweetModal, handleThreadedTweetData, currentUserProfileInfo, updateTweetPrivacy, handlePinnedTweetID}) => {
    let [dataset, setDataset] = useState(null)
    let handleLoadingDataset = items => setDataset(items)
    useEffect(() => {
        quotedTweetID && getDataFromFirestoreSubCollection(currentUser, quotedTweetID, 'listOfRetweetedQuotes', handleLoadingDataset)
    }, [quotedTweetID])

    // console.log(dataset, currentUser, quotedTweetID, 'from retweet with comments!!')
    let renderQuotesWithComments = () => dataset && dataset.map(item => <RenderThreadWithExistingQuotedTweetWhenQuotedFromRetweet key={item} quotedTweetID={item} currentUser={currentUser} isQuotedFromRetweeted={false} handleAnalysingTweetID={handleAnalysingTweetID} handleQuoteTweetID={handleQuoteTweetID} handleQuotedFromRetweetModal={handleQuotedFromRetweetModal} handleThreadedTweetData={handleThreadedTweetData} currentUserProfileInfo={currentUserProfileInfo} updateTweetPrivacy={updateTweetPrivacy} handlePinnedTweetID={handlePinnedTweetID} />)
    return (
        <div id='quotes-with-comments-wrapper'>
            {renderQuotesWithComments()}
        </div>
    )
}

export default RetweetsWithCommentsThread;
