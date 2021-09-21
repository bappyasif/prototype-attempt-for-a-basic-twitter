import React, { useEffect, useState } from 'react'
import "./index.css";

function ProfilePage({tweetText, extraTweetText, privacySelected, readyTweetPublish, tweetData}) {
    // let tweetData = [];
    // tweetData = [...tweetData, [{tweetText, extraTweetText, privacySelected}]]

    // console.log(tweetData, renderData)
    // let [tweetData, setTweetData] = useState([]);
    let [renderData, setRenderData] = useState('');

    // console.log(tweetText, readyTweetPublish, tweetData)
    
    // useEffect(() => {
    //     // if(readyTweetPublish) {
    //     //     // tweetData.concat({primaryTweetText})
    //     //     setTweetData([...tweetData, {primaryTweetText}])
    //     //     console.log(tweetData)
    //     // }
    //     setTweetData([...tweetData, {tweetText: tweetText}])
    //     let renderedData = tweetData.map(data => <div key={data.tweetText}>{data.tweetText}</div>)
    //     setRenderData(renderedData);
    //     console.log(tweetData, renderData)
    // }, [readyTweetPublish])

    

    return (
        <div id='profile-page-container'>
            {readyTweetPublish && tweetText} {extraTweetText}
        </div>
    )
}

export default ProfilePage
