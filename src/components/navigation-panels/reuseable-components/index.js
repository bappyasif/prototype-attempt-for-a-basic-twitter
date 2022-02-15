import React, { useEffect, useRef, useState } from "react"
import { convertingTime12Hours } from "../../user-profile/all-tweets/show-tweet-thread"
import useOnClickOutside from "../right-side/click-outside-utility-hook/useOnClickOutside"
import './styles.css'

export let RenderArticle = ({ item, fromExplore }) => {
    let [timeStamp, setTimeStamp] = useState(null)
    let [showTimeToolTip, setShowTimeToolTip] = useState(false)
    let [publishedDate, setPublishedDate] = useState(null)
    let [countdown, setCountdown] = useState(4)
    let [beginCountdown, setBeginCountdown] = useState(false)

    // useEffect(() => item && !fromExplore && getHowLongSinceThisArticleWasPosted(item, setTimeStamp, setPublishedDate), [item])
    useEffect(() => item && getHowLongSinceThisArticleWasPosted(item, setTimeStamp, setPublishedDate, fromExplore), [item])

    // console.log(item, 'articleItem')

    let beginCountdownToZero = () => {
        let handle = setTimeout(() => {
            if(countdown) {
                setCountdown(countdown - 1)
            } else {
                clearTimeout(handle)
                window.open(item.url, '_target')
                setBeginCountdown(false)
                setCountdown(4)
            }
        }, 600)
        return () => clearTimeout(handle)
    }

    // let handleClick = () => window.open(item.url, '_target')
    let handleClick = () => setBeginCountdown(true)

    let handleHover = () => setShowTimeToolTip(!showTimeToolTip)

    useEffect(() => {
        // beginCountdown && countdown > 0 && beginCountdownToZero();
        beginCountdown && beginCountdownToZero();
    }, [beginCountdown, countdown])

    return (
        <div id={item.id} className='render-article-wrapper' onClick={handleClick}>
            <div id='article-info'>
                <div id='top-section' onMouseLeave={() => setShowTimeToolTip(false)}>
                    <div id='authors-info'>
                        <div id='authors-name'>{item.byline.split('By ')[1] || 'Inhouse Newsdesk'}</div>
                        <div id='authors-handle'>@{adjustingAuthorsNames(item) || 'Inhouse Newsdesk'}</div>
                    </div>
                    <div id='article-timestamp' onMouseEnter={handleHover} onBlur={handleHover}>
                        <div id='published-time'>{publishedDate || '4h'}</div>
                        <div id='time-tooltip' style={{ display: showTimeToolTip && 'block' }}>{timeStamp || '00-00-00 99:99:99'}</div>
                    </div>
                </div>
                <div id='snippet-text'>{item.abstract || item.title}</div>
            </div>
            <img id='article-img' style={{opacity: beginCountdown && '20%', pointerEvents: beginCountdown && 'none'}} src={(item.media && item.media[0]['media-metadata'][1].url || item.multimedia[1].url)} />
            {beginCountdown && <div className='countdown'>{countdown}</div>}
        </div>
    )
}

export let adjustingAuthorsNames = (item) => {
    let readyAdjusts = ''

    let firstInduction = (item.byline || item.kicker).split('By ')[1]
    // console.log(firstInduction, 'firstInduction')
    let secondInduction = firstInduction && firstInduction.split(' and ')

    try {
        let [firstAuthorName, secondAuthorName] = [...secondInduction]

        readyAdjusts += procuringTokens(firstAuthorName)

        if (secondAuthorName) {
            readyAdjusts += '_' + procuringTokens(secondAuthorName)
        }

    } catch (err) {
        console.log(err, 'error!!')
    }

    return readyAdjusts
}

export let GmtBasedDateAndTimeTokens = (dtString) => {
    let firstSplit = dtString.split('T')
    let dateString = firstSplit[0]
    let secondSplit = firstSplit[1].split('-')[0]
    let timeString = secondSplit
    return [dateString, timeString]
}

export let getHowLongSinceThisArticleWasPosted = (item, timeStampUpdater, poublishedDateUpdater, dateStringInGMT) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', "Mei", "Jun", "Jul", 'Aug', 'Sep', "Okt", 'Nov', 'Dec']
    let timeTokens = () => (item.updated || item.published_date).split(' ')
    let [dateString, timeString] = dateStringInGMT ? [...GmtBasedDateAndTimeTokens(item.updated_date || item.published_date)] : [...timeTokens()]

    // console.log(dateString, timeString, '<!<!')
    // 2022-02-07T21:42:08-05:00"

    let [yy, mm, dd] = dateString.split('-')
    let [hrs, min, sec] = timeString.split(':')

    let adjustedDateString = `${dd} ${months[mm - 1]}, ${yy}`
    let adjustedTimeString = convertingTime12Hours(hrs, min)


    timeStampUpdater(adjustedTimeString + ', ' + adjustedDateString)
    poublishedDateUpdater(`${dd} ${months[mm - 1]}`)
    // console.log(timeTokens, dateString, timeString, '<><>', adjustedDateString, adjustedTimeString, )
}

export let procuringTokens = (nameString) => {
    let readyAdjustedString = '';

    let tokens = nameString.split(' ');

    let adjustedTokens = tokens.map(name => name[0].toUpperCase().concat(name.slice(1)))

    adjustedTokens.forEach((name, idx) => {
        if (idx < adjustedTokens.length - 1) {
            readyAdjustedString += name[0] + "."
        } else {
            readyAdjustedString += name
        }
    })

    return readyAdjustedString
}

export let makeStringWordCased = (string) => {
    let wordCased = string && string[0].toUpperCase() + string.substring(1)
    return wordCased
}

export let makeGetFetchRequest = (url, dataUpdater) => {
    fetch(url)
        .then(resp => resp.json())
        .then(data => dataUpdater(data.results))
        .catch(err => console.log(err.code, err.message))
}

export let ShowSettingsModal = ({handleCloseModal, removedNewsFromList, options, announcementText, fromExplore }) => {
    let [announcement, setAnnouncement] = useState(null)

    let [timerHandle, setTimerHandle] = useState(null)

    let handleClick = () => {
        setAnnouncement(announcementText)

        let handle = setTimeout(() => {
            setAnnouncement('')
           removedNewsFromList()
        }, 4000)

        setTimerHandle(handle)

        return () => clearTimeout(timerHandle)
    }

    let ref = useRef(null)
    useOnClickOutside(ref, () => handleCloseModal(false))

    let renderOptions = () => options.map((item, idx) => <RenderSettingsOption key={idx} item={item} removedNewsFromList={handleClick} />)

    return (
        announcement
        ?
        <SettingsModal announcement={announcement} timerHandle={timerHandle} fromExplore={fromExplore} handleCloseModal={handleCloseModal} />
        :
        <div id='show-suggested-settings-wrapper' ref={ref}>
            {renderOptions()}
        </div>
    )
}

let SettingsModal = ({announcement, timerHandle , fromExplore, handleCloseModal}) => {
    let [undoSuccessful, setUndoSuccessful] = useState(false)

    let handleUndo = () => {
        // console.log(timerHandle, 'test handle')

        clearTimeout(timerHandle)
        setUndoSuccessful(true)
    }

    useEffect(() => {
        let handle = setTimeout(() => {
            // setAnnouncement('')
            handleCloseModal(false)
        }, 4000)
        return () => clearTimeout(handle)
    }, [undoSuccessful])

    return (
        <div id='show-suggested-settings-wrapper' className="settings-action-wrapper">
            {/* <div id='announcement-text'>{announcement}</div> */}
            {!undoSuccessful && <div id='announcement-text'>{announcement}</div>}
            {!undoSuccessful && <div id="undo-remove" onClick={handleUndo}>{fromExplore ? 'Undo' : null}</div>}
            {undoSuccessful && <div>Undo successful</div>}
            {/* <div id="undo-remove" onClick={handleUndo}>{fromExplore ? 'Undo' : null}</div> */}
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

export let removeItemFromArrayByTitle = (dataset, removalList, datasetUpdater, fromExplore) => {
    let newList = dataset.map(item => {
        // let check = removalList.findIndex(title => item.title == title)

        // when its from fromExplore  dataset is list of category names, otherwise news items list
        let check = removalList.findIndex(comparable => fromExplore ? item == comparable : item.title == comparable)
        
        return check == -1 && item
    }).filter(item => item)
    
    datasetUpdater(newList)
}

export let verifiedSvgIcon = () => <svg width={'24px'} height={'24px'}><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>

/**
 * 
 * 
 export let ShowSettingsModal = ({handleCloseModal, removedNewsFromList, options, announcementText, fromExplore, handleUndoRemovedCategory}) => {
    let [announcement, setAnnouncement] = useState(null)
    let [undo, setUndo] = useState(false)

    // let [handleTest, setHandleTest] = useState(null)
    let handleTest;

    let handleClick = () => {
        setAnnouncement(announcementText)
        // setClicked(true)
        handleTest = setTimeout(() => {
            setAnnouncement('')
            // removedNewsFromList()
            console.log(undo, 'undo')
            !undo && removedNewsFromList()
        }, 4000)

        console.log(handleTest, 'handle!!')
        
        return () => clearTimeout(handleTest)
    }

    // let handleClick = () => {
    //     setAnnouncement(announcementText)
    //     // setClicked(true)
    //     let handle = setTimeout(() => {
    //         setAnnouncement('')
    //         removedNewsFromList()
    //     }, 4000)
        
    //     return () => clearTimeout(handle)
    // }

    let ref = useRef(null)
    useOnClickOutside(ref, () => handleCloseModal(false))

    console.log('!!undo', handleTest)

    let handleUndo = () => {
        clearTimeout(handleTest)
        setUndo(true)
        console.log('!!undo', handleTest)
        // handleUndoRemovedCategory()
    }

    let renderOptions = () => options.map((item, idx) => <RenderSettingsOption key={idx} item={item} removedNewsFromList={handleClick} />)

    return (
        announcement
        ?
        <div id='show-suggested-settings-wrapper' className="settings-action-wrapper">
            <div id='announcement-text'>{announcement}</div>
            <div id="undo-remove" onClick={handleUndo}>{fromExplore ? 'Undo' : null}</div>
        </div>
        :
        <div id='show-suggested-settings-wrapper' ref={ref}>
            {renderOptions()}
        </div>
    )
}
 */