import React, { useState, useEffect, useRef } from 'react'
import './style.css'

function TopicsPicker() {
    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            {/* <CategoriesPicks /> */}
            {<AddMoreToCategories />}
        </div>
    )
}

let AddMoreToCategories = () => {
    let renderEachAvailableCategory = categoryNames.map(category => {
        for (let key in category) {
            return <RenderSubcategories key={key} name={key} items={category[key]}/>
        }
    })
    return <div className='category-wrapper-container'>{renderEachAvailableCategory}</div>
}

let RenderSubcategories = ({ name, items, classExtension }) => {
    let [showArrowJustOnce, setShowArrowJustOnce] = useState(false)
    let [totalScrollAmount, setTotalScrollAmount] = useState()
    let [scrollAmount, setScrollAmount] = useState(0)
    let [showBoth, setShowBoth] = useState(false)
    let ref = useRef();

    let handleScrollsWithRef = amount => {
        setScrollAmount(ref.current.scrollLeft = amount)
    }

    useEffect(() => setTotalScrollAmount(document.querySelector('.subcategories-container')?.scrollWidth - 650), [])

    let handleRightArrowClick = () => {
        handleScrollsWithRef(scrollAmount + 650 <= totalScrollAmount ? scrollAmount + 650 : totalScrollAmount)
    }

    let handleLeftArrowClick = () => {
        handleScrollsWithRef(scrollAmount - 650 >= 0 ? scrollAmount - 650 : 0)
    }

    useEffect(() => {
        scrollAmount && setShowBoth(true)
        scrollAmount == totalScrollAmount &&  setShowArrowJustOnce(false)
    }, [scrollAmount])

    let handleMouseOnEnter = () => {
        // console.log(evt.target)
        scrollAmount && setShowBoth(true)
        // !scrollAmount && setShowArrowJustOnce(true)
        !scrollAmount && setShowArrowJustOnce(true)
    }

    let handleMouseOnLeave = () => {
        setShowBoth(false)
        !scrollAmount && setShowArrowJustOnce(false)
        scrollAmount == totalScrollAmount && setShowArrowJustOnce(false)
    }

    // console.log(ref.current, name, name.split(' ').join(''))

    console.log(showArrowJustOnce, ':once:', showBoth, ':both:')

    let renderSubcategories = items.map(item => <RenderCategoryAsItems key={item} item={item} />)
    return (
        <div className='categories-options' id={name.split(' ').join('')} style={{scrollBehavior: 'smooth'}} onMouseEnter={handleMouseOnEnter} onMouseLeave={handleMouseOnLeave}>
            <div className='category-title'>{name}</div>
            
            {showBoth && <div id='hovered-left' className='highlight-both-arrow-svg' onClick={handleLeftArrowClick} style={{ visibility: scrollAmount ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>}
            
            <div className='subcategories-container' ref={ref}>{renderSubcategories}</div>
            
            {showArrowJustOnce && !showBoth && !scrollAmount && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>}
            
            {showBoth && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick} style={{visibility: (scrollAmount < totalScrollAmount)? 'visible' : 'hidden' }}>{rightArrowSvg()}</div>}
        </div>
    )
}

let RenderCategoryAsItems = ({ item }) => {
    let [checked, setChecked] = useState(false)
    
    let markUp;

    let handleClick = () => setChecked(!checked)

    checked
    ?
    markUp = <div className='category-wrapper' onClick={handleClick} style={{backgroundColor: 'rgb(29, 155, 240)'}}><div className='category-name'>{item}</div><div className='svg-item' style={{fill: 'white'}}>{checkMarkSvg()}</div></div>
    :
    markUp = <div className='category-wrapper' onClick={handleClick}><div className='category-name'>{item}</div><div className='svg-item'>{plusSvg()}</div></div>

    // let markup = <div className='category-wrapper'><div className='category-name'>{item}</div><div className='svg-item'>{plusSvg()}</div></div>
    
    return markUp;
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

let checkMarkSvg = () => <svg width='24px' height='24px'><g><path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path></g></svg>

let categoryNames = [
    { 'Fashion & beauty': ['Fashion business', 'Beauty', "Men's style", "Fashion models", 'Jewelry', 'Shoes', 'Gigi hadid', 'Adidas', 'Jeffree star', 'Beauty influencers', 'Fashion', 'Tattoos', 'Makeup', 'Sneakers', 'Shopping', 'PUMA', 'Streetwear', "Women's style", 'Barbara palvin', 'SNKRS', 'Skin care', 'Watches', 'Everyday style', 'Hair care', 'Athletic apparel', 'Handbags', 'Nike', 'Fashion magazines', 'Perfumes & fragrances', 'James charles'] },
    { 'Outdoors': ['Nature', 'Dogs', 'Horses', 'Cats', 'Sailing', 'Sharks', 'Reptiles', 'Beach life', 'Otters', 'Orangutans', 'Environmentalism', 'Birdwatching', 'Fishing', 'Rock climbing', 'Surfing', 'Rabbits', 'Hiking', 'Outdoor brands', 'Mountain biking', 'Scuba diving', 'National parks', 'Pets', 'Animals', 'Dinosaurs', 'Marine life', 'Camping', 'Mountain climbing', 'RVing', 'Gorillas'] }
]

export default TopicsPicker


/**
 * 
 * 
 let RenderSubcategories = ({ name, items, classExtension }) => {
    let [showArrow, setShowArrow] = useState(false)
    let [showArrowJustOnce, setShowArrowJustOnce] = useState(false)
    let [totalScrollAmount, setTotalScrollAmount] = useState()
    let [scrollAmount, setScrollAmount] = useState(0)
    let [showBoth, setShowBoth] = useState(false)
    let ref = useRef();

    // let handleArrowVisibility = () => setShowArrow(true)
    // let handleScrolls = amount => setScrollAmount(amount)

    let handleScrollsWithRef = amount => {
        // ref.current.scrollLeft += amount;
        setScrollAmount(ref.current.scrollLeft = amount)
    }

    useEffect(() => setTotalScrollAmount(document.querySelector('.subcategories-container')?.scrollWidth - 650), [])

    // useEffect(() => document.querySelector('.subcategories-container').scrollLeft = scrollAmount, [scrollAmount])

    let handleRightArrowClick = () => {
        // console.log('right arrow', totalScrollAmount, scrollAmount + 650, scrollAmount)
        // handleArrowVisibility()
        // handleScrolls(scrollAmount + 650 <= totalScrollAmount ? scrollAmount + 650 : totalScrollAmount)
        handleScrollsWithRef(scrollAmount + 650 <= totalScrollAmount ? scrollAmount + 650 : totalScrollAmount)
    }

    let handleLeftArrowClick = () => {
        // console.log('left arrow', scrollAmount, showBoth)
        // handleArrowVisibility()
        // scrollAmount >= 650 && handleArrowVisibility()
        // handleScrolls(scrollAmount - 650 >= 0 ? scrollAmount - 650 : 0)
        handleScrollsWithRef(scrollAmount - 650 >= 0 ? scrollAmount - 650 : 0)
    }

    let handleMouseOnEnter = () => {
        // console.log('mouse enter')
        scrollAmount && setShowBoth(true)
        // setShowBoth(true)
        !scrollAmount && setShowArrowJustOnce(true)
    }

    let handleMouseOnLeave = () => {
        // console.log('mouse leave')
        setShowBoth(false)
        !scrollAmount && setShowArrowJustOnce(false)
    }

    let renderSubcategories = items.map(item => <RenderCategoryAsItems key={item} item={item} />)
    return (
        <div className='categories-options' style={{scrollBehavior: 'smooth'}} onMouseEnter={handleMouseOnEnter} onMouseLeave={handleMouseOnLeave}>
            <div className='category-name'>{name}</div>
            {/* <div className='show-more-on-left' onClick={handleLeftArrowClick} style={{ visibility: showArrow ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div> *}
            
            {/* {!showBoth && <div className='show-more-on-left' onClick={handleLeftArrowClick} style={{ visibility: showArrow && scrollAmount ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>} *}
            {/* {showBoth && <div id='hovered-left' className='highlight-both-arrow-svg' onClick={handleLeftArrowClick} style={{ visibility: showArrow && scrollAmount ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>} *}
            {showBoth && <div id='hovered-left' className='highlight-both-arrow-svg' onClick={handleLeftArrowClick} style={{ visibility: scrollAmount ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>}
            {/* {showBoth && <div id='hovered-left' className='highlight-both-arrow-svg' onClick={handleLeftArrowClick} style={{ visibility: showArrow && (scrollAmount <= totalScrollAmount) ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>} *}
            
            {/* <div className='show-more-on-left' onClick={handleLeftArrowClick} style={{ visibility: (showArrow || showBoth) ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div> *}
            {/* <div className={'show-more-on-left'+' '+showBoth && 'highlight-both-arrow-svg'} onClick={handleLeftArrowClick} style={{ visibility: showArrow ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div> *}
            
            <div className='subcategories-container' ref={ref}>{renderSubcategories}</div>
            {/* <div className={'subcategories-container-'+classExtension}>{renderSubcategories}</div> *}
            {/* <div className='show-more-on-right' onClick={handleRightArrowClick}>{rightArrowSvg()}</div> *}
            
            {/* {!showBoth && !scrollAmount && <div className='show-more-on-right' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>} *}
            {/* {!showBoth && <div className='show-more-on-right' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>} *}
            {showArrowJustOnce && !showBoth && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>}
            {/* {showBoth && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>} *}
            {showBoth && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick} style={{visibility: (scrollAmount < totalScrollAmount)? 'visible' : 'hidden' }}>{rightArrowSvg()}</div>}
            {/* <div className={'show-more-on-right'+' '+showBoth && 'highlight-both-arrow-svg'} onClick={handleRightArrowClick}>{rightArrowSvg()}</div> *}
        </div>
    )
}
 * 
 * 
 let CategoriesPicks = () => {
    let [showArrow, setShowArrow] = useState(false)
    let [totalScrollAmount, setTotalScrollAmount] = useState()
    let [scrollAmount, setScrollAmount] = useState(0)

    let handleArrowVisibility = () => setShowArrow(true)
    let handleScrolls = amount => setScrollAmount(amount)

    useEffect(() => setTotalScrollAmount(document.querySelector('.category-wrapper-container').scrollWidth - 650), [])

    let handleRightArrowClick = () => {
        console.log('right arrow', totalScrollAmount, scrollAmount + 200)
        handleArrowVisibility()
        handleScrolls(scrollAmount + 650 <= totalScrollAmount ? scrollAmount + 650 : totalScrollAmount)
    }

    let handleLeftArrowClick = () => {
        console.log('left arrow', scrollAmount)
        handleArrowVisibility()
        handleScrolls(scrollAmount - 650 >= 0 ? scrollAmount - 650 : 0)
    }

    let markup = (key, item, idx) => {
        return (
            <div className='categories-options'>
                <div className='category-name'>{key}</div>
                <div className='show-more-on-left' onClick={handleLeftArrowClick} style={{ visibility: showArrow ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>
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

let ShowExtraCategoriesList = ({ items, scrollingTo }) => {
    let renderOptions = items.map(item => <div className='category-wrapper' key={item}><div className='category-name'>{item}</div><div className='svg-item'>{plusSvg()}</div></div>)

    useEffect(() => document.querySelector('.category-wrapper-container').scrollLeft = scrollingTo, [scrollingTo])

    return <div className='category-wrapper-container'>
        {renderOptions}
    </div>
}
 */