import React, { useEffect, useState } from 'react';
import TweetModal from '../../../tweet-modal';
import { RenderArticle } from '../../reuseable-components';

function RenderHomePageView({ currentUser, firstTweetHasMedia, setFirstTweetHasMedia, secondTweetHasMedia, setSecondTweetHasMedia, firstTweetHasPoll, setFirstTweetHasPoll, secondTweetHasPoll, setSecondTweetHasPoll, selectedFile, extraSelectedFile, setSelectedFile, setExtraSelectedFile, gifFile, extraGifFile, setGifFile, setExtraGifFile, tweetText, setTweetText, extraTweetText, setExtraTweetText, tweetPrivacy, setTweetPrivacy, tweetPublishReady, setTweetPublishReady, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04, inputTextChoice05, setInputTextChoice05, inputTextChoice06, setInputTextChoice06, inputTextChoice07, setInputTextChoice07, inputTextChoice08, setInputTextChoice08, scheduleStamp, setScheduleStamp, mediaDescriptionText, setMediaDescriptionText, setNewDataStatus }) {
    let [dataset, setDataset] = useState([])
    let handleLoadingDataset = items => setDataset(items.results)
    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
    // let url = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${apik}`
    // let url03 = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apik}`
    let url04 = `https://api.nytimes.com/svc/mostpopular/v2/shared/1.json?api-key=${apik}`
    let fetchData = (url) => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => handleLoadingDataset(data))
            .catch(err => console.log(err.code, err.message))
    }

    useEffect(() => fetchData(url04), [])

    // console.log(dataset, 'datasetHomePage!!')

    let renderMostPopularArtclesShared = () => dataset.filter(item => item && item.media[0]).map(item => <RenderArticle key={item.id} item={item} />)

    return (
        <div id='home-page-view-container'>
            <TweetModal 
            currentUser={currentUser} setExtraTweetText={setExtraTweetText} setTweetText={setTweetText} setGifFile={setGifFile} gifFile={gifFile} extraGifFile={extraGifFile} 
            setExtraGifFile={setExtraGifFile} setSelectedFile={setSelectedFile} selectedFile={selectedFile} extraSelectedFile={extraSelectedFile} setExtraSelectedFile={setExtraSelectedFile} 
            extraTweetText={extraTweetText} tweetText={tweetText} tweetPrivacy={tweetPrivacy} setTweetPrivacy={setTweetPrivacy} readyTweetPublish={setTweetPublishReady} 
            firstTweetHasMedia={firstTweetHasMedia} setFirstTweetHasMedia={setFirstTweetHasMedia} secondTweetHasMedia={secondTweetHasMedia} setSecondTweetHasMedia={setSecondTweetHasMedia} 
            toggleModality={true} handleTweetModalToggle={() => null} setFirstTweetHasPoll={setFirstTweetHasPoll} setSecondTweetHasPoll={setSecondTweetHasPoll} scheduleStamp={scheduleStamp} 
            setScheduleStamp={setScheduleStamp} setNewDataStatus={setNewDataStatus} setOpacity={() => null} fromHomePage={true} firstTweetHasPoll={firstTweetHasPoll} secondTweetHasPoll={secondTweetHasPoll} 
            mediaDescriptionText={mediaDescriptionText} setMediaDescriptionText={setMediaDescriptionText} setInputTextChoice01={setInputTextChoice01} setInputTextChoice02={setInputTextChoice02} setInputTextChoice03={setInputTextChoice03} setInputTextChoice04={setInputTextChoice04} 
            setInputTextChoice05={setInputTextChoice05} setInputTextChoice06={setInputTextChoice06} setInputTextChoice07={setInputTextChoice07} setInputTextChoice08={setInputTextChoice08} />

            {renderMostPopularArtclesShared()}
        </div>
    )
}

export default RenderHomePageView;