import React, { useEffect, useState, useRef } from 'react';
import useOnClickOutside from '../../../right-side/click-outside-utility-hook/useOnClickOutside';
import { threeDotsSvgIcon } from '../../../right-side/current-trends';
import { RenderSettingsOption } from '../../../right-side/current-trends/top-news-relays-ui';
import { makeGetFetchRequest, makeStringWordCased, RenderArticle } from '../../reuseable-components';

function RenderNewsFromThisNewsCategory({ categoryName }) {
    let [dataset, setDataset] = useState(null)
    let [adjustedDataset, setAdjustedDataset] = useState(null)
    let [randomIndexes, setRandomIndexes] = useState([])
    let [renderingNews, setRenderingNews] = useState([])

    let handleAdjustedDataset = items => setAdjustedDataset(items)

    let handleDataset = items => setDataset(items)

    let filterDatset = () => {
        let newList = dataset.map(item => (item.multimedia && item.multimedia.length) ? item : null).filter(item => item && item.section && item.section == categoryName).filter(item => item)
        handleAdjustedDataset(newList)
    }

    let randomNumberGenerator = () => Math.floor(Math.random() * adjustedDataset.length)

    let checkDuplicateOrNot = (rndIdx) => randomIndexes.findIndex(id => id == rndIdx)

    let renderingReadyRandomIndex = () => {
        let idx = randomNumberGenerator();
        let isDuplicate = checkDuplicateOrNot(idx)
        console.log(isDuplicate, '?!?!')
        return [idx, isDuplicate]
    }

    let randomlyGeneratingIndexes = () => {
        let [idx, isDuplicate] = [...renderingReadyRandomIndex()];

        // console.log(isDuplicate, '{}{}', randomIndexes)

        // return isDuplicate != -1 ? renderingReadyRandomIndex() : setRandomIndexes(prevIdxs => prevIdxs.concat(isDuplicate == -1 && idx ))

        isDuplicate != -1 ? randomlyGeneratingIndexes() : setRandomIndexes(prevIdxs => prevIdxs.concat(idx))
    }

    let handleRenderingNews = (idx) => setRenderingNews(prevData => prevData.concat(adjustedDataset[idx]))

    useEffect(() => (randomIndexes.length == 4) && randomIndexes.map(idx => handleRenderingNews(idx)), [randomIndexes])

    useEffect(() => adjustedDataset && randomIndexes.length < 4 && randomlyGeneratingIndexes(), [randomIndexes])

    useEffect(() => adjustedDataset && randomlyGeneratingIndexes(), [adjustedDataset])

    useEffect(() => {
        dataset && filterDatset()
    }, [dataset])

    useEffect(() => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
        let url = `https://api.nytimes.com/svc/topstories/v2/${categoryName}.json?api-key=${apik}`
        makeGetFetchRequest(url, handleDataset)
    }, [])

    // console.log(categoryName, 'categoryName!!', dataset, adjustedDataset, randomIndexes, renderingNews)
    console.log(categoryName, 'categoryName!!', adjustedDataset, randomIndexes, renderingNews)


    let renderingCategoricalNews = () => adjustedDataset && renderingNews.length && renderingNews.map((item, idx) => <RenderArticle key={idx} item={item} fromExplore={true} />)

    return (
        renderingNews.length
        ?
        <div id='rendering-category-news-container'>
            <CategoryHeader categoryName={categoryName} />
            {renderingCategoricalNews()}
        </div>
        :
        null
    )
}

let CategoryHeader = ({ categoryName }) => {
    let [showModal, setShowModal] = useState(false)
    let [isCustomHooked, setIsCustomHooked] = useState(false)

    let handleClick = () => {
        setShowModal(!showModal)
        setIsCustomHooked(true)
    }
    
    return (
        <div id='categoty-header-wrapper' onClick={handleClick}>
            <div id='left-side'>
                <div id='svg-icon'>{categorySvgIcon()}</div>
                <div id='category-name'>{makeStringWordCased(categoryName)}</div>
            </div>
            <div id='category-option-svg'>{threeDotsSvgIcon()}</div>
            { showModal && isCustomHooked && <ShowCategoryOptionModal setIsCustomHooked={setIsCustomHooked} /> }
        </div>
    )
}

let ShowCategoryOptionModal = ({setIsCustomHooked}) => {
    let ref = useRef(null)
    useOnClickOutside(ref, () => setIsCustomHooked(false))

    let options = [{option: 'Hide', icon: hideSvgIcon()}, {option: 'Unfollow topic', icon: categorySvgIcon()}]
    let renderOptions = () => options.map(item => <RenderSettingsOption key={item.option} item={item} />)
    
    return (
        <div id='category-option-modal-wrapper' ref={ref}>
            {renderOptions()}
        </div>
    )
}

let hideSvgIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M12 1.25C6.072 1.25 1.25 6.072 1.25 12S6.072 22.75 12 22.75 22.75 17.928 22.75 12 17.928 1.25 12 1.25zm0 1.5c2.28 0 4.368.834 5.982 2.207L4.957 17.982C3.584 16.368 2.75 14.282 2.75 12c0-5.1 4.15-9.25 9.25-9.25zm0 18.5c-2.28 0-4.368-.834-5.982-2.207L19.043 6.018c1.373 1.614 2.207 3.7 2.207 5.982 0 5.1-4.15 9.25-9.25 9.25z"></path></g></svg>

export let categorySvgIcon = () => <svg width={'24px'} height={'24px'} color='rgb(29, 155, 240)'><g><path d="M18.265 3.314c-3.45-3.45-9.07-3.45-12.52 0-3.45 3.44-3.45 9.06 0 12.51 1.5 1.49 3.43 2.38 5.51 2.56v4.14c0 .31.2.6.5.7.08.03.17.05.25.05.22 0 .44-.1.59-.29l6.49-8.11c2.63-3.49 2.27-8.47-.82-11.56zm-10.56 7.87c0-.41.33-.75.75-.75h4.05c.41 0 .75.34.75.75s-.34.75-.75.75h-4.05c-.42 0-.75-.34-.75-.75zm8.6-3.24c0 .42-.34.75-.75.75h-7.1c-.42 0-.75-.33-.75-.75 0-.41.33-.75.75-.75h7.1c.41 0 .75.34.75.75z"></path></g></svg>

export default RenderNewsFromThisNewsCategory;
