import React, { useEffect, useState } from 'react';

function RenderHomePageView() {
    let [dataset, setDataset] = useState(null)
    let handleLoadingDataset = items => setDataset(items)
    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
    let url = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${apik}`
    let url02 = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/twitter.json?api-key=${apik}`
    let url03 = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apik}`
    let fetchData = (url) => {
        fetch(url)
        .then(resp => resp.json())
        .then(data => handleLoadingDataset(data))
        .catch(err => console.log(err.code, err.message))
    }
    
    useEffect(() => fetchData(url03), [])

    console.log(dataset, 'datasetHomePage!!')

    return (
        <div id='home-page-view-container'>

        </div>
    )
}

export default RenderHomePageView;
