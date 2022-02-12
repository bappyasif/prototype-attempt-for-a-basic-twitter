import React, { useEffect, useState } from 'react'
import { makeGetFetchRequest, verifiedSvgIcon } from '../../../reuseable-components'
import { SearchComponent } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components'

function SearchSemantics({ searchText }) {
    // let [searchText, setSearchText] = useState(null)

    let [dataset, setDataset] = useState(null)

    let [firstHalf, setFirstHalf] = useState(null)

    let [secondHalf, setSecondHalf] = useState(null)

    let [fetchInProgress, setFetchInProgress] = useState(false)

    let [currentlyFetching, setCurrentlyFetching] = useState(null)

    let handleSearchText = value => setSearchText(value)

    let handleDataset = items => {
        // let newList = items.filter(item => item.concept_name.toLowerCase().includes(searchText))
        let newList = items.filter(item => !item.concept_name.includes(';')).filter(item => item.concept_name.split(' ').length <= 5)
        setDataset(newList)
        console.log(searchText, newList)
    }

    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

    let url = `http://api.nytimes.com/svc/semantic/v2/concept/search.json?query=${searchText}&concept_type=nytd_org&api-key=${apik}`

    useEffect(() => {
        // searchText && console.log(url)
        currentlyFetching != searchText && searchText && !fetchInProgress && makeGetFetchRequestUpdated(url, handleDataset, setFetchInProgress, setCurrentlyFetching, searchText)
    }, [searchText, fetchInProgress])

    // useEffect(() => searchText && makeGetFetchRequest(url, handleDataset), [])

    useEffect(() => {
        if (dataset) {
            let slicedArray = dataset.filter((_, i) => i <= 9)
            setFirstHalf(slicedArray)
            // setDataset(null)
        }
    }, [dataset])

    console.log(dataset, 'dataset', firstHalf, fetchInProgress)

    let renderFirstHalfDataset = () => firstHalf.map(item => <RenderIndividualCompanyInformation key={item.concept_id} companyName={item.concept_name} item={item} />)

    return (
        <div id='search-semantics-container'>
            {/* <SearchComponent fromExplore={true} handleSearchText={handleSearchText} /> */}
            {/* {searchText} */}

            {firstHalf && renderFirstHalfDataset()}
        </div>
    )
}

let makeGetFetchRequestUpdated = (url, updater, callInProgress, currentlyFetching, searchText) => {
    currentlyFetching(searchText)
    callInProgress(true)
    fetch(url)
        .then(resp => resp.json())
        .then(data => updater(data.results))
        .catch(err => console.log(err.code, err.message))
        .finally(() => callInProgress(false))
}

// As company companyData itself is producing enough data (at least 10 records for each company name), lets render just top 5 or less from intial organization semantics search
// and then use them to render related company information on based on those searches

let RenderIndividualCompanyInformation = ({ companyName, item, idx, unpause }) => {
    let [companyData, setCompanyData] = useState(null)
    let [unsplashData, setUnsplashData] = useState(null)
    let [randomIdx, setRandomIdx] = useState(null)
    // let [awaitTime, setAwaitTime] = useState(false)

    let handleUnsplashData = items => {
        setUnsplashData(items)
        // chooseRandomIdx(items, setRandomIdx)
    }

    let handleData = items => setCompanyData(items)

    let rapidApiCrunchbaseUrl = `https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?query=${companyName.split(' ').join('%20')}`
    // let rapidApiCrunchbaseUrl = `https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?query='${companyName}'`

    let akey = 'Y523ekZfcrFFNQKeXpbsPlQhe1zW4vGPwrASfRsfJmo'

    // let unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${akey}&query=${companyName}`
    // let unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${akey}&query=${companyName.split(' ').join('%20')}`
    let unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${akey}&query=${encodeURIComponent(companyName)}`

    useEffect(() => idx == 7 && unpause(false))

    useEffect(() => companyData && chooseRandomIdx(companyData, setRandomIdx), [companyData, companyName])

    // useEffect(() => companyData && makeGetFetchRequest(unsplashUrl, handleUnsplashData), [companyData])
    useEffect(() => {
        companyData && makeGetFetchRequest(unsplashUrl, handleUnsplashData)
        // companyData && chooseRandomIdx(companyData, setRandomIdx)
    }, [companyData])

    // useEffect(() => companyName && makeRequest(rapidApiCrunchbaseUrl, handleData), [companyName])

    useEffect(() => item && companyName && makeRequest(rapidApiCrunchbaseUrl, handleData), [item])

    // useEffect(() => {
    //     if(idx >=8) {
    //         setAwaitTime(true)
    //     }
    // }, [idx])

    console.log(unsplashData, unsplashUrl, 'unsplash')

    // console.log(companyData, 'companyData', unsplashData, randomIdx, companyName, item)

    return (
        item
            ?
            <div id='company-information-wrapper'>
                <img className='profile-picture' src={unsplashData && randomIdx != -1 && unsplashData[randomIdx || 0] && unsplashData[randomIdx || 0].urls.regular} />
                <div id='company-info'>
                    <div id='company-name-verify'>
                        <div className='company-name'>{companyName}</div>
                        <span id='svg-icon'>{verifiedSvgIcon()}</span>
                    </div>
                    <div className='comapny-handle'>@{makeCompanyHandle(companyName)}</div>
                    <div className='company-description'>{companyData && randomIdx != -1 && companyData[randomIdx || 0] && companyData[randomIdx || 0].short_description}</div>
                </div>
            </div>
            :
            null
    )
}

let makeCompanyHandle = companyName => {
    let tokens = companyName.split(' ')

    let handleStr = ''

    if (tokens.length > 1) {
        tokens.forEach((name, idx, arr) => {
            if (idx == arr.length - 1) {
                handleStr += name;
            } else {
                handleStr += name[0]
            }
        })
    } else {
        handleStr = companyName
    }

    return handleStr;
}

let makeRequest = (url, updater) => {
    let apik = '16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524'

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "crunchbase-crunchbase-v1.p.rapidapi.com",
            "x-rapidapi-key": `${apik}`
        }
    })
        .then(async resp => {
            // console.log(resp)
            const data = await resp.json()
            console.log(data, 'compData', url)
            updater(data.entities)
        })
        .catch(err => console.log(err.code, err.message))
}

export let chooseRandomIdx = (dataset, updater) => {
    console.log('chkbox 01')
    let rndIdx = Math.floor((Math.random() * dataset.length))
    console.log(rndIdx, 'index')
    updater(rndIdx)
}

export default SearchSemantics