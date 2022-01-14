import React, { useEffect, useState } from 'react'

function TagLocation() {
    let [placesData, setPlacesData] = useState(null)

    let [allNearbyPlaces, setAllNearbyPlaces] = useState(null)

    let handleAllNearbyPlaces = data => setAllNearbyPlaces(data)

    let handlePlacesData = value => setPlacesData(value);

    useEffect(() => placesData && handleAllNearbyPlaces(placesData[0].items))

    useEffect(() => {
        makingHttpGetRequest(handlePlacesData);
    }, [])

    console.log(placesData, 'places!!', allNearbyPlaces)

    return (
        <div id='tag-location-container'>
            
        </div>
    )
}

let makingHttpGetRequest = (handlePlacesData) => {
    let xhr = new XMLHttpRequest();
    // xhr.addEventListener('load', handlePlacesDataLoad);
    let url = 'https://places.ls.hereapi.com/places/v1/discover/here?at=23.7170%2C90.3807&apiKey=-md2KMprpbeZmrRqgH4YadLRsDVV4r-Ck1x057tqzSM'
    xhr.open('GET', url);
    xhr.send()

    xhr.onreadystatechange = evt => {
        console.log(xhr.responseText)
        let data = xhr.responseText;
        data && handlePlacesData(convertingJsonToArrayOfObjects(data))
    }

    let convertingJsonToArrayOfObjects = jsonObj => {
        let obj = JSON.parse(jsonObj);
        let res = []
        for(let i in obj) {
            res.push(obj[i])
        }
        return res;
    }

    // let handlePlacesDataLoad = (responseText) => {
    //     console.log(responseText)
    // }
}

export default TagLocation
