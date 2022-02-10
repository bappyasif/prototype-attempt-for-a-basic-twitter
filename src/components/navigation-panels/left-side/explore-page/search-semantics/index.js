import React, { useEffect, useState } from 'react'

function SearchSemantics({searchText}) {
    let [dataset, setDataset] = useState(null)
    let [cycles, setCycles] = useState(0)
    let [startCycle, setStartCycle] = useState(false)

    let handleDataset = items => setDataset(items)

    let semanticsConcepts = ['nytd_per', 'nytd_geo', 'nytd_org', 'nytd_des', 'nytd_ttl', 'nytd_topic', 'nytd_porg']

    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

    let url = `http://api.nytimes.com/svc/semantic/v2/concept/search.json?query=${searchText}&concept_type=${semanticsConcepts[cycles]}&api-key=${apik}`

    let getData = () => {
        setStartCycle(true);

        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data, 'data!!')
            if(data.num_results) {
                handleDataset(data.results)
            } else {
                setCycles(cycles + 1)
            }
            setStartCycle(false)
        }).catch(err => console.log(err.code, err.message))
    }

    useEffect(() => searchText && getData(), [cycles, searchText])

    // useEffect(() => !startCycle && searchText && getData(), [searchText, startCycle, cycles, dataset])

    // useEffect(() => searchText && getData(), [cycles])

    return (
        <div id='search-semantics-container'>{searchText}</div>
    )
}

export default SearchSemantics