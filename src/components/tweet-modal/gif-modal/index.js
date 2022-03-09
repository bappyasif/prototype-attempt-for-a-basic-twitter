import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { deleteIcon } from '../svg-resources';
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GifModal({ onGifClick, isGifIconClicked, gridWidth, gridCollumn }) {
    let [gifSearchingText, setGifSearchingText] = useState('')

    const [width, setWidth] = useState(window.innerWidth);

    let handleGifSearching = (evt) => {
        setGifSearchingText(evt.target.value)
    }

    let fetchGifs = (offset=1) => {
        // console.log('?!!?', gifSearchingText)
        return gifSearchingText ? giphyFetch.search(gifSearchingText,{ offset, limit: 10 }) : giphyFetch.trending({ offset, limit: 10 });
    }

    useEffect(() => {
        gifSearchingText && fetchGifs()
    }, [gifSearchingText])

    useEffect(() => {
        setWidth(gridWidth ? gridWidth : window.innerWidth)
    }, [])

    return (
        <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}>
            <div id='gif-top'>
                <span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span>
                <input type={'text'} id='gif-search' placeholder='search your gifs here....' onChange={handleGifSearching} value={gifSearchingText} />
            </div>
            <Grid onGifClick={onGifClick} className='grid-component' key={gifSearchingText} fetchGifs={fetchGifs} width={width / 2} columns={gridCollumn ? gridCollumn : 2} />
        </div>
    )
}

export default GifModal