import React, { useEffect, useState } from 'react';

function TopNewsRelaysUI({ newsCategory, showDouble }) {
    let [newsData, setNewsData] = useState(null)

    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

    // let url = `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=${apik}`

    let url = `https://api.nytimes.com/svc/news/v3/content/nyt/${newsCategory}.json?api-key=${apik}`

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data, 'response!!')
                setNewsData(data.results)
            })
            .catch(err => console.log('call failed', err.code, err.message))
    }, [newsCategory])

    // let renderNews = () => newsData && newsData.map((item, idx) => (idx < 5) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} />)
    let rndNum = Math.floor(Math.random() * 20)
    // let renderNews = () => newsData && newsData.map((item, idx) => (idx == rndNum) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} />)
    // let renderNews = () => newsData && newsData.map((item, idx) => (idx == 0) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} />)

    let renderNews = () => {
        return (
            showDouble
                ?
                newsData && newsData.map((item, idx) => (idx == 0) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} />)
                :
                newsData && newsData.map((item, idx) => (idx < 2) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} />)
        )
    }
    // console.log(rndNum, 'rndNum!!')

    return (
        <div id='top-news-relays-container'>
            {renderNews()}
        </div>
    )
}

let ShowNewsReelHeadlines = ({ newsItem }) => {
    let [hovered, setHovered] = useState(false)
    let { slug_name, subsection, section } = { ...newsItem };
    let tokenizing = slug_name.split(/[0-9]/);
    let tokenizingHyphens = tokenizing[tokenizing.length - 1].split('-');
    let adjustedSlug = tokenizingHyphens.join(' ');
    // let adjustSlug = '';
    // let regEx = /[A-Z]|[a-z]/
    // let adjustSlug = slug_name.match(regEx)
    // console.log(adjustSlug , 'adjust!!', tokenizing, tokenizingHyphens)
    // console.log(slug_name, newsItem, 'what what!!')

    let handleHover = () => setHovered(!hovered)

    // adjustedSlug && headlinesCount()

    // useEffect(() => {
    //     adjustedSlug && headlinesCount()
    // }, [])

    return (
        adjustedSlug
        &&
        <div className='news-item-wrapper' style={{ marginBottom: '4px' }} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <div id='news-category' style={{ color: hovered && 'black' }}>
                <div id='category-name'>{section} </div>
                <div id='news-type'> - {subsection || section}</div>
            </div>
            <div id='slug-name'>#{adjustedSlug}</div>
            <div id='news-numbers' style={{ color: hovered && 'black' }}>0000 tweets</div>
        </div>
    )
}

export default TopNewsRelaysUI;
