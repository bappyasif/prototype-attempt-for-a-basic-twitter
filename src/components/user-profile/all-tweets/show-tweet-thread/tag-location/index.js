import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import TagLocationModalUI from './ui-logic'

function TagLocation({currentUser, selectedTaggedPlace, handleSelectedTaggedPlace, primaryTweetText, taggedPlaceInfoInUserProfile}) {
    let [placesData, setPlacesData] = useState(null)

    let [allNearByPlaces, setAllNearByPlaces] = useState(null)

    let [deviceCoords, setDeviceCoords] = useState(null)

    let [searchText, setSearchText] = useState('')

    let [searchedPlaces, setSearchedPlaces] = useState(null)

    let [taggedPlaceData, setTaggedPlaceData] = useState(null)

    let [runOnce, setRunOnce] = useState(true)

    taggedPlaceInfoInUserProfile &&  console.log(taggedPlaceInfoInUserProfile, 'hererererrereer')

    let handleTaggedPlaceData = item => {
        setTaggedPlaceData(item[0].items[0])
        let coords = item[0].items[0].position
        console.log(item[0].items[0], 'taggedPlaceData!!', coords)
        runOnce && handleSelectedTaggedPlace({position: coords})
    }

    let handleSearchedPlaces = dataset => {
        let data = dataset[0].items;
        setSearchedPlaces(data)
    }  // filter this data set, and see if this resolves this issue!!

    let handleSearchText = evt => setSearchText(evt.target.value)

    let handleDeviceCoords = data => setDeviceCoords(data)

    let handlePlacesData = value => setPlacesData(value);

    // this would be called from useEffects to decide which dataset to render on DOM, is it without previously selected tagged place or not
    let handleAllNearbyPlaces = data => {
        setAllNearByPlaces(data)
        // making sure previously hekd dataset to be nullified so that it  cant run multiple time from useEffects
        taggedPlaceData && setTaggedPlaceData(null)
        placesData && setPlacesData(null)
    }

    useEffect(() => {
        // in this if block we're making sure only filtered item goes through so that selected place doesnt show up in list multiple time/s
        if(taggedPlaceData) {
            let fd = allNearByPlaces.filter(item => item.title != selectedTaggedPlace[0].name)
            handleAllNearbyPlaces([taggedPlaceData, ...fd])
            // console.log(selectedTaggedPlace, fd)
        } 
    }, [taggedPlaceData])

    useEffect(() => {
        placesData && handleAllNearbyPlaces(placesData[0].items)
    }, [placesData])

    useEffect(() => {
        getUserCurrentLocation(handleDeviceCoords)
    }, [])

    // when there is a tagged location already exists in profile or post, retriving all necessary data before passing it along to search and nearby places calls
    useEffect(() => {
        runOnce && selectedTaggedPlace && console.log(selectedTaggedPlace, 'isit!!!!')
        // runOnce && selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
        runOnce && (selectedTaggedPlace[0]) && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace[0].name, handleTaggedPlaceData, deviceCoords)
        runOnce && selectedTaggedPlace && deviceCoords && setRunOnce(false)
    }, [allNearByPlaces])

    // making a http get request for all nearby placess to render on DOM
    useEffect(() => {
        deviceCoords && makingHttpGetRequest(handlePlacesData, deviceCoords)
    }, [deviceCoords])

    // useEffect(() => taggedPlaceInfoInUserProfile && makingHttpGetRequest())
    
    // whenever user starts to type in a location name to search for, render resulting dataset on DOM
    useEffect(() => {
        searchText && deviceCoords && makingHttpGetRequestForSearch(searchText, handleSearchedPlaces, deviceCoords)
        !searchText && deviceCoords && makingHttpGetRequestForSearch('Dhaka', handleSearchedPlaces, deviceCoords)
        // selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
        !searchText && deviceCoords && setSearchedPlaces(null)
    }, [searchText])

    // return (searchedPlaces || allNearByPlaces) && <TagLocationModalUI foundPlaces={searchedPlaces || allNearByPlaces} currentUser={currentUser} handleSearch={handleSearchText} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} primaryTweetText={primaryTweetText} />
    // return (searchedPlaces || allNearByPlaces) && <TagLocationModalUI foundPlaces={searchedPlaces || allNearByPlaces} currentUser={currentUser} handleSearch={handleSearchText} selectedTaggedPlace={selectedTaggedPlace[0] && selectedTaggedPlace[0].name} handleSelectedTaggedPlace={handleSelectedTaggedPlace} primaryTweetText={primaryTweetText} taggedPlaceInfoInUserProfile={taggedPlaceInfoInUserProfile} />
    return (searchedPlaces || allNearByPlaces) && <TagLocationModalUI foundPlaces={searchedPlaces || allNearByPlaces} currentUser={currentUser} handleSearch={handleSearchText} selectedTaggedPlace={selectedTaggedPlace[0] && selectedTaggedPlace[0].name} handleSelectedTaggedPlace={handleSelectedTaggedPlace} primaryTweetText={primaryTweetText} />
}

let makingHttpGetRequestAndHandlingResponseData = (xhr, url, dataUpdater) => {
    xhr.open('GET', url)
    xhr.send()

    xhr.onreadystatechange = evt => {
        let data = xhr.responseText;
        data && dataUpdater(convertingJsonToArrayOfObjects(data))
    }

    let convertingJsonToArrayOfObjects = jsonObj => {
        let obj = JSON.parse(jsonObj);
        let res = []
        for (let i in obj) {
            res.push(obj[i])
        }
        // console.log(res, '!!')
        return res;
    }
}

let makingHttpGetRequestForSearch = (searchText, handleSearchedPlaces, deviceCoords) => {
    let xhr = new XMLHttpRequest();
    let url = getUrlForRequestWithSearch(deviceCoords, searchText)
    makingHttpGetRequestAndHandlingResponseData(xhr, url, handleSearchedPlaces)
}

let makingHttpGetRequest = (handlePlacesData, deviceCoords) => {
    let xhr = new XMLHttpRequest();

    let url = getUrlForRequest(deviceCoords)

    makingHttpGetRequestAndHandlingResponseData(xhr, url, handlePlacesData)
}

let getUserCurrentLocation = (handleDeviceCoords) => {
    let options = {
        enableHighAccuracy: true,
        timeout: 4400,
        maximumAge: 0
    }

    let onSuccess = (pos) => {
        let coords = pos.coords;
        // console.log('currrent position', coords.latitude, coords.longitude, coords.accuracy)
        handleDeviceCoords([coords.latitude, coords.longitude])
    }

    let onError = err => {
        console.log(`error ${err.code}: ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
}

let userSpecificInfos = (deviceCoords) => {
    let akey = '46kC5vibhlmWcnZMa5nE-LEP4xvR6Jy3H3mvFNi-trw'
    let lngCoords = deviceCoords[0]
    let altCoords = deviceCoords[1]
    return [akey, lngCoords, altCoords]
}

let getUrlForRequestWithSearch = (deviceCoords, searchText) => {
    let [akey, lngCoords, altCoords] = [...userSpecificInfos(deviceCoords)]
    let endpoint = 'https://places.sit.ls.hereapi.com/places/v1/discover/search?'
    return `${endpoint}at=${lngCoords},${altCoords}&apiKey=${akey}&q=${searchText}`
}

let getUrlForRequest = (deviceCoords) => {
    let [akey, lngCoords, altCoords] = [...userSpecificInfos(deviceCoords)]
    let endpoint = 'https://places.ls.hereapi.com/places/v1/discover/here?'
    return `${endpoint}at=${lngCoords}%2C${altCoords}&apiKey=${akey}`
}

export let removeIconSvg = () => <svg width={'24px'} height={'24px'}><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export let searchIconSvg = () => <svg width={'24px'} height={'24px'}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

export let tickMarkIconSvg = () => <svg width={'24px'} height={'24px'}><g><path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path></g></svg>

export default TagLocation

/**
 * 
 * 
 function TagLocation({currentUser, selectedTaggedPlace, handleSelectedTaggedPlace, primaryTweetText}) {
    let [placesData, setPlacesData] = useState(null)

    let [allNearByPlaces, setAllNearByPlaces] = useState(null)

    let [deviceCoords, setDeviceCoords] = useState(null)

    let [searchText, setSearchText] = useState('')

    let [searchedPlaces, setSearchedPlaces] = useState(null)

    let [taggedPlaceData, setTaggedPlaceData] = useState(null)

    let [runOnlyOnceFlag, setRunOnlyOnceFlag] = useState(false)

    // let handleSearchedPlaces = dataset => setSearchedPlaces(dataset[0].items)  // filter this data set, and see if this resolves this issue!!

    let handleTaggedPlaceData = item => {
        setTaggedPlaceData(item[0].items[0])
        // console.log(item[0].items[0], 'taggedPlaceData!!')
    }

    let handleSearchedPlaces = dataset => {
        let data = dataset[0].items;
        setSearchedPlaces(data)
        // let filteredData = data.filter((val, idx, self) => 
        // idx == self.findIndex(t=> t.title == val.title))
        // console.log(filteredData, 'data!!', data)
        // setSearchedPlaces(dataset[0].items)
    }  // filter this data set, and see if this resolves this issue!!

    let handleSearchText = evt => setSearchText(evt.target.value)

    let handleDeviceCoords = data => setDeviceCoords(data)

    // this would be called from useEffects to decide which dataset to render on DOM, is it without previously selected tagged place or not
    let handleAllNearbyPlaces = data => {
        setAllNearByPlaces(data)
    }

    // let handleAllNearbyPlaces = data => {
    //     // let adjustedData = selectedTaggedPlace ? [selectedTaggedPlace, ...data] : data
    //     // let adjustedData = selectedTaggedPlace ? [taggedPlaceData && taggedPlaceData[0], ...data] : data
    //     // let adjustedData = taggedPlaceData ? [taggedPlaceData[0], ...data] : data
    //     // console.log(adjustedData, 'adjustedData!!', taggedPlaceData, selectedTaggedPlace)
    //     // adjustedData && setAllNearByPlaces(adjustedData)
        
    //     // let adjustedData = taggedPlaceData ? [taggedPlaceData[0], ...data] : data
    //     // setAllNearByPlaces(adjustedData)

    //     setAllNearByPlaces(data)

    //     // (taggedPlaceData) ? setAllNearByPlaces(data) : setAllNearByPlaces(data)
    // }

    useEffect(() => {        
        // taggedPlaceData && setAllNearByPlaces(prevData => [taggedPlaceData, ...prevData])
        // if(allNearByPlaces) {
        //     let filtered = allNearByPlaces.filter(item => item.title == selectedTaggedPlace)
        //     console.log(filtered, 'filtered?!!?!')
        // }
        taggedPlaceData && handleAllNearbyPlaces([taggedPlaceData, ...allNearByPlaces])
        // taggedPlaceData && setTaggedPlaceData(null)
        taggedPlaceData && setTaggedPlaceData(prevData => null)
    }, [taggedPlaceData])

    // useEffect(() => {
    //     if(taggedPlaceData && runOnlyOnceFlag) {
    //         let filterData = allNearByPlaces.filter(item => item.title == selectedTaggedPlace)
    //         console.log(selectedTaggedPlace, 'filteredData!!', filterData)
    //     }
    //     // taggedPlaceData && setAllNearByPlaces(prevData => [taggedPlaceData, ...prevData])
    //     !runOnlyOnceFlag && taggedPlaceData && setAllNearByPlaces(prevData => [taggedPlaceData, ...prevData])
    //     taggedPlaceData && !runOnlyOnceFlag && setRunOnlyOnceFlag(true)
    //     // taggedPlaceData && console.log('<<<<adjustedDataReady>>>>')
    // }, [taggedPlaceData])

    let handlePlacesData = value => setPlacesData(value);

    useEffect(() => placesData && handleAllNearbyPlaces(placesData[0].items), [placesData])

    useEffect(() => {
        // makingHttpGetRequest(handlePlacesData);
        getUserCurrentLocation(handleDeviceCoords)
        // selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
        // selectedTaggedPlace && deviceCoords && console.log(selectedTaggedPlace, deviceCoords, 'what what!!')
    }, [])

    // when there is a tagged location already exists in profile or post, retriving all necessary data before passing it along to search and nearby places calls
    useEffect(() => {
        selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
        // selectedTaggedPlace && deviceCoords && console.log(selectedTaggedPlace, deviceCoords, 'what what!!')
    }, [allNearByPlaces])
    // useEffect(() => {
    //     selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
    //     // selectedTaggedPlace && deviceCoords && console.log(selectedTaggedPlace, deviceCoords, 'what what!!')
    // }, [searchedPlaces, allNearByPlaces])

    // making a http get request for all nearby placess to render on DOM
    useEffect(() => {
        deviceCoords && makingHttpGetRequest(handlePlacesData, deviceCoords)
        // selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
        // selectedTaggedPlace && deviceCoords && console.log(selectedTaggedPlace, deviceCoords, 'what what!!')
    }, [deviceCoords])

    // useEffect(() => {
    //     selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
    //     selectedTaggedPlace && deviceCoords && alert('!!')
    // }, [selectedTaggedPlace])

    // useEffect(() => searchText && deviceCoords && makingHttpGetRequestForSearch(searchText, handleSearchedPlaces, deviceCoords), [searchText])
    
    // whenever user starts to type in a location name to search for, render resulting dataset on DOM
    useEffect(() => {
        searchText && deviceCoords && makingHttpGetRequestForSearch(searchText, handleSearchedPlaces, deviceCoords)
        !searchText && deviceCoords && makingHttpGetRequestForSearch('Dhaka', handleSearchedPlaces, deviceCoords)
        // selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
        !searchText && deviceCoords && setSearchedPlaces([])
        // selectedTaggedPlace && deviceCoords && makingHttpGetRequestForSearch(selectedTaggedPlace, handleTaggedPlaceData, deviceCoords)
        // selectedTaggedPlace && deviceCoords && console.log(selectedTaggedPlace, deviceCoords, 'what what!!')
    }, [searchText])

    // console.log(placesData, 'places!!', allNearByPlaces, deviceCoords)
    // console.log(searchText, '<search text>', searchedPlaces, taggedPlaceData)

    return (searchedPlaces || allNearByPlaces) && <TagLocationModalUI foundPlaces={searchedPlaces || allNearByPlaces} currentUser={currentUser} handleSearch={handleSearchText} selectedTaggedPlace={selectedTaggedPlace} handleSelectedTaggedPlace={handleSelectedTaggedPlace} primaryTweetText={primaryTweetText} />
    // return allNearByPlaces && <TagLocationModalUI foundPlaces={searchedPlaces || allNearByPlaces} currentUser={currentUser} handleSearch={handleSearchText} />
    // return <TagLocationModalUI nearbyPlaces={allNearByPlaces} />
}
 * 
 * 
 let makingHttpGetRequest = (handlePlacesData, deviceCoords) => {
    let xhr = new XMLHttpRequest();
    // xhr.addEventListener('load', handlePlacesDataLoad);
    // let url = 'https://places.ls.hereapi.com/places/v1/discover/here?at=23.7170%2C90.3807&apiKey=-md2KMprpbeZmrRqgH4YadLRsDVV4r-Ck1x057tqzSM'
    // getUserCurrentLocation();
    let url = getUrlForRequest(deviceCoords)
    makingHttpGetRequestAndHandlingResponseData(xhr, url, handlePlacesData)
    // xhr.open('GET', url);
    // xhr.send()

    // xhr.onreadystatechange = evt => {
    //     // console.log(xhr.responseText)
    //     let data = xhr.responseText;
    //     data && handlePlacesData(convertingJsonToArrayOfObjects(data))
    // }

    // let convertingJsonToArrayOfObjects = jsonObj => {
    //     let obj = JSON.parse(jsonObj);
    //     let res = []
    //     for (let i in obj) {
    //         res.push(obj[i])
    //     }
    //     return res;
    // }

    // let handlePlacesDataLoad = (responseText) => {
    //     console.log(responseText)
    // }
}
 * 
 * 
 let getUrlForRequest = (deviceCoords) => {
    // let key01 = '46kC5vibhlmWcnZMa5nE-LEP4xvR6Jy3H3mvFNi-trw'
    // // let key02 = '-md2KMprpbeZmrRqgH4YadLRsDVV4r-Ck1x057tqzSM'
    // // let lngCoords = '23.7170'
    // // let altCoords = '2C90.3807'
    // let lngCoords = deviceCoords[0]
    // let altCoords = deviceCoords[1]
    let [akey, lngCoords, altCoords] = [...userSpecificInfos(deviceCoords)]
    let endpoint = 'https://places.ls.hereapi.com/places/v1/discover/here?'
    return `${endpoint}at=${lngCoords}%2C${altCoords}&apiKey=${akey}`
}
 */