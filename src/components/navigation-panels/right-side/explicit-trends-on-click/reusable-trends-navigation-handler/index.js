import React, { useEffect, useState } from "react";
import { RenderArticle } from "../../../reuseable-components";
import { RenderUserInModal } from "../../follow-suggested-people-component/show-lengthy-follow-list";
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
        if (searchString) {
            if (whichNav == 'Top') {
                url += `search/NewsSearchAPI?q=${searchString}`
            } else if (whichNav == 'Latest') {
                url += `search/TrendingNewsAPI?q=${searchString}`
            } else if (whichNav == 'Photos') {
                url += `Search/ImageSearchAPI?q=${searchString}`
            } else if (whichNav == 'Videos') {
                // url = `https://bing-web-search1.p.rapidapi.com/search?q=${explicitTrendSearchText}&mkt=en-us&safeSearch=Off&textFormat=Raw&freshness=Day`;
                url = `https://pexelsdimasv1.p.rapidapi.com/videos/search?query=${explicitTrendSearchText}&per_page=15&page=1`
                // console.log('th01')
            } else if (whichNav == 'People') {
                url = `https://twitter135.p.rapidapi.com/Search/?q=${explicitTrendSearchText}&count=20`
            }
        } else {
            console.log('no search string found!!')
        }
        console.log(url, 'url!!');

        (whichNav != 'Videos' || whichNav != 'People') && fetchDataWebSearch(url, setDataset);

        // whichNav == 'Videos' && fetchBingWebSearch(url, setDataset)

        whichNav == 'Videos' && fetchVideosPexelApi(url, setDataset)
        // whichNav == 'Videos' && console.log('th02')

        whichNav == 'People' && fetchUsersTwitterApi(url, setDataset)
    }

    useEffect(() => explicitTrendSearchText && whichNav && decideWhichFetchRequest(explicitTrendSearchText, whichNav), [explicitTrendSearchText, whichNav])

    let renderArticles = () =>
        dataset &&
        dataset.map((item) => (
            <RenderArticle key={item.title} item={item} fromExplicitTrend={true} whichNav={whichNav} />
        ));

    let renderUsers = () => dataset && dataset.map(item => <RenderUserInModal key={item.id} item={item} />)

    return <div id="reuseable-articles-renderer-wrapper">
        {whichNav != 'People' && renderArticles()}
        {whichNav == 'People' && renderUsers()}
    </div>;
}

let fetchUsersTwitterApi = (url, datasetUpdater) => {
    // https://twitter135.p.rapidapi.com/Search/?q=Dogecoin&count=20
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "twitter135.p.rapidapi.com",
            "x-rapidapi-key": "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524"
        }
    }).then(response => {
        console.log(response, 'chk02')
        return response.json()
    })
        .then(data => {
            console.log(data, 'data!!')
            let results = data.globalObjects.users
            if (results) {
                let allkeys = Object.keys(results)
                let arrOfObj = allkeys.map(key => results[key])
                datasetUpdater(arrOfObj)
                // console.log('arrOfObj', arrOfObj)
                // datasetUpdater([...results])
            } else {
                console.log('no data is found!!')
            }
        })
        .catch(err => {
            console.error(err);
        });
}

let fetchVideosPexelApi = (url, dataUpdater) => {
    // https://pexelsdimasv1.p.rapidapi.com/videos/search?query=ukraine&per_page=15&page=1
    // console.log(url, 'chk01')
    fetch(url, {
        "method": "GET",
        "headers": {
            "authorization": "563492ad6f91700001000001ff1b2b316cff458fa9f5199597d08cf7",
            "x-rapidapi-host": "PexelsdimasV1.p.rapidapi.com",
            "x-rapidapi-key": "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524"
        }
    })
        .then(response => {
            // console.log(response, 'chk02')
            return response.json()
        })
        .then(data => {
            console.log(data, 'data!!')
            let results = data.videos
            if (results) {
                dataUpdater(results)
            } else {
                console.log('no data is found!!')
            }
        })
        .catch(err => {
            console.error(err);
        });
}

let fetchBingWebSearch = (url, updateDataset) => {
    // https://bing-web-search1.p.rapidapi.com/search?q=ukraine&mkt=en-us&safeSearch=Off&textFormat=Raw&freshness=Day

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-bingapis-sdk": "true",
            "x-rapidapi-host": "bing-web-search1.p.rapidapi.com",
            "x-rapidapi-key": "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524"
        }
    }).then(response => {
        return response.json()
    })
        .then(data => {
            console.log(data, 'data!!')
            let results = data.webPages.value
            if (results) {
                updateDataset(results)
            } else {
                console.log('no data is found!!')
            }
        })
        .catch(err => {
            console.error(err);
        });
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
            if (results) {
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