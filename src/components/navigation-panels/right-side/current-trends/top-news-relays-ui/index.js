import React, { useEffect, useState } from 'react';
import { frownFaceSvgIcon, threeDotsSvgIcon } from '..';

function TopNewsRelaysUI({ newsCategory, showDouble, handleContentCreators }) {
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
                newsData && newsData.map((item, idx) => (idx == 0) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} handleContentCreators={handleContentCreators} />)
                :
                newsData && newsData.map((item, idx) => (idx < 2) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} handleContentCreators={handleContentCreators} />)
        )
    }
    // console.log(rndNum, 'rndNum!!')

    return (
        <div id='top-news-relays-container'>
            {renderNews()}
        </div>
    )
}

let ShowNewsReelHeadlines = ({ newsItem, handleContentCreators }) => {
    let [hovered, setHovered] = useState(false)
    let [clicked, setClicked] = useState(false)

    let { slug_name, subsection, section, byline, multimedia } = { ...newsItem };
    let tokenizing = slug_name.split(/[0-9]/);
    let tokenizingHyphens = tokenizing[tokenizing.length - 1].split('-');
    let adjustedSlug = tokenizingHyphens.join(' ');
    // let adjustSlug = '';
    // let regEx = /[A-Z]|[a-z]/
    // let adjustSlug = slug_name.match(regEx)
    // console.log(adjustSlug , 'adjust!!', tokenizing, tokenizingHyphens)
    // console.log(slug_name, newsItem, 'what what!!')

    useEffect(() => console.log(newsItem, 'what what!!'), [])

    let handleHover = () => setHovered(!hovered)

    let handleClicked = () => setClicked(!clicked)

    let adjustContentCreatorName = byline.split('BY')[1] && (byline.split('BY')[1]).split(' ').filter(name => name).map(name => name.toLowerCase())
    adjustContentCreatorName = adjustContentCreatorName && adjustContentCreatorName.map(name => name[0].toUpperCase() + name.slice(1)).join(' ')
    // console.log(adjustContentCreatorName)
    // handleContentCreators(adjustContentCreatorName)

    // useEffect(() => byline && handleContentCreators(adjustContentCreatorName), [byline])
    useEffect(() => multimedia && byline && handleContentCreators({ name: adjustContentCreatorName, imgUrl: newsItem.multimedia[0].url }), [byline])

    // adjustedSlug && headlinesCount()

    // useEffect(() => {
    //     adjustedSlug && headlinesCount()
    // }, [])

    return (
        adjustedSlug
        &&
        <div className='news-item-wrapper' style={{ marginBottom: '4px' }} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <div id='left-side'>
                <div id='news-category' style={{ color: hovered && 'black' }}>
                    <div id='category-name'>{section} </div>
                    <div id='news-type'> - {subsection || section}</div>
                </div>
                <div id='slug-name'>#{adjustedSlug}</div>
                <div id='news-numbers' style={{ color: hovered && 'black' }}>0000 tweets</div>
            </div>
            <div id='category-settings' onClick={handleClicked}>{threeDotsSvgIcon()}</div>
            {clicked && <ShowSuggestedSettingsModal />}
        </div>
    )
}

let ShowSuggestedSettingsModal = () => {
    let options = [{icon: frownFaceSvgIcon(), option: 'Not interested in this'}, {icon: frownFaceSvgIcon(), option: 'This trend is harmful or spammy'}]
    let renderOptions = () => options.map((item, idx) => <RenderSettingsOption key={idx} item={item} />)

    return (
        <div id='show-suggested-settings-wrapper'>
            {renderOptions()}
        </div>
    )
}

let RenderSettingsOption = ({item}) => {
    return (
        <div id='settings-option-wrapper'>
            <div id='svg-icon'>{item.icon}</div>
            <div id='option-text'>{item.option}</div>
        </div>
    )
}

export default TopNewsRelaysUI;
