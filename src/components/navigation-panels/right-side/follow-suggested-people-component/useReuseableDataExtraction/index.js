import React, { useEffect, useState } from 'react'
let deepai = require('deepai');
// import { gettingDataFfromDeepai, makeRequestToRandomDataAPI } from '../render-suggested-people-list'

function useReuseableDataExtraction() {
    let [listOfUsers, setListOfUsers] = useState([])
    let [fetchReady, setFetchReady] = useState(true)
    let [counter, setCounter] = useState(0)

    // console.log(usersList, '?!?!')

    let updateListOfUsers = (uuid, descText) => {
        let newList = listOfUsers.map(item => {
            if (item.uid == uuid) {
                item.decsription = descText
            }
            return item
        })
        setListOfUsers(newList)
    }

    // useEffect(() => usersList && setListOfUsers(usersList), [usersList])

    // useEffect(() => {
    //     count == maxCount && updateList(listOfUsers)
    // }, [count])

    useEffect(() => {
        if (listOfUsers.length == 20 && counter <= 20) {
            // console.log('chk03')
            listOfUsers.forEach((item, _, arr) => {
                // console.log(counter, 'counter!!')
                if (fetchReady) {
                    gettingDataFfromDeepai(item, setFetchReady, updateListOfUsers, setCounter)
                }
            })
        } else {
            console.log('its here!!')
        }
    }, [listOfUsers])

    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            makeRequestToRandomDataAPI(setListOfUsers)
        }
    }, [])

    // console.log(listOfUsers, 'listOfUsers')

    return listOfUsers
}

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