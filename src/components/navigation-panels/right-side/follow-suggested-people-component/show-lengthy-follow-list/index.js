import React, { useState, useEffect } from 'react';

function RenderLengthyFollowList() {

    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

    let url01 = `https://api.nytimes.com/svc/books/v3/lists/current/science.json?api-key=${apik}`

    let url02 = `https://api.nytimes.com/svc/books/v3/lists/current/sports.json?api-key=${apik}`

    // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`

    return (
        <div id='lengthy-follow-list-container'>
            <RenderFirstHalf url={url01} apik={apik} />
        </div>
    )
}

let RenderFirstHalf = ({ url, apik }) => {
    let [dataset, setDataset] = useState(null)

    let handleDataset = items => setDataset(items)

    let fetchData = (url, updater) => {
        fetch(url)
            .then(response => response.json())
            .then(data => updater(data.results.books))
            .catch(err => console.log('fetch request has failed', err.code, err.message))
    }

    useEffect(() => fetchData(url, handleDataset), [url])

    let renderNames = () => dataset && dataset.map(item => <RenderSuggestedPeopleInfo key={item.isbn} item={item} apik={apik} />)

    return (
        <div id='suggested-first-half-wrapper'>
            {renderNames()}
        </div>
    )
}

let RenderSuggestedPeopleInfo = ({ item, apik }) => {
    let [bookReview, setBookReview] = useState([])

    let handleReviews = (data) => setBookReview(prev => prev.concat(data))

    let fetchBookReview = (updater) => {
        let url = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.num_results) {
                updater(data.results[0].summary)
            }
        })
        .catch(err => console.log('fetch request has failed', err.code, err.message))
    }

    useEffect(() => item && fetchBookReview(handleReviews), [bookReview])

    console.log(bookReview, 'bookReview!!')

    return (
        <div id='info-wrapper'>

        </div>
    )
}

// function RenderLengthyFollowList() {
//     let [data, setData] = useState(null)

//     let [data02, setData02] = useState(null)

//     let [combinedData, setCombinedData] = useState(null)

//     let [customData, setCustomData] = useState([])

//     let [runOnce, setRunOnce] = useState(true)

//     let handleCustomData = item => setCustomData(prevData => prevData.concat(item))

//     let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

//     // let url = `http://api.nytimes.com/svc/semantic/v2/concept/name/nytd_per/World?fields=all&api-key=${apik}`

//     // let url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apik}`

//     let url01 = `https://api.nytimes.com/svc/books/v3/lists/current/science.json?api-key=${apik}`

//     let url02 = `https://api.nytimes.com/svc/books/v3/lists/current/sports.json?api-key=${apik}`

//     useEffect(() => {
//         fetchData(url01, setData)
//         // fetchData(url02, setData02)
//     }, [])

//     // useEffect(() => {
//     //     data && data02 & setCombinedData([].concat(data, data02))
//     // }, [data, data02])

//     console.log(combinedData, 'dataReady!!', customData)

//     // let renderAllCombinedBooks = () => combinedData && combinedData.map((item, idx) => idx == 2 &&  gatherInfoOnBooks(item, handleCustomData, apik))

//     let renderDataset = () => data && data.map(item => gatherInfoOnBooks(item, handleCustomData, apik))

//     // useEffect(() => {
//     //     data && renderDataset();
//     //     // data && runOnce && setRunOnce(false)
//     // }, [data])

//     data && renderDataset()

//     // renderAllCombinedBooks();

//     return (
//         <div id='lengthy-follow-list-container'>

//         </div>
//     )
// }
// let HandlingAllBookData = ({data}) => {
//     let [bookTitle, setBookTitle] = useState(null)
//     data.forEach(item => )

//     return (
//         <div></div>
//     )
// }

// let gatherInfoOnBooks = (item, dataUpdater, apik) => {
//     // let url = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${item.author}&api-key=${apik}`
//     let url = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//     // fetch(url).then(res=>res.json()).then(data => console.log(data, 'datadata')).catch(err=>console.log(err.code, err.message))
//     fetchBookSpecificData(url, dataUpdater)
// }

// let fetchBookSpecificData = (url, updater) => {
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         if(data.num_results) {
//             updater(data.results[0].summary)
//         }
//     })
//     .catch(err => console.log('fetch request has failed', err.code, err.message))
// }

// let fetchData = (url, updater) => {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => updater(data.results.books))
//         .catch(err => console.log('fetch request has failed', err.code, err.message))
// }

export default RenderLengthyFollowList;
