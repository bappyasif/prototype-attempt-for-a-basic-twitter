import React, { useEffect, useState } from 'react'
let deepai = require('deepai');

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
        return response.json()
    })
        .then(data => {
            let results = data.globalObjects.users
            if (results) {
                let allkeys = Object.keys(results)
                let arrOfObj = allkeys.map(key => results[key])
                datasetUpdater(arrOfObj)
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
    let handle = setTimeout(() => {
        let userName = item.first_name + ' ' + item.last_name;
        makeRequest(userName, updateListOfUsers, item.uid, setFetchReady, setCounter)
    }, 110)
    return () => clearTimeout(handle)
}

export let makeRequestToRandomDataAPI = (updateUsers) => {
    let url = 'https://random-data-api.com/api/users/random_user'
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            updateUsers(prevData => prevData.concat(data))
        })
        .catch(err => console.log(err.code, err.message))
}

export let makeRequest = (name, listUpdater, uuid, fetchStatus, updateCount ) => {
    let apik = '19e554d0-1dc4-49b1-9b20-423602876bcf'
    deepai.setApiKey(apik)
    deepai.callStandardApi('text-generator', { text: name })
        .then(resp => {
            let textExtracted = (resp.output.split('.')[0])
            listUpdater(uuid, textExtracted)
            fetchStatus(true)
            updateCount(count => count + 1)
        })
}

export default useReuseableDataExtraction