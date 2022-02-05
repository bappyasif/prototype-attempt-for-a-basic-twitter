import React, { useEffect, useState } from 'react';
import TweetModal from '../../../tweet-modal';
import { convertingTime12Hours } from '../../../user-profile/all-tweets/show-tweet-thread'

function RenderHomePageView({currentUser}) {
    let [dataset, setDataset] = useState([])
    let handleLoadingDataset = items => setDataset(items.results)
    let apik = '8RizJqR4D0CrmKRxfGDmszpKT8VUHAlT'
    let url = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${apik}`
    let url03 = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apik}`
    let url04 = `https://api.nytimes.com/svc/mostpopular/v2/shared/1.json?api-key=${apik}`
    let fetchData = (url) => {
        fetch(url)
            .then(resp => resp.json())
            .then(data => handleLoadingDataset(data))
            .catch(err => console.log(err.code, err.message))
    }

    useEffect(() => fetchData(url04), [])

    console.log(dataset, 'datasetHomePage!!')

    let renderMostPopularArtclesShared = () => dataset.filter(item => item && item.media[0]).map(item => <RenderSharedArticle key={item.id} item={item} />)

    return (
        <div id='home-page-view-container'>
            <TweetModal currentUser={currentUser} setExtraTweetText={() => null} setTweetText={() => null} setGifFile={() => null} setExtraGifFile={() => null} setSelectedFile={() => null} setExtraSelectedFile={() => null} extraTweetText={'extra'} tweetText={'text'} toggleModality={true} />
            {renderMostPopularArtclesShared()}
        </div>
    )
}

let RenderSharedArticle = ({ item }) => {
    let [timeStamp, setTimeStamp] = useState(null)
    let [showTimeToolTip, setShowTimeToolTip] = useState(false)
    let [publishedDate, setPublishedDate] = useState(null)
    let [countdown, setCountdown] = useState(4)
    let [beginCountdown, setBeginCountdown] = useState(false)

    useEffect(() => item && getHowLongSinceThisArticleWasPosted(item, setTimeStamp, setPublishedDate), [item])

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
        <div id={item.id} className='render-shared-article-wrapper' onClick={handleClick}>
            <div id='article-info'>
                <div id='top-section'>
                    <div id='authors-info'>
                        <div id='authors-name'>{item.byline}</div>
                        <div id='authors-handle'>@{adjustingAuthorsNames(item)}</div>
                    </div>
                    <div id='article-timestamp' onMouseEnter={handleHover} onBlur={handleHover}>
                        <div id='published-time'>{publishedDate}</div>
                        <div id='time-tooltip' style={{ display: showTimeToolTip && 'block' }}>{timeStamp || '00-00-00 99:99:99'}</div>
                    </div>
                </div>
                <div id='snippet-text'>{item.abstract || item.title}</div>
            </div>
            <img id='article-img' style={{opacity: beginCountdown && '20%', pointerEvents: beginCountdown && 'none'}} src={item.media[0]['media-metadata'][1].url} />
            {beginCountdown && <div className='countdown'>{countdown}</div>}
        </div>
    )
}

export let adjustingAuthorsNames = (item) => {
    let readyAdjusts = ''

    let firstInduction = item.byline.split('By ')[1]
    let secondInduction = firstInduction.split(' and ')

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

export let getHowLongSinceThisArticleWasPosted = (item, timeStampUpdater, poublishedDateUpdater) => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', "Mei", "Jun", "Jul", 'Aug', 'Sep', "Okt", 'Nov', 'Dec']
    let timeTokens = item.updated.split(' ')
    let [dateString, timeString] = [...timeTokens]

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

export default RenderHomePageView;


/**
 * 
 * 
 let RenderSharedArticle = ({ item }) => {
    let [timeStamp, setTimeStamp] = useState(null)
    let [showTimeToolTip, setShowTimeToolTip] = useState(false)
    let [publishedDate, setPublishedDate] = useState(null)

    // let adjustingAuthorsNames = () => {
    //     let firstInduction = item.byline.split('By ')[1]
    //     let secondInduction = firstInduction.split(' and ')

    //     let [firstAuthorName, secondAuthorName] = [...secondInduction]

    //     let readyAdjusts = ''

    //     readyAdjusts += procuringTokens(firstAuthorName)

    //     if (secondAuthorName) {
    //         readyAdjusts += '_' + procuringTokens(secondAuthorName)
    //     }

    //     return readyAdjusts
    // }

    // let getHowLongSinceThisArticleWasPosted = (item) => {
    //     let months = ['Jan', 'Feb', 'Mar', 'Apr', "Mei", "Jun", "Jul", 'Aug', 'Sep', "Okt", 'Nov', 'Dec']
    //     let timeTokens = item.updated.split(' ')
    //     let [dateString, timeString] = [...timeTokens]
    //     let [yy,mm,dd] = dateString.split('-')
    //     let [hrs, min, sec] = timeString.split(':')
    //     let adjustedDateString = `${dd} ${months[mm - 1]}, ${yy}`
    //     let adjustedTimeString = convertingTime12Hours(hrs, min)
    //     setTimeStamp(adjustedTimeString + ', ' + adjustedDateString)
    //     setPublishedDate(`${dd} ${months[mm - 1]}`)
    //     console.log(timeTokens, dateString, timeString, '<><>', adjustedDateString, adjustedTimeString, )
    // }

    useEffect(() => item && getHowLongSinceThisArticleWasPosted(item, setTimeStamp, setPublishedDate), [item])

    console.log(item, 'artcleItem')

    let handleClick = () => window.open(item.url, '_target')

    let handleHover = () => setShowTimeToolTip(!showTimeToolTip)

    return (
        <div id='render-shared-article-wrapper' onClick={handleClick}>
            <div id='article-info'>
                <div id='top-section'>
                    <div id='authors-info'>
                        <div id='authors-name'>{item.byline}</div>
                        <div id='authors-handle'>@{adjustingAuthorsNames(item)}</div>
                    </div>
                    <div id='article-timestamp' onMouseEnter={handleHover} onBlur={handleHover}>
                        <div id='published-time'>{publishedDate}</div>
                        <div id='time-tooltip' style={{display: showTimeToolTip && 'block'}}>{timeStamp || '00-00-00 99:99:99'}</div>
                    </div>
                </div>
                <div id='snippet-text'>{item.abstract || item.title}</div>
            </div>
            <img id='article-img' src={item.media[0]['media-metadata'][1].url} />
        </div>
    )
}
 * 
 * 
 let adjustingAuthorsNames = () => {
        let firstInduction = item.byline.split('By ')[1]
        let secondInduction = firstInduction.split(' and ')
        let [firstAuthorName, secondAuthorName] = [...secondInduction]
        // console.log(secondInduction, '!!', firstInduction, '[]', firstAuthorName, secondAuthorName)

        let readyAdjusts = ''

        readyAdjusts += procuringTokens(firstAuthorName)

        if (secondAuthorName) {
            readyAdjusts += '_' + procuringTokens(secondAuthorName)
        }

        // let getHowLongSinceThisArticleWasPosted = () => {
        //     let months = ['Jan', 'Feb', 'Mar', 'Apr', "Mei", "Jun", "Jul", 'Aug', 'Sep', "Okt", 'Nov', 'Dec']
        //     let timeTokens = item.updated.split(' ')
        //     let [dateString, timeString] = [...timeTokens]
        //     let [yy,mm,dd] = dateString.split('-')
        //     let [hrs, min, sec] = timeString.split(':')
        //     let adjustedDateString = `${dd} ${months[mm - 1]}, ${yy}`
        //     let adjustedTimeString = convertingTime12Hours(hrs, min)
        //     setTimeStamp(adjustedTimeString + ', ' + adjustedDateString)
        //     console.log(timeTokens, dateString, timeString, '<><>', adjustedDateString, adjustedTimeString)
        // }

        // console.log(readyAdjusts, 'readyAdjusts!!')
        // getHowLongSinceThisArticleWasPosted()

        // let readyAdjusts = adjustFirstAuthorName+'_'+adjustSecondAuthorName;
        return readyAdjusts
    }
 * 
 * 
 let adjustingAuthorsNames = () => {
        // let adjustingNames = item.byline.match(/[By | by | BY]/g, '')
        // let adjustingNames = item.byline.match(/By/g, '')
        // let adjustingNames = item.byline.replace(/[And|and]/g, ' ')

        let firstInduction = item.byline.split('By ')[1]
        let secondInduction = firstInduction.split(' and ')
        let [firstAuthorName, secondAuthorName] = [...secondInduction]
        console.log(secondInduction, '!!', firstInduction, '[]', firstAuthorName, secondAuthorName)

        let readyAdjusts = ''

        let tokens = firstAuthorName.split(' ');
        let adjustedTokens = tokens.map(name=> name[0].toUpperCase().concat(name.slice(1)))
        adjustedTokens.forEach((name, idx) => {
            if(idx < adjustedTokens.length - 1)  {
                readyAdjusts += name[0]+"."
            } else {
                readyAdjusts += name
            }
        })

        if(secondAuthorName) {
            let nameTokens = secondAuthorName.split(' ')
            let adjustingTokens = nameTokens[0].toUpperCase() + '.' + nameTokens[1].toUpperCase()+nameTokens[1].slice(1)
            readyAdjusts += '_'+adjustingTokens
        }

        console.log(readyAdjusts, 'readyAdjusts!!')
        
        // let readyAdjusts = adjustFirstAuthorName+'_'+adjustSecondAuthorName;
        // return readyAdjusts
    }
 * 
 * 
 *    let adjustingAuthorsNames = () => {
        let firstAttempt = item.byline.split('By')[1]
        // let secondAttempt = firstAttempt.split(' And ')
        let secondAttempt = firstAttempt.split(/[ And | and | AND ]/)
        
        let firstAuthor = secondAttempt[0].split(' ')
        let secondAuthor = secondAttempt[1].split(' ')
        
        let adjustFirstAuthorName = firstAuthor[0].toUpperCase()+firstAuthor[1].toUpperCase()+firstAuthor.slice(1)
        let adjustSecondAuthorName = secondAuthor[0].toUpperCase()+secondAuthor[1].toUpperCase()+secondAuthor.slice(1)
        
        let readyAdjusts = adjustFirstAuthorName+'_'+adjustSecondAuthorName;
        return readyAdjusts
    }
 */