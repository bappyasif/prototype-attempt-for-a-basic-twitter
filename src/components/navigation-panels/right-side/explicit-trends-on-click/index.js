import React, { useEffect, useState } from 'react'
import ReuseableTrendsNavigationHandler from './reusable-trends-navigation-handler'
import TrendsHeader from './trends-header'
import TrendsTopNavigationPanel from './trends-top-navigation-panel'

function ExplicitTrendsOnClick({explicitTrendSearchText, handleExplicitTrendSearchText}) {
  let [currentNav, setCurrentNav] = useState(null)

  // console.log(currentNav, 'currentNav', explicitTrendSearchText)

  useEffect(() => setCurrentNav('Top'), [])

  return (
    <div id='explicit-trend-tweets-container'>
      ExplicitTrendsOnClick
      <TrendsHeader explicitTrendSearchText={explicitTrendSearchText} handleExplicitTrendSearchText={handleExplicitTrendSearchText} />
      <TrendsTopNavigationPanel explicitTrendSearchText={explicitTrendSearchText} updateCurrentNav={setCurrentNav} />
      { explicitTrendSearchText && <ReuseableTrendsNavigationHandler explicitTrendSearchText={explicitTrendSearchText} whichNav={currentNav} />}
    </div>
  )
}

export default ExplicitTrendsOnClick