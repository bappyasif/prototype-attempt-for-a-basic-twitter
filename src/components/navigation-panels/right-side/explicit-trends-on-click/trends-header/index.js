import React, { useEffect, useRef, useState } from 'react'
import { removeIconSvg } from '../../../../user-profile/all-tweets/show-tweet-thread/tag-location'
import useOnHoverOutside from '../../../../user-profile/all-tweets/tweet-top/add-members-into-lists/useOnHoverOutside'
import { SearchComponent } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components'
import { threeDotsSvgIcon } from '../../current-trends'

function TrendsHeader({ explicitTrendSearchText, handleExplicitTrendSearchText }) {
  let [searchText, setSearchText] = useState(null)
  let [showSearchResults, setShowSearchResults] = useState(false)
  let [inputFocused, setInputFocused] = useState(false)

  let handleSearchText = value => setSearchText(value)

  useEffect(() => searchText && handleExplicitTrendSearchText(searchText), [searchText])

  // console.log(inputFocused, 'inputFocused')

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
    </div>
  )
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