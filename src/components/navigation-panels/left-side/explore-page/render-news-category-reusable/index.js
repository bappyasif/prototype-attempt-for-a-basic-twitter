import React, { useEffect, useState } from 'react';
import { makeGetFetchRequest } from '..';

function RenderNewsFromThisNewsCategory({ categoryName }) {
    let [dataset, setDataset] = useState(null)
    let [adjustedDataset, setAdjustedDataset] = useState(null)
    let [randomIndexes, setRandomIndexes] = useState([])
    let [renderingNews, setRenderingNews] = useState([])

    let handleAdjustedDataset = items => setAdjustedDataset(items)

    let handleDataset = items => setDataset(items)

    let filterDatset = () => {
        let newList = dataset.map(item => (item.multimedia && item.multimedia.length) ? item : null).filter(item => item.section && item.section == categoryName)
        handleAdjustedDataset(newList)
    }

    let randomlyGeneratingIndexes = () => {
        let rndIdx = Math.floor(Math.random() * adjustedDataset.length)
        let checkDouble = randomIndexes.findIndex(id => id == rndIdx)
        console.log(rndIdx, checkDouble, '{}{}', randomIndexes.length)
        setRandomIndexes(prevIdxs => prevIdxs.concat(checkDouble == -1 && rndIdx ))
    }

    let handleRenderingNews = (idx) => setRenderingNews(prevData => prevData.concat(adjustedDataset[idx]))

    useEffect(() => randomIndexes.length >= 3 && randomIndexes.length <= 4 && randomIndexes.map(idx=>handleRenderingNews(idx)), [randomIndexes])

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

    console.log(categoryName, 'categoryName!!', dataset, adjustedDataset, randomIndexes, renderingNews)

    return (
        <div>

        </div>
    )
}

export default RenderNewsFromThisNewsCategory;
