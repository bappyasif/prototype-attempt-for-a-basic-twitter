import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { deleteIcon } from '../svg-resources';
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GifModal({ onGifClick, isGifIconClicked, gridWidth, gridCollumn }) {
    let [gifSearchingText, setGifSearchingText] = useState('')

    const [width, setWidth] = useState(window.innerWidth);

    let handleGifSearching = (evt) => {
        alert('!!')
        setGifSearchingText(evt.target.value)
    }

    // const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    let fetchGifs = (offset=1) => {
        return gifSearchingText ? giphyFetch.search(gifSearchingText,{ offset, limit: 10 }) : giphyFetch.trending({ offset, limit: 10 });
    }

    useEffect(() => {
        // fetchGifs(1)
        console.log('?!!?')
    }, [gifSearchingText])

    console.log('?!!?', gifSearchingText)

    useEffect(() => {
        setWidth(gridWidth ? gridWidth : window.innerWidth)
        // setWidth('760')
        // fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    }, [])

    return (
        <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}>
            <div id='gif-top'>
                <span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span>
                <SearchGif handleGifSearching={handleGifSearching} />
            </div>
            <Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={gridCollumn ? gridCollumn : 2} />
        </div>
    )
}

let SearchGif = ({handleGifSearching}) => {
    let [searchText, setSearchText] = useState('')
    let handleSearchText = evt => {
        setSearchText(evt.target.value)
        handleGifSearching(searchText)
        alert('!!!!')
    }
    // let handleSearchText = evt => setSearchText(evt.target.value)
    // useEffect(() => searchText && handleGifSearching(searchText), [searchText])
    // useEffect(() => {
    //     handleGifSearching(searchText)
    //     console.log(searchText, '[!!!!]')
    // }, [searchText])

    // console.log(searchText, '[!!!!]')
    return(
        // <input id='gif-search' placeholder='search your gifs here....' onChange={handleGifSearching} />
        <input type={'text'} id='gif-search' placeholder='search your gifs here....' onChange={handleSearchText} value={searchText} />
    )
}

export default GifModal


// function GifModal({ onGifClick, isGifIconClicked }) {
//     const fetchGifs = (offset) =>
//         giphyFetch.trending({ offset, limit: 10 });
//     const [width, setWidth] = useState(window.innerWidth);
//     // const [width, setWidth] = useState('470px');
//     return <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}><div id='gif-top'><span id='remove-icon'>{deleteIcon()}</span><input id='gif-search' /></div><Grid onGifClick={onGifClick} className='grid-component' fetchGifs={fetchGifs} width={width / 2} columns={2} /></div>
// }