import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { removeIconSvg, searchIconSvg, tickMarkIconSvg } from '..'

let TagLocationModalUI = ({ foundPlaces, currentUser, handleSearch, selectedTaggedPlace, handleSelectedTaggedPlace, primaryTweetText, setTaggedPlaceName }) => {
    // console.log(nearbyPlaces, 'data ready')
    // let [selectedPlace, setSelectedPlace] = useState(null)

    let [showScroll, setShowScroll] = useState(false)

    // let handleSelectedPlace = name => setSelectedPlace(name)

    useEffect(() => {
        foundPlaces.length > 8 ? setShowScroll(true) : setShowScroll(false)
    }, [foundPlaces])

    // let handleTweetText = (data) => setPrimaryTweetText(data)

    // console.log(showScroll, '<chainging>')
    console.log(selectedTaggedPlace, 'selected place')

    return (
        <div id='tag-location-container' style={{ overflowY: showScroll ? 'scroll' : 'hidden', height: showScroll && '546px' }}>
            <ModalHeader currentUser={currentUser} />
            <SearchComponent handleSearch={handleSearch} />
            {/* <RenderNearByPlaces foundPlaces={foundPlaces} handleSelectedPlace={handleSelectedPlace} /> */}
            <RenderNearByPlaces foundPlaces={foundPlaces} handleSelectedPlace={handleSelectedTaggedPlace} selectedTaggedPlace={selectedTaggedPlace && selectedTaggedPlace} setTaggedPlaceName={setTaggedPlaceName} />
        </div>
    )
}

let RenderNearByPlaces = ({ foundPlaces, handleSelectedPlace, selectedTaggedPlace, setTaggedPlaceName }) => {
    let [placesNodes, setPlacesNodes] = useState(null)

    // useEffect(() => {
    //     setPlacesNodes(null)
    // }, [])

    useEffect(() => {
        // let nodes = foundPlaces.map(item => <RenderPlace key={item.title} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} />)
        let nodes = foundPlaces.map((item, idx) => <RenderPlace key={idx} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} selectedTaggedPlace={selectedTaggedPlace} setTaggedPlaceName={setTaggedPlaceName} />)
        setPlacesNodes(nodes)
    }, [foundPlaces])

    console.log(placesNodes, '<check>')
    // let listPlaces = () => foundPlaces.map(item => <RenderPlace key={item.title} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} />)
    return (
        <div id='nearby-places-wrapper'>
            {/* {listPlaces()} */}
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
        // clicked && handleSelectedPlace({name: name})
        clicked && setTaggedPlaceName(name)
        // clicked && handleSelectedPlace(name)
        // !clicked && handleSelectedPlace('')
    }, [clicked])

    useEffect(() => {
        let converMetersToKilometers = meter => String((meter * .001).toFixed(3))
        let distanceTokenized = converMetersToKilometers(distance).split('.')
        let ifDistanceBelowTen = distance < 10 && `${distanceTokenized[1] * 100}m`
        let ifDistanceAboveNine = distance >= 10 && `${(distance * 100) / 1000}km`
        let ifDistanceAboveHundred = distance >= 100 && `${((distance) / 1000).toFixed(2)}km`
        // let distanceSanitized = ifDistanceAboveHundred || ifDistanceBelowTen || ifDistanceAboveNine
        setDistanceSanitized(ifDistanceAboveHundred || ifDistanceBelowTen || ifDistanceAboveNine)
    }, [name])

    // console.log(distance >= 100, distance, ((distance)/1000).toFixed(2))
    console.log(name == selectedTaggedPlace, name, selectedTaggedPlace, name == deviceLocation)

    return (
        <div className='render-place-wrapper' onClick={handleClicked}>
            <div className='place-name'>{name}</div>
            <div className='related-infos'>
                <div className='vicinity' style={{ marginRight: '11px' }}>{vicinity.split('<')[0]}</div>
                -
                <div className='distance' style={{ marginLeft: '11px' }}>{distanceSanitized} away</div>
                {/* <div className='distance'>{distanceSanitized} km away</div> */}
            </div>
            {/* {clicked && <div id='svg-icon'>{tickMarkIconSvg()}</div>} */}
            {/* {(clicked || (name == (selectedTaggedPlace && selectedTaggedPlace[0].name))) && <div id='svg-icon'>{tickMarkIconSvg()}</div>} */}
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
                {/* <div id='remove' onClick={handleClick}>Remove</div> */}
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


/**
 * 
 * 
 let RenderPlace = ({name, distance, vicinity}) => {
    let converMetersToKilometers = meter => String((meter * .001).toFixed(3))
    let distanceTokenized = converMetersToKilometers(distance).split('.')
    let ifDistanceBelowTen = distance < 10 && `${distanceTokenized[1] * 100}m`
    let ifDistanceAboveNine = distance >= 10 && `${(distance * 100)/1000}km`
    // let ifDistanceAboveNine = distance >= 10 && `${distanceTokenized[0]}.${Number(distanceTokenized[1]).toFixed(2)} km`
    let distanceSanitized = ifDistanceAboveNine || ifDistanceBelowTen
    // console.log(distanceSanitized, '<<>>', converMetersToKilometers(distance))
    // let converMetersToKilometers = meter => String((meter * .001).toFixed(3))
    // let distanceTokenized = converMetersToKilometers(distance).split('.')
    // let distanceSanitized = distanceTokenized[0] != 0 ? `${distanceTokenized[0]}.${distanceTokenized[1]} km` : `.${distanceTokenized[1] * 100} m`
    // // let distanceSanitized = converMetersToKilometers(distance).split('.')[1]
    // console.log(distance, distanceSanitized)
    // let converMetersToKilometers = meter => String(meter * .001)
    // let roundingKilometers = km => Math.round(km.split('.')[1])
    // let roundingKilometers = km => Number(km.split('.')[1]).toFixed(2)
    // let distanceSanitized = distance.length > 4 ? roundingKilometers(converMetersToKilometers(distance)) : Number(converMetersToKilometers(distance)).toFixed(2)
    // let distanceSanitized = distance.length > 4 ? roundingKilometers(converMetersToKilometers(distance)) : Math.round(converMetersToKilometers(distance))
    // console.log(distanceSanitized, '<sanitized>', converMetersToKilometers(distance), Number(converMetersToKilometers(distance).split('.')[1]))
    return (
        <div className='render-place-wrapper'>
            <div className='place-name'>{name}</div>
            <div className='related-infos'>
                <div className='vicinity'>{vicinity.split('<')[0]}</div>
                -
                <div className='distance'>{distanceSanitized} away</div>
                {/* <div className='distance'>{distance} mins away</div> /}
                </div>
                </div>
            )
        }
 */