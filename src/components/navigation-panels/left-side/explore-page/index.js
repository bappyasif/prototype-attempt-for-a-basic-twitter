import React, { useEffect, useState } from 'react';
import CurrentTrends from '../../right-side/current-trends';
import { makeGetFetchRequest, makeStringWordCased } from '../reuseable-components';
import RenderNewsFromThisNewsCategory from './render-news-category-reusable';
import './styles.css';

function RenderExplorePage() {
    let [contentCreators, setContentCreators] = useState([])
    let handleContentCreators = name => setContentCreators(prevData => prevData.concat(name))

    return (
        <div id='render-explore-page-container'>
            <MostTrendingNewsDisplay />
            <CurrentTrends handleContentCreators={handleContentCreators} />
            <RenderNewsFromSections />
        </div>
    )
}

let RenderNewsFromSections = () => {
    let [data, setData] = useState(null)
    let [sectionNames, setSectionNames] = useState([])
    let [uniqueNewsSectionNames, setUniqueNewsSectionNames] = useState([])
    let [randomIndexes, setRandomIndexes] = useState([])
    let [renderingCategories, setRenderingCategories] = useState([])

    let handleData = items => setData(items)

    let getNewsSectionsNames = (value) => value && setSectionNames(prevNames => prevNames.concat(value))

    let extractNewsSectionsNames = () => {
        let barredList = ['podcasts', 'briefing', 'parenting']
        let found = name => barredList.findIndex(item => item == name)
        data.forEach(item => found(item.section) == -1 && getNewsSectionsNames(item.section))
        // data.forEach(item => getNewsSectionsNames(item.section))
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

        console.log(idx, isDuplicate, '[][]', randomIndexes)
        // setRandomIndexes(prevIdxs => prevIdxs.concat(checkDouble == -1 ? rndIdx : null))
        isDuplicate != -1 ? randomlySelectedIndexes() : setRandomIndexes(prevIndexes => prevIndexes.concat(idx))
    }

    // let randomlySelectedIndexes = () => {
    //     let rndIdx = Math.floor(Math.random() * uniqueNewsSectionNames.length)
    //     let checkDouble = randomIndexes.findIndex(id => id == idx)
    //     console.log(rndIdx, checkDouble, '[][]', randomIndexes.length)
    //     setRandomIndexes(prevIdxs => prevIdxs.concat(checkDouble == -1 ? rndIdx : null))
    // }

    let handleRenderingCategories = idx => setRenderingCategories(prevData => prevData.concat(uniqueNewsSectionNames[idx]))

    useEffect(() => {
        if (randomIndexes.length == 4) {
            randomIndexes.forEach(idx => handleRenderingCategories(idx))
        }
    }, [randomIndexes])

    // useEffect(() => {
    //     if (randomIndexes.length < 5 && uniqueNewsSectionNames.length) {
    //         setInterval(randomlySelectedIndexes, 110)
    //         console.log('er?!', temp)
    //     }
    // }, [randomIndexes, uniqueNewsSectionNames])

    useEffect(() => {
        uniqueNewsSectionNames.length && randomlySelectedIndexes()
    }, [uniqueNewsSectionNames])

    useEffect(() => uniqueNewsSectionNames.length && randomIndexes.length <= 4 && randomlySelectedIndexes(), [randomIndexes])

    // this works
    // useEffect(() => {
    //     if(uniqueNewsSectionNames.length) {
    //         for(let i=0; i<4; i++) {
    //             randomlySelectedIndexes()
    //         }
    //     }
    // }, [uniqueNewsSectionNames])

    useEffect(() => {
        if (sectionNames) {
            let temp = [];
            sectionNames.forEach(name => {
                let idx = temp.findIndex(n => name == n);
                idx == -1 ? temp.push(name) : null
            })
            console.log(temp, 'temp!!')
            temp && setUniqueNewsSectionNames(temp)
        }
    }, [sectionNames])

    useEffect(() => data && extractNewsSectionsNames(), [data])

    useEffect(() => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
        let url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apik}`
        makeGetFetchRequest(url, handleData)
    }, [])
    // console.log(data, 'data!!', sectionNames, uniqueNewsSectionNames)
    console.log('data!!', randomIndexes, renderingCategories)

    // let renderingNewsFromCategories = () => renderingCategories.map((category, idx) => idx == 0 && <RenderNewsFromThisNewsCategory key={category} categoryName={category} />)
    
    // without timeout, but it requires timeout otherwise too many bad requests error
    let renderingNewsFromCategories = () => renderingCategories.map((category, idx) => <RenderNewsFromThisNewsCategory key={category} categoryName={category} />)

    // let renderingCategoricalNews = () => 

    return (
        <div id='rendering-news-from-categories'>
            {renderingNewsFromCategories()}
        </div>
    )
}

let MostTrendingNewsDisplay = () => {
    let [rawDataset, setRawDataset] = useState(null)

    let [dataset, setDataset] = useState(null)

    let handleDataset = items => setDataset(items)

    let handleRawDataset = items => setRawDataset(items)

    useEffect(() => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
        // let url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apik}`
        let url = `https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=${apik}`
        makeGetFetchRequest(url, handleRawDataset)
    }, [])

    useEffect(() => {
        if (rawDataset) {
            let newList = rawDataset.map(item => item.multimedia && item.multimedia.length ? item : null).filter(item => item.section)
            // setDataset(newList)
            handleDataset(newList)
        }
    }, [rawDataset])

    let randomizeIdx = dataset && Math.floor((Math.random() * dataset.length))
    // console.log(randomizeIdx, '??')

    // console.log(rawDataset, 'top news!!', dataset)

    return randomizeIdx != -1 && dataset && dataset.length && <RenderThisRandomlySelectedNewsItem item={randomizeIdx && dataset[randomizeIdx]} />
}

let RenderThisRandomlySelectedNewsItem = ({ item }) => {
    let adjustedSection = makeStringWordCased(item.subsection || item.section)
    // console.log(item, 'render!!', adjustedSection)
    return (
        <div id='most-trending-news-wrapper'>
            <img id='trending-news-img' src={item.multimedia[1].url} />
            <div id='news-info'>
                <div id='news-section'>{adjustedSection}</div>
                <div id='news-headline'>{adjustedSection} : {item.title}</div>
            </div>
        </div>
    )
}

export default RenderExplorePage;


/**
 * 
 * 
 // export let makeStringWordCased = (string) => {
//     let wordCased = string[0].toUpperCase() + string.substring(1)
//     return wordCased
// }

// export let makeGetFetchRequest = (url, dataUpdater) => {
//     fetch(url)
//         .then(resp => resp.json())
//         .then(data => dataUpdater(data.results))
//         .catch(err => console.log(err.code, err.message))
// }
 * 
 * 
 // let renderingNewsFromCategories = () => {
    //     let [comps, setComps] = useState([])

    //     let markup = (currComp) => setComps(prevComp => prevComp.concat(currComp))
        
    //     renderingCategories.map((category, idx) => {
    //         return (idx == 0
    //         ?
    //         markup(<RenderNewsFromThisNewsCategory key={category} categoryName={category} />)
    //         // <RenderNewsFromThisNewsCategory key={category} categoryName={category} />
    //         :
    //         setTimeout(() => markup(<RenderNewsFromThisNewsCategory key={category} categoryName={category} />)), 6000)
    //         // setTimeout(() => <RenderNewsFromThisNewsCategory key={category} categoryName={category} />), 6000)
    //     })
    //     // return renderingCategories.map((category, idx) => {
    //     //     setTimeout(() => <RenderNewsFromThisNewsCategory key={category} categoryName={category} />, 6000)
    //     // })
    //     // return () => handles.forEach(handle => clearTimeout(handle))
    //     return comps.length && comps.map(comp => comp)
    // }
 * 
 * 
 let RenderNewsFromSections = () => {
    let [data, setData] = useState(null)
    let [sectionNames, setSectionNames] = useState([])
    let [uniqueNewsSectionNames, setUniqueNewsSectionNames] = useState([])
    let [randomIndexes, setRandomIndexes] = useState([])

    let handleData = items => setData(items)

    let getNewsSectionsNames = (value) => setSectionNames(prevNames => prevNames.concat(value))

    let extractNewsSectionsNames = () => {
        data.forEach(item => getNewsSectionsNames(item.section))
    }

    let randomlySelectedIndexes = () => {
        let rndIdx = Math.floor(Math.random() * uniqueNewsSectionNames.length)
        let checkDouble = randomIndexes.findIndex(id => id == idx)
        console.log(rndIdx, checkDouble, '[][]', randomIndexes.length)
        setRandomIndexes(prevIdxs => prevIdxs.concat(checkDouble == -1 ? rndIdx : null))
    }

    // useEffect(() => {
    //     if (randomIndexes.length < 5 && uniqueNewsSectionNames.length) {
    //         setInterval(randomlySelectedIndexes, 110)
    //         console.log('er?!', temp)
    //     }
    // }, [randomIndexes, uniqueNewsSectionNames])

    // this works
    useEffect(() => {
        if(uniqueNewsSectionNames.length) {
            for(let i=0; i<4; i++) {
                randomlySelectedIndexes()
            }
        }
    }, [uniqueNewsSectionNames])

    // useEffect(() => {
    //     while(randomIndexes.length < 4) {
    //         let handle = setTimeout(randomlySelectedIndexes, 11)
    //         clearTimeout(handle)
    //         console.log('KLKL')
    //     }
    // }, [])

    // let randomlySelectedIndexes = (temp) => {
    //     let rndIdx = Math.floor(Math.random() * uniqueNewsSectionNames.length)
    //     let checkDouble = temp.findIndex(id => id == idx)
    //     console.log(rndIdx, checkDouble, '[][]')
    //     return checkDouble == -1 ? temp.concat(rndIdx) : null
    // }

    // let updateTest = (temp) => {
    //     let handle = setTimeout(() => randomlySelectedIndexes(temp), 110)
    //     // if(randomIndexes.length == 4) clearTimeout(handle)
    //     console.log('here!!')
    //     return () => clearTimeout(handle)
    //     // console.log('here!!')
    // }

    // useEffect(() => {
    //     if(randomIndexes.length <= 5) {
    //         let temp = []
    //         uniqueNewsSectionNames.length && updateTest(temp)
    //         console.log('er?!', temp)
    //     }
    // }, [randomIndexes, uniqueNewsSectionNames])

    // let updateIndexes = () => {
    //     let handles = setInterval(() => {
    //         randomlySelectedIndexes();
    //         if(randomIndexes.length == 4) clearInterval(handles)
    //     }, 110)

    //     // return () => handles && handles.forEach(handle => clearInterval(handle))
    // }

    // useEffect(() => uniqueNewsSectionNames && updateIndexes(), [uniqueNewsSectionNames])

    // useEffect(() => {
    //     if (uniqueNewsSectionNames) {
    //         let handles = setInterval(() => {
    //             randomlySelectedIndexes()
    //             if(randomIndexes.length == 4) return
    //         }, 110)

    //         // return () => handles.forEach(handle => clearInterval(handle))
    //         return () => clearInterval(handles)
    //     }
    // })

    useEffect(() => {
        if (sectionNames) {
            let temp = [];
            sectionNames.forEach(name => {
                let idx = temp.findIndex(n => name == n);
                idx == -1 ? temp.push(name) : null
            })
            // console.log(temp, 'temp!!')
            temp && setUniqueNewsSectionNames(temp)
        }
    }, [sectionNames])

    useEffect(() => data && extractNewsSectionsNames(), [data])

    useEffect(() => {
        let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
        let url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apik}`
        makeGetFetchRequest(url, handleData)
    }, [])
    // console.log(data, 'data!!', sectionNames, uniqueNewsSectionNames)
    console.log('data!!', randomIndexes)

    return (
        <div></div>
    )
}
 */