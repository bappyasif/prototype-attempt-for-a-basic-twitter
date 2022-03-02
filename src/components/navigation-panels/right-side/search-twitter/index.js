import React, { useEffect, useRef, useState } from 'react'
import '../../styles/right-panel.css'
import useOnClickOutside from '../click-outside-utility-hook/useOnClickOutside';
import { fetchResultsFromTwitter, SearchResultsWrapperUi } from '../explicit-trends-on-click/trends-header'


function SearchTwitter() {
    let [searchText, setSearchText] = useState('')
    let [searchedKeywords, setSearchedKeywords] = useState([])
    let [focused, setFocused] = useState(false);
    let [dataset, setDataset] = useState(null)
    let [searchedRelatedTopics, setSearchedRelatedTopics] = useState(null)
    let [randomlySelectedTopics, setRandomlySelectedTopics] = useState([])
    let ref = useRef();

    let handleUserInput = (evt) => setSearchText(evt.target.value)
    
    let handleUserInputSubmnit = (evt) => {
        if (evt.key == 'Enter') {
            if (searchText) {
                let curateData = [{ keyword: searchText }, ...searchedKeywords]

                let sanitizeData = curateData.filter((item, idx, self) => idx == self.findIndex(elem => elem.keyword == item.keyword))

                setSearchedKeywords(sanitizeData);

                // setRandomlySelectedTopics([])

                // setSearchedRelatedTopics(null)

                fetchResultsFromTwitter(setDataset, searchText, setSearchedRelatedTopics)
            }
            setSearchText('');
        }
    }

    let fetcAgainhWithUserSelectedTopic = (searchText) => {
        fetchResultsFromTwitter(setDataset, searchText, setSearchedRelatedTopics)
        setSearchText(searchText)
        // selectTopicsRandomlyFromExistingTopics()
    }

    // let selectTopicsRandomlyFromExistingTopics = () => {
    //     let trendingTopic = searchedRelatedTopics.filter(item => item.result_context.display_string.includes('Trending'))
    //     let restTopics = searchedRelatedTopics.filter(item => !item.result_context.display_string.includes('Trending'))
    //     let inLastHourTweets = restTopics.filter(item => item.result_context.display_string.includes('last hour'))
    //     let tweetsInToday = restTopics.filter(item => item.result_context.display_string.includes('today'))
    //     let simpleListiings = restTopics.filter(item => item.result_context.display_string.split(' ').length == 2)
        
    //     setRandomlySelectedTopics(prevData => prevData.concat(trendingTopic))
    //     randomlySelectAnIndex(inLastHourTweets, setRandomlySelectedTopics)
    //     randomlySelectAnIndex(tweetsInToday, setRandomlySelectedTopics)
    //     randomlySelectAnIndex(simpleListiings, setRandomlySelectedTopics)

    //     // console.log(trendingTopic, inLastHourTweets, tweetsInToday, simpleListiings)
    // }

    // let randomlySelectAnIndex = (arr, updater) => {
    //     let rndIdx = Math.floor(Math.random() * arr.length)
    //     // updater(prevData => prevData.concat(arr[rndIdx]))
    //     // updater(prevData => prevData.concat(arr[rndIdx]).filter(item => item))
    //     updater(prevData => prevData.concat(arr[rndIdx]).filter(item => item).filter((item, idx, self)=> idx == self.findIndex(elem => elem.topic == item.topic)))
    // }

    // let filterFoundTopics = () => {
    //     let newList = searchedRelatedTopics.filter(item => item.result_context)
    //     console.log(newList, '!!')
    //     setSearchedRelatedTopics(newList)
    // }

    // calling hook passing in ref and a cb on click outside
    useOnClickOutside(ref, () => setFocused(false))

    useEffect(() => searchedRelatedTopics && selectTopicsRandomlyFromExistingTopics(searchedRelatedTopics, setRandomlySelectedTopics), [searchedRelatedTopics])

    // useEffect(() => !searchedRelatedTopics && filterFoundTopics(), [dataset])

    // useEffect(() => {
    //     setSearchedKeywords([{ keyword: 'test' }, { keyword: 'test02' }, ...searchedKeywords])
    // }, [])

    let handleFocused = () => setFocused(true)

    // console.log(searchedKeywords, 'searchedKeywords!!', searchedRelatedTopics, randomlySelectedTopics)

    return (
        <div id='search-twitter-container' ref={ref}>
            <span id='svg-icon'>{searchIcon()}</span>
            <label htmlFor='search-in-twitter'>
                <input id='search-in-twitter' onFocus={handleFocused} type='text' placeholder='Searching Twitter' value={searchText} onChange={handleUserInput} onKeyPress={handleUserInputSubmnit} />
            </label>
            {focused &&
                <SearchDropdown
                    searchedKeywords={searchedKeywords}
                    setSearchedKeywords={setSearchedKeywords}
                    dataset={dataset}
                    randomlySelectedTopics={randomlySelectedTopics}
                    fetcAgainhWithUserSelectedTopic={fetcAgainhWithUserSelectedTopic}
                />
            }
        </div>
    )
}

let SearchDropdown = ({ searchedKeywords, setSearchedKeywords, dataset, randomlySelectedTopics,fetcAgainhWithUserSelectedTopic }) => {

    // let handleSearchKeywordRemoval = evt => {
    //     let findId = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id;

    //     // let findIndex = searchedKeywords.findIndex(item => item.keyword == findId)

    //     // let newSearchedKeywordList = searchedKeywords.slice(0, findIndex).concat(searchedKeywords.slice(findIndex + 1))

    //     let newSearchedKeywordList = getOnlyUniqueSearchedTerms(searchedKeywords, findId) 

    //     setSearchedKeywords(newSearchedKeywordList);

    //     // console.log(findId, findIndex, newSearchedKeywordList)
    // }

    // let renderAlreadySearchedKeywords = () => searchedKeywords.map((item, idx) => <div key={item.keyword} className='keywords-section'><span className='search-icon'>{searchIcon(null, 'scale(1.3)')}</span><span className='searched-keywords'>{item.keyword}</span><span className='remove-icon' id={item.keyword} onClick={handleSearchKeywordRemoval}>{removeIcon()}</span></div>)

    let renderAlreadySearchedKeywords = () => searchedKeywords.map((item, idx) => <AlreadySearchedKeywordsWrapper key={item.keyword} item={item} handleSearchKeywordRemoval={(evt) => handleSearchKeywordRemoval(evt, searchedKeywords, setSearchedKeywords)} />)

    let handleClearAllAlreadySearchedKeywords = () => {
        searchedKeywords = [];
        setSearchedKeywords(searchedKeywords);
    }

    // let searchResultsPretextPlaceholder = () => {
    //     return (
    //         renderAlreadySearchedKeywords().length == 0
    //             ?
    //             <div id='show-to-search-announcement'>Try searching for people, topics or keywords</div>
    //             :
    //             <div id='headings-section'>
    //                 <div id='recent-text'>Recent</div>
    //                 <div id='clear-all-searched-keywords' onClick={handleClearAllAlreadySearchedKeywords}>Clear all</div>
    //             </div>
    //     )
    // }

    let renderTwitterSearchResults = () => dataset && dataset.map(item => <SearchResultsWrapperUi key={item.uid} item={item} />)

    let renderSearchedRelatedTopics = () => randomlySelectedTopics && randomlySelectedTopics.map(item => <RenderSearchedRelatedTopic key={item.topic} item={item} fetcAgainhWithUserSelectedTopic={fetcAgainhWithUserSelectedTopic} />)

    return (
        <div id='search-dropdown-container' style={{maxHeight: dataset && '420px', overflowY: dataset && 'scroll'}}>
            {/* {searchResultsPretextPlaceholder(renderAlreadySearchedKeywords(), handleClearAllAlreadySearchedKeywords)} */}
            {/* {searchResultsPretextPlaceholder()} */}
            {searchResultsPretextPlaceholder(searchedKeywords, handleClearAllAlreadySearchedKeywords)}
            {renderAlreadySearchedKeywords()}
            {renderSearchedRelatedTopics()}
            {renderTwitterSearchResults()}
        </div>
    )
}

export let RenderSearchedRelatedTopic = ({item, fetcAgainhWithUserSelectedTopic}) => {
    let removeInTheFromTweetsTopics = (text) => {
        let refinedText = text.replace('in the', '')
        return refinedText
    }
    return (
        <div className='searched-related-topic-wrapper' onClick={()=>fetcAgainhWithUserSelectedTopic(item.topic.replace('#', ''))}>
            <div className='search-icon'>{searchIcon(null, 'scale(1.3)')}</div>
            <div className='topic-name'>{item.topic}</div>
            <div className='topic-tweets'>{removeInTheFromTweetsTopics(item.result_context.display_string)}</div>
            {/* <div className='remove-icon' id={item.keyword || item} onClick={handleSearchKeywordRemoval}>{removeIcon()}</div> */}
        </div>
    )
}

export let selectTopicsRandomlyFromExistingTopics = (searchedRelatedTopics, setRandomlySelectedTopics) => {
    let trendingTopic = searchedRelatedTopics.filter(item => item.result_context.display_string.includes('Trending'))
    let restTopics = searchedRelatedTopics.filter(item => !item.result_context.display_string.includes('Trending'))
    let inLastHourTweets = restTopics.filter(item => item.result_context.display_string.includes('last hour'))
    let tweetsInToday = restTopics.filter(item => item.result_context.display_string.includes('today'))
    let simpleListiings = restTopics.filter(item => item.result_context.display_string.split(' ').length == 2)
    
    setRandomlySelectedTopics(prevData => prevData.concat(trendingTopic))
    randomlySelectAnIndex(inLastHourTweets, setRandomlySelectedTopics)
    randomlySelectAnIndex(tweetsInToday, setRandomlySelectedTopics)
    randomlySelectAnIndex(simpleListiings, setRandomlySelectedTopics)

    // console.log(trendingTopic, inLastHourTweets, tweetsInToday, simpleListiings)
}

let randomlySelectAnIndex = (arr, updater) => {
    let rndIdx = Math.floor(Math.random() * arr.length)
    // updater(prevData => prevData.concat(arr[rndIdx]))
    // updater(prevData => prevData.concat(arr[rndIdx]).filter(item => item))
    updater(prevData => prevData.concat(arr[rndIdx]).filter(item => item).filter((item, idx, self)=> idx == self.findIndex(elem => elem.topic == item.topic)))
}

export let handleSearchKeywordRemoval = (evt, searchedKeywords, setSearchedKeywords ) => {
    let findId = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id || evt.target.parentNode.parentNode.parentNode.id;

    let newSearchedKeywordList = getOnlyUniqueSearchedTerms(searchedKeywords, findId) 

    setSearchedKeywords(newSearchedKeywordList);
}

export let getOnlyUniqueSearchedTerms = (searchedKeywords, findId) => {
    // console.log('iiiim here!!', searchedKeywords, findId)

    let findIndex = searchedKeywords.findIndex(item => (item.keyword == findId || item == findId))

    let newSearchedKeywordList = searchedKeywords.slice(0, findIndex).concat(searchedKeywords.slice(findIndex + 1))

    let correctedList = searchedKeywords.length == 1 ? [] : newSearchedKeywordList

    return correctedList;

    // return newSearchedKeywordList;
}

export let AlreadySearchedKeywordsWrapper = ({ item, handleSearchKeywordRemoval }) => {
    return (
        <div className='keywords-section'>
            <span className='search-icon'>{searchIcon(null, 'scale(1.3)')}</span><span className='searched-keywords'>{item.keyword || item}</span><span className='remove-icon' id={item.keyword || item} onClick={handleSearchKeywordRemoval}>{removeIcon()}</span>
        </div>
    )
}

export let searchResultsPretextPlaceholder = (list, handleClearAllAlreadySearchedKeywords) => {
    return (
        list.length == 0
            ?
            <div id='show-to-search-announcement'>Try searching for people, topics or keywords</div>
            :
            <div id='headings-section'>
                <div id='recent-text'>Recent</div>
                <div id='clear-all-searched-keywords' onClick={handleClearAllAlreadySearchedKeywords}>Clear all</div>
            </div>
    )
}

let searchIcon = (color, scaled) => <svg width='24px' height='24px' transform={scaled ? scaled : 'scale(.8)'} style={{ paddingTop: '4px', paddingLeft: scaled ? '2px' : null }}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>

let removeIcon = () => <svg width='24px' height='24px' transform='scale(.8)'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default SearchTwitter