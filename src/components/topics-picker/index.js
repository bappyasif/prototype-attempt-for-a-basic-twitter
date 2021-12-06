import React, { useState, useEffect } from 'react'
import './style.css'

function TopicsPicker() {
    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            <CategoriesPicks />
        </div>
    )
}

let CategoriesPicks = () => {
    let [showArrow, setShowArrow] = useState(false)
    let [totalScrollAmount, setTotalScrollAmount] = useState()
    let [scrollAmount, setScrollAmount] = useState(0)

    let handleArrowVisibility = () => setShowArrow(true)
    let handleScrolls = amount => setScrollAmount(amount)

    useEffect(() => setTotalScrollAmount(document.querySelector('.category-wrapper-container').scrollWidth - 650), [])

    let handleRightArrowClick = () => {
        console.log('right arrow', totalScrollAmount, scrollAmount+200)
        handleArrowVisibility()
        // handleScrolls(scrollAmount+600 <= totalScrollAmount ? scrollAmount+600 : totalScrollAmount-scrollAmount)
        handleScrolls(scrollAmount+650 <= totalScrollAmount ? scrollAmount+650 : totalScrollAmount)
        // handleScrolls(scrollAmount+100 <= totalScrollAmount ? scrollAmount+100 : totalScrollAmount-scrollAmount)
        // scrollAmount+650 <= totalScrollAmount ? 
    }
    
    let handleLeftArrowClick = () => {
        console.log('left arrow', scrollAmount)
        handleArrowVisibility()
        // handleScrolls(scrollAmount-200 >= 0 ? scrollAmount-200 : 0)
        handleScrolls(scrollAmount-650 >= 0 ? scrollAmount-650 : 0)
    }
    
    let markup = (key, item, idx) => {
        return (
            <div className='categories-options'>
                <div className='category-name'>{key}</div>
                <div className='show-more-on-left' onClick={handleLeftArrowClick} style={{visibility: showArrow ? 'visible' : 'hidden'}}>{leftArrowSvg()}</div>
                <ShowExtraCategoriesList key={key + idx} items={item[key]} scrollingTo={scrollAmount} />
                <div className='show-more-on-right' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>
            </div>
        )
    }

    let eachCategories = categoryNames.map((item, idx) => {
        for (let key in item) {
            return item[key] && markup(key, item, idx)
        }
    })

    return (
        <div className='add-more-to-category'>
            {eachCategories}
        </div>
    )
}

let ShowExtraCategoriesList = ({ items, scrollingTo, scrollingBack }) => {
    let renderOptions = items.map(item => <div className='category-wrapper' key={item}><div className='category-name'>{item}</div><div className='svg-item'>{plusSvg()}</div></div>)
    
    // useEffect(() => document.querySelector('.category-wrapper-container').scrollLeft += scrollingTo, [scrollingTo])

    useEffect(() => document.querySelector('.category-wrapper-container').scrollLeft = scrollingTo, [scrollingTo])

    // useEffect(() => document.querySelector('.category-wrapper-container').scrollBy((document.querySelector('.category-wrapper-container').scrollLeft += scrollingTo ), 0), [scrollingTo])

    // console.log(scrollingTo, '??')

    // useEffect(() => console.log(document.querySelector('.category-wrapper-container').scrollWidth), [scrollingTo])
    
    return <div className='category-wrapper-container'>
        {renderOptions}
    </div>
}

let AllCategories = () => {
    let [showMore, setShowMore] = useState()
    let handleShowMore = (items) => setShowMore(items)

    useEffect(() => {
        setShowMore(6)
    }, [])

    let handleClick = () => handleShowMore(showMore + 6)

    let renderCategories = categoriesList.map((category, idx) => idx < showMore && <CategoryCard key={category.name} item={category.name} />)
    return (
        <div id='container-for-all-categories'>
            <header>Categories</header>
            <div id='categories-wrapper'>{renderCategories}</div>
            <div onClick={handleClick} id='more-cards' style={{ display: showMore >= categoriesList.length && 'none' }}>Show more</div>
        </div>
    )
}

let CategoryCard = ({ item, handleShowMore }) => {
    return (
        <div className='category-card'>
            <div className='category-name'>{item}</div>
        </div>
    )
}

let categoriesList = [
    { name: 'Fashion & beauty' }, { name: 'Outdoors' }, { name: 'Arts & culture' }, { name: 'Anime & manga' }, { name: 'Business & finance' },
    { name: 'Food' }, { name: 'Travel' }, { name: 'Entertainment' }, { name: 'Music' }, { name: 'Gaming' }, { name: 'Careers' }, { name: 'Home & family' },
    { name: 'Fitness' }, { name: 'Sports' }, { name: 'Technology' }, { name: 'Science' }
]

let plusSvg = () => <svg width='24px' height='24px'><g><path d="M19.75 11H13V4.25c0-.553-.447-1-1-1s-1 .447-1 1V11H4.25c-.553 0-1 .447-1 1s.447 1 1 1H11v6.75c0 .553.447 1 1 1s1-.447 1-1V13h6.75c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

let rightArrowSvg = () => <svg><g><path d="M19.707 11.293l-6-6c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L16.586 11H4c-.553 0-1 .447-1 1s.447 1 1 1h12.586l-4.293 4.293c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l6-6c.39-.39.39-1.023 0-1.414z"></path></g></svg>

let leftArrowSvg = () => <svg><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

let categoryNames = [
    { 'Fashion & beauty': ['Fashion business', 'Beauty', "Men's style", "Fashion models", 'Jewelry', 'Shoes', 'Gigi hadid', 'Adidas', 'Jeffree star', 'Beauty influencers', 'Fashion', 'Tattoos', 'Makeup', 'Sneakers', 'Shopping', 'PUMA', 'Streetwear', "Women's style", 'Barbara palvin', 'SNKRS', 'Skin care', 'Watches', 'Everyday style', 'Hair care', 'Athletic apparel', 'Handbags', 'Nike', 'Fashion magazines', 'Perfumes & fragrances', 'James charles'] },
    { 'Outdoors': ['Nature', 'Dogs', 'Horses', 'Cats', 'Sailing', 'Sharks', 'Reptiles', 'Beach life', 'Otters', 'Orangutans', 'Environmentalism', 'Birdwatching', 'Fishing', 'Rock climbing', 'Surfing', 'Rabbits', 'Hiking', 'Outdoor brands', 'Mountain biking', 'Scuba diving', 'National parks', 'Pets', 'Animals', 'Dinosaurs', 'Marine life', 'Camping', 'Mountain climbing', 'RVing', 'Gorillas'] }
]

export default TopicsPicker
