import React, { useEffect, useRef, useState } from 'react'
import { removeIconSvg } from '../../../../user-profile/all-tweets/show-tweet-thread/tag-location'
import useOnHoverOutside from '../../../../user-profile/all-tweets/tweet-top/add-members-into-lists/useOnHoverOutside'
import { SearchComponent } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components'
import { threeDotsSvgIcon } from '../../current-trends'
import useOnClickOutside  from '../../click-outside-utility-hook/useOnClickOutside.js'

function TrendsHeader({ explicitTrendSearchText, handleExplicitTrendSearchText }) {
  let [searchText, setSearchText] = useState(null)
  let [showSearchResults, setShowSearchResults] = useState(false)
  let [inputFocused, setInputFocused] = useState(false)

  let [dataset, setDataset] = useState(null)

  let handleSearchText = value => setSearchText(value)

  useEffect(() => {
    if(searchText) {
      let handle = setTimeout(() => {
        fetchResultsFromTwitter(setDataset, searchText)
      }, 2000)

      return () => clearTimeout(handle)
    } 
    // else if (dataset && !searchText) {
    //   setDataset(null)
    // }
  }, [searchText])

  // useEffect(() => searchText && fetchResultsFromTwitter(setDataset, searchText), [searchText])

  // useEffect(() => searchText && handleExplicitTrendSearchText(searchText), [searchText])

  // console.log(inputFocused, 'inputFocused')

  useEffect(() => explicitTrendSearchText && setSearchText(explicitTrendSearchText), [explicitTrendSearchText])

  return (
    <div id='trends-header-component'>
      {/* <div className='svg-element' id='back-svg-icon' onMouseEnter={() => setShowToolTips(true)} ref={ref}>
        {backIcon()}
        {showTooltips && <div className='tooltips'>tooltip</div>}
      </div> */}
      <ShowSvgHoverableElement svgIcon={backIcon()} tooltipsText={'Back'} />
      <SearchComponent handleSearchText={handleSearchText} fromTrends={true} setSearchResultsModalHook={setShowSearchResults} initialTrendSearchedText={explicitTrendSearchText} />
      <ShowSvgHoverableElement svgIcon={threeDotsSvgIcon()} tooltipsText={'More'} />
      {/* <div className='svg-element' id='search-settings-icon' onMouseEnter={() => setShowToolTips(true)} ref={ref}>
        {threeDotsSvgIcon()}
        {showTooltips && <div className='tooltips'>tooltip</div>}
      </div> */}
      {/* <div id='remove-search-text'>{removeIconSvg()}</div> */}
      {showSearchResults && dataset && <ShowSearchResultsModal dataset={dataset} updateModalVisibility={setShowSearchResults} />}
      {/* {showSearchResults && searchText && <ShowSearchResultsModal searchText={searchText} updateModalVisibility={setShowSearchResults} />} */}
    </div>
  )
}

let ShowSearchResultsModal = ({searchText, updateModalVisibility, dataset}) => {
  // let [dataset, setDataset] = useState(null)

  // useEffect(() => searchText && fetchResultsFromTwitter(setDataset, searchText), [searchText])
  
  // let ref = useRef(null)
  // useOnClickOutside(ref, ()=>updateModalVisibility(false))

  // console.log(dataset, 'dataset!!')

  let renderResults = () => dataset && dataset.map(item => <SearchResultsWrapperUi key={item.id} item={item} />)

  // ref={ref}
  return (
    <div id='show-search-results-container' style={{overflowY: dataset && dataset.length >= 5 && 'scroll', maxHeight: '380px'}}>
      { dataset && renderResults()}
    </div>
  )
}

let SearchResultsWrapperUi = ({item}) => {
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

let fetchResultsFromTwitter = (updateDataset, searchText) => {
  let url = `https://twitter135.p.rapidapi.com/AutoComplete/?q=${searchText}`
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
            console.log(data, 'data!!')
            let results = data.users
            if (results) {
                let allkeys = Object.keys(results)
                let arrOfObj = allkeys.map(key => results[key])
                updateDataset(arrOfObj)
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