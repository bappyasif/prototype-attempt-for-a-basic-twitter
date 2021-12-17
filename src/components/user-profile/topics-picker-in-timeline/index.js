import React, { useEffect, useState } from 'react'
import { categoryNames } from '../../topics-picker'
import './styles.css'

function TopicsPickerInTimeline() {
    let [allCategories, setAllCategories] = useState(refineCategoryNames())
    // useEffect(() => refineCategoryNames(), [])
    // refineCategoryNames();
    allCategories && console.log(allCategories, '?!')

    let renderAllCategories = allCategories && allCategories.map(name => {
        return(
            <div className='category-container'>{name}</div>
        )
    })

    return (
        <div id='topics-picker-container-in-time-line'>
            <div id='headings-part'>
                <div id='title-text'>Expand your timeline with Topics</div>
                <div id='title-subtext'>You'll see top Tweets about these right in your Home timeline.</div>
            </div>
            <div id='scrolling-part' style={{overflowX: 'auto', width: '99%', height: '200px'}}>{renderAllCategories}</div>
        </div>
    )
}

let refineCategoryNames = () => {
    let allCategories = []
    categoryNames.forEach(item => {
        for(let key in item) {
            allCategories = allCategories.concat(item[key])
        }
    })
    let refined = []
    allCategories.forEach(name => {
        let alreadyExist = refined.findIndex(category => category == name)
        if(alreadyExist == -1) refined.push(name)
    })
    // console.log(allCategories, 'all categories', new Set(allCategories), refined)
    return refined
}

export default TopicsPickerInTimeline
