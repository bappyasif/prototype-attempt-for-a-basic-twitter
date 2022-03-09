import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { frownFaceSvgIcon, threeDotsSvgIcon } from '..';
import { removeItemFromArrayByTitle, ShowSettingsModal } from '../../../reuseable-components';

function TopNewsRelaysUI({ newsCategory, showDouble, handleContentCreators, handleExplicitTrendSearchText }) {
    let [newsData, setNewsData] = useState(null)

    let [removedNewsListTitles, setRemovedNewsListTitles] = useState([])

    let [radnomIdx, setRandomIdx] = useState(null)

    let handleRemovedNewsList = title => setRemovedNewsListTitles(prevList => prevList.concat(title))

    useEffect(() => removedNewsListTitles.length && removeItemFromArrayByTitle(newsData, removedNewsListTitles, setNewsData), [removedNewsListTitles])

    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'

    // let url = `https://api.nytimes.com/svc/news/v3/content/nyt/world.json?api-key=${apik}`

    let url = `https://api.nytimes.com/svc/news/v3/content/nyt/${newsCategory}.json?api-key=${apik}`

    useEffect(() => {
        let handle = setTimeout(() => {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data, 'response!!')
                setNewsData(data.results)
            })
            .catch(err => console.log('call failed', err.code, err.message))
        }, 1001)

        return () => clearTimeout(handle)

    }, [newsCategory])

    useEffect(() => newsData && setRandomIdx(Math.floor(Math.random() * newsData.length)), [newsData])

    let renderNews = () => {
        return (
            showDouble
                ?
                newsData && newsData.map((item, idx) => (idx == radnomIdx) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} handleContentCreators={handleContentCreators} handleRemovedNewsList={handleRemovedNewsList} handleExplicitTrendSearchText={handleExplicitTrendSearchText} />)
                :
                newsData && newsData.map((item, idx) => (idx < 2) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} handleContentCreators={handleContentCreators} handleRemovedNewsList={handleRemovedNewsList} handleExplicitTrendSearchText={handleExplicitTrendSearchText} />)
        )
    }

    return (
        <div id='top-news-relays-container'>
            {renderNews()}
        </div>
    )
}

let ShowNewsReelHeadlines = ({ newsItem, handleContentCreators, handleRemovedNewsList, handleExplicitTrendSearchText }) => {
    let [hovered, setHovered] = useState(false)
    let [clicked, setClicked] = useState(false)
    let [showModal, setShowModal] = useState(false)
    let history = useHistory(null)

    let { slug_name, subsection, section, byline, multimedia } = { ...newsItem };
    let tokenizing = slug_name.split(/[0-9]/);
    let tokenizingHyphens = tokenizing[tokenizing.length - 1].split('-');
    let adjustedSlug = tokenizingHyphens.join(' ');

    let removedNewsFromList = () => handleRemovedNewsList(newsItem.title)

    let handleHover = () => setHovered(!hovered)

    let handleClicked = () => {
        setClicked(!clicked)
        setShowModal(true)
    }

    let handleClick = () => {
        adjustedSlug && handleExplicitTrendSearchText(adjustedSlug)
        adjustedSlug && history.push('/explicit_trends/')
    }

    let adjustContentCreatorName = byline.split('BY')[1] && (byline.split('BY')[1]).split(' ').filter(name => name).map(name => name.toLowerCase())
    
    adjustContentCreatorName = adjustContentCreatorName && adjustContentCreatorName.map(name => name[0].toUpperCase() + name.slice(1)).join(' ')

    useEffect(() => multimedia && byline && handleContentCreators({ name: adjustContentCreatorName, imgUrl: newsItem.multimedia[0].url }), [byline])

    let options = [{ icon: frownFaceSvgIcon(), option: 'Not interested in this' }, { icon: frownFaceSvgIcon(), option: 'This trend is harmful or spammy' }]

    return (
        adjustedSlug
        &&
        <div className='news-item-wrapper' style={{ marginBottom: '4px' }} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <div id='left-side' onClick={handleClick}>
                <div id='news-category' style={{ color: hovered && 'black' }}>
                    <div id='category-name'>{section} </div>
                    <div id='news-type'> - {subsection || section}</div>
                </div>
                <div id='slug-name'>#{adjustedSlug}</div>
                <div id='news-numbers' style={{ color: hovered && 'black' }}>0000 tweets</div>
            </div>
            <div id='category-settings' onClick={handleClicked}>{threeDotsSvgIcon()}</div>
            {clicked && showModal && <ShowSettingsModal handleCloseModal={setShowModal} removedNewsFromList={removedNewsFromList} options={options} announcementText={'Thanks, page will take this out from your trends list'} />}
        </div>
    )
}

export default TopNewsRelaysUI;