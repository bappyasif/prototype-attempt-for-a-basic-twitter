import React, { useEffect, useState } from "react"
import { convertingTime12Hours } from "../../../user-profile/all-tweets/show-tweet-thread"
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
                <div id='top-section'>
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