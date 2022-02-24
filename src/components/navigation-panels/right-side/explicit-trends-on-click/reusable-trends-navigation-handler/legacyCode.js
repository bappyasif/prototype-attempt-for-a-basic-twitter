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
        console.log(newList, items, 'data!!')
        setDataset(newList);
    };

    console.log(
        fetchUrl,
        "fetchUrl",
        explicitTrendSearchText,
        whichNav,
        videoFeeds,
        dataset
    );

    let fetchDataFromNewsCatcherAPI = () => {
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

    let decideFetchUrl = (searchString, whichNav) => {
        // let apik = "16d8576b44404e2cacdb7c57761d4f34";
        let apik = '07589b22137e4ac09ca0bb318518fa69';

        let url = (
            whichNav == 'Top'
            ?
            `https://newsapi.org/v2/everything?q=${encodeURI(searchString)}?lang=en&apiKey=${apik}`
            :
            whichNav == 'Latest'
            ?
            `https://newsapi.org/v2/top-headlines?sources=bbc-news?q=${encodeURI(searchString)}&apiKey=${apik}?lang=en`
            :
            whichNav == 'Picture'
            ?
            `https://newsapi.org/v2/top-headlines?sources=bbc-news?q=${encodeURI(searchString)}&apiKey=${apik}?lang=en`
            :
            whichNav == 'Videos'
            &&
            `https://newsapi.org/v2/top-headlines?sources=bbc-news?q=${encodeURI(searchString)}&apiKey=${apik}?lang=en`
        )
        setFetchUrl(url)
    }

    useEffect(() => (explicitTrendSearchText && whichNav) && decideFetchUrl(explicitTrendSearchText, whichNav), [explicitTrendSearchText, whichNav])

    // useEffect(() => fetchData(), [whichNav, explicitTrendSearchText])
    
    useEffect(() => fetchUrl && fetchDataFromGoogleNewsAPI(), [fetchUrl])
    
    // useEffect(() => fetchUrl && fetchDataGnewsAPI(), [fetchUrl])

    // useEffect(() => {
    //     let apik = "16d8576b44404e2cacdb7c57761d4f34";
    //     refetchWhenNoDataIsFound &&
    //         explicitTrendSearchText &&
    //         setFetchUrl(
    //             `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}`
    //         );
    //     refetchWhenNoDataIsFound && setRefetchWhenNoDataIsFound(false);
    // }, [refetchWhenNoDataIsFound]);

    let renderArticles = () =>
        dataset &&
        dataset.map((item) => (
            <RenderArticle key={item.title} item={item} fromExplicitTrend={true} whichNav={whichNav} />
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


/**
 * 
 * 
     let fetchData = () => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${explicitTrendSearchText}&api-key=${apik}`
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
          console.log(data, 'data!!')
          let results = data.response.docs
          if(results) {
            handleDataset(results)
          } else {
            alert('no data found, try again later!!')
          }
        })
        .catch(err => console.log(err.code, err.message))
      }
 * 
 * 
 // let fetchDataGnewsAPI = () => {
    //     // console.log(fetchUrl, 'fetchUrl', explicitTrendSearchText, whichNav)
    //     fetch(fetchUrl)
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             console.log(data, "data!!");
    //             let results = data.articles;
    //             if (results.length) {
    //                 handleDataset(results);
    //             } else {
    //                 console.log("no data found, try again later!!");
    //             }
    //         })
    //         .catch((err) => console.log(err.code, err.message));
    // };

    // let decideFetchUrl = (searchString, whichNav) => {
    //     let apik = '331316111680cc0fc47a9bcbf5cb47ef'
    //     let url = (
    //         whichNav == 'Top'
    //         ?
    //         `https://gnews.io/api/v4/top-headlines?lang=en?q="${encodeURI(searchString)}"&token=${apik}`
    //         :
    //         whichNav == 'Latest'
    //         ?
    //         `https://gnews.io/api/v4/search?lang=en?q="${encodeURI(searchString)}"&token=${apik}`
    //         :
    //         whichNav == 'Picture'
    //         ?
    //         `https://gnews.io/api/v4/search?lang=en?q="${encodeURI(searchString)}"&token=${apik}`
    //         :
    //         whichNav == 'Videos'
    //         &&
    //         `https://gnews.io/api/v4/search?lang=en?q="${encodeURI(searchString)}"&token=${apik}`
    //     )
    //     setFetchUrl(url)
    // }
 * 
 * 
     useEffect(() => {
        let apik = "331316111680cc0fc47a9bcbf5cb47ef";

        // let apikForPexel = '563492ad6f91700001000001ff1b2b316cff458fa9f5199597d08cf7'

        let url =
                whichNav == "Top"
                ? `https://gnews.io/api/v4/search?lang=en?q="${encodeURI(explicitTrendSearchText)}"&token=${apik}`
                : whichNav == "Latest"
                    ? `https://gnews.io/api/v4/top-headlines?lang=en?q=${encodeURI(explicitTrendSearchText)}&token=${apik}`
                    : whichNav == "People"
                        ? `https://gnews.io/api/v4/search?q=${encodeURI(explicitTrendSearchText)}?lang=en&token=${apik}`
                        : whichNav == "Photos"
                            ? `https://gnews.io/api/v4/search?q=${encodeURI(explicitTrendSearchText)}?lang=en&token=${apik}`
                            : whichNav == "Videos"
                                ?
                                `https://gnews.io/api/v4/search?q=${encodeURI(explicitTrendSearchText)}?lang=en&token=${apik}`
                                :
                                `https://gnews.io/api/v4/search?q=worldnews?lang=en&token=${apik}`

        setFetchUrl(url);
    }, [explicitTrendSearchText]);

    // useEffect(() => {
    //     whichNav && explicitTrendSearchText && fetchDataFromGoogleNewsAPI();
    // }, []);

    // useEffect(() => whichNav && explicitTrendSearchText && fetchDataFromGoogleNewsAPI(), [explicitTrendSearchText, whichNav])
    useEffect(() => {
        if (whichNav != "Videos") {
            whichNav && explicitTrendSearchText && fetchDataGnewsAPI();
        }
        // else {
        //     searchForVideosOnly(setVideoFeeds);
        // }
    }, [explicitTrendSearchText, whichNav]);
 * 
 * 
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

    // useEffect(() => {
    //     let apik = "16d8576b44404e2cacdb7c57761d4f34";
    //     refetchWhenNoDataIsFound &&
    //         explicitTrendSearchText &&
    //         setFetchUrl(
    //             `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}`
    //         );
    //     refetchWhenNoDataIsFound && setRefetchWhenNoDataIsFound(false);
    // }, [refetchWhenNoDataIsFound]);

    useEffect(() => {
        let apik = "16d8576b44404e2cacdb7c57761d4f34";

        // let apikForPexel = '563492ad6f91700001000001ff1b2b316cff458fa9f5199597d08cf7'

        // let url = explicitTrendSearchText
        //     ? whichNav == "Top"
        //         ? `https://newsapi.org/v2/everything?q=${encodeURI(explicitTrendSearchText)}?lang=en&apiKey=${apik}`
        //         : whichNav == "Latest"
        //             ? `https://newsapi.org/v2/top-headlines?sources=bbc-news?q=${encodeURI(explicitTrendSearchText)}&apiKey=${apik}?lang=en`
        //             : whichNav == "People"
        //                 ? `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
        //                 : whichNav == "Photos"
        //                     ? `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
        //                     : whichNav == "Videos" &&
        //                     `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
        //     : `https://newsapi.org/v2/everything?q=${encodeURI(explicitTrendSearchText)}?lang=en&apiKey=${apik}`;

        let url = explicitTrendSearchText
            ? whichNav == "Top"
                ? `https://newsapi.org/v2/everything?q=${encodeURI(explicitTrendSearchText)}?lang=en&apiKey=16d8576b44404e2cacdb7c57761d4f34`
                : whichNav == "Latest"
                    ? `https://newsapi.org/v2/top-headlines?sources=bbc-news?q=${encodeURI(explicitTrendSearchText)}&apiKey=16d8576b44404e2cacdb7c57761d4f34?lang=en`
                    : whichNav == "People"
                        ? `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
                        : whichNav == "Photos"
                            ? `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
                            : whichNav == "Videos" &&
                            `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}?lang=en`
            : `https://newsapi.org/v2/everything?lang=en&apiKey=${apik}`;

        setFetchUrl(url);
    }, [whichNav, explicitTrendSearchText]);
 */