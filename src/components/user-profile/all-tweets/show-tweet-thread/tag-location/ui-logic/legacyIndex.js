import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import { removeIconSvg, searchIconSvg, tickMarkIconSvg } from '..'

let TagLocationModalUI = ({ foundPlaces, currentUser, handleSearch, searchText }) => {
    // console.log(nearbyPlaces, 'data ready')
    let [selectedPlace, setSelectedPlace] = useState(null)

    let [showScroll, setShowScroll] = useState(false)

    // let hash = {}
    // let [hash, setHash] = useState({})

    let handleSelectedPlace = name => setSelectedPlace(name)

    // useEffect(() => {
    //     let placesWrapper = document.querySelector('#nearby-places-wrapper');
    //     Array.from(placesWrapper.childNodes).forEach(node => node.removeChild(node))
    // }, [])


    useEffect(() => {
        // let placesWrapper = document.querySelector('#nearby-places-wrapper');
        // Array.from(placesWrapper.childNodes).forEach(node => {
        //     // node && node.remove()
        //     // node && node.removeChild(node)
        //     // console.log(node, '!!!!')
        // })
        
        foundPlaces.length > 8 ? setShowScroll(true) : setShowScroll(false)
        // let filtered = foundPlaces.map((v, i, arr) => )
        // foundPlaces && foundPlaces.forEach(item => {
        //     console.log(item.title, '?!')
        //     // hash[item.title] = item
        //     setHash(prevHash => prevHash[item.title] = item)
        //     // setHash({...hash, item[title] = item})
        //     // console.log(item.title, '?!', hash)
        // })
    }, [foundPlaces])

    // useEffect(() => !searchText && (foundPlaces = []), [searchText])

    // console.log(showScroll, '<chainging>')
    console.log(selectedPlace, 'selected place', foundPlaces, searchText)

    return (
        <div id='tag-location-container' style={{ overflowY: showScroll ? 'scroll' : 'hidden', height: showScroll && '546px' }}>
            <ModalHeader currentUser={currentUser} />
            <SearchComponent handleSearch={handleSearch} />
            {/* <RenderNearByPlaces foundPlaces={foundPlaces} handleSelectedPlace={handleSelectedPlace} /> */}
            <RenderNearByPlaces searchText={searchText} foundPlaces={foundPlaces} handleSelectedPlace={handleSelectedPlace} />
            {/* <RenderNearByPlaces foundPlaces={(!searchText || !foundPlaces) ? [] : foundPlaces} handleSelectedPlace={handleSelectedPlace} /> */}
        </div>
    )
}

let RenderNearByPlaces = ({ foundPlaces, handleSelectedPlace, searchText }) => {
    // let listPlaces = () => foundPlaces.map((item) => <RenderPlace key={item.title} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} />)
    let listPlaces = () => foundPlaces.map((item, _, arr) => <RenderPlace key={item.title} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} arr={arr} />)
    // let listPlaces02 =  !searchText ? [].map((item, _, arr) => <RenderPlace key={item.title} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} arr={arr} />) : listPlaces()
    
    let [test, setTest] = useState(null)
    
    // useEffect(() => {
    //     !searchText && setTest([].map(item => <RenderPlace />))
    // }, [searchText])
    // let placesWrapper = document.querySelector('#nearby-places-wrapper');

    // useEffect(() => {
    //     let placesWrapper = document.querySelector('#nearby-places-wrapper');
    //     // placesWrapper.childNodes.forEach(node => node.remove())
    //     // let placesWrapper = document.querySelector('#nearby-places-wrapper');
    //     placesWrapper.childNodes.forEach(node => node.textContent = '')
    //     let testFilter = Array.from(placesWrapper.childNodes).filter(node => node != '')
    //     console.log(testFilter, testFilter.length)
    //     // if(!searchText) {
    //     //     let placesWrapper = document.querySelector('#nearby-places-wrapper');
    //     //     // console.log(placesWrapper)
    //     //     // placesWrapper.textContent = '';
    //     //     placesWrapper.childNodes.forEach(node => node.textContent = '')
    //     // }
    // }, [searchText])

    useEffect(() => {
        setTest(foundPlaces.map((item) => <RenderPlace key={item.title} name={item.title} distance={item.distance} vicinity={item.vicinity} handleSelectedPlace={handleSelectedPlace} />))
    }, [foundPlaces])
    
    return (
        <div id='nearby-places-wrapper'>
            {test}
            {/* {listPlaces()} */}
            {/* {listPlaces02} */}
        </div>
    )
}

let RenderPlace = ({ name, distance, vicinity, handleSelectedPlace, arr }) => {
    let [clicked, setClicked] = useState(false)
    let [distanceSanitized, setDistanceSanitized] = useState(null)

    let handleClicked = (evt) => {
        setClicked(!clicked)
        // console.log(evt.target.querySelector('.place-name'), name, arr.findIndex(item => item.title == name))
        // console.log(arr, '?!')
    }

    useEffect(() => {
        clicked && handleSelectedPlace(name)
        !clicked && handleSelectedPlace('')
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
    // console.log(name, '?!>!')

    return (
        <div className='render-place-wrapper' onClick={handleClicked}>
            <div className='place-name'>{name}</div>
            <div className='related-infos'>
                <div className='vicinity' style={{marginRight: '11px'}}>{vicinity.split('<')[0]}</div>
                -
                <div className='distance' style={{marginLeft: '11px'}}>{distanceSanitized} away</div>
                {/* <div className='distance'>{distanceSanitized} km away</div> */}
            </div>
            {clicked && <div id='svg-icon'>{tickMarkIconSvg()}</div>}
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
                {focused ? inputAfterFocused() : inputBeforeFocused()}
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