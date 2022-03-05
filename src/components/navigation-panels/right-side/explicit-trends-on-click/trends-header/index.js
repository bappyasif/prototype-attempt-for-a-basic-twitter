import React, { useEffect, useRef, useState } from 'react'
import { removeIconSvg } from '../../../../user-profile/all-tweets/show-tweet-thread/tag-location'
import useOnHoverOutside from '../../../../user-profile/all-tweets/tweet-top/add-members-into-lists/useOnHoverOutside'
import { SearchComponent } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components'
import { threeDotsSvgIcon } from '../../current-trends'
import useOnClickOutside  from '../../click-outside-utility-hook/useOnClickOutside.js'
import { AlreadySearchedKeywordsWrapper, getOnlyUniqueSearchedTerms, handleSearchKeywordRemoval, RenderSearchedRelatedTopic, selectTopicsRandomlyFromExistingTopics } from '../../search-twitter'
import { search } from 'emoji-mart/dist/svgs'

function TrendsHeader({ explicitTrendSearchText, handleExplicitTrendSearchText }) {
  let [searchText, setSearchText] = useState(null)
  let [showSearchResults, setShowSearchResults] = useState(false)
  let [inputFocused, setInputFocused] = useState(false)
  let [alreadySearchedTermsList, setAlreadySearchedTermsList] = useState([])
  let [searchedRelatedTopics, setSearchedRelatedTopics] = useState(null)
  let [randomlySelectedTopics, setRandomlySelectedTopics] = useState([])

  let [dataset, setDataset] = useState(null)

  let handleUpdateTopics = items => setSearchedRelatedTopics(items)

  let handleSearchText = value => setSearchText(value)

  let updateAlreadySearchedTerms = (searchText) => {
    setAlreadySearchedTermsList(prevList =>  {
      let newList = prevList.filter(searchTerm => searchTerm != searchText)
      // return prevList.length ? newList : prevList.concat(searchText)
      return prevList.concat(searchText)
    })
    // console.log('chkj01', searchText, alreadySearchedTermsList)
  }

  useEffect(() => {
    if(searchText) {
      let handle = setTimeout(() => {
        
        // recording recently searched term into list
        updateAlreadySearchedTerms(searchText)

        setSearchedRelatedTopics(null)
        
        setRandomlySelectedTopics([])

        fetchResultsFromTwitter(setDataset, searchText, handleUpdateTopics)
      }, 1100)

      // setShowSearchResults(true)

      return () => clearTimeout(handle)
    } 
    // else if (dataset && !searchText) {
    //   setDataset(null)
    // }
  }, [searchText])

  useEffect(() => searchedRelatedTopics && selectTopicsRandomlyFromExistingTopics(searchedRelatedTopics, setRandomlySelectedTopics), [searchedRelatedTopics])

  // useEffect(() => searchText && fetchResultsFromTwitter(setDataset, searchText), [searchText])

  // useEffect(() => searchText && handleExplicitTrendSearchText(searchText), [searchText])

  // console.log(inputFocused, 'inputFocused')

  // useEffect(() => dataset && searchText && setShowSearchResults(true), [dataset, searchText] )

  console.log(searchedRelatedTopics, 'searchedRelatedTopics!!', dataset)

  // useEffect(() => searchText && updateAlreadySearchedTerms(searchText), [searchText])

  useEffect(() => explicitTrendSearchText && setSearchText(explicitTrendSearchText), [explicitTrendSearchText])

  return (
    <div id='trends-header-component'>
      {/* <div className='svg-element' id='back-svg-icon' onMouseEnter={() => setShowToolTips(true)} ref={ref}>
        {backIcon()}
        {showTooltips && <div className='tooltips'>tooltip</div>}
      </div> */}
      <ShowSvgHoverableElement svgIcon={backIcon()} tooltipsText={'Back'} />
      <SearchComponent handleSearchText={handleSearchText} fromTrends={true} initialTrendSearchedText={explicitTrendSearchText} setSearchResultsModalHook={setShowSearchResults} />
      <ShowSvgHoverableElement svgIcon={threeDotsSvgIcon()} tooltipsText={'More'} />
      {/* <div className='svg-element' id='search-settings-icon' onMouseEnter={() => setShowToolTips(true)} ref={ref}>
        {threeDotsSvgIcon()}
        {showTooltips && <div className='tooltips'>tooltip</div>}
      </div> */}
      {/* <div id='remove-search-text'>{removeIconSvg()}</div> */}
      {/* {showSearchResults && dataset && <ShowSearchResultsModal dataset={dataset} updateModalVisibility={setShowSearchResults} searchedTerms={alreadySearchedTermsList} randomlySelectedTopics={randomlySelectedTopics} setSearchText={setSearchText} />} */}
      {/* {showSearchResults && searchText && <ShowSearchResultsModal searchText={searchText} updateModalVisibility={setShowSearchResults} />} */}

      {/* <ShowSearchResultsModal dataset={dataset} updateModalVisibility={setShowSearchResults} searchedTerms={alreadySearchedTermsList} updateSearchedTerms={setAlreadySearchedTermsList} /> */}
      {showSearchResults && <ShowSearchResultsModal dataset={dataset} updateModalVisibility={setShowSearchResults} searchedTerms={alreadySearchedTermsList} updateSearchedTerms={setAlreadySearchedTermsList} randomlySelectedTopics={randomlySelectedTopics} setSearchText={setSearchText} />}
    </div>
  )
}

let ShowSearchResultsModal = ({searchText, updateModalVisibility, dataset, searchedTerms, updateSearchedTerms, randomlySelectedTopics, setSearchText}) => {
  // let [dataset, setDataset] = useState(null)

  // useEffect(() => searchText && fetchResultsFromTwitter(setDataset, searchText), [searchText])
  
  let ref = useRef(null)
  useOnClickOutside(ref, ()=>updateModalVisibility(false))

  // let handleSearchKeywordRemoval = (evt) => {
  //   let findID = evt.target.id || evt.target.parentNode.id || evt.target.parentNode.parentNode.id
  //   let newList = findID && getOnlyUniqueSearchedTerms(searchedTerms, findID)
  //   console.log(evt.target, findID, newList)
  //   newList && updateSearchedTerms(newList)
  // }

  // console.log(dataset, 'dataset!!')

  let renderResults = () => dataset && dataset.map(item => <SearchResultsWrapperUi key={item.id} item={item} />)

  // console.log(searchedTerms, 'searchedTerms');

  let handleFetchAgain = (value) => {
    // console.log(value, 'value!!')
    setSearchText(value)
  }

  let alreadySearchedTermsList = () => searchedTerms && searchedTerms.map(item => <AlreadySearchedKeywordsWrapper key={item} item={item} handleSearchKeywordRemoval={(evt) => handleSearchKeywordRemoval(evt, searchedTerms, updateSearchedTerms)} /> )

  let renderSearchedRelatedTopics = () => randomlySelectedTopics && randomlySelectedTopics.map(item => <RenderSearchedRelatedTopic key={item.topic} item={item} fetcAgainhWithUserSelectedTopic={handleFetchAgain} />)

  // ref={ref}
  return (
    <div id='show-search-results-container' style={{overflowY: (dataset && dataset.length >= 5 || randomlySelectedTopics.length >= 5) && 'scroll', maxHeight: '380px'}} ref={ref}>
      {/* rendering already searched keywords */}
      {alreadySearchedTermsList()}
      {renderSearchedRelatedTopics()}
      { dataset && renderResults()}
    </div>
  )
}

export let SearchResultsWrapperUi = ({item}) => {
  let {name, screen_name, profile_image_url, description } = {...item}
  return (
    <div className='results-wrapper-ui'>
      <img id='profile-picture' src={profile_image_url} />
      <div id='profile-infos'>
        <div id='name'>{name}</div>
        <div id='handle'>@{screen_name}</div>
        <div id='description'>{description || item.result_context.display_string}</div>
      </div>
    </div>
  )
}

export let fetchResultsFromTwitter = (updateDataset, searchText, updateTopics) => {
  let url = `https://twitter135.p.rapidapi.com/AutoComplete/?q=${searchText}`
  // console.log(searchText, 'searchText')
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "twitter135.p.rapidapi.com",
            "x-rapidapi-key": "16ecb1e169msh1f719a2c940b075p117e09jsn47e729518524"
        }
    }).then(response => {
        console.log(response, 'chk02')
        return response.json()
    })
        .then(data => {

            let results = data.users;
            let topics = data.topics

            console.log(data, 'data!!', topics)

            if (results) {
                // let allkeys = Object.keys(results)
                // let arrOfObj = allkeys.map(key => results[key])
                // updateDataset(arrOfObj)

                updateDataset(convertsObjectOfObjectsIntoArrayOfObjects(results))
                // updateTopics(convertsObjectOfObjectsIntoArrayOfObjects(topics))

                let filterTopics = topics.filter(item => item.result_context)
                updateTopics(filterTopics)
                // updateTopics(topics)
                // console.log('arrOfObj', arrOfObj)
                // datasetUpdater([...results])
            } else {
                console.log('no data is found!!')
            }
        })
        .catch(err => {
            console.error(err);
        });
}

let convertsObjectOfObjectsIntoArrayOfObjects = objects => {
  let allkeys = Object.keys(objects)
  let arrOfObj = allkeys.map(key => objects[key])
  return arrOfObj
}

let ShowSvgHoverableElement = ({setShowToolTips, svgIcon, tooltipsText, showTooltips}) => {
  let [hovered, setHovered] = useState(false)

  let ref = useRef(null)
  
  useOnHoverOutside(ref, () => setHovered(false))

  let handleMouseEnter = evt => {
    setHovered(true)
  }

  return (
    <div className='svg-element' id={tooltipsText} onMouseEnter={handleMouseEnter} ref={ref}>
      {svgIcon}
      {hovered && <div className='tooltips' onMouseLeave={() => setHovered(false)}>{tooltipsText || 'tooltip'}</div>}
    </div>
  )
}

export let backIcon = () => <svg width='24px' height='24px'><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

export default TrendsHeader