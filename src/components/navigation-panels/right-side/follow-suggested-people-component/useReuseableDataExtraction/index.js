import React, { useEffect, useState } from 'react'

function useReuseableDataExtraction(maxCount, usersList) {
    let [listOfUsers, setListOfUsers] = useState([])
    let [fetchReady, setFetchReady] = useState(true)
    let [counter, setCounter] = useState(0)

    console.log(usersList, '?!?!')

    let updateListOfUsers = (uuid, descText) => {
        let newList = listOfUsers.map(item => {
            if (item.uid == uuid) {
                item.decsription = descText
            }
            return item
        })
        setListOfUsers(newList)
    }

    useEffect(() => usersList && setListOfUsers(usersList), [usersList])

    // useEffect(() => {
    //     count == maxCount && updateList(listOfUsers)
    // }, [count])

    useEffect(() => {
        if (listOfUsers.length == maxCount && counter <= maxCount) {
            // console.log('chk03')
            listOfUsers.forEach((item, _, arr) => {
                console.log(counter, 'counter!!')
                if (fetchReady) {
                    gettingDataFfromDeepai(item, setFetchReady, updateListOfUsers, setCounter)
                }
            })
        }
    }, [listOfUsers])

    return counter == maxCount && listOfUsers
}

export default useReuseableDataExtraction