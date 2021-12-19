import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { categoryNames, checkMarkSvg, leftArrowSvg, plusSvg, rightArrowSvg } from '../../topics-picker'
import './styles.css'

function TopicsPickerInTimeline() {
    let [allCategories, setAllCategories] = useState(refineCategoryNames())
    let [totalScroll, setTotalScroll] = useState(0)
    let [currentScroll, setCurrentScroll] = useState(0)
    let [hovered, setHovered] = useState(false)
    let scrollRef = useRef()

    useEffect(() => {
        let scrollElement = document.querySelector('#scrolling-part');
        // getting entire scrolling width and deducting current visible width from it for smooth scrolling
        setTotalScroll(scrollElement.scrollWidth - 560)
    }, [])

    let handleScroll = () => scrollRef.current.scrollLeft = currentScroll

    // on each scroll update, we are making scroll to perform that value on scroller
    useEffect(() => handleScroll(), [currentScroll])

    // adjusting scroll boundaries in respect to total scroll, clockwise
    let adjustScrollFromLeftToRight = () => {
        setCurrentScroll(currentScroll + 560 <= totalScroll ? currentScroll + 560 : totalScroll)
        // handleOnMouseOut()
    }

    // adjusting scroll boundaries in respect to total scroll, anti-clockwise
    let adjustScrollFromRightToLeft = () => {
        setCurrentScroll(currentScroll - 560 >= 0 ? currentScroll - 560 : 0)
        // handleOnMouseOut()
    }

    let handleOnMouseIn = () => setHovered(true)

    let handleOnMouseOut = () => setHovered(false)

    // console.log(hovered, 'hovered')


    let renderAllCategories = allCategories && allCategories.map(name => <RenderAllCategories key={name} name={name} />)

    return (
        <div id='topics-picker-container-in-time-line'>
            <div id='headings-part'>
                <div id='title-text'>Expand your timeline with Topics</div>
                <div id='title-subtext'>You'll see top Tweets about these right in your Home timeline.</div>
            </div>

            <div id='mid-part'>
                <div id='scrolling-part' ref={scrollRef} onMouseEnter={handleOnMouseIn} onMouseLeave={handleOnMouseOut}>{renderAllCategories}</div>
                <div className={`left-arrow ${hovered ? 'highlight-both' : ''}`} onMouseEnter={handleOnMouseIn} onMouseLeave={handleOnMouseOut} onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0) ? 'none' : hovered ? 'block' : !hovered && 'none' }}>{leftArrowSvg()}</div>
                <div className={`right-arrow ${hovered ? 'highlight-both' : ''}`} onMouseEnter={handleOnMouseIn} onMouseLeave={handleOnMouseOut} onClick={adjustScrollFromLeftToRight} style={{ display: currentScroll == totalScroll ? 'none' : hovered ? 'block' : !hovered && 'none' }}>{rightArrowSvg()}</div>
            </div>

            {/* <Link id='more-topics' to={'/i/topics/picker/home'}>More Topics</Link> */}

            <Link id='more-topics' to={'/i/topics/picker/home'}>
                <div id='link-text'>More Topics</div>
            </Link>

            {/* <div id='bottom-part'>
                <Link id='heading-text' to={'/i/topics/picker/home'}>More Topics</Link>
            </div> */}
        </div>
    )
}

let RenderAllCategories = ({ name }) => {
    let [clicked, setClicked] = useState(false)
    let handleClicked = () => setClicked(!clicked)
    return (
        <div className='category-container' style={{ backgroundColor: clicked && 'rgba(29, 155, 240, 1)' }}>
            <div className='left-side' onClick={handleClicked}>
                <div className='category-name' style={{ textAlign: 'left' }}>{name}</div>
                <div className='plus-svg' style={{ transform: 'scale(.8)', display: clicked && 'none' }}>{plusSvg()}</div>
            </div>
            <div className='right-side'>
                {!clicked && <div className='remove-svg' style={{ transform: 'scale(.8)' }}>{removeSvg()}</div>}
                {clicked && <div className='check-mark-svg' style={{ transform: 'scale(.8)' }} onClick={handleClicked}>{checkMarkSvg()}</div>}
            </div>
        </div>
    )
}

let refineCategoryNames = () => {
    let allCategories = []
    categoryNames.forEach(item => {
        for (let key in item) {
            // let affinityTest = item[key].split(' ')
            // if(affinityTest.length <= 2) allCategories = allCategories.concat(item[key])
            allCategories = allCategories.concat(item[key])
        }
    })
    let refined = []
    allCategories.forEach(name => {
        let alreadyExist = refined.findIndex(category => category == name)
        // if (alreadyExist == -1) refined.push(name)
        if (alreadyExist == -1) {
            let affinityTest = name.split(' ')
            if (affinityTest.length <= 2) refined.push(name)
        }
    })
    // console.log(allCategories, 'all categories', new Set(allCategories), refined)
    return refined
}

let removeSvg = () => <svg width={24} height={24}><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default TopicsPickerInTimeline


/**
 * 
 * 
 function TopicsPickerInTimeline() {
    let [allCategories, setAllCategories] = useState(refineCategoryNames())
    let [totalScroll, setTotalScroll] = useState(0)
    let [currentScroll, setCurrentScroll] = useState(0)
    let [hovered, setHovered] = useState(false)
    let [showBoth, setShowBoth] = useState(false)
    let scrollRef = useRef()

    useEffect(() => {
        let scrollElement = document.querySelector('#scrolling-part');
        // getting entire scrolling width and deducting current visible width from it for smooth scrolling
        setTotalScroll(scrollElement.scrollWidth - 560)
    }, [])

    // let handleMouseOver = () => setHovered(!hovered)

    // totalScroll && console.log(totalScroll, 'total scroll amount')

    let handleScroll = () => scrollRef.current.scrollLeft = currentScroll

    useEffect(() => handleScroll(), [currentScroll])
    // useEffect(() => {
    //     handleScroll();
    //     currentScroll && setShowBoth(true)
    // }, [currentScroll])

    let adjustScrollFromLeftToRight = () => {
        setCurrentScroll(currentScroll + 560 <= totalScroll ? currentScroll + 560 : totalScroll)
        // handleOnMouseOut()
    }

    let adjustScrollFromRightToLeft = () => {
        setCurrentScroll(currentScroll - 560 >= 0 ? currentScroll - 560 : 0)
        // handleOnMouseOut()
    }

    // useEffect(() => refineCategoryNames(), [])
    // refineCategoryNames();
    // allCategories && console.log(allCategories, '?!')

    // currentScroll &&  console.log(currentScroll, totalScroll)

    let handleOnMouseIn = () => setHovered(true)

    let handleOnMouseOut = () => setHovered(false)

    console.log(hovered, 'hovered')


    let renderAllCategories = allCategories && allCategories.map(name => <RenderAllCategories key={name} name={name} />)

    return (
        <div id='topics-picker-container-in-time-line'>
            <div id='headings-part'>
                <div id='title-text'>Expand your timeline with Topics</div>
                <div id='title-subtext'>You'll see top Tweets about these right in your Home timeline.</div>
            </div>
            {/* <div id='scrolling-part' ref={scrollRef} onMouseEnter={handleOnMouseIn} onMouseLeave={handleOnMouseOut}>{renderAllCategories}</div> *}
            {/* <div id='scrolling-part' ref={scrollRef}>{renderAllCategories}</div> *}

            <div id='scrolling-part' ref={scrollRef} onMouseEnter={handleOnMouseIn}>{renderAllCategories}</div>
            <div className={`left-arrow ${hovered ? 'highlight-both' : ''}`} onMouseEnter={handleOnMouseIn} onMouseLeave={handleOnMouseOut}  onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0) ? 'none' : hovered ? 'block' : !hovered && 'none'}}>{leftArrowSvg()}</div>
            <div className={`right-arrow ${hovered ? 'highlight-both' : ''}`} onMouseEnter={handleOnMouseIn} onMouseLeave={handleOnMouseOut} onClick={adjustScrollFromLeftToRight} style={{ display: currentScroll == totalScroll ? 'none' : hovered ? 'block' : !hovered && 'none'}}>{rightArrowSvg()}</div>

            {/* <div className={`left-arrow ${hovered ? 'highlight-both' : ''}`}  onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0) && 'none', fill: hovered && 'white' }}>{leftArrowSvg()}</div>
            <div className={`right-arrow ${hovered ? 'highlight-both' : ''}`} onClick={adjustScrollFromLeftToRight} style={{ display: currentScroll == totalScroll && 'none', fill: hovered && 'white' }}>{rightArrowSvg()}</div> *}

            {/* <div className={`left-arrow ${hovered ? 'highlight-both' : ''}`} onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0) && 'none', background: hovered && 'silver' }}>{leftArrowSvg()}</div>
            <div className={`right-arrow ${hovered ? 'highlight-both' : ''}`} onClick={adjustScrollFromLeftToRight} style={{ display: currentScroll == totalScroll && 'none', background: hovered && 'silver' }}>{rightArrowSvg()}</div> *}

            {/* <div className={`left-arrow`} onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0) && 'none', background: hovered && 'silver' }}>{leftArrowSvg()}</div>
            <div className={`right-arrow`} onClick={adjustScrollFromLeftToRight} style={{ display: currentScroll == totalScroll && 'none', background: hovered && 'silver' }}>{rightArrowSvg()}</div> *}

            {/* <div className={`left-arrow`} onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0 || (currentScroll && !hovered)) && 'none' }}>{leftArrowSvg()}</div>
            <div className={`right-arrow`} onClick={adjustScrollFromLeftToRight} style={{ display: currentScroll == totalScroll && 'none' }}>{rightArrowSvg()}</div> *}


            {/* <div className='left-arrow' onClick={adjustScrollFromRightToLeft} onMouseOver={handleMouseOver} style={{ display: currentScroll == 0 ? 'none' : hovered || currentScroll ? 'block' : 'none' }}>{leftArrowSvg()}</div> *}
            {/* <div className='left-arrow' onClick={adjustScrollFromRightToLeft} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOver} style={{ display: currentScroll == 0 && 'none' }}>{leftArrowSvg()}</div> *}
            {/* <div className={`left-arrow ${hovered ? 'highlight-both' : ''}`} onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0 && !hovered) ? 'none' : (currentScroll && hovered) ? 'block' : 'none' }}>{leftArrowSvg()}</div> *}
            {/* <div className='left-arrow' onClick={adjustScrollFromRightToLeft} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOver} style={{ display: currentScroll == 0 ? 'none' : hovered && 'block' }}>{leftArrowSvg()}</div> *}
            {/* <div className='right-arrow' onClick={adjustScrollFromLeftToRight} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOver} style={{ display: currentScroll == totalScroll && 'none' }}>{rightArrowSvg()}</div> *}
            {/* <div className={`left-arrow`} onClick={adjustScrollFromRightToLeft} style={{ display: (currentScroll == 0 && !hovered) ? 'none' : (hovered) ? 'block' : 'none' }}>{leftArrowSvg()}</div>
            <div className={`right-arrow`} onClick={adjustScrollFromLeftToRight} style={{ display: (currentScroll == totalScroll && !hovered) ? 'none' : (hovered) ? 'block' : 'none' }}>{rightArrowSvg()}</div> *}
            {/* <div className={`right-arrow ${hovered ? 'highlight-both' : ''}`} onClick={adjustScrollFromLeftToRight} style={{ display: (currentScroll == totalScroll && !hovered) ? 'none' : (currentScroll && hovered) ? 'block' : 'none' }}>{rightArrowSvg()}</div> *}
            {/* <div className='left-arrow' onClick={adjustScrollFromRightToLeft} style={{display: currentScroll == 0 && 'none'}}>{leftArrowSvg()}</div>
            <div className='right-arrow' onClick={adjustScrollFromLeftToRight} style={{display: currentScroll == totalScroll && 'none'}}>{rightArrowSvg()}</div> *}
        </div>
    )
}
 */