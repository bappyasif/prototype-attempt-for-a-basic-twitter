let deepai = require('deepai');
import React, { useEffect, useState } from 'react';
import { RenderUnfollowModal } from '../show-lengthy-follow-list';
import useReuseableDataExtraction from '../useReuseableDataExtraction';
import ShowSuggestedPersonModal, { makeRequest } from './show-suggested-person-modal';

function RenderSuggestedPeopleList({ }) {
    let [listOfUsers, setListOfUsers] = useState([])
    let [fetchReady, setFetchReady] = useState(true)
    let [counter, setCounter] = useState(0)
    let [usersWithDescription, setUsersWithDescription] = useState(null)

    // let updateListOfUsers = (uuid, descText) => {
    //     let newList = listOfUsers.map(item => {
    //         if (item.uid == uuid) {
    //             item.decsription = descText
    //         }
    //         return item
    //     })
    //     setListOfUsers(newList)
    // }

    // useEffect(() => {
    //     if(listOfUsers.length == 4) {
    //         let newList = useReuseableDataExtraction(4, listOfUsers)
    //         console.log(newList, 'newList!!')
    //     }
    // }, [listOfUsers])

    // useEffect(() => {
    //     if(listOfUsers.length == 4) {
    //         // dummyJsx = <ReusableDataExtractionComponent maxCount={4} updateList={setUsersWithDescription} usersList={listOfUsers} />
    //         <ReusableDataExtractionComponent maxCount={4} updateList={setUsersWithDescription} usersList={listOfUsers} />
    //     }
    // }, [listOfUsers])

    useEffect(() => {
        if (listOfUsers.length == 4 && counter < 5) {
            // console.log('chk03')
            listOfUsers.forEach((item, _, arr) => {
                console.log(counter, 'counter!!')
                if (fetchReady) {
                    gettingDataFfromDeepai(item, setFetchReady, updateListOfUsers, setCounter, setListOfUsers, arr)
                }
            })
        }
    }, [listOfUsers])

    // useEffect(() => contentCreators && setUniqueContents(uniqueObjArray(contentCreators)), [contentCreators])

    useEffect(() => {
        // makeGetRequestToRandommerAPI(setRandomListOfNames)
        // makeRequestToRandomDataAPI()

        for (let i = 0; i < 5; i++) {
            makeRequestToRandomDataAPI(setListOfUsers)
        }

    }, [])

    console.log(listOfUsers, 'listOfUsers')

    // console.log(contentCreators, 'contentCreatrors!!', uniqueContents)
    // let renderFollowThesePeople = () => contentCreators.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    // let renderFollowThesePeople = () => uniqueContents && uniqueContents.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    // let renderFollowThesePeople = () => listOfUsers && listOfUsers.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} updateListOfUsers={updateListOfUsers} />)

    let renderFollowThesePeople = () => listOfUsers && listOfUsers.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    return (
        <div id='follow-suggested-people-container'>
            {renderFollowThesePeople()}
            {/* {dummyJsx} */}
        </div>
    )
}

// let ReusableDataExtractionComponent = ({maxCount, updateList, usersList}) => {
//     let [listOfUsers, setListOfUsers] = useState([])
//     let [fetchReady, setFetchReady] = useState(true)
//     let [counter, setCounter] = useState(0)

//     console.log(usersList, '?!?!')

//     let updateListOfUsers = (uuid, descText) => {
//         let newList = listOfUsers.map(item => {
//             if (item.uid == uuid) {
//                 item.decsription = descText
//             }
//             return item
//         })
//         setListOfUsers(newList)
//     }

//     useEffect(() => usersList && setListOfUsers(usersList), [usersList])

//     useEffect(() => {
//         count == maxCount && updateList(listOfUsers)
//     }, [count])

//     useEffect(() => {
//         if (listOfUsers.length == maxCount && counter <= maxCount) {
//             // console.log('chk03')
//             listOfUsers.forEach((item, _, arr) => {
//                 console.log(counter, 'counter!!')
//                 if (fetchReady) {
//                     gettingDataFfromDeepai(item, setFetchReady, updateListOfUsers, setCounter)
//                 }
//             })
//         }
//     }, [listOfUsers])

//     return (<div></div>)
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

// export let gettingDataFfromDeepai = (item, setFetchReady, updateListOfUsers, setCounter) => {
//     setFetchReady(false)
//     // console.log('chk04')
//     let handle = setTimeout(() => {
//         let userName = item.first_name + ' ' + item.last_name;
//         makeRequest(userName, updateListOfUsers, item.uid, setFetchReady, setCounter)
//         // console.log('chk05')
//     }, 1000)
//     // console.log('cchck01')
//     return () => clearTimeout(handle)
// }

export let updateListOfUsers = (uuid, descText, listUpdaterHook, listOfUsers) => {
    let newList = listOfUsers && listOfUsers.map(item => {
        if (item.uid == uuid) {
            item.decsription = descText
        }
        return item
    })
    // setListOfUsers(newList)
    listUpdaterHook(newList)
}

export let gettingDataFfromDeepai = (item, setFetchReady, updateListOfUsers, setCounter, listUpdaterHook, listOfUsers) => {
    setFetchReady(false)
    // console.log('chk04')
    let handle = setTimeout(() => {
        let userName = item.first_name + ' ' + item.last_name;
        makeRequest(userName, updateListOfUsers, item.uid, setFetchReady, setCounter, listUpdaterHook, listOfUsers)
        // console.log('chk05')
    }, 1000)
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

let RenderPeople = ({ item }) => {
    let { first_name, last_name, avatar, uid } = { ...item }

    let name = first_name + ' ' + last_name

    let [nameAdjusted, setNameAdjusted] = useState(null)

    let [follows, setFollows] = useState(false)

    let [actionName, setActionName] = useState(null)

    let [followSuggested, setFollowSuggested] = useState(false)

    let [showPersonCardModal, setShowPersonCardModal] = useState(false)

    // let [descriptionTextReady, setDescriptionTextReady] = useState(false)

    let handleFollowSuggested = (evt) => {
        setActionName(evt.target.textContent)
    }

    let handleNameAdjust = () => {
        setNameAdjusted(name.split(' ').join('_'))
    }

    // console.log(item, '!!')

    // useEffect(() => descriptionTextReady && updateListOfUsers)

    useEffect(() => {
        Math.random() > .51 && setFollows(true)
        handleNameAdjust()
    }, [])

    useEffect(() => {
        // when its coming from suggested peoople container
        !showPersonCardModal && setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)

        // changing action strings appropriately when  its coming from showPersonCardModal
        showPersonCardModal && setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Following' && false)

        // making action string null so that it doesnt invoke unfollow modal when showPersonCardModal is no longer in view
        showPersonCardModal && actionName == 'Following' && setActionName('')
    }, [actionName])

    return (
        <div className='render-people-wrapper' onMouseLeave={() => setShowPersonCardModal(false)}>
            <div id='user-details' onMouseEnter={() => setShowPersonCardModal(true)}>
                <img src={avatar} id='user-img' />
                <div id='profile-info'>
                    <div id='user-name'>{name}</div>
                    <div id='user-handle'> @{(nameAdjusted || name).toLowerCase()} <span id='follow-status'>{follows ? ' Follows you' : ''}</span></div>
                </div>
            </div>
            {/* <div id='follow-btn'>Follow</div> */}
            <div id='follow-btn' onClick={handleFollowSuggested}>{followSuggested ? 'Following' : 'Follow'}</div>
            {actionName == 'Following' && !showPersonCardModal && <RenderUnfollowModal suggestedName={nameAdjusted || name} handleFollow={handleFollowSuggested} />}
            {showPersonCardModal && <ShowSuggestedPersonModal updatePersonModal={setShowPersonCardModal} name={name} handle={(nameAdjusted || name).toLowerCase()} profilePicUrl={avatar} handleFollowSuggested={handleFollowSuggested} followSuggested={followSuggested} descriptionText={item.decsription} />}
        </div>
    )
}

export let uniqueObjArray = objArray => [...new Map(objArray.map((item) => [item["name"], item])).values()];

export default RenderSuggestedPeopleList;

/**
 * 
 * 
     // useEffect(() => {
    //     if (listOfUsers.length == 4 && counter < 5) {
    //         // console.log('chk03')
    //         listOfUsers.forEach(item => {
    //             console.log(counter, 'counter!!')
    //             if (fetchReady) {
    //                 setFetchReady(false)
    //                 // console.log('chk04')
    //                 let handle = setTimeout(() => {
    //                     let userName = item.first_name + ' ' + item.last_name;
    //                     makeRequest(userName, updateListOfUsers, item.uid, setFetchReady, setCounter)
    //                     // console.log('chk05')
    //                 }, 1000)
    //                 // console.log('cchck01')
    //                 return () => clearTimeout(handle)
    //             }
    //         })
    //     }
    // }, [listOfUsers])
 * 
 * 
 function RenderSuggestedPeopleList({ contentCreators }) {
    let [uniqueContents, setUniqueContents] = useState([])
    let [randomListOfNames, setRandomListOfNames] = useState(null)
    let [listOfUsers, setListOfUsers] =  useState([])

    let updateListOfUsers = (uuid, descText) => {
        let newList = listOfUsers.map(item => {
            if(item.uid == uuid) {
                item.decsription = descText
            }
            return item
        })
        setListOfUsers(newList)
    }

    // useEffect(() => contentCreators && setUniqueContents(uniqueObjArray(contentCreators)), [contentCreators])

    useEffect(() => {
        // makeGetRequestToRandommerAPI(setRandomListOfNames)
        // makeRequestToRandomDataAPI()
        
        for(let i=0; i<10; i++) {
            makeRequestToRandomDataAPI(setListOfUsers)
        }

    }, [])

    console.log(listOfUsers, 'listOfUsers')

    // console.log(contentCreators, 'contentCreatrors!!', uniqueContents)
    // let renderFollowThesePeople = () => contentCreators.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    // let renderFollowThesePeople = () => uniqueContents && uniqueContents.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} />)

    let renderFollowThesePeople = () => listOfUsers && listOfUsers.map((item, idx) => idx < 4 && <RenderPeople key={idx} item={item} updateListOfUsers={updateListOfUsers} />)

    return (
        <div id='follow-suggested-people-container'>
            {renderFollowThesePeople()}
        </div>
    )
}
 * 
 * 
 let makeGetRequestToRandommerAPI = (randomNames) => {
    let apik = 'f7518aa4dd3f4d729af02db46bbb0772'
    
    // let url = `https://randommer.io/api/Name?nameType=fullname&quantity=20&X-Api-Key=${apik}`

    let url = `https://randommer.io/api/Name?nameType=fullname&quantity=20`

    // let headers = {
    //     "method": "GET",
    //     "X-Api-Key": apik
    // }

    let headersObj = {
        method: 'GET',
        headers: {
        'x-Api-Key': apik,
        }
    }

    fetch(url, headersObj)
    .then(resp => resp.json())
    .then(data  => {
        // console.log(data)
        randomNames(data)
    })
    .catch(err=>console.log(err.code, err.message))
}
 * 
 * 
 let RenderPeople = ({ item }) => {
    let { name, imgUrl } = { ...item }

    let [nameAdjusted, setNameAdjusted] = useState(null)

    let [follows, setFollows] = useState(false)

    let [actionName, setActionName] = useState(null)

    let [followSuggested, setFollowSuggested] = useState(false)

    let [showPersonCardModal, setShowPersonCardModal] = useState(false)

    let handleFollowSuggested = (evt) => {
        // setFollowSuggested(!followSuggested)
        setActionName(evt.target.textContent)
        // console.log(evt.target.textContent)
        // setActionName(showPersonCardModal && actionName == 'Following' ? 'Unfollow' : evt.target.textContent )
    }

    let handleNameAdjust = () => {
        if (name.includes(' And ')) {
            let tokenizingNameIfThereIsAnd = name.split(' And ')
            let joinedName = tokenizingNameIfThereIsAnd[0].split(' ')[0].concat(' ', tokenizingNameIfThereIsAnd[1].split(' ')[1])
            setNameAdjusted(joinedName)
            // console.log(joinedName, 'joined!!')
        } else {
            // console.log('not joined!!')
        }
    }

    // console.log(item, '!!')

    useEffect(() => {
        Math.random() > .51 && setFollows(true)
        handleNameAdjust()
    }, [])

    useEffect(() => {
        // setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)
        
        // when its coming from suggested peoople container
        !showPersonCardModal && setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Unfollow' ? false : actionName && true)
        
        // changing action strings appropriately when  its coming from showPersonCardModal
        showPersonCardModal && setFollowSuggested(actionName == 'Follow' ? true : actionName == 'Following' && false)

        // making action string null so that it doesnt invoke unfollow modal when showPersonCardModal is no longer in view
        showPersonCardModal && actionName == 'Following' && setActionName('')
    }, [actionName])

    return (
        <div className='render-people-wrapper' onMouseLeave={() => setShowPersonCardModal(false)}>
            <div id='user-details' onMouseEnter={() => setShowPersonCardModal(true)}>
                <img src={imgUrl} id='user-img' />
                <div id='profile-info'>
                    <div id='user-name'>{nameAdjusted || name}</div>
                    <div id='user-handle'> @{(nameAdjusted || name).toLowerCase()} <span id='follow-status'>{follows ? ' Follows you' : ''}</span></div>
                </div>
            </div>
            
            <div id='follow-btn' onClick={handleFollowSuggested}>{followSuggested ? 'Following' : 'Follow'}</div>
            {actionName == 'Following' && !showPersonCardModal && <RenderUnfollowModal suggestedName={nameAdjusted || name} handleFollow={handleFollowSuggested} />}
            {showPersonCardModal && <ShowSuggestedPersonModal updatePersonModal={setShowPersonCardModal} name={nameAdjusted || name} handle={(nameAdjusted || name).toLowerCase()} profilePicUrl={imgUrl} handleFollowSuggested={handleFollowSuggested} followSuggested={followSuggested} />}
        </div>
    )
}
 * 
 * 
     // let extractUniqueNamesOnly = (name) => {
    //     let idx = uniqueNames.findIndex(n => n = name)
    //     console.log('here!!', idx)
    //     idx == -1 ? setUniqueNames(prev => prev.concat(name)) : null
    // }

    // useEffect(() => contentCreators && contentCreators.forEach(item => extractUniqueNamesOnly(item.name)), [contentCreators])
 */