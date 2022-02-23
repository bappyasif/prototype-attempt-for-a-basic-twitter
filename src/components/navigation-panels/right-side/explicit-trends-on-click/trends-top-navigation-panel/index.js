import React, { useEffect, useState } from 'react'
import ReuseableTrendsNavigationHandler from '../reusable-trends-navigation-handler'

function TrendsTopNavigationPanel({explicitTrendSearchText, updateCurrentNav}) {
    let [currentNav, setCurrentNav] = useState(null)

    let handleCurrentNav = evt => setCurrentNav(evt.target.id)

    // useEffect(() => setCurrentNav('Top'), [])

    useEffect(() => currentNav && updateCurrentNav(currentNav), [currentNav])

    let renderNavs = () => navsOptions.map(item => <RenderTopNavigation key={item.name} item={item} handleCurrentNav={handleCurrentNav} />)

    return (
        <div id='top-navigation-panel-container'>
            {renderNavs()}
            {/* <ReuseableTrendsNavigationHandler explicitTrendSearchText={explicitTrendSearchText} whichNav={currentNav} /> */}
        </div>
    )
}

let RenderTopNavigation = ({ item, handleCurrentNav }) => {
    return (
        <div id={item.name} className='navigation-name' onClick={handleCurrentNav}>{item.name}</div>
    )
}

let navsOptions = [{ name: 'Top', url: '' }, { name: 'Latest', url: '' }, { name: 'People', url: '' }, { name: 'Photos', url: '' }, { name: 'Videos', url: '' }]

export default TrendsTopNavigationPanel