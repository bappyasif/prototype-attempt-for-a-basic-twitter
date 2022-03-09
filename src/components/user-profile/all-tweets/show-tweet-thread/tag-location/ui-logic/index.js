import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { removeIconSvg, searchIconSvg, tickMarkIconSvg } from '..'

let TagLocationModalUI = ({ foundPlaces, currentUser, handleSearch, selectedTaggedPlace, handleSelectedTaggedPlace, primaryTweetText, setTaggedPlaceName }) => {

    let [showScroll, setShowScroll] = useState(false)

    useEffect(() => {
        foundPlaces.length > 8 ? setShowScroll(true) : setShowScroll(false)
    }, [foundPlaces])

    return (
        <div id='tag-location-container' style={{ overflowY: showScroll ? 'scroll' : 'hidden', height: showScroll && '546px' }}>
            <ModalHeader currentUser={currentUser} />
            <SearchComponent handleSearch={handleSearch} />
            <RenderNearByPlaces foundPlaces={foundPlaces} handleSelectedPlace={handleSelectedTaggedPlace} selectedTaggedPlace={selectedTaggedPlace && selectedTaggedPlace} setTaggedPlaceName={setTaggedPlaceName} />
        </div>
    )
}

let RenderNearByPlaces = ({ foundPlaces, handleSelectedPlace, selectedTaggedPlace, setTaggedPlaceName }) => {
    let [placesNodes, setPlacesNodes] = useState(null)

    useEffect(() => {
        let nodes = foundPlaces.map((item, idx) => <RenderPlace key={idx} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} selectedTaggedPlace={selectedTaggedPlace} setTaggedPlaceName={setTaggedPlaceName} />)
        setPlacesNodes(nodes)
    }, [foundPlaces])

    return (
        <div id='nearby-places-wrapper'>
            {placesNodes}
        </div>
    )
}

let RenderPlace = ({ name, distance, vicinity, handleSelectedPlace, selectedTaggedPlace, setTaggedPlaceName }) => {
    let [clicked, setClicked] = useState(false)
    let [distanceSanitized, setDistanceSanitized] = useState(null)
    let [deviceLocation, setDeviceLocation] = useState(null)
    let history = useHistory()

    let handleClicked = () => {
        setClicked(!clicked)
        history.goBack()
    }

    useEffect(() => selectedTaggedPlace && setDeviceLocation(selectedTaggedPlace), [selectedTaggedPlace])

    useEffect(() => {
        clicked && setTaggedPlaceName(name)
    }, [clicked])

    useEffect(() => {
        let converMetersToKilometers = meter => String((meter * .001).toFixed(3))
        let distanceTokenized = converMetersToKilometers(distance).split('.')
        let ifDistanceBelowTen = distance < 10 && `${distanceTokenized[1] * 100}m`
        let ifDistanceAboveNine = distance >= 10 && `${(distance * 100) / 1000}km`
        let ifDistanceAboveHundred = distance >= 100 && `${((distance) / 1000).toFixed(2)}km`
        setDistanceSanitized(ifDistanceAboveHundred || ifDistanceBelowTen || ifDistanceAboveNine)
    }, [name])

    // console.log(name == selectedTaggedPlace, name, selectedTaggedPlace, name == deviceLocation)

    return (
        <div className='render-place-wrapper' onClick={handleClicked}>
            <div className='place-name'>{name}</div>
            <div className='related-infos'>
                <div className='vicinity' style={{ marginRight: '11px' }}>{vicinity.split('<')[0]}</div>
                -
                <div className='distance' style={{ marginLeft: '11px' }}>{distanceSanitized} away</div>
            </div>
            {(clicked || name == selectedTaggedPlace) && <div id='svg-icon'>{tickMarkIconSvg()}</div>}
        </div>
    )
}

let SearchComponent = ({ handleSearch }) => {
    let [focused, setFocused] = useState(false)
    let handleFocusedAndBlurred = () => setFocused(!focused)
    let inputBeforeFocused = () => {
        return (
            <div id='before-focused'>
                <div id='svg-icon'>{searchIconSvg()}</div>
                <input id='search-input' placeholder='Search locations' onFocus={handleFocusedAndBlurred} onChange={handleSearch} />
            </div>
        )
    }
    let inputAfterFocused = () => {
        return (
            <div id='after-focused'>
                <div id='svg-icon'>{searchIconSvg()}</div>
                <input id='search-input' placeholder='Search locations' onBlur={handleFocusedAndBlurred} onChange={handleSearch} />
            </div>
        )
    }
    return (
        <div id='search-component-wrapper'>
            <label htmlFor='search-input'>
                {(focused) ? inputAfterFocused() : inputBeforeFocused()}
            </label>
        </div>
    )
}

let ModalHeader = ({ currentUser }) => {
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
                <div id='remove-div' onClick={handleClick}>
                    <div id='remove2'>Remove</div>
                    <div id='line'></div>
                </div>
                <div id='done' onClick={handleClick}>Done</div>
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


export default TagLocationModalUI