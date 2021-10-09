import React, { useEffect, useState } from 'react'
import '../../styles/right-panel.css'

function SearchTwitter() {
    let [searchText, setSearchText] = useState('')
    let [searchedKeywords, setSearchedKeywords] = useState([])
    let handleUserInput = (evt) => setSearchText(evt.target.value)
    let handleUserInputSubmnit = (evt) => {
        if (evt.key == 'Enter') {
            if (searchText) {
                let curateData = [{ keyword: searchText }, ...searchedKeywords]
                // let sanitizeData = curateData.map((item, idx, self) => self.indexOf(item.keyword) != idx ? item : '')
                let sanitizeData = curateData.filter((item, idx, self) => idx == self.findIndex(elem => elem.keyword == item.keyword))

                // arr.filter( (ele, ind) => ind === arr.findIndex( elem => elem.jobid === ele.jobid && elem.id === ele.id))
                console.log(sanitizeData, '>>')
                // setSearchedKeywords([{keyword: searchText}, ...searchedKeywords]);
                setSearchedKeywords(sanitizeData);
            }
            setSearchText('');
        }
    }

    useEffect(() => {
        setSearchedKeywords([{ keyword: 'test' }, { keyword: 'test02' }, ...searchedKeywords])
    }, [])

    return (
        <div id='search-twitter-container'>
            <span id='svg-icon'>{searchIcon()}</span>
            <label htmlFor='search-in-twitter'>
                <input id='search-in-twitter' type='text' placeholder='Searching Twitter' value={searchText} onChange={handleUserInput} onKeyPress={handleUserInputSubmnit} />
            </label>
            {/* {searchText} */}
            <SearchDropdown searchedKeywords={searchedKeywords} setSearchedKeywords={setSearchedKeywords} />
        </div>
    )
}

let SearchDropdown = ({ searchedKeywords, setSearchedKeywords }) => {
    // let [searchedKeywords, setSearchedKeywords] = useState([])

    let handleSearchKeywordRemoval = evt => {
        let findId = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id;
        // console.log(evt.target.id, evt.target, findId)
        let findIndex = searchedKeywords.findIndex(item => item.keyword == findId)
        let newSearchedKeywordList = searchedKeywords.splice(findIndex, 1)
        setSearchedKeywords(newSearchedKeywordList);
        console.log(findId, findIndex)
    }

    let renderAlreadySearchedKeywords = searchedKeywords.map((item, idx) => <div key={item.keyword} className='keywords-section'><span className='search-icon'>{searchIcon(null, 'scale(1.3)')}</span><span className='searched-keywords'>{item.keyword}</span><span className='remove-icon' id={item.keyword} onClick={handleSearchKeywordRemoval}>{removeIcon()}</span></div>)

    return <div id='search-dropdown-container'>
        <div id='headings-section'>
            <h4>Recent</h4>
            <h5 style={{ color: 'rgb(29, 155, 240)', fontWeight: 'bolder' }}>Clear all</h5>
        </div>
        {renderAlreadySearchedKeywords}
    </div>
}

let searchIcon = (color, scaled) => <svg width='24px' height='24px' transform={scaled ? scaled : 'scale(.8)'} style={{ paddingTop: '4px', paddingLeft: scaled ? '2px' : null }}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

let removeIcon = () => <svg width='24px' height='24px' transform='scale(.8)'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default SearchTwitter


/**
 * 
 * 
 let handleSearchKeywordRemoval = evt => {
        // let findId = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id
        let findId = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id ;
        // console.log(evt.target.id, evt.target, findId)
        let newSearchedKeywordList = searchedKeywords.splice(findId, 1)
        setSearchedKeywords(newSearchedKeywordList);
        // console.log(findId, evt.target, )
    }
 */