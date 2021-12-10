import React, { useState, useEffect, useRef } from 'react'
import './style.css'

function TopicsPicker() {
    let [dataset, setDataset] = useState([])
    let [distil, setDistill] = useState([])
    let [tempSame, setTempSame] = useState([])
    let [test, setTest] = useState(false)
    let [flag, setFlag] = useState(false)
    let [sanitizedData, setSanitizedData] = useState([])
    let [category, setCategory] = useState('')
    // let [category, setCategory] = useState(false)
    let handleCategory = (value) => setCategory(value)

    let handleData = (data, name) => {
        setDataset(prevData => prevData.concat(data))
        // name != category && handleCategory(category)
        handleCategory(name)
        name != category && setTest(true)
    }

    useEffect(() => {
        test && setSanitizedData(prevData => prevData.concat(tempSame))
        test && setTest(false)
        // test && console.log('how many time runs!!')
    }, [test])

    // useEffect(() => {
    //     test && setSanitizedData(distil)
    //     test && setTest(false)
    //     distil && setDistill([])
    // }, [dataset])

    useEffect(() => {
        flag && distil && console.log('distil', distil, 'set:', new Set(distil))
        // flag && distil && console.log('distil', distil, 'set:', new Set(distil).entries().next().value)
        // flag && distil && setSanitizedData(prevData => prevData.concat(distil))
        flag && distil && setSanitizedData(distil)
        // flag  && distil && setFlag(false)
        // flag && distil && setDistill([])
    }, [flag])

    useEffect(() => {
        let distilled = sanitizedData && !flag && sanitizedData.map(item => {
            for(let key in item) {
                if(key == category) {
                    console.log('found!!', category)
                    setFlag(true)
                    return tempSame
                } else {
                    return item
                }
            }
        }).filter(item=> item)
        console.log(distilled, 'distilled!!', category)
        distilled && setDistill(distilled)
        // setFlag(false)
        // distil && setSanitizedData(prevData => prevData.slice(0,0).concat(distil))
        // distil && setSanitizedData(distil)
    }, [sanitizedData])

    useEffect(() => {
        category && setTempSame(dataset.filter(item => {
            for(let key in item) {
                 if(key == category) {
                     return item
                 }
            }
        }).reverse()[0])
        // console.log(category, 'runs!!')
        flag && setFlag(false)
        distil && setDistill([])
    }, [dataset])

    // useEffect(() => tempSame && setTest(prevData => prevData.concat(tempSame)), [tempSame])

    sanitizedData && console.log(sanitizedData, 'sanitized?!', dataset, 'current category existing selection::', tempSame)

    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            {/* <CategoriesPicks /> */}
            {<AddMoreToCategories scrollBy={650} handleData={handleData} />}
        </div>
    )
}

export let AddMoreToCategories = ({ scrollBy, handleData}) => {
    // let [data, setData] = useState([]);
    // let handleData = (data) => setData(prevData=>prevData.concat(data))
    // let removeData = () => setData(prevData => prevData.slice(0, data.length-1))

    // let handleData = (data) => {
    //     // console.log(data, 'data')
    //     setData(data)
    // }
    // let removeData = (categoryID) => setData(prevData => prevData.slice(0, data.length-1))

    // data && console.log(data, 'data!!')

    let renderEachAvailableCategory = categoryNames.map(category => {
        for (let key in category) {
            // return <RenderSubcategories key={key} name={key} items={category[key]} handleData={handleData} removeData={removeData} scrollBy={scrollBy} />
            return <RenderSubcategories key={key} name={key} items={category[key]} handleData={handleData} scrollBy={scrollBy} />
        }
    })

    return <div className='category-wrapper-container' style={{ width: scrollBy + 'px' }}>{renderEachAvailableCategory}</div>
}

let RenderSubcategories = ({ name, items, handleData, removeData, scrollBy }) => {
    let [showArrowJustOnce, setShowArrowJustOnce] = useState(false)
    let [totalScrollAmount, setTotalScrollAmount] = useState()
    let [scrollAmount, setScrollAmount] = useState(0)
    let [showBoth, setShowBoth] = useState(false)
    let [currentRoute, setCurrentRoute] = useState('')
    let ref = useRef();
    let [categoryID, setCategoryID] = useState('')

    let [categorySelections, setCategorySelection] = useState([]);

    let handleSelections = (data) => {
        setCategorySelection(prevData => prevData.concat(data))
    }

    let handleRemovalOfSelectections = () => setCategorySelection(prevData => prevData.slice(0, categorySelections.length - 1))

    // useEffect(() => categorySelections.length && handleData({[categoryID]: categorySelections}), [categorySelections])
    useEffect(() => categorySelections.length && handleData({ [categoryID]: categorySelections }, categoryID), [categorySelections])
    // useEffect(() => categorySelections.length && handleData({[categoryID]: categorySelections[categorySelections.length - 1]}), [categorySelections])

    categorySelections && console.log(categorySelections, '||')

    let handleCategoryID = () => setCategoryID(name.split(' ').join(''))

    let handleScrollsWithRef = amount => {
        setScrollAmount(ref.current.scrollLeft = amount)
        // console.log()
        // setTotalScrollAmount(totalScrollAmount - amount)
    }

    // console.log(scrollBy, '??', scrollAmount, ':scrollAmount:', totalScrollAmount, ':totalScroll', currentRoute)

    // useEffect(() => categoryID != name.split(' ').join('') && console.log('DIFFERENT'))

    useEffect(() => {
        setCurrentRoute(window.location.href)
        handleCategoryID();
    }, [])

    // useEffect(() => setTotalScrollAmount(document.getElementById(name.split(' ').join('')).querySelector('.subcategories-container')?.scrollWidth - scrollBy), [currentRoute])
    useEffect(() => categoryID && setTotalScrollAmount(document.getElementById(categoryID).querySelector('.subcategories-container')?.scrollWidth - scrollBy), [currentRoute])

    // useEffect(() => {
    //     name.split(' ').join('')
    //     // console.log(document.querySelector('.categories-options').querySelector(`$${name.split(' ').join('')}`).scrollWidth)
    //     console.log(document.getElementById(name.split(' ').join('')).querySelector('.subcategories-container')?.scrollWidth - scrollBy)

    //     currentRoute == 'http://localhost:8080/i/flow/signup/'
    //     ?
    //     // alert('here!!')
    //     currentRoute && setTotalScrollAmount(document.querySelector('.subcategories-container')?.scrollWidth - scrollBy)
    //     :
    //     currentRoute && setTotalScrollAmount(document.querySelector('.subcategories-container')?.scrollWidth - scrollBy)
    // }, [currentRoute])

    let handleRightArrowClick = () => {
        handleScrollsWithRef(scrollAmount + scrollBy <= totalScrollAmount ? scrollAmount + scrollBy : totalScrollAmount);
        // handleScrollsWithRef(scrollAmount + scrollBy <= totalScrollAmount ? scrollAmount + scrollBy : totalScrollAmount - scrollAmount)
    }

    let handleLeftArrowClick = () => {
        handleScrollsWithRef(scrollAmount - scrollBy >= 0 ? scrollAmount - scrollBy : 0)
    }

    useEffect(() => {
        scrollAmount && setShowBoth(true)
        scrollAmount == totalScrollAmount && setShowArrowJustOnce(false)
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

    // console.log(showArrowJustOnce, ':once:', showBoth, ':both:')

    let renderSubcategories = items.map(item => <RenderCategoryAsItems key={item} item={item} handleData={handleSelections} removeData={handleRemovalOfSelectections} currentRoute={currentRoute} categoryID={categoryID} />)
    return (
        <div className='categories-options' id={name.split(' ').join('')} style={{ scrollBehavior: 'smooth', width: scrollBy + 'px' }} onMouseEnter={handleMouseOnEnter} onMouseLeave={handleMouseOnLeave}>
            <div className='category-title'>{name}</div>

            {showBoth && <div id='hovered-left' className='highlight-both-arrow-svg' onClick={handleLeftArrowClick} style={{ visibility: scrollAmount ? 'visible' : 'hidden' }}>{leftArrowSvg()}</div>}

            <div className='subcategories-container' ref={ref} style={{ width: scrollBy + 'px' }}>{renderSubcategories}</div>

            {showArrowJustOnce && !showBoth && !scrollAmount && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick}>{rightArrowSvg()}</div>}

            {showBoth && <div id='hovered-right' className='highlight-both-arrow-svg' onClick={handleRightArrowClick} style={{ visibility: (scrollAmount < totalScrollAmount) ? 'visible' : 'hidden' }}>{rightArrowSvg()}</div>}
        </div>
    )
}

let RenderCategoryAsItems = ({ item, handleData, removeData, currentRoute, categoryID }) => {
    let [checked, setChecked] = useState(false)
    // let [currentRoute, setCurrentRoute] = useState('')

    // useEffect(() => setCurrentRoute(window.location.href), [])

    // currentRoute && console.log('location: ', window.location.href, currentRoute, currentRoute == 'http://localhost:8080/i/flow/signup/')

    let markUp;

    let handleClick = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        // console.log(categoryID), '<>'

        // checked && handleData(item, categoryID)
        // !checked && removeData(categoryID)

        checked && handleData(item)
        !checked && removeData()
    }, [checked])

    checked
        ?
        markUp = <div className='category-wrapper' onClick={handleClick} style={{ backgroundColor: 'rgb(29, 155, 240)', width: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'auto' }}><div className='category-name'>{item}</div><div className='svg-item' style={{ fill: 'white', display: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'none' }}>{checkMarkSvg()}</div></div>
        :
        markUp = <div className='category-wrapper' onClick={handleClick} style={{ width: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'auto' }} ><div className='category-name'>{item}</div><div className='svg-item' style={{ display: currentRoute == 'http://localhost:8080/i/flow/signup/' && 'none' }}>{plusSvg()}</div></div>

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

export let categoriesList = [
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
    { 'Outdoors': ['Nature', 'Dogs', 'Horses', 'Cats', 'Sailing', 'Sharks', 'Reptiles', 'Beach life', 'Otters', 'Orangutans', 'Environmentalism', 'Birdwatching', 'Fishing', 'Rock climbing', 'Surfing', 'Rabbits', 'Hiking', 'Outdoor brands', 'Mountain biking', 'Scuba diving', 'National parks', 'Pets', 'Animals', 'Dinosaurs', 'Marine life', 'Camping', 'Mountain climbing', 'RVing', 'Gorillas'] },
    { 'Arts & culture': ['Inspirational quotes', 'Horoscope', 'Astrophotography', 'Interior design', 'Screenwriting', 'Aquarius', 'Arts & crafts', 'Taurus', 'Cancer', 'Phototgraphy', 'Books', 'Astrology', 'Scorpio', 'Popular illustrators', 'Animation', 'Art', 'Graphic design', 'Virgo', 'Pisces', 'Libra', 'Anime', 'Famous quotes', 'Comics', 'Health & wellness books', 'Gemini', 'Leo', 'Capricorn', 'Aries', 'Sci-fi & fantasy films', 'Sci-fi & fantasy'] },
    { 'Business & finance': ['Elon Mask', 'Venture capital', 'Marketing', 'Bitcoin cryptocurrency', '$BTC', '$TSLA', 'Chainlink cryptocurrency', 'Litecoin cryptocurrency', 'Dash cryptocurrency', 'Investing', 'Small business', 'Etherium cryptocurrency', 'Business personalities', 'FinTech', 'Ada cryptocurrency', 'Startups', 'Financial services', '$ETH', 'Matic Network cryptocurrency', 'Business News', 'Accounting', 'Business Media', 'Advertising', 'Telecom', 'TRON cryptocurrency', 'Ripple cryptocurrency', 'Tether cryptocurrency', 'Tim Cook', 'Non profit'] }
]

export default TopicsPicker


/**
 * 
 * 
 function TopicsPicker() {
    let [dataset, setDataset] = useState([])
    let [distil, setDistill] = useState([])
    let [tempSame, setTempSame] = useState([])
    let [test, setTest] = useState(false)
    let [flag, setFlag] = useState(false)
    let [sanitizedData, setSanitizedData] = useState([])
    let [category, setCategory] = useState('')
    // let [category, setCategory] = useState(false)
    let handleCategory = (value) => setCategory(value)

    let handleData = (data, name) => {
        setDataset(prevData => prevData.concat(data))
        // name != category && handleCategory(category)
        handleCategory(name)
        name != category && setTest(true)
    }

    // useEffect(() => {
    //     test && setSanitizedData(prevData => prevData.concat(tempSame))
    //     test && setTest(false)

    //     test && sanitizedData && sanitizedData.forEach(item => {
    //         for(let key in item) {
    //             tempSame.forEach(item2 => {
    //                 for(let key2 in item2) {
    //                     if(key == key2) {
    //                         console.log('found!!')
    //                     }
    //                 }
    //             })
    //         }
    //     })
    //     // test && console.log('how many time runs!!')
    // }, [test])

    // useEffect(() => {
    //     // distil && test && setSanitizedData(prevData => prevData.concat(distil))
    //     test && setTest(false)
    //     test && distil && console.log('how many time runs!!')
    // }, [test])

    // useEffect(() => {
    //     // distil && flag && setSanitizedData(distil)
    //     flag && setFlag(false)
    // }, [distil])

    // useEffect(() => flag && setFlag(false), [sanitizedData])

    useEffect(() => {
        test && setSanitizedData(prevData => prevData.concat(tempSame))
        test && setTest(false)
        // test && console.log('how many time runs!!')
    }, [test])

    useEffect(() => {
        let distil = sanitizedData && !flag && sanitizedData.map(item => {
            for(let key in item) {
                if(key == category) {
                    console.log('found!!', category)
                    setFlag(true)
                    return tempSame
                } else {
                    return item
                }
            }
        }).filter(item=> item)
        console.log(distil, 'distilled!!', category)
        setDistill(distil)
        // distil && setSanitizedData(prevData => prevData.slice(0,0).concat(distil))
        // distil && setSanitizedData(distil)
    }, [sanitizedData])

    // useEffect(() => {
    //     let distil = sanitizedData && !flag && sanitizedData.map(item => {
    //         for(let key in item) {
    //             if(key == category) {
    //                 console.log('found!!')
    //                 delete category[key]
    //                 setFlag(true)
    //             } else {
    //                 return item
    //             }
    //         }
    //     }).filter(item=> item)
    //     console.log(distil, 'distilled!!', category)
    //     setDistill(distil)
    //     // distil && setSanitizedData(prevData => prevData.slice(0,0).concat(distil))
    //     // distil && setSanitizedData(distil)
    // }, [sanitizedData])

    //     useEffect(() => {
    //     distil && flag && setSanitizedData(distil)
    //     distil && flag && setFlag(false)
    // }, [distil])

    // useEffect(() => {
    //     distil && flag && setSanitizedData(distil)
    //     distil && flag && console.log(false)
    // }, [distil])

    // useEffect(() => tempDifferent && setSanitizedData(prevData => prevData.concat(tempDifferent)), [tempDifferent])
    // useEffect(() => tempDifferent && setSanitizedData(prevData => prevData.concat(tempDifferent, tempSame)), [tempDifferent])

    useEffect(() => {
        category && setTempSame(dataset.filter(item => {
            for(let key in item) {
                 if(key == category) {
                     return item
                 }
            }
        }).reverse()[0])
        // console.log(category, 'runs!!')
    }, [dataset])

    // useEffect(() => tempSame && setTest(prevData => prevData.concat(tempSame)), [tempSame])

    sanitizedData && console.log(sanitizedData, 'sanitized?!', dataset, 'current category existing selection::', tempSame)

    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            {/* <CategoriesPicks /> *}
            {<AddMoreToCategories scrollBy={650} handleData={handleData} />}
        </div>
    )
}
 * 
 * 
 function TopicsPicker() {
    let [dataset, setDataset] = useState([])
    let [tempDifferent, setTempDifferent] = useState([])
    let [tempSame, setTempSame] = useState([])
    let [test, setTest] = useState([])
    let [sanitizedData, setSanitizedData] = useState([])
    let [category, setCategory] = useState('')
    // let [category, setCategory] = useState(false)
    let handleCategory = (value) => setCategory(value)

    let handleData = (data, name) => {
        setDataset(prevData => prevData.concat(data))
        // name != category && handleCategory(category)
        handleCategory(name)
        // name != category && console.log('DIFFERENT!!')
        let test;
        name != category && setTempDifferent(dataset.filter(item => {
            for(let key in item) {
                 if(key == category) {
                     return item
                 }
            }
        }).reverse()[0])
    }

    useEffect(() => tempDifferent && setSanitizedData(prevData => prevData.concat(tempDifferent)), [tempDifferent])
    // useEffect(() => tempDifferent && setSanitizedData(prevData => prevData.concat(tempDifferent, tempSame)), [tempDifferent])

    useEffect(() => {
        category && setTempSame(dataset.filter(item => {
            for(let key in item) {
                 if(key == category) {
                     return item
                 }
            }
        }).reverse()[0])
        // console.log(category, 'runs!!')
    }, [dataset])

    useEffect(() => tempSame && setTest(prevData => prevData.concat(tempSame)), [tempSame])

    sanitizedData && console.log(sanitizedData, 'sanitized?!', dataset, 'current category existing selection::', tempSame)

    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            {/* <CategoriesPicks /> *}
            {<AddMoreToCategories scrollBy={650} handleData={handleData} />}
        </div>
    )
}
 * 
 * 
 function TopicsPicker() {
    let [dataset, setDataset] = useState([])
    let [tempDifferent, setTempDifferent] = useState([])
    let [tempSame, setTempSame] = useState([])
    let [test, setTest] = useState([])
    let [sanitizedData, setSanitizedData] = useState([])
    let [category, setCategory] = useState('')
    // let [category, setCategory] = useState(false)
    let handleCategory = (value) => setCategory(value)

    let handleData = (data, name) => {
        setDataset(prevData => prevData.concat(data))
        // name != category && handleCategory(category)
        handleCategory(name)
        // name != category && console.log('DIFFERENT!!')
        let test;
        name != category && setTempDifferent(dataset.filter(item => {
            for(let key in item) {
                 if(key == category) {
                     return item
                 }
            }
        }).reverse()[0])

        // setTempSame(dataset.filter(item => {
        //     for(let key in item) {
        //          if(key == category) {
        //              return item
        //          }
        //     }
        // }).reverse()[0])

        // name == category && setTempSame(dataset.filter(item => {
        //     for(let key in item) {
        //          if(key == category) {
        //              return item
        //          }
        //     }
        // }).reverse()[0])
    }

    useEffect(() => tempDifferent && setSanitizedData(prevData => prevData.concat(tempDifferent)), [tempDifferent])

    // useEffect(() => tempSame && console.log(tempSame, 'samesies'), [tempSame])
    useEffect(() => tempSame && setTest(prevData => prevData.concat(tempSame)), [tempSame])
    
    // let handleData = (data, name) => {
    //     setDataset(prevData => prevData.concat(data))
    //     // name != category && handleCategory(category)
    //     handleCategory(name)
    //     // name != category && console.log('DIFFERENT!!')
    //     let test;
    //     name != category && console.log(dataset.filter(item => {
    //         for(let key in item) {
    //              if(key == category) {
    //                  return item
    //              }
    //         }
    //     }), 'DIFFERENT', name, category)
    // }

    // useEffect(() => {
    //     let testFilter = dataset.filter(item => {
    //         for(let key in item) {
    //              if(key == category) {
    //                  return item
    //              }
    //         }
    //     })
    //     let testDifference = dataset.filter(item => {
    //         for(let key in item) {
    //              if(key != category) {
    //                  return item
    //              }
    //         }
    //     })
    //     console.log(testFilter, 'filtered?!', testFilter[testFilter.length - 1], testDifference)
    // }, [dataset])

    sanitizedData && console.log(sanitizedData, 'sanitized?!', dataset, 'same::', tempSame)

    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            {/* <CategoriesPicks /> *}
            {<AddMoreToCategories scrollBy={650} handleData={handleData} />}
        </div>
    )
}
 * 
 * 
 function TopicsPicker() {
    let [dataset, setDataset] = useState([])
    let [sanitizedData, setSanitizedData] = useState([])
    let [category, setCategory] = useState('')
    // let [category, setCategory] = useState(false)
    let handleCategory = (value) => setCategory(value)
    
    let handleData = (data, category) => {
        setDataset(prevData => prevData.concat(data))
        handleCategory(category)
        // handleCategory(true)
    }

    // useEffect(() => {
    //     dataset && category && setDataset(prevData => {
    //         handleCategory(false);
    //         // setSanitizedData(prevState => prevState.slice(prevState.length-1))
    //         // setSanitizedData(prevData.slice(prevData.length-1))
    //         // setSanitizedData(prevState => prevState.concat(prevData.slice(prevData.length-1)))
    //         setSanitizedData(prevState => {
    //             // prevState.slice(-1)
    //             prevState.length = 0
    //             return prevState.concat(prevData.slice(prevData.length-1))
    //         })
    //         return prevData.slice(prevData.length-1)
    //     })
    //     dataset && console.log(dataset)
    //     // dataset && category && setSanitizedData(prevData=> prevData.concat(dataset))
    // }, [dataset])

    useEffect(() => {
        dataset && category && setDataset(prevData => {
            // handleCategory(false);
            handleCategory('');
            console.log('runs!!')
            return prevData.slice(prevData.length-1)
        })
        dataset && console.log(dataset)
        // dataset && category && setSanitizedData(prevData=> prevData.concat(dataset))
    }, [dataset])

    // useEffect(() => {
    //     // category && setSanitizedData(prevData => prevData.concat(dataset[dataset.length -1]))
    //     // category && setSanitizedData([]);
    //     category && setSanitizedData(dataset[dataset.length -1])
    // }, [category])



    sanitizedData && console.log(sanitizedData, 'sanitized?!')

    // useEffect(() => {
    //     // dataset.length > 1 && setDataset(prevData => prevData[prevData.length - 1])
    //     // dataset.length && category && setDataset(prevData => prevData.slice(prevData.length-1))
    //     dataset.length && category && setDataset(prevData => {
    //         handleCategory(false);
    //         return prevData.slice(prevData.length-1)
    //     })
    //     dataset && console.log(dataset)
    // }, [dataset])

    // useEffect(() => {
    //     dataset && dataset.forEach(item => {
    //         for(let key in item) {
    //             console.log(key, item, '<:<:')
    //         }
    //     })
    //     dataset && console.log(dataset)
    // }, [dataset])

    // let handleData = (data, category) => {
    //     setDataset(prevData => {
    //         prevData.forEach(item => {

    //         })
    //     })

    // let handleData = (data, category) => {
    //     setDataset(prevData => {
    //         return prevData.length
    //             ?
    //             prevData.forEach(item => {
    //                 for (let key in item) {
    //                     item[key].concat(data)
    //                     console.log(item[key], '??!!', item, category)
    //                 }
    //                 // return prevData.concat(data)
    //             })
    //             :
    //             prevData.concat(data)
    //     })
    // }
    // let handleData = (data, category) => {
    //     setDataset(prevData => prevData.concat(data))
    //     dataset.forEach(item => {
    //         for(let key in item) {
    //             console.log(item[key], '??!!', item, category)
    //         }
    //     })

    // }
    // data && console.log(data, '<<data here>>')
    return (
        <div id='container-for-topics-picker'>
            <AllCategories />
            {/* <CategoriesPicks /> *}
            {<AddMoreToCategories scrollBy={650} handleData={handleData} />}
        </div>
    )
}
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