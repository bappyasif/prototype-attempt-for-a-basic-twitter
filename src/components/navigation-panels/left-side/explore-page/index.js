import React, { useEffect, useRef, useState } from 'react';
import { SearchComponent } from '../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components';
import { makeGetFetchRequest, makeStringWordCased, removeItemFromArrayByTitle } from '../../reuseable-components';
import useOnClickOutside from '../../right-side/click-outside-utility-hook/useOnClickOutside';
import CurrentTrends from '../../right-side/current-trends';
import RenderNewsFromThisNewsCategory from './render-news-category-reusable';
import SearchSemantics from './search-semantics';
import './styles.css';

function RenderExplorePage() {
    let [searchText, setSearchText] = useState(null)
    let [savingPrevSearchText, setSavingPrevSearchText] = useState(null)
    let [contentCreators, setContentCreators] = useState([])
    let [searchedDataset, setSearchedDataset] = useState(null)
    let [searchResultsModalHook, setSearchResultsModalHook] = useState(false)

    let handleSearchedDataset = items => {
        let newList = items.filter(item => !item.concept_name.includes(';')).filter(item => !item.concept_name.includes(',')).filter(item => item.concept_name.split(' ').length <= 5).filter(item => !item.concept_name.includes('('))
        setSearchedDataset(newList)
        // console.log(searchText, newList)
    }

    let makeFetchRequestToNytimes = () => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

        let url = `http://api.nytimes.com/svc/semantic/v2/concept/search.json?query=${searchText}&concept_type=nytd_org&api-key=${apik}`

        makeGetFetchRequestUpdated(url, handleSearchedDataset)
    }

    useEffect(() => {
        if(searchText) {
            let handle = setTimeout(makeFetchRequestToNytimes, 1100)
            return () => clearTimeout(handle)
        }
    }, [searchText])

    let ref = useRef(null)

    useOnClickOutside(ref, () => {
        setSearchResultsModalHook(false)
        setSavingPrevSearchText(searchText)
        setSearchText(null)
    })
   
    let handleSearchText = value => setSearchText(value)
    let handleContentCreators = name => setContentCreators(prevData => prevData.concat(name))

    return (
        <div id='render-explore-page-container' ref={ref}>
            <SearchComponent fromExplore={true} handleSearchText={handleSearchText} setSearchResultsModalHook={setSearchResultsModalHook} savingPrevSearchText={savingPrevSearchText} />
            
            { searchedDataset && searchResultsModalHook && <SearchSemantics dataset={searchedDataset} searchResultsModalHook={searchResultsModalHook} setSearchResultsModalHook={setSearchResultsModalHook} />}
            
            <MostTrendingNewsDisplay searchText={searchText} />
            
            <CurrentTrends handleContentCreators={handleContentCreators} />
            
            <RenderNewsFromSections />
        </div>
    )
}

let makeGetFetchRequestUpdated = (url, updater) => {
    fetch(url)
        .then(resp => resp.json())
        .then(data => updater(data.results))
        .catch(err => console.log(err.code, err.message))
}

let RenderNewsFromSections = () => {
    let [data, setData] = useState(null)
    let [sectionNames, setSectionNames] = useState([])
    let [uniqueNewsSectionNames, setUniqueNewsSectionNames] = useState([])
    let [randomIndexes, setRandomIndexes] = useState([])
    let [renderingCategories, setRenderingCategories] = useState([])
    let [removeCategoryList, setRemoveCategoryList] = useState([])
    
    let updateRemoveCategoryList = categoryName => {
        setRemoveCategoryList(prevList => prevList.concat(categoryName))

        let idx = renderingCategories.findIndex(item => item == categoryName)

        let newIndexs = randomIndexes.filter((v, _, arr) => v != arr[idx])

        setRandomIndexes(newIndexs);
    }

    useEffect(() => {
        removeCategoryList.length && removeItemFromArrayByTitle(renderingCategories, removeCategoryList, setRenderingCategories, 'fromExplore');
        if (removeCategoryList.length && renderingCategories.length <= 4) {
            // clearing previously held data in renderingCategories, so that newly generated index to replace it can be re render on DOM
            setRenderingCategories([])
        }
    }, [removeCategoryList])

    let handleData = items => setData(items)

    let getNewsSectionsNames = (value) => value && setSectionNames(prevNames => prevNames.concat(value))

    let extractNewsSectionsNames = () => {
        let barredList = ['podcasts', 'briefing', 'parenting']
        let found = name => barredList.findIndex(item => item == name)
        data.forEach(item => found(item.section) == -1 && getNewsSectionsNames(item.section))
    }

    let randomIndexNumberGenerator = () => Math.floor(Math.random() * uniqueNewsSectionNames.length)

    let checkIsItDuplicate = (idx) => randomIndexes.findIndex(id => id == idx)

    let generateRenderingReadyIndex = () => {
        let idx = randomIndexNumberGenerator();
        let isDuplicate = checkIsItDuplicate(idx)
        return [idx, isDuplicate]
    }

    let randomlySelectedIndexes = () => {
        let [idx, isDuplicate] = generateRenderingReadyIndex()
        isDuplicate != -1 ? randomlySelectedIndexes() : setRandomIndexes(prevIndexes => prevIndexes.concat(idx))
    }

    let handleRenderingCategories = idx => setRenderingCategories(prevData => prevData.concat(uniqueNewsSectionNames[idx]))

    useEffect(() => {
        if (randomIndexes.length == 4) {
            randomIndexes.forEach(idx => handleRenderingCategories(idx))
        }
    }, [randomIndexes])

    useEffect(() => {
        uniqueNewsSectionNames.length && randomlySelectedIndexes()
    }, [uniqueNewsSectionNames])

    useEffect(() => uniqueNewsSectionNames.length && randomIndexes.length <= 4 && randomlySelectedIndexes(), [randomIndexes])

    useEffect(() => {
        if (sectionNames) {
            let temp = [];
            sectionNames.forEach(name => {
                let idx = temp.findIndex(n => name == n);
                idx == -1 ? temp.push(name) : null
            })
            temp && setUniqueNewsSectionNames(temp)
        }
    }, [sectionNames])

    useEffect(() => data && extractNewsSectionsNames(), [data])

    useEffect(() => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
        let url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apik}`
        makeGetFetchRequest(url, handleData)
    }, [])

    // without timeout, but it requires timeout otherwise too many bad requests error
    let renderingNewsFromCategories = () => renderingCategories.map((category, idx) => <RenderNewsFromThisNewsCategory key={category} categoryName={category} updateRemoveCategoryList={updateRemoveCategoryList} />)

    return (
        <div id='rendering-news-from-categories'>
            {renderingNewsFromCategories()}
        </div>
    )
}

let MostTrendingNewsDisplay = ({ searchText }) => {
    let [rawDataset, setRawDataset] = useState(null)

    let [dataset, setDataset] = useState(null)

    let [rndIdx, setRndIdx] = useState(null)

    let handleDataset = items => setDataset(items)

    let handleRawDataset = items => setRawDataset(items)

    useEffect(() => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
        let url = `https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=${apik}`
        makeGetFetchRequest(url, handleRawDataset)
    }, [])

    useEffect(() => {
        if (rawDataset) {
            let newList = rawDataset.map(item => item.multimedia && item.multimedia.length ? item : null).filter(item => item && item.section)
            handleDataset(newList)
        }
    }, [rawDataset])

    useEffect(() => {
        if (dataset) {
            let randomizeIdx = dataset && Math.floor((Math.random() * dataset.length))
            setRndIdx(randomizeIdx)
        }
    }, [dataset])

    return rndIdx != -1 && dataset && dataset.length && <RenderThisRandomlySelectedNewsItem item={dataset[rndIdx]} searchText={searchText} />
}

let RenderThisRandomlySelectedNewsItem = ({ item, searchText }) => {
    let adjustedSection = makeStringWordCased(item && (item.subsection || item.section))
    // console.log(searchText, 'searchText')

    return (
        item ?
            <div id='most-trending-news-wrapper'>
                <img id='trending-news-img' src={item.multimedia && item.multimedia[1].url} />
                <div id='news-info'>
                    <div id='news-section'>{adjustedSection}</div>
                    <div id='news-headline'>{adjustedSection} : {item.title}</div>
                </div>
            </div>
            :
            null
    )
}

export default RenderExplorePage;