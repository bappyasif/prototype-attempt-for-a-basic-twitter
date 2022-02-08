import React, { useEffect, useState, useRef } from 'react';
import { frownFaceSvgIcon, threeDotsSvgIcon } from '..';
import useOnClickOutside from '../../click-outside-utility-hook/useOnClickOutside';

function TopNewsRelaysUI({ newsCategory, showDouble, handleContentCreators }) {
    let [newsData, setNewsData] = useState(null)

    let [removedNewsListTitles, setRemovedNewsListTitles] = useState([])

    let handleRemovedNewsList = title => setRemovedNewsListTitles(prevList => prevList.concat(title))

    let handleRemovedNewsFromList = () => {
        let newList = newsData.map(item => {
            let check = removedNewsListTitles.findIndex(title => item.title == title)
            return check == -1 && item
            // return removedNewsListTitles.map(title => item.title != title && item)
        }).filter(item => item)
        // console.log(newList, 'different?!', newsData, removedNewsListTitles)
        setNewsData(newList)
    }

    useEffect(() => removedNewsListTitles.length && handleRemovedNewsFromList(), [removedNewsListTitles])

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
                newsData && newsData.map((item, idx) => (idx == 0) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} handleContentCreators={handleContentCreators} handleRemovedNewsList={handleRemovedNewsList} />)
                :
                newsData && newsData.map((item, idx) => (idx < 2) && <ShowNewsReelHeadlines key={item.slug_name} newsItem={item} handleContentCreators={handleContentCreators} handleRemovedNewsList={handleRemovedNewsList} />)
        )
    }
    // console.log(rndNum, 'rndNum!!')

    return (
        <div id='top-news-relays-container'>
            {renderNews()}
        </div>
    )
}

let ShowNewsReelHeadlines = ({ newsItem, handleContentCreators, handleRemovedNewsList }) => {
    let [hovered, setHovered] = useState(false)
    let [clicked, setClicked] = useState(false)
    let [showModal, setShowModal] = useState(false)

    let { slug_name, subsection, section, byline, multimedia } = { ...newsItem };
    let tokenizing = slug_name.split(/[0-9]/);
    let tokenizingHyphens = tokenizing[tokenizing.length - 1].split('-');
    let adjustedSlug = tokenizingHyphens.join(' ');

    useEffect(() => console.log(newsItem, 'what what!!'), [])

    let removedNewsFromList = () => handleRemovedNewsList(newsItem.title)

    let handleHover = () => setHovered(!hovered)

    let handleClicked = () => {
        setClicked(!clicked)
        setShowModal(true)
    }

    let adjustContentCreatorName = byline.split('BY')[1] && (byline.split('BY')[1]).split(' ').filter(name => name).map(name => name.toLowerCase())
    adjustContentCreatorName = adjustContentCreatorName && adjustContentCreatorName.map(name => name[0].toUpperCase() + name.slice(1)).join(' ')

    useEffect(() => multimedia && byline && handleContentCreators({ name: adjustContentCreatorName, imgUrl: newsItem.multimedia[0].url }), [byline])

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
            {/* <div id='category-settings' onClick={() => setClicked(true)}>{threeDotsSvgIcon()}</div> */}
            {clicked && showModal && <ShowSuggestedSettingsModal handleClicked={setShowModal} removedNewsFromList={removedNewsFromList} />}
        </div>
    )
}

let ShowSuggestedSettingsModal = ({handleClicked, removedNewsFromList}) => {
    let [announcement, setAnnouncement] = useState(null)
    let handleClick = () => {
        setAnnouncement('Thanks, page will take this out from your trends list')
        let handle = setTimeout(() => {
            setAnnouncement('')
            removedNewsFromList()
        }, 4000)
        return () => clearTimeout(handle)
    }

    let ref = useRef(null)
    useOnClickOutside(ref, () => handleClicked(false))
    // useOnClickOutside(ref, handleClicked)

    let options = [{icon: frownFaceSvgIcon(), option: 'Not interested in this'}, {icon: frownFaceSvgIcon(), option: 'This trend is harmful or spammy'}]
    let renderOptions = () => options.map((item, idx) => <RenderSettingsOption key={idx} item={item} removedNewsFromList={handleClick} />)

    return (
        announcement
        ?
        <div id='show-suggested-settings-wrapper'>
            <div id='announcement-text'>{announcement}</div> 
        </div>
        :
        <div id='show-suggested-settings-wrapper' ref={ref}>
            {renderOptions()}
        </div>
    )
}

export let RenderSettingsOption = ({item, removedNewsFromList}) => {
    return (
        <div className='settings-option-wrapper' onClick={removedNewsFromList}>
            <div id='svg-icon'>{item.icon}</div>
            <div id='option-text'>{item.option}</div>
        </div>
    )
}

export default TopNewsRelaysUI;
