import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ListModalHeader } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components';

function RenderLengthyFollowList() {
    let history = useHistory(null)

    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

    let url01 = `https://api.nytimes.com/svc/books/v3/lists/current/science.json?api-key=${apik}`

    let url02 = `https://api.nytimes.com/svc/books/v3/lists/current/sports.json?api-key=${apik}`

    // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`

    let fetchUrls = [{ url: url01, category: 'science' }, { url: url02, category: 'sports' }];

    let renderDataFromFetches = () => fetchUrls.map((item, idx) => <RenderDataFromFetch key={idx} url={item.url} apik={apik} category={item.category} />)

    // let renderDataFromFetches = () => {
    //     return fetchUrls.map((item, idx) => {
    //         let handles
    //         return <RenderDataFromFetch key={idx} url={item.url} apik={apik} category={item.category} />
    //     })
    // }

    return (
        <div id='lengthy-follow-list-container'>
            {/* <RenderFirstHalf url={url01} apik={apik} />
            <RenderSecondHalf url={url02} apik={apik} /> */}
            <ListModalHeader icon={backSvgIcon()} modalTitle={'Connect'} history={history} />
            <div id='header-text'>Suggested for you</div>
            {renderDataFromFetches()}
        </div>
    )
}

let RenderDataFromFetch = ({ url, apik, category }) => {
    let [dataset, setDataset] = useState(null)

    let [updatedDataset, setUpdatedDataset] = useState(null)

    let handleDataset = items => setDataset(items)

    let updateDataset = (title, newData) => {
        // console.log(title, newData, 'foundReview!!')
        let newList = dataset.map(item => {
            if (item.title == title) {
                item.reviewList = newData
            }
            return item;
        })
        // console.log(newList, 'newList!!')
        setUpdatedDataset(newList)
        // category == 'science' && setUpdatedDataset(newList)
    }

    let fetchData = (url, updater) => {
        fetch(url)
            .then(response => response.json())
            .then(data => updater(data.results.books))
            .catch(err => console.log('fetch request has failed', err.code, err.message))
    }

    useEffect(() => fetchData(url, handleDataset), [url])

    // this works but individually
    let makeBookReviewCall = (item) => {
        // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
        // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${item.primary_isbn13}&api-key=${apik}`
        let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${item.author.split(' ').join('+')}&api-key=${apik}`
        console.log(reviewUrl, 'reviewUrl', item)
        fetch(reviewUrl)
            .then(response => response.json())
            .then(data => {
                data.num_results && updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString())
            })
            .catch(err => console.log(err.code, err.message))
    }

    useEffect(() => {
        let handles;
        if (category == 'science') {
            handles = dataset && dataset.map((item, idx) => {
                setTimeout(() => makeBookReviewCall(item), 6000 * idx)
            })
            return () => handles && handles.forEach(handle => clearTimeout(handle))
        } else {
            // let idx = 11;
            handles = dataset && dataset.map((item, idx) => {
                let carry = 10 * 6000;
                setTimeout(() => {
                    makeBookReviewCall(item);
                }, (carry + idx * 6000))
            })

            return () => handles && handles.forEach(handle => clearTimeout(handle))
        }
    }, [dataset])

    // console.log(dataset, 'dataset!!')

    let renderBookRelatedInfos = () => {
        return updatedDataset ? updatedDataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />) : dataset && dataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />)
    }

    return (
        <div id='suggested-first-half-wrapper'>
            {renderBookRelatedInfos()}
        </div>
    )
}

let RenderBookRelatedInfos = ({ item }) => {
    let { reviewList } = { ...item }

    let [suggestedName, setSuggestedName] = useState(null)

    let [follow, setFollow] = useState(false)

    let [actionName, setActionName] = useState(null)

    let handleFollow = evt => {
        // console.log(evt.target.textContent, 'checks!!')
        setActionName(evt.target.textContent)

        setSuggestedName(item.title)
    }

    useEffect(() => {
        setFollow(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)
    }, [actionName])

    return (
        <div id='book-related-infos-wrapper'>
            <div id='top-portion'>
                <div id='left-side'>
                    <img id='book-img' src={item.book_image} />
                    <div id='book-infos'>
                        <div id='book-name'>{item.title}</div>
                        <div id='author-name'>{item.author}</div>
                    </div>
                </div>
                {/* <div id='follow-btn' onClick={handleFollow} style={{ backgroundColor: follow == 'Follow' && 'rgba(29, 155, 240, 1)' }}>{follow == 'Follow' ? 'Following' : 'Follow'}</div> */}
                <div id='follow-btn' onClick={handleFollow} style={{ backgroundColor: follow && 'rgba(29, 155, 240, 1)' }}>{follow ? 'Following' : 'Follow'}</div>
            </div>
            {/* <div id='book-review'>{item.reviewList || 'book review awaits or was not found at this moment....'}</div> */}
            <div id='book-review'>{reviewList || 'book review awaits or was not found at this moment....'}</div>
            {actionName == 'Following' && <RenderUnfollowModal handleFollow={handleFollow} suggestedName={suggestedName} />}
        </div>
    )
}

export let RenderUnfollowModal = ({ handleFollow, suggestedName }) => {
    let actionBtns = ['Unfollow', 'Cancel']

    let renderActionNames = () => actionBtns.map(name => <ActionButton key={name} actionName={name} handleFollow={handleFollow} />)

    return (
        <div id='unfollow-modal-wrapper'>
            <div id='modal-top-section'>
                <div id='modal-header'>Unfollow @<spam id='suggested-name'>{suggestedName}</spam></div>
                <div id='modal-action-description'>Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected.</div>
            </div>
            <div id='action-btns-wrapper'>
                {renderActionNames()}
            </div>
        </div>
    )
}

let ActionButton = ({ actionName, handleFollow }) => {
    return (
        <div className='action-btns' id={'action-btn-' + actionName} onClick={handleFollow} >{actionName}</div>
    )
}

export let backSvgIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>




// let RenderDataFromFetch = ({ url, apik, category }) => {
//     let [dataset, setDataset] = useState(null)

//     let [updatedDataset, setUpdatedDataset] = useState(null)

//     let [cycleCompleted, setCycleCompleted] = useState(false)

//     // let [reviewUrls, setReviewUrls] = useState()

//     let handleDataset = items => setDataset(items)

//     useEffect(() => {
//         cycleCompleted && console.log(cycleCompleted, 'cycleCompleted!!', dataset, updatedDataset)
//         cycleCompleted && setDataset(updatedDataset)
//     }, [cycleCompleted])

//     let updateDataset = (title, newData) => {
//         console.log(title, newData, 'foundReview!!')
//         let newList = dataset.map(item => {
//             if (item.title == title) {
//                 item.reviewList = newData
//             }
//             return item;
//         })
//         // console.log(newList, 'newList!!')
//         setUpdatedDataset(newList)
//         // category == 'science' && setUpdatedDataset(newList)
//     }

//     let fetchData = (url, updater) => {
//         fetch(url)
//             .then(response => response.json())
//             .then(data => updater(data.results.books))
//             .catch(err => console.log('fetch request has failed', err.code, err.message))
//     }

//     useEffect(() => fetchData(url, handleDataset), [url])

//     // this works but individually
//     let makeBookReviewCall = (item) => {
//         // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//         let reviewUrl02 = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${item.primary_isbn13}&api-key=${apik}`
//         let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${item.author.split(' ').join('+')}&api-key=${apik}`
//         console.log(cycleCompleted ? reviewUrl02 : reviewUrl, 'reviewUrl', item)
//         fetch(cycleCompleted ? reviewUrl02 : reviewUrl)
//             .then(response => response.json())
//             .then(data => {
//                 data.num_results && updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString())
//             })
//             .catch(err => console.log(err.code, err.message))
//     }

//     useEffect(() => {
//         let handles;
//         if (category == 'science') {
//             handles = dataset && dataset.map((item, idx) => {
//                 setTimeout(() => makeBookReviewCall(item), 6000 * idx)
//             })
//             return () => handles && handles.forEach(handle => clearTimeout(handle))
//         } else {
//             // let idx = 11;
//             handles = dataset && dataset.map((item, idx) => {
//                 let carry = 10 * 6000;
//                 setTimeout(() => {
//                     makeBookReviewCall(item);
//                     !cycleCompleted && category == 'sports' && idx == 9 && setCycleCompleted(true)
//                 }, (carry + idx * 6000))
//             })
//             return () => handles && handles.forEach(handle => clearTimeout(handle))
//         }
//     }, [dataset])

//     console.log(dataset, 'dataset!!')

//     let renderBookRelatedInfos = () => {
//         return updatedDataset ? updatedDataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />) : dataset && dataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />)
//     }

//     return (
//         <div id='suggested-first-half-wrapper'>
//             {renderBookRelatedInfos()}
//         </div>
//     )
// }

// let makeBookReviewCall = (item) => {
//     let urls = [`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${item.primary_isbn13}&api-key=${apik}`, `https://api.nytimes.com/svc/books/v3/reviews.json?author=${item.author.split(' ').join('+')}&api-key=${apik}`]
//     // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//     // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${item.primary_isbn13}&api-key=${apik}`
//     // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${item.author.split(' ').join('+')}&api-key=${apik}`
//     // console.log(reviewUrl, 'reviewUrl', item)
//     fetch(urls[0])
//         .then(response => response.json())
//         .then(data => {
//             // data.num_results && updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString())
//             if (data.num_results) {
//                 updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString())
//             } else {
//                 let handle = setTimeout(() => {
//                     fetch(urls[1])
//                         .then(resp => resp.json())
//                         .then(data => {
//                             data.num_results ? updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString()) : null
//                         }, 9000)
//                     return () => clearTimeout(handle) 
//                 })
//                 console.log('here!!')
//             }
//         })
//         .catch(err => console.log(err.code, err.message))
// }


/**
 * 
 * 
 let RenderDataFromFetch = ({ url, apik, category }) => {
    let [dataset, setDataset] = useState(null)

    let [updatedDataset, setUpdatedDataset] = useState(null)

    let [urlCounter, setUrlCounter] = useState(0);

    let [bookItem, setBookItem] = useState({})

    let handleDataset = items => setDataset(items)

    let reviewUrls = [`https://api.nytimes.com/svc/books/v3/reviews.json?author=${bookItem.author && bookItem.author.split(' ').join('+')}&api-key=${apik}`, `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${bookItem.primary_isbn13}&api-key=${apik}`,`https://api.nytimes.com/svc/books/v3/reviews.json?title=${bookItem.title}&api-key=${apik}`]

    let updateDataset = (title, newData) => {
        console.log(title, newData, 'foundReview!!')
        let newList = dataset.map(item => {
            if (item.title == title) {
                item.reviewList = newData
            }
            return item;
        })
        // console.log(newList, 'newList!!')
        setUpdatedDataset(newList)
        // category == 'science' && setUpdatedDataset(newList)
    }

    let fetchData = (url, updater) => {
        fetch(url)
            .then(response => response.json())
            .then(data => updater(data.results.books))
            .catch(err => console.log('fetch request has failed', err.code, err.message))
    }

    useEffect(() => fetchData(url, handleDataset), [url])
    
    let makeThisFetchRequest = (url, item) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // data.num_results ? updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString()) : makeThisFetchRequest()
                if (data.num_results) {
                    updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString())
                } else {
                    if (urlCounter <= 2) {
                        setTimeout(() => makeThisFetchRequest(reviewUrls[urlCounter], item), 6000)
                    setUrlCounter(urlCounter + 1)
                    } else {
                        return
                    }
                }
            })
            .catch(err => console.log(err.code, err.message))
    }

    let makeBookReviewCall = (item) => {
        // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
        // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${item.primary_isbn13}&api-key=${apik}`
        // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${item.author.split(' ').join('+')}&api-key=${apik}`
        
        // console.log(reviewUrl, 'reviewUrl', item)
        
        makeThisFetchRequest(reviewUrls[urlCounter])
        
        setUrlCounter(urlCounter + 1)

        // fetch(reviewUrl)
        //     .then(response => response.json())
        //     .then(data => {
        //         data.num_results && updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString())
        //     })
        //     .catch(err => console.log(err.code, err.message))
    }
    
    // this works but individually
    // let makeBookReviewCall = (item) => {
    //     // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
    //     // let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${item.primary_isbn13}&api-key=${apik}`
    //     let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?author=${item.author.split(' ').join('+')}&api-key=${apik}`
    //     console.log(reviewUrl, 'reviewUrl', item)
    //     fetch(reviewUrl)
    //         .then(response => response.json())
    //         .then(data => {
    //             data.num_results && updateDataset(item.title, (data.results[data.results.length ? data.results.length - 1 : 0].summary).toString())
    //         })
    //         .catch(err => console.log(err.code, err.message))
    // }

    useEffect(() => {
        let handles;
        if (category == 'science') {
            handles = dataset && dataset.map((item, idx) => {
                setTimeout(() => {
                    setBookItem(item)
                    makeBookReviewCall(item)
                }, 6000 * idx)
            })
            return () => handles && handles.forEach(handle => clearTimeout(handle))
        } else {
            // let idx = 11;
            handles = dataset && dataset.map((item, idx) => {
                let carry = 10 * 6000;
                setTimeout(() => {
                    setBookItem(item)
                    makeBookReviewCall(item);
                    // idx++;
                    // console.log(idx, 'idx!!')
                }, (carry + idx * 6000))
            })
            return () => handles && handles.forEach(handle => clearTimeout(handle))
        }

    }, [dataset])

    // useEffect(() => {
    //     let handles = dataset && dataset.map((item, idx) => {
    //         setTimeout(() => makeBookReviewCall(item), 6000 * idx)
    //     })
    //     return () => handles && handles.forEach(handle => clearTimeout(handle))
    // }, [dataset])

    console.log(dataset, 'dataset!!')

    // let renderBookRelatedInfos = () => dataset && dataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />)

    let renderBookRelatedInfos = () => {
        return updatedDataset ? updatedDataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />) : dataset && dataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />)
    }

    return (
        <div id='suggested-first-half-wrapper'>
            {renderBookRelatedInfos()}
        </div>
    )
}
 */


// let RenderFirstHalf = ({ url, apik }) => {
//     let [dataset, setDataset] = useState(null)

//     let [updatedDataset, setUpdatedDataset] = useState(null)

//     let handleDataset = items => setDataset(items)

//     let updateDataset = (title, newData) => {
//         console.log(title, newData, 'foundReview!!')
//         let newList = dataset.map(item => {
//             if (item.title == title) {
//                 item.reviewList = newData
//             }
//             return item;
//         })
//         console.log(newList, 'newList!!')
//         setUpdatedDataset(newList)
//     }

//     let fetchData = (url, updater) => {
//         fetch(url)
//             .then(response => response.json())
//             .then(data => updater(data.results.books))
//             .catch(err => console.log('fetch request has failed', err.code, err.message))
//     }

//     useEffect(() => fetchData(url, handleDataset), [url])

//     let makeBookReviewCall = (item) => {
//         let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//         fetch(reviewUrl)
//             .then(response => response.json())
//             .then(data => {
//                 // data.num_results && {...item, reviewList: data.results[0].summary}
//                 data.num_results && console.log(data.results[0].summary)
//                 data.num_results && updateDataset(item.title, data.results[0].summary)
//                 // setFlag(true)
//             })
//             .catch(err => console.log(err.code, err.message))
//     }

//     useEffect(() => {
//         let handles = dataset && dataset.map((item, idx) => {
//             setTimeout(() => makeBookReviewCall(item), 6000 * idx)
//         })
//         return () => handles && handles.forEach(handle => clearTimeout(handle))
//     }, [dataset])

//     console.log(dataset, 'dataset!!')

//     // let renderBookRelatedInfos = () => dataset && dataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />)

//     let renderBookRelatedInfos = () => {
//         return updatedDataset ? updatedDataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />) : dataset && dataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />)
//     }

//     return (
//         <div id='suggested-first-half-wrapper'>
//             {renderBookRelatedInfos()}
//         </div>
//     )
// }

// let RenderFirstHalf = ({ url, apik }) => {
//     let [dataset, setDataset] = useState(null)

//     let [flag, setFlag] = useState(false)

//     let handleDataset = items => setDataset(items)

//     let fetchData = (url, updater) => {
//         fetch(url)
//             .then(response => response.json())
//             .then(data => updater(data.results.books))
//             .catch(err => console.log('fetch request has failed', err.code, err.message))
//     }

//     useEffect(() => fetchData(url, handleDataset), [url])

// useEffect(() => {
//     dataset && dataset.map(item => {
//         let handles = setTimeout(() => makeBookReviewCall(item), 8000)
//     })
// }, [dataset])

// let updateDataset = (title, newData) => {
//     console.log(title, newData, 'foundReview!!')
//     let newList = dataset.map(item => {
//         if(item.title == title) {
//             item.reviewList = newData
//         }
//         return item;
//     })
//     console.log(newList, 'newList!!')
//     setUpdatedDataset(newList)
//     // setDataset(newList)
//     // setDataset(prevItems => {
//     //     // let mappedData = prevItems.map(item => item.title == title && { ...item, reviewList: newData })
//     //     let mappedData = prevItems.map(item => {
//     //         if(item.title == title) {
//     //             item.reviewList = newData
//     //         }
//     //         return item
//     //     })
//     //     console.log(mappedData, 'mappedData!!')
//     //     prevItems = mappedData
//     //     // return mappedData;
//     //     return prevItems;
//     // })
// }

// let fetchData = (url, updater) => {
//     fetch(url)
//         .then(response => response.json())
//         .then(data => updater(data.results.books))
//         .catch(err => console.log('fetch request has failed', err.code, err.message))
// }

// useEffect(() => fetchData(url, handleDataset), [url])

// let makeBookReviewCall = (item) => {
//     let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//     fetch(reviewUrl)
//         .then(response => response.json())
//         .then(data => {
//             // data.num_results && {...item, reviewList: data.results[0].summary}
//             data.num_results && console.log(data.results[0].summary)
//             data.num_results && updateDataset(item.title, data.results[0].summary)
//             // setFlag(true)
//         })
//         .catch(err => console.log(err.code, err.message))
// }

// useEffect(() => {
//     if(flag) {
//         let handles = dataset && dataset.map((item, idx) => {
//             setTimeout(() => makeBookReviewCall(item), 6000 * idx)
//         })
//         return () => handles && handles.forEach(handle => clearTimeout(handle))
//     }
//     flag && setFlag(false)
// }, [flag])

// dataset && dataset.map(item => {
//     setInterval(() => {
//         let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//         fetch(reviewUrl)
//             .then(response => response.json())
//             .then(data => {
//                 // data.num_results && {...item, reviewList: data.results[0].summary}
//                 // data.num_results && console.log(data.results[0].summary)
//                 data.num_results && updateDataset(item.title, data.results[0].summary)
//             })
//             .catch(err => console.log(err.code, err.message))
//     }, 11000)
// })

//     // dataset && dataset.map(item => {
//     //     setTimeout(() => {
//     //         let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//     //         fetch(reviewUrl)
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             // data.num_results && (item.reviewList = data.results[0].summary)
//     //             // setFlag(true)
//     //             data.num_results && {...item, reviewList: data.results[0].summary}
//     //         })
//     //         .catch(err => console.log(err.code, err.message))
//     //     }, 11000)
//     // })

//     useEffect(() => {
//         dataset && dataset.map(item => {
//             setInterval(() => {
//                 let reviewUrl = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//                 fetch(reviewUrl)
//                 .then(response => response.json())
//                 .then(data => {
//                     // data.num_results && (item.reviewList = data.results[0].summary)
//                     // setFlag(true)
//                     // data.num_results && {...item, reviewList: data.results[0].summary}
//                     // data.num_results && console.log(data.results[0].summary)
//                 })
//                 .catch(err => console.log(err.code, err.message))
//             }, 11000)
//         })
//     }, [dataset])

//     console.log(dataset, 'dataset!!')

//     // useEffect(() => dataset && renderBookRelatedInfos(), [dataset])

//     // useEffect(() => {
//     //     flag && renderBookRelatedInfos()
//     //     flag && setFlag(false)
//     // }, [flag])

//     let renderBookRelatedInfos = () => dataset && dataset.map(item => <RenderBookRelatedInfos key={item.title} item={item} />)

//     return (
//         <div id='suggested-first-half-wrapper'>
//             {renderBookRelatedInfos()}
//         </div>
//     )
// }

// let RenderFirstHalf = ({ url, apik }) => {
//     let [dataset, setDataset] = useState(null)

//     let handleDataset = items => setDataset(items)

//     let fetchData = (url, updater) => {
//         fetch(url)
//             .then(response => response.json())
//             .then(data => updater(data.results.books))
//             .catch(err => console.log('fetch request has failed', err.code, err.message))
//     }

//     useEffect(() => fetchData(url, handleDataset), [url])

//     let renderNames = () => dataset && dataset.map(item => <RenderSuggestedPeopleInfo key={item.isbn} item={item} apik={apik} />)

//     return (
//         <div id='suggested-first-half-wrapper'>
//             {renderNames()}
//         </div>
//     )
// }

// let RenderSuggestedPeopleInfo = ({ item, apik }) => {
//     let [bookReview, setBookReview] = useState([])

//     let [flag, setFlag] = useState(true)

//     let handleReviews = (data) => setBookReview(prev => prev.concat(data))

//     let fetchBookReview = (updater) => {
//         let url = `https://api.nytimes.com/svc/books/v3/reviews.json?title=${item.title}&api-key=${apik}`
//         fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.num_results) {
//                 updater(data.results[0].summary)
//                 setFlag(false)
//             }
//         })
//         .catch(err => console.log('fetch request has failed', err.code, err.message))
//     }

//     // useEffect(() => item && fetchBookReview(handleReviews), [bookReview])

//     // useEffect(() => {
//     //     setTimeout(() => item && fetchBookReview(handleReviews), [6000])
//     // }, [item])

//     // useEffect(() => setTimeout(item.title && fetchBookReview(handleReviews), 6000), [])

//     // useEffect(() => setTimeout(item.title && fetchBookReview(handleReviews), 6000), [item])

//     // useEffect(() => setTimeout(item.title && fetchBookReview(handleReviews), 6000), [item.title])

//     useEffect(() => setTimeout(item.title && flag && fetchBookReview(handleReviews), 6000), [flag])

//     console.log(bookReview, 'bookReview!!')

//     return (
//         <div id='info-wrapper'>

//         </div>
//     )
// }

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

