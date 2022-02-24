import React, { useEffect, useState } from "react";
import { RenderArticle } from "../../../reuseable-components";
// import { createClient } from 'pexels';

function ReuseableTrendsNavigationHandler({
    explicitTrendSearchText,
    whichNav,
}) {
    let [dataset, setDataset] = useState(null);
    let [fetchUrl, setFetchUrl] = useState(null);
    let [videoFeeds, setVideoFeeds] = useState(null);

    // let handleDataset = (items) => {
    //     let newList = items
    //         .filter((item) => item.author)
    //         .filter((item) => !item.author.includes("("));
    //     console.log(newList, items, 'data!!')
    //     setDataset(newList);
    // };

    console.log(
        fetchUrl,
        "fetchUrl",
        explicitTrendSearchText,
        whichNav,
        videoFeeds,
        dataset
    );

    let decideWhichFetchRequest = (searchString, whichNav) => {
        let url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/';
        if(searchString) {
            if(whichNav == 'Top') {
                url += `search/NewsSearchAPI?q=${searchString}`
            } else if(whichNav == 'Latest') {
                url += `search/TrendingNewsAPI?q=${searchString}`
            } else if(whichNav == 'Photos') {
                url += `Search/ImageSearchAPI?q=${searchString}`
            }
        } else {
            console.log('no search string found!!')
        }
        console.log(url, 'url!!')
        fetchDataWebSearch(url, setDataset);
    }

    useEffect(() => explicitTrendSearchText && whichNav && decideWhichFetchRequest(explicitTrendSearchText, whichNav), [explicitTrendSearchText, whichNav])

    let renderArticles = () =>
        dataset &&
        dataset.map((item) => (
            <RenderArticle key={item.title} item={item} fromExplicitTrend={true} whichNav={whichNav} />
        ));

    return <div id="reuseable-articles-renderer-wrapper">{renderArticles()}</div>;
}

let fetchDataWebSearch = (firstHalfOfUrl, dataUpdater) => {
    fetch(`${firstHalfOfUrl}?pageNumber=1&pageSize=10`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key": "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524"
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data, 'data!!')
            let results = data.value
            if(results) {
                dataUpdater(results)
            } else {
                console.log('no data is found!!')
            }
        })
        .catch(err => {
            console.error(err);
        });
}

export default ReuseableTrendsNavigationHandler;