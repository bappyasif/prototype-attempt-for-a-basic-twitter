import React, { useEffect, useState } from 'react'
let deepai = require('deepai');
// import { gettingDataFfromDeepai, makeRequestToRandomDataAPI } from '../render-suggested-people-list'

function useReuseableDataExtraction() {
    let [listOfUsers, setListOfUsers] = useState([])

    let [usersList, setUsersList] = useState(null)

    let randomUserIndexSelector = () => {
        let rndIdx = Math.floor(Math.random() * 20)
        return rndIdx;
    }

    let searchTwitterApiForSimilarUsers = () => {
        // let url = `https://twitter135.p.rapidapi.com/AutoComplete/?q=${listOfUsers[randomUserIndexSelector()].first_name}`
        let url = `https://twitter135.p.rapidapi.com/Search/?q=${listOfUsers[randomUserIndexSelector()].first_name}&count=20`
        fetchingSimilarUserDataFromTwitter(url, setUsersList)
    }

    useEffect(() => listOfUsers.length == 20 && searchTwitterApiForSimilarUsers(), [listOfUsers])

    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            makeRequestToRandomDataAPI(setListOfUsers)
        }
    }, [])

    // console.log(listOfUsers, 'listOfUsers', usersList)

    // return listOfUsers
    return usersList
}

let fetchingSimilarUserDataFromTwitter = ( url, datasetUpdater ) => {
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

export let gettingDataFfromDeepai = (item, setFetchReady, updateListOfUsers, setCounter) => {
    setFetchReady(false)
    // console.log('chk04')
    let handle = setTimeout(() => {
        let userName = item.first_name + ' ' + item.last_name;
        makeRequest(userName, updateListOfUsers, item.uid, setFetchReady, setCounter)
        // console.log('chk05')
    }, 110)
    // console.log('cchck01')
    return () => clearTimeout(handle)
}

export let makeRequestToRandomDataAPI = (updateUsers) => {
    let url = 'https://random-data-api.com/api/users/random_user'
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            updateUsers(prevData => prevData.concat(data))
        })
        .catch(err => console.log(err.code, err.message))
}

export let makeRequest = (name, listUpdater, uuid, fetchStatus, updateCount ) => {
    let apik = '19e554d0-1dc4-49b1-9b20-423602876bcf'
    deepai.setApiKey(apik)
    deepai.callStandardApi('text-generator', { text: name })
        .then(resp => {
            // console.log(resp, '!!')
            // let textExtracted = (resp.output.split('.')[2])
            // listUpdater(uuid, resp.output)
            let textExtracted = (resp.output.split('.')[0])
            listUpdater(uuid, textExtracted)
            fetchStatus(true)
            updateCount(count => count + 1)
        })
    // console.log('chk02')
}

export default useReuseableDataExtraction

/**
 * 
 * 
 // function useReuseableDataExtraction() {
//     let [listOfUsers, setListOfUsers] = useState([])
//     let [fetchReady, setFetchReady] = useState(true)
//     let [counter, setCounter] = useState(0)
//     let [usersList, setUsersList] = useState(null)

//     // console.log(usersList, '?!?!')

//     let updateListOfUsers = (uuid, descText) => {
//         let newList = listOfUsers.map(item => {
//             if (item.uid == uuid) {
//                 item.decsription = descText
//             }
//             return item
//         })
//         setListOfUsers(newList)
//     }

//     // useEffect(() => usersList && setListOfUsers(usersList), [usersList])

//     // useEffect(() => {
//     //     count == maxCount && updateList(listOfUsers)
//     // }, [count])

//     // previous implementation
//     // useEffect(() => {
//     //     if (listOfUsers.length == 20 && counter <= 20) {
//     //         // console.log('chk03')
//     //         listOfUsers.forEach((item, _, arr) => {
//     //             // console.log(counter, 'counter!!')
//     //             if (fetchReady) {
//     //                 gettingDataFfromDeepai(item, setFetchReady, updateListOfUsers, setCounter)
//     //             }
//     //         })
//     //     } else {
//     //         console.log('its here!!')
//     //     }
//     // }, [listOfUsers])

//     let randomUserIndexSelector = () => {
//         let rndIdx = Math.floor(Math.random() * 20)
//         return rndIdx;
//     }

//     let searchTwitterApiForSimilarUsers = () => {
//         // let url = `https://twitter135.p.rapidapi.com/AutoComplete/?q=${listOfUsers[randomUserIndexSelector()].first_name}`
//         let url = `https://twitter135.p.rapidapi.com/Search/?q=${listOfUsers[randomUserIndexSelector()].first_name}&count=20`
//         fetchingSimilarUserDataFromTwitter(url, setUsersList)
//     }

//     useEffect(() => listOfUsers.length == 20 && searchTwitterApiForSimilarUsers(), [listOfUsers])

//     useEffect(() => {
//         for (let i = 0; i < 20; i++) {
//             makeRequestToRandomDataAPI(setListOfUsers)
//         }
//     }, [])

//     console.log(listOfUsers, 'listOfUsers', usersList)

//     // return listOfUsers
//     return usersList
// }

// let fetchingSimilarUserDataFromTwitter = ( url, datasetUpdater ) => {
//     // https://twitter135.p.rapidapi.com/AutoComplete/?q=Elon
//     fetch(url, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "twitter135.p.rapidapi.com",
//             "x-rapidapi-key": "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524"
//         }
//     }).then(response => {
//         console.log(response, 'chk02')
//         return response.json()
//     })
//         .then(data => {
//             console.log(data, 'data!!')
//             let results = data.users
//             if (results) {
//                 let allkeys = Object.keys(results)
//                 let arrOfObj = allkeys.map(key => results[key])
//                 datasetUpdater(arrOfObj)
//                 // console.log('arrOfObj', arrOfObj)
//                 // datasetUpdater([...results])
//             } else {
//                 console.log('no data is found!!')
//             }
//         })
//         .catch(err => {
//             console.error(err);
//         });
// }

// export let updateListOfUsers = (uuid, descText, listUpdaterHook, listOfUsers) => {
//     let newList = listOfUsers && listOfUsers.map(item => {
//         if (item.uid == uuid) {
//             item.decsription = descText
//         }
//         return item
//     })
//     // setListOfUsers(newList)
//     listUpdaterHook(newList)
// }
 */