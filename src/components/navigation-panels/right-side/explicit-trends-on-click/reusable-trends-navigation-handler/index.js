import React, { useEffect, useState } from "react";
import { RenderArticle } from "../../../reuseable-components";
// import { createClient } from 'pexels';

function ReuseableTrendsNavigationHandler({
    explicitTrendSearchText,
    whichNav,
}) {
    let [dataset, setDataset] = useState(null);
    let [fetchUrl, setFetchUrl] = useState(null);
    let [refetchWhenNoDataIsFound, setRefetchWhenNoDataIsFound] = useState(false);
    let [videoFeeds, setVideoFeeds] = useState(null);

    let handleDataset = (items) => {
        let newList = items
            .filter((item) => item.author)
            .filter((item) => !item.author.includes("("));
        setDataset(newList);
    };

    console.log(
        fetchUrl,
        "fetchUrl",
        explicitTrendSearchText,
        whichNav,
        videoFeeds
    );

    let fetchDataFromGoogleNewsAPI = () => {
        // console.log(fetchUrl, 'fetchUrl', explicitTrendSearchText, whichNav)
        fetch(fetchUrl)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data, "data!!");
                let results = data.articles;
                if (results.length) {
                    handleDataset(results);
                } else {
                    console.log("no data found, try again later!!");
                }
            })
            .catch((err) => console.log(err.code, err.message));
    };

    useEffect(() => {
        let apik = "16d8576b44404e2cacdb7c57761d4f34";
        refetchWhenNoDataIsFound &&
            explicitTrendSearchText &&
            setFetchUrl(
                `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}`
            );
        refetchWhenNoDataIsFound && setRefetchWhenNoDataIsFound(false);
    }, [refetchWhenNoDataIsFound]);

    useEffect(() => {
        let apik = "16d8576b44404e2cacdb7c57761d4f34";

        // let apikForPexel = '563492ad6f91700001000001ff1b2b316cff458fa9f5199597d08cf7'

        let url = explicitTrendSearchText
            ? whichNav == "Top"
                ? `https://newsapi.org/v2/everything?q=${encodeURI(explicitTrendSearchText)}&apiKey=${apik}`
                : whichNav == "Latest"
                    ? `https://newsapi.org/v2/top-headlines?sources=bbc-news?q=${encodeURI(explicitTrendSearchText)}&apiKey=${apik}?lang=en`
                    : whichNav == "People"
                        ? `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
                        : whichNav == "Photos"
                            ? `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
                            : whichNav == "Videos" &&
                            `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
            : `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`;

        setFetchUrl(url);
    }, [whichNav, explicitTrendSearchText]);

    useEffect(() => {
        whichNav && explicitTrendSearchText && fetchDataFromGoogleNewsAPI();
    }, []);

    // useEffect(() => whichNav && explicitTrendSearchText && fetchDataFromGoogleNewsAPI(), [explicitTrendSearchText, whichNav])
    useEffect(() => {
        if (whichNav != "Videos") {
            whichNav && explicitTrendSearchText && fetchDataFromGoogleNewsAPI();
        } else {
            searchForVideosOnly(setVideoFeeds);
        }
    }, [explicitTrendSearchText, whichNav]);

    let renderArticles = () =>
        dataset &&
        dataset.map((item) => (
            <RenderArticle key={item.title} item={item} fromExplicitTrend={true} />
        ));

    return <div id="reuseable-articles-renderer-wrapper">{renderArticles()}</div>;
}

// let searchForVideosOnly = (updateDataset) => {

//     let apikForPexel = '563492ad6f91700001000001ff1b2b316cff458fa9f5199597d08cf7'

//     const client = createClient(apikForPexel);
//     const query = 'Nature';

//     client.videos.search({ query, per_page: 1 }).then(videos => updateDataset(videos));

// }

export default ReuseableTrendsNavigationHandler;
