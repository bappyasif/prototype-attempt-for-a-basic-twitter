import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import React, { useEffect, useState } from 'react'
import { deleteIcon } from '../svg-resources';
const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GifModal({ onGifClick, isGifIconClicked, gridWidth, gridCollumn }) {
    let [gifSearchingText, setGifSearchingText] = useState('')

    const [width, setWidth] = useState(window.innerWidth);

//     let [text, setText] = useState('')
//   let handleText = evt => setText(evt.target.value)

    let handleGifSearching = (evt) => {
        // alert('!!')
        setGifSearchingText(evt.target.value)
    }

    // const fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    let fetchGifs = (offset=1) => {
        console.log('?!!?', gifSearchingText)
        return gifSearchingText ? giphyFetch.search(gifSearchingText,{ offset, limit: 10 }) : giphyFetch.trending({ offset, limit: 10 });
    }

    useEffect(() => {
        gifSearchingText && fetchGifs()
        // console.log('?!!?')
    }, [gifSearchingText])

    // console.log('?!!?', gifSearchingText)

    useEffect(() => {
        setWidth(gridWidth ? gridWidth : window.innerWidth)
        // setWidth('760')
        // fetchGifs = (offset) => giphyFetch.trending({ offset, limit: 10 });
    }, [])

    return (
        <div id='gif-container' style={{ display: isGifIconClicked ? 'block' : 'none' }}>
            <div id='gif-top'>
                <span id='remove-icon' onClick={onGifClick}>{deleteIcon()}</span>
                {/* <SearchGif handleGifSearching={handleGifSearching} /> */}
                {/* <input id='gif-search' placeholder='search term' onChange={handleText} value={text} /> */}
                <input type={'text'} id='gif-search' placeholder='search your gifs here....' onChange={handleGifSearching} value={gifSearchingText} />
            </div>
            <Grid onGifClick={onGifClick} className='grid-component' key={gifSearchingText} fetchGifs={fetchGifs} width={width / 2} columns={gridCollumn ? gridCollumn : 2} />
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
        // <input type={'text'} id='gif-search' placeholder='search your gifs here....' onChange={handleSearchText} value={searchText} />
        <input type={'text'} id='gif-search' placeholder='search your gifs here....' onKeyPress={handleSearchText} value={searchText} />
        // <label>{searchText}
        // <p>{searchText}</p>
        //     <input type={'text'} id='gif-search' placeholder='search your gifs here....' onChange={handleSearchText} value={searchText} />
        // </label>
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