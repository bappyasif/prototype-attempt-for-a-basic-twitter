import React, { useEffect, useState } from 'react'
import { RenderArticle } from '../../reuseable-components'

function ExplicitTrendsOnClick({explicitTrendSearchText}) {
  let [dataset, setDataset] = useState(null)

  let handleDataset = items => {
    let newList = items.filter(item => item.author).filter(item => !item.author.includes('('))
    setDataset(newList)
  }

  let fetchDataFromGoogleNewsAPI = () => {
    let apik = '16d8576b44404e2cacdb7c57761d4f34'
    let url = `https://newsapi.org/v2/everything?q=${explicitTrendSearchText}&apiKey=${apik}&en`
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data, 'data!!')
      let results = data.articles
      if(results) {
        handleDataset(results)
      } else {
        alert('no data found, try again later!!')
      }
    })
    .catch(err => console.log(err.code, err.message))
  }

  useEffect(() => explicitTrendSearchText && fetchDataFromGoogleNewsAPI(), [explicitTrendSearchText])

  // useEffect(() => {
  //   if(dataset) {
  //     let newList = dataset.filter(item => item.author).filter(item => !item.author.includes('('))
  //     handleDataset(newList)
  //   }
  // }, [dataset])

  console.log(explicitTrendSearchText, 'explicitTrendSearchText', dataset)

  let renderArticles = () => dataset && dataset.map(item => <RenderArticle key={item.title} item={item} fromExplicitTrend={true} />)

  return (
    <div id='explicit-trend-tweets-container'>
      ExplicitTrendsOnClick
      {renderArticles()}
    </div>
  )
}

export default ExplicitTrendsOnClick

/**
 * 
 * 
 let fetchData = () => {
    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${explicitTrendSearchText}&api-key=${apik}`
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data, 'data!!')
      let results = data.response.docs
      if(results) {
        handleDataset(results)
      } else {
        alert('no data found, try again later!!')
      }
    })
    .catch(err => console.log(err.code, err.message))
  }
 */