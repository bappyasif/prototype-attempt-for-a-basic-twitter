import React, { useEffect, useState, useRef } from 'react'
import { makeGetFetchRequest, verifiedSvgIcon } from '../../../reuseable-components'

function SearchSemantics({ dataset, searchText, searchResultsModalHook, setSearchResultsModalHook, showSearchResultsModal }) {
   
    let [firstHalf, setFirstHalf] = useState(null)

    useEffect(() => {
        if (dataset) {
            let slicedArray = dataset.filter((_, i) => i <= 9)
            setFirstHalf(slicedArray)
        }
    }, [dataset])

    // console.log(dataset, 'dataset', firstHalf, fetchInProgress)

    let renderFirstHalfDataset = () => firstHalf && firstHalf.map(item => <RenderIndividualCompanyInformation key={item.concept_id} companyName={item.concept_name} item={item} />)

    return (
        <div id='search-semantics-container'>
            { searchResultsModalHook && firstHalf && renderFirstHalfDataset()}
        </div>
    )
}

// As company companyData itself is producing enough data (at least 10 records for each company name), lets render just top 5 or less from intial organization semantics search
// and then use them to render related company information on based on those searches

let RenderIndividualCompanyInformation = ({ companyName, item, idx, unpause }) => {
    let [companyData, setCompanyData] = useState(null)
    let [unsplashData, setUnsplashData] = useState(null)
    let [randomIdx, setRandomIdx] = useState(null)

    let handleUnsplashData = items => {
        setUnsplashData(items)
    }

    let handleData = items => {
        let newList = items.filter(item => companyName.split(' ').some(word => item.identifier.value.includes(word)))
        setCompanyData(newList)
    }

    let rapidApiCrunchbaseUrl = `https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?query=${companyName.split(' ').join('%20')}`

    let akey = 'Y523ekZfcrFFNQKeXpbsPlQhe1zW4vGPwrASfRsfJmo'

    let unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${akey}&query=${encodeURIComponent(companyName)}`

    useEffect(() => idx == 7 && unpause(false))

    useEffect(() => companyData && chooseRandomIdx(companyData, setRandomIdx), [companyData, companyName])

    useEffect(() => {
        companyData && makeGetFetchRequest(unsplashUrl, handleUnsplashData)
    }, [companyData])

    useEffect(() => item && companyName && makeRequest(rapidApiCrunchbaseUrl, handleData), [item])

    // console.log(unsplashData, unsplashUrl, 'unsplash')

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
            // console.log(data, 'compData', url)
            updater(data.entities)
        })
        .catch(err => console.log(err.code, err.message))
}

export let chooseRandomIdx = (dataset, updater) => {
    // console.log('chkbox 01')
    let rndIdx = Math.floor((Math.random() * dataset.length))
    // console.log(rndIdx, 'index')
    updater(rndIdx)
}

export default SearchSemantics