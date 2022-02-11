import React, { useEffect, useState } from 'react'
import { makeGetFetchRequest } from '../../../reuseable-components'

function SearchSemantics({ searchText }) {
    let [dataset, setDataset] = useState(null)
    let [cycles, setCycles] = useState(0)
    let [handle, setHandle] = useState(null)
    let [secondHalf, setSecondHalf] = useState(null)
    let [rest, setRest] = useState(null)
    let [pause, setPause] = useState(true)

    // let handleDataset = items => setDataset(items)
    let handleDataset = items => {
        let firstHalf = items.slice(0, 8)
        let otherHalf = items.slice(9, 17)
        let rest = items.slice(18)
        setRest(rest)
        setDataset(firstHalf)
        setSecondHalf(otherHalf)
    }

    let semanticsConcepts = ['nytd_org', 'nytd_topic', 'nytd_per', 'nytd_geo', 'nytd_des', 'nytd_ttl', 'nytd_porg']

    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

    let url = `http://api.nytimes.com/svc/semantic/v2/concept/search.json?query=${searchText}&concept_type=${semanticsConcepts[cycles]}&api-key=${apik}`

    let getData = () => {
        let timer = setTimeout(() => console.log('timer'), cycles == 0 ? 0 : 6000)
        setHandle(timer)
    }

    let makeRequest = (url, updater) => {
        setDataset(null)
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (data.num_results) {
                    updater(data.results)
                    // updater(data)
                } else {
                    setCycles(cycles + 1)
                }
            }).catch(err => console.log(err.code, err.message))
    }

    // useEffect(() => pause && pause)

    useEffect(() => {
        let timer = setTimeout(() => console.log('await time for next'), 20000)
        setPause(timer)
    }, [secondHalf])

    useEffect(() => {
        !dataset && cycles == 0 && makeRequest(url, handleDataset)
        cycles != 0 && handle == 6000 && makeRequest(url, handleDataset)
        // !dataset && cycles != 0 && handle == 6000 && makeRequest(url, handleDataset)
        // !dataset && cycles != 0 && handle == 6000 && makeGetFetchRequest(url, handleDataset)
        handle && clearTimeout(handle)
    }, [handle])

    console.log(handle, 'handle!!', dataset, cycles)

    useEffect(() => {
        searchText && getData()
        // searchText && dataset
    }, [cycles, searchText])

    // useEffect(() => !startCycle && searchText && getData(), [searchText, startCycle, cycles, dataset])

    // useEffect(() => searchText && getData(), [cycles])

    // useEffect(() => searchText && getData(), [])

    let renderCompaniesFirstHalf = () => dataset && dataset.map((item, idx) => <RenderIndividualCompanyInformation key={item.concept_id} companyName={item.concept_name.split(' &')[0]} item={item} idx={idx} unpause={setPause} />)

    let renderCompaniesSecondHalf = () => secondHalf && secondHalf.map((item, idx) => <RenderIndividualCompanyInformation key={item.concept_id} companyName={item.concept_name.split(' &')[0]} item={item} idx={idx} unpause={setPause} />)

    let renderRestOfCompanies = () => rest.rest.map((item, idx) => <RenderIndividualCompanyInformation key={item.concept_id} companyName={item.concept_name.split(' &')[0]} item={item} idx={idx} unpause={setPause} />)

    return (
        <div id='search-semantics-container'>
            {searchText}
            {/* <RenderIndividualCompanyInformation companyName={'Boston Buildings'} /> */}
            {dataset && renderCompaniesFirstHalf()}
            {/* {secondHalf && pause == 20000 && renderCompaniesSecondHalf()}
            {secondHalf && pause == 20000 && alert('?!')} */}
            {/* {!pause && secondHalf && renderCompaniesSecondHalf()} */}

        </div>
    )
}

// As company companyData itself is producing enough data (at least 10 records for each company name), lets render just top 5 or less from intial organization semantics search
// and then use them to render related company information on based on those searches

let RenderIndividualCompanyInformation = ({companyName, item, idx, unpause}) => {
    let [companyData, setCompanyData] = useState(null)
    let [unsplashData, setUnsplashData] = useState(null)
    let [randomIdx, setRandomIdx] = useState(null)
    // let [awaitTime, setAwaitTime] = useState(false)

    let handleUnsplashData = items => {
        setUnsplashData(items)
        chooseRandomIdx(items, setRandomIdx)
    }

    let handleData = items => setCompanyData(items)

    let rapidApiCrunchbaseUrl = `https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?query=${companyName}`

    let akey = 'Y523ekZfcrFFNQKeXpbsPlQhe1zW4vGPwrASfRsfJmo'

    let unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${akey}&query=office`

    useState(() => idx == 7 && unpause(false))
    
    useEffect(() => companyData && makeGetFetchRequest(unsplashUrl, handleUnsplashData), [companyData])
    
    // useEffect(() => companyName && makeRequest(rapidApiCrunchbaseUrl, handleData), [companyName])

    useEffect(() => item && companyName && makeRequest(rapidApiCrunchbaseUrl, handleData), [item])

    // useEffect(() => {
    //     if(idx >=8) {
    //         setAwaitTime(true)
    //     }
    // }, [idx])

    console.log(companyData, 'companyData', unsplashData, randomIdx)
    
    return (
        item
        ?
        <div id='company-information-wrapper'>
            <div className='company-name'>{companyName}</div>
            <div className='company-description'>{item.short_description}</div>
            <img className='profile-picture' src={unsplashData && randomIdx && unsplashData[randomIdx].urls.regular} />
        </div>
        :
        null
    )
}

let makeRequest = (url, updater) => {
    let apik = '16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524'

    fetch(url,{
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "crunchbase-crunchbase-v1.p.rapidapi.com",
            "x-rapidapi-key": `${apik}`
        }
    })
    .then(resp => {
        console.log(resp)
        return resp.json()
        .then(data => {
    })
        console.log(data, 'compData')
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

/**
 * 
 * 
 let RenderIndividualCompanyInformation = ({companyName}) => {
    let [companyData, setCompanyData] = useState(null)
    let [unsplashData, setUnsplashData] = useState(null)
    let [randomIdx, setRandomIdx] = useState(null)

    // let handleUnsplashData = items => setUnsplashData(items)
    let handleUnsplashData = items => {
        setUnsplashData(items)
        chooseRandomIdx(items, setRandomIdx)
    }

    let handleData = items => setCompanyData(items)
    
    // let url = `https://api.crunchbase.com/api/v4/entities/organizations/crunchbase?user_key=INSERT_YOUR_API_KEY_HERE`
    // let url = `https://api.crunchbase.com/api/v4/autocompletes?user_key=[INSERT_Key]&query=airbnb&collection_ids=organization.companies`
    let apik = '16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524'
    // let rapidapiCruchbaseUrl = `https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?user_key=${apik}&query=${companyName}`
    // let rapidapiCruchbaseUrl = `https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?user_key=${apik}&query=${companyName}`
    let rapidApiCrunchbaseUrl = `https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?query=${companyName}`
    
    let makeRequest = (url, updater) => {
        fetch(url,{
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "crunchbase-crunchbase-v1.p.rapidapi.com",
                "x-rapidapi-key": `${apik}`
            }
        })
        .then(resp => {
            console.log(resp)
            return resp.json()
        }).then(data => {
            console.log(data, 'compData')
            updater(data.entities)
        })
        .catch(err => console.log(err.code, err.message))
    }

    // let chooseRandomIdx = () => {
    //     console.log('chkbox 01')
    //     let rndIdx = Math.floor((Math.random() * unsplashData.length))
    //     console.log(rndIdx, 'index')
    //     setRandomIdx(rndIdx)
    // }

    let akey = 'Y523ekZfcrFFNQKeXpbsPlQhe1zW4vGPwrASfRsfJmo'

    let unsplashUrl = `https://api.unsplash.com/search/photos?client_id=${akey}&query=office`
    
    useEffect(() => companyData && makeGetFetchRequest(unsplashUrl, handleUnsplashData), [companyData])
    
    useEffect(() => companyName && makeRequest(rapidApiCrunchbaseUrl, handleData), [companyName])
    // useEffect(() => companyName && makeRequest(rapidapiCruchbaseUrl, handleData), [companyName])
    // useEffect(() => companyName && makeGetFetchRequest(rapidapiCruchbaseUrl, handleData), [])

    // useEffect(() => unsplashData && chooseRandomIdx(), [unsplashData])

    console.log(companyData, 'companyData', unsplashData, randomIdx)
    
    return (
        <div>
            {/* <img src={randomIdx != -1 && unsplashData && unsplashData[randomIdx].urls.regular} /> /}
            {/* <img src={unsplashData && unsplashData[0].urls.regular} /> /}
            <img src={unsplashData && randomIdx && unsplashData[randomIdx].urls.regular} />
        </div>
    )
}
 * 
 * 
 let getData = () => {
       let timer = setTimeout(() => console.log('timer'), cycles == 0 ? 0 : 6000)
       setHandle(timer)
        // fetch(url)
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data, 'data!!')
        //     if(data.num_results) {
        //         handleDataset(data.results)
        //     }
        // }).catch(err => console.log(err.code, err.message))
        // .finally(() => {
        //     setStartCycle(false)
        //     console.log('finally', startCycle, cycles, handle)
        // })

    // return () => clearTimeout(handle)
}
 * 
 * 
 let getData = () => {
        // setStartCycle(true);
        // let handle = cycles == 0 ? setTimeout(() => setStartCycle(true), 0) : setTimeout(() => setStartCycle(true), 6000)
        let handle = cycles == 0 ? setStartCycle(true) : setTimeout(() => setStartCycle(true), 6000)

        console.log(handle, 'handle')

        startCycle && fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data, 'data!!')
            if(data.num_results) {
                handleDataset(data.results)
            } else {
                setCycles(cycles + 1)
                console.log('not found!!')
                getData()
            }
            // setStartCycle(false)
        }).catch(err => console.log(err.code, err.message))
        .finally(() => {
            setStartCycle(false)
            console.log('finally', startCycle, cycles, handle)
        })

        return () => clearTimeout(handle)
    }
 */