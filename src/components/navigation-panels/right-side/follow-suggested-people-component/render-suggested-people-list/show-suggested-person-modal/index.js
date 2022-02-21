import { connectStorageEmulator } from 'firebase/storage'
let deepai = require('deepai')
import React, { useEffect, useRef, useState } from 'react'
import useOnHoverOutside from '../../../../../user-profile/all-tweets/tweet-top/add-members-into-lists/useOnHoverOutside'

let ShowSuggestedPersonModal = ({ updatePersonModal, name, handle, profilePicUrl, handleFollowSuggested, followSuggested, descriptionText }) => {
    let ref = useRef(null)
    useOnHoverOutside(ref, () => updatePersonModal(false))
    // onMouseLeave={() => updatePersonModal(false)}
    return (
        <div id='suggested-person-modal-container' ref={ref} >
            <PersonMoodalTopSection name={name} handle={handle} profilePicUrl={profilePicUrl} handleFollowSuggested={handleFollowSuggested} followSuggested={followSuggested} />
            <PersonModalDescriptiveInfos name={name} descriptionText={descriptionText} />
        </div>
    )
}

let PersonModalDescriptiveInfos = ({ name, descriptionText }) => {
    let [randomText, setRandomtext] = useState(null)

    // let makeRequest = () => {
    //     let apik = '19e554d0-1dc4-49b1-9b20-423602876bcf'
    //     deepai.setApiKey(apik)
    //     deepai.callStandardApi('text-generator', { text: name })
    //         .then(resp => {
    //             console.log(resp, '!!')
    //             setRandomtext(resp.output.split('.')[0])
    //         })
    // }

    useEffect(() => descriptionText && setRandomtext(descriptionText), [name])

    // useEffect(() => makeRequest(name, setRandomtext), [name])

    return (
        <div id='descriptive-infos-wrapper'>
            <div id='description-text'>{randomText || 'some description about this account, yada yada yada yada'}</div>
            <div id='follow-and-follower-numbers'>
                <FollowOrFollowerCard name={'Following'} />
                <FollowOrFollowerCard name={'Followers'} />
            </div>
            <MakeStatementAboutAccount />
        </div>
    )
}

let MakeStatementAboutAccount = () => {
    let [chances, setChances] = useState(null)
    useEffect(() => setChances(Math.random() > .5), [])
    return (
        <div id='statement-wrapper'>
            {
                chances
                    ?
                    <FollowedByPeople />
                    :
                    "Not followed by anyone you're following"
            }
        </div>
    )
}

let FollowedByPeople = () => {
    return (
        <div id='followed-by-people-wrapper'>
            <img src='https://picsum.photos/40/40' />
            <div id='name'>Followed by this somebody</div>
        </div>
    )
}

let FollowOrFollowerCard = ({ name }) => {
    let [denomination, setDenomination] = useState(null)

    let arr01 = ['K', "M"]
    let arr02 = [10, 100, 1000, 10000]

    let makeRandomNumber = () => {
        let randNum = Math.random();

        let rIdx = Math.floor(randNum * arr02.length)

        let rNum = Math.round(randNum * arr02[rIdx])

        let rDen = randNum > .5 && rNum.length <= 2 ? arr01[1] : randNum > .5 && rNum.length <= 3 ? arr01[0] : ''

        setDenomination(rNum + rDen)

        // console.log(rIdx, rNum, rDen)
    }

    useEffect(() => makeRandomNumber(), [name])

    return (
        <div id='card-wrapper'>
            <div id='numbers-denominations'>{denomination || '0000'}</div>
            <div id='card-name'>{name}</div>
        </div>
    )
}

let PersonMoodalTopSection = ({ name, handle, profilePicUrl, handleFollowSuggested, followSuggested }) => {
    return (
        <div id='top-section-wrapper'>
            <div id='left-side'>
                {/* <img src='https://picsum.photos/200/200' /> */}
                <img src={profilePicUrl} />
                <div>{name}</div>
                <div>@{handle}</div>
            </div>
            <div id='follow-btn' onClick={handleFollowSuggested}>{followSuggested ? 'Following' : 'Follow'}</div>
        </div>
    )
}

// export let makeRequest = (name, listUpdater, uuid, fetchStatus, updateCount ) => {
//     let apik = '19e554d0-1dc4-49b1-9b20-423602876bcf'
//     deepai.setApiKey(apik)
//     deepai.callStandardApi('text-generator', { text: name })
//         .then(resp => {
//             console.log(resp, '!!')
//             // let textExtracted = (resp.output.split('.')[2])
//             // listUpdater(uuid, resp.output)
//             let textExtracted = (resp.output.split('.')[0])
//             listUpdater(uuid, textExtracted)
//             fetchStatus(true)
//             updateCount(count => count + 1)
//         })
//     // console.log('chk02')
// }

export let makeRequest = (name, listUpdater, uuid, fetchStatus, updateCount, listUpdaterHook, listOfUsers) => {
    let apik = '19e554d0-1dc4-49b1-9b20-423602876bcf'
    deepai.setApiKey(apik)
    deepai.callStandardApi('text-generator', { text: name })
        .then(resp => {
            console.log(resp, '!!')
            // let textExtracted = (resp.output.split('.')[2])
            // listUpdater(uuid, resp.output)
            let textExtracted = (resp.output.split('.')[0])
            listUpdater(uuid, textExtracted, listUpdaterHook, listOfUsers)
            fetchStatus(true)
            updateCount(count => count + 1)
        })
    // console.log('chk02')
}


// export let makeRequest = (name, textUpdater) => {
//     let apik = '19e554d0-1dc4-49b1-9b20-423602876bcf'
//     deepai.setApiKey(apik)
//     deepai.callStandardApi('text-generator', { text: name })
//         .then(resp => {
//             // console.log(resp, '!!')
//             textUpdater(resp.output.split('.')[0])
//         })
// }

export default ShowSuggestedPersonModal

// let makeRequest = () => {
//     let url = `https://contentai-net-text-generation.p.rapidapi.com/text-generation/api/?category=${name}`;

//     let headers = {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "contentai-net-text-generation.p.rapidapi.com",
//             "x-rapidapi-key": "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524"
//         }
//     }

//     fetch(url, headers)
//     .then(resp => resp.json())
//     .then(data => console.log(data))
//     .catch(err=>connectStorageEmulator.log(err.code, err.message))
// }

//     let makeRequest = () => {
//         let apik = '19e554d0-1dc4-49b1-9b20-423602876bcf'
//         deepai.setApiKey(apik)
//         deepai.callStandardApi('text-generator', { text: name })
//             .then(resp => console.log(resp, '!!'))
//     }

//    let providedSnippet = () => {
//     deepai.setApiKey('19e554d0-1dc4-49b1-9b20-423602876bcf');

//     (async function () {
//         var resp = await deepai.callStandardApi("text-generator", {
//             text: "YOUR_TEXT_HERE",
//         });
//         console.log(resp);
//     })()
//    }

//     useEffect(() => {
//         makeRequest()
//         providedSnippet()
//     }, [])