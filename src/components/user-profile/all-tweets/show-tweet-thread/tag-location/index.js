import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function TagLocation({currentUser}) {
    let [placesData, setPlacesData] = useState(null)

    let [allNearByPlaces, setAllNearByPlaces] = useState(null)

    let [deviceCoords, setDeviceCoords] = useState(null)

    let handleDeviceCoords = data => setDeviceCoords(data)

    let handleAllNearbyPlaces = data => setAllNearByPlaces(data)

    let handlePlacesData = value => setPlacesData(value);

    useEffect(() => placesData && handleAllNearbyPlaces(placesData[0].items))

    useEffect(() => {
        // makingHttpGetRequest(handlePlacesData);
        getUserCurrentLocation(handleDeviceCoords)
    }, [])

    useEffect(() => deviceCoords && makingHttpGetRequest(handlePlacesData, deviceCoords), [deviceCoords])

    // console.log(placesData, 'places!!', allNearByPlaces, deviceCoords)

    return allNearByPlaces && <TagLocationModalUI nearbyPlaces={allNearByPlaces} currentUser={currentUser} />
    // return <TagLocationModalUI nearbyPlaces={allNearByPlaces} />
}

let TagLocationModalUI = ({ nearbyPlaces, currentUser }) => {
    console.log(nearbyPlaces, 'data ready')
    return (
        <div id='tag-location-container'>
            <ModalHeader currentUser={currentUser} />
            <SearchComponent />
            <RenderNearByPlaces nearbyPlaces={nearbyPlaces} />
        </div>
    )
}

let RenderNearByPlaces = ({nearbyPlaces}) => {
    let listPlaces = () => nearbyPlaces.map(item => <RenderPlace key={item.title} name={item.title} distance={item.distance} vicinity={item.vicinity} />)
    return (
        <div id='nearby-places-wrapper'>
            {listPlaces()}
        </div>
    )
}

let RenderPlace = ({name, distance, vicinity}) => {
    return (
        <div className='render-place-wrapper'>
            <div className='place-name'>{name}</div>
            <div className='related-infos'>
                <div className='vicinity'>{vicinity.split('<')[0]}</div>
                -
                <div className='distance'>{distance} min away</div>
            </div>
        </div>
    )
}

let SearchComponent = () => {
    let [focused, setFocused] = useState(false)
    let handleFocusedAndBlurred = () => setFocused(!focused)
    let inputBeforeFocused = () => {
        return (
            <div id='before-focused'>
                <div id='svg-icon'>{searchIconSvg()}</div>
                <input id='search-input' placeholder='Search locations' onFocus={handleFocusedAndBlurred} />
            </div>
        )
    }
    let inputAfterFocused = () => {
        return (
            <div id='after-focused'>
                <div id='svg-icon'>{searchIconSvg()}</div>
                <input id='search-input' placeholder='Search locations' onBlur={handleFocusedAndBlurred} />
            </div>
        )
    }
    return (
        <div id='search-component-wrapper'>
            <label htmlFor='search-input'>
                {focused ? inputAfterFocused() : inputBeforeFocused()}
            </label>
        </div>
    )
}

let ModalHeader = ({currentUser}) => {
    let history = useHistory(null)
    let handleClick = () => history.push(`/${currentUser}`)
    let leftSide = () => {
        return (
            <div id='left-side'>
                <div id='svg-icon' onClick={handleClick}>{removeIconSvg()}</div>
                <div id='header-text'>Tag Location</div>
            </div>
        )
    }

    let rightSide = () => {
        return (
            <div id='right-side'>
                <div id='remove' onClick={handleClick}>Remove</div>
                <div id='done'>Done</div>
            </div>
        )
    }

    return (
        <div id='modal-header-wrapper'>
            {leftSide()}
            {rightSide()}
        </div>
    )
}

let makingHttpGetRequest = (handlePlacesData, deviceCoords) => {
    let xhr = new XMLHttpRequest();
    // xhr.addEventListener('load', handlePlacesDataLoad);
    // let url = 'https://places.ls.hereapi.com/places/v1/discover/here?at=23.7170%2C90.3807&apiKey=-md2KMprpbeZmrRqgH4YadLRsDVV4r-Ck1x057tqzSM'
    // getUserCurrentLocation();
    let url = getUrlForRequest(deviceCoords)
    xhr.open('GET', url);
    xhr.send()

    xhr.onreadystatechange = evt => {
        // console.log(xhr.responseText)
        let data = xhr.responseText;
        data && handlePlacesData(convertingJsonToArrayOfObjects(data))
    }

    let convertingJsonToArrayOfObjects = jsonObj => {
        let obj = JSON.parse(jsonObj);
        let res = []
        for (let i in obj) {
            res.push(obj[i])
        }
        return res;
    }

    // let handlePlacesDataLoad = (responseText) => {
    //     console.log(responseText)
    // }
}

let getUserCurrentLocation = (handleDeviceCoords) => {
    let options = {
        enableHighAccuracy: true,
        timeout: 4400,
        maximumAge: 0
    }

    let onSuccess = (pos) => {
        let coords = pos.coords;
        console.log('currrent position', coords.latitude, coords.longitude, coords.accuracy)
        handleDeviceCoords([coords.latitude, coords.longitude])
    }

    let onError = err => {
        console.log(`error ${err.code}: ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
}

let getUrlForRequest = (deviceCoords) => {
    let key01 = '46kC5vibhlmWcnZMa5nE-LEP4xvR6Jy3H3mvFNi-trw'
    // let key02 = '-md2KMprpbeZmrRqgH4YadLRsDVV4r-Ck1x057tqzSM'
    // let lngCoords = '23.7170'
    // let altCoords = '2C90.3807'
    let lngCoords = deviceCoords[0]
    let altCoords = deviceCoords[1]
    let endpoint = 'https://places.ls.hereapi.com/places/v1/discover/here?'
    return `${endpoint}at=${lngCoords}%2C${altCoords}&apiKey=${key01}`
}

export let removeIconSvg = () => <svg width={'24px'} height={'24px'}><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export let searchIconSvg = () => <svg width={'24px'} height={'24px'}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

export default TagLocation
