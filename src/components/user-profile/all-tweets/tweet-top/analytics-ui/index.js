import React, {useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import { likeloveIcon, replyIcon, retweetIcon } from '../../../profile-page/svg-resources'
import './styles.css'
import useOnClickOutside from '../../../../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside'
import {getUserProfileData} from '../../../../firestore-methods'
import { Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { handleMediaFileChecks } from '../../../../compose-tweet/content-in-compose-tweet'
import { MakeGifObjectAvailable, RenderPolls } from '../../reuseable-helper-functions'
// import { RenderPolls } from '../..'
// import { getGiphyGifObject, MakeGifObjectAvailable } from '../../../all-tweets'

function AnalyticsUI({analysingTweetID, analysingTweetData, currentUser}) {
    return (
        analysingTweetID
        &&
        analysingTweetData
        &&
        <div id='tweet-analytics-ui-container'>
            <RenderAnalyticsHeaderSection />
            <RenderAnalyticsDataSection analysingTweetData={analysingTweetData} currentUser={currentUser} />
            <RenderTweetAnalyticMetrics analysingTweetID={analysingTweetID} analysingTweetData={analysingTweetData} />
            <RenderAnalyticsFooterSection />
        </div>
    )
}

let RenderAnalyticsFooterSection = () => {
    return <FooterSectionLowerDeck />
    // return (
    //     <div id='footer-section-ui-wrapper'>
    //         {/* <RenderTweetAnalyticMetrics /> */}
    //         <FooterSectionLowerDeck />
    //     </div>
    // )
}

let FooterSectionLowerDeck = ({ number }) => {
    return (
        <div id='lower-deck-wrapper'>
            <div id='left-side'>
                <div id='heading-text'>Promote your Tweet</div>
                <div id='sub-text'>Your Tweet has earned {number} impressions so far. Switch to a professional account to broaden your reach.</div>
            </div>
            <div id='switch-to'>Switch to professional</div>
        </div>
    )
}

let RenderAnalyticsDataSection = ({analysingTweetData, currentUser}) => {
    return (
        <div id='analytics-data-section-container'>
            {/* <RenderAnalysingUserTweet analysingTweetData={analysingTweetData} currentUser={currentUser} /> */}
            <RenderUserTweet speceficTweetData={analysingTweetData} currentUser={currentUser} />
            <RenderAnalysingTweetLikeRetweetReplyNumbersUI />
            {/* <RenderTweetAnalyticMetrics /> */}
        </div>
    )
}

let RenderTweetAnalyticMetrics = ({analysingTweetID, analysingTweetData}) => {
    // let [currentTooltip, setCurrentTooltip] = useState(null)
    let tooltipSvg = informationTooltipSvg()
    let renderMetrics = analyticMetrics.map(item => <RenderTweetAnalyticMetric key={item.name} item={item} tooltipSvg={tooltipSvg} analysingTweetData={analysingTweetData} />)
    // let renderMetrics = analyticMetrics.map(item => <RenderTweetAnalyticMetric key={item.name} item={item} tooltipSvg={tooltipSvg} currentTooltip={currentTooltip} setCurrentTooltip={setCurrentTooltip} />)
    analysingTweetID && console.log(analysingTweetID, analysingTweetData)
    return (
        <div id='analytic-metrics-ui-wrapper'>
            {renderMetrics}
        </div>
    )
}

let RenderTweetAnalyticMetric = ({ item, tooltipSvg }) => {
    let [currentTooltip, setCurrentTooltip] = useState(null)

    let handleTooltips = evt => {
        if(item.name == evt.target.parentNode.parentNode.parentNode.id) {
            setCurrentTooltip(item.name)
        }
    }

    let closeTooltip = () => setCurrentTooltip(null)
    
    return (
        <div className='metric-wrapper' id={item.name}>
            {item.name == currentTooltip && <RenderMetricTooltipModal tooltip={currentTooltip} closeTooltip={closeTooltip} />}
            
            <div className='upper-deck'>
                <div className='metric-name'>{item.name}</div>
                <div className='tooltip-svg' onClick={handleTooltips}>{tooltipSvg}</div>
            </div>
            
            <div className='meteric-number'>{item.number}</div>
        </div>
    )
}

let RenderMetricTooltipModal = ({tooltip, closeTooltip}) => {
    let ref = useRef(null);

    let handleModal = () => {
        closeTooltip()
    }
    
    useOnClickOutside(ref, handleModal)

    let subText = tooltip == 'Impressions' ? 'Times this tweets was seen on Twitter' : tooltip == 'New followers' ? 'Follows gained directly from this Tweet' : 'Number of profile views from this Tweet'

    return (
        <div className='tooltip-ui-wrapper' ref={ref}>
            <div className='tooltip-name'>{tooltip}</div>
            <div className='tooltip-subtext'>{subText}</div>
            <div className='tooltip-modal-btn' onClick={() => closeTooltip()}>OK</div>
        </div>
    )
}

let RenderAnalysingTweetLikeRetweetReplyNumbersUI = () => {
    let renderMarkers = tweetMarkers.map(item => <RenderAnalysingTweetMarker key={item.name} item={item} />)
    return (
        <div id='like-retweet-reply-numbers-ui-wrapper'>
            {renderMarkers}
        </div>
    )
}

let RenderAnalysingTweetMarker = ({ item }) => {
    return (
        <div className='marker-wrapper'>
            <div className='svg-icon'>{item.icon}</div>
            <div className='marker-number'>{item.number}</div>
        </div>
    )
}

export let RenderUserTweet = ({speceficTweetData, currentUser}) => {
    let [userProfileData, setUserProfileData] = useState(null)
    
    let [neededInfo, setNeededInfo] = useState([])

    let handleDataLoading = (dataset) => setUserProfileData(dataset)

    let {created, extraPoll, extraTweet, medias, tweetPoll, tweetText} = speceficTweetData && {...speceficTweetData[0]}
    
    useEffect(() => currentUser && getUserProfileData(currentUser, handleDataLoading), [])

    let filterProfileData = () => {
        let itemFiltered = userProfileData.filter((item, idx) => (idx == 0 || idx == 6) && item.content)
        setNeededInfo(itemFiltered)
    }

    useEffect(() => userProfileData && filterProfileData(), [userProfileData])
    
    // neededInfo && created && userProfileData && console.log(tweetText, created, userProfileData, neededInfo)

    return (
        <div id='analysing-user-tweet-wrapper'>
            <RenderTweetUserInfo name={neededInfo.length && neededInfo[0].content} tweetPostedDate={created && created.seconds} />
            {/* <RenderAnalysingTweetText tweetText={tweetText} /> */}
            <RenderUserTweetText tweetText={tweetText} />
            <div id='addtional-tweet-line' style={{height: ((medias.gif && medias.gif) || (medias.picture && medias.picture)) && '324px'}} ></div>
            {((medias.gif && medias.gif) || (medias.picture && medias.picture)) && <RenderUserTweetMedias medias={medias} />}
            {tweetPoll && <RenderPolls poll={tweetPoll} />}
        </div>
    )
}

let RenderUserTweetMedias = ({medias}) => {
    // let [gifObj, setGifObj] = useState(null)
    let {gif, picture} = {...medias}
    // console.log(gif, picture, 'media found!!')
    // let getGifFromID = () => {
    //     // getGiphyGifObject(gif)

    // }
    return (
        // picture ? <img width={'461px'} src={picture} /> : getGifFromID()
        picture ? <img className='quoted-picture' src={handleMediaFileChecks(picture)} /> : <MakeGifObjectAvailable gifId={gif} />
        // <div id='medias-wrapper'></div>
    )
}

let RenderUserTweetText = ({tweetText}) => {
    return (
        <div id='analysing-tweet-text-wrapper' style={{marginBottom: '11px'}}>
            {tweetText || 'user Tweet'}
        </div>
    )
}

let RenderTweetUserInfo = ({name, profileHandle, tweetPostedDate}) => {
    // let dateFormatted = ''

    let processCreatedDateFormat = () => {
        // let dateString =  new Date(created.seconds).toUTCString()
        let dateString =  new Date(tweetPostedDate).toUTCString()
        let neededPieces = []
        let dateTokens = dateString.split(' ')
        neededPieces.push(dateTokens[1], dateTokens[2])
        // dateFormatted = neededPieces.reverse().join(', ');
        return neededPieces.reverse().join(', ')
    }
    return (
        <div id='user-info-wrapper'>
            <img style={{width: '20px', height: '20px'}} src='https://picsum.photos/200/300' />
            <div id='profile-name'>{name || 'profile name'}</div>
            <div id='profile-handle'>{profileHandle || 'profile handle'}</div>
            <div id='text-separator'>-</div>
            <div id='published-date'>{processCreatedDateFormat() || 'Month day'}</div>
        </div>
    )
}

let RenderAnalyticsHeaderSection = () => {
    let history = useHistory()
    let handleCloseModal = () => {
        history.goBack()
    }
    return (
        <div id='analytics-header-ui-wrapper'>
            <div id='close-svg' onClick={handleCloseModal}>{cancelMarkSvg()}</div>
            <div id='header-text'>Tweet Analytics</div>
        </div>
    )
}

let cancelMarkSvg = () => <svg width={24} height={24}><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

let informationTooltipSvg = () => <svg width={24} height={24}><g><path d="M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z"></path><circle cx="12" cy="8.042" r="1.25"></circle><path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path></g></svg>

let tweetMarkers = [{ name: 'like', number: '00', icon: likeloveIcon() }, { name: 'retweet', number: '00', icon: retweetIcon() }, { name: 'reply', number: '00', icon: replyIcon() }]

let analyticMetrics = [{ name: 'Impressions', number: '00' }, { name: 'New followers', number: '00' }, { name: 'Profile visits', number: '00' }]

// let MakeGifObjectAvailable = ({ gifId }) => {
//     let [gif, setGif] = useState(null)

//     gifId && getGiphyGifObject(gifId).then(res => {
//         setGif(res)
//     }).catch(err => console.log(err.message))

//     // return gif && <Gif width={422} height={290} gif={gif} className='style-gif-border-radius' />
//     return gif && <Gif height={279} gif={gif} className='style-gif-border-radius' />
// }

// let getGiphyGifObject = async (gifId) => {
//     try {
//         let { data } = await new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh").gif(gifId)
//         // console.log('checkoiint06', gifId)
//         return data
//     } catch (err) {
//         console.log(err)
//     }
// }


export default AnalyticsUI

/**
 * 
 * 
 let RenderAnalysingTweetText = ({tweetText}) => {
    return (
        <div id='analysing-tweet-text-wrapper' style={{marginTop: '6px'}}>
            {tweetText || 'user Tweet'}
        </div>
    )
}
 * 
 * 
 let RenderAnalysingUserTweet = ({analysingTweetData, currentUser}) => {
    let [userProfileData, setUserProfileData] = useState(null)
    
    let [neededInfo, setNeededInfo] = useState([])

    let handleDataLoading = (dataset) => setUserProfileData(dataset)

    let {created, extraPoll, extraTweet, medias, tweetPoll, tweetText} = analysingTweetData && {...analysingTweetData[0]}
    
    useEffect(() => currentUser && getUserProfileData(currentUser, handleDataLoading), [])

    let filterProfileData = () => {
        let itemFiltered = userProfileData.filter((item, idx) => (idx == 0 || idx == 6) && item.content)
        setNeededInfo(itemFiltered)
    }

    useEffect(() => userProfileData && filterProfileData(), [userProfileData])

    // let processCreatedDateFormat = () => new Date(created).toDateString()
    // let processCreatedDateFormat = () => new Date(created.seconds).toString()
    // let processCreatedDateFormat = () => {
    //     let dateString =  new Date(created.seconds).toUTCString()
    //     let neededPieces = []
    //     let dateTokens = dateString.split(' ')
    //     neededPieces.push(dateTokens[1], dateTokens[2])
    //     return neededPieces.reverse().join(', ')
    // }
    
    neededInfo && created && userProfileData && console.log(tweetText, created, userProfileData, neededInfo)

    return (
        <div id='analysing-user-tweet-wrapper'>
            <RenderTweetUserInfo name={neededInfo.length && neededInfo[0].content} tweetPostedDate={created && created.seconds} />
            <RenderAnalysingTweetText tweetText={tweetText} />
        </div>
    )
}
 * 
 * 
 let RenderTweetAnalyticMetric = ({ item, tooltipSvg }) => {
    // let [tooltipClicked, setTooltipClicked] = useState(false)
    let [currentTooltip, setCurrentTooltip] = useState(null)

    let handleTooltips = evt => {
        // console.log(evt.target.parentNode.parentNode.parentNode.id)
        // setCurrentTooltip('')        
        if(item.name == evt.target.parentNode.parentNode.parentNode.id) {
            setCurrentTooltip(item.name)
        }
        // setTooltipClicked(true)
    }

    let closeTooltip = () => setCurrentTooltip(null)

    // useEffect(() => {
    //     setCurrentTooltip('')
    // }, [item.name])

    // useEffect(() => setCurrentTooltip(''), )

    // console.log(currentTooltip, 'currentTooltip')
    
    return (
        <div className='metric-wrapper' id={item.name}>
            {/* {currentTooltip && <RenderMetricTooltipModal tooltip={currentTooltip} />} *}
            {item.name == currentTooltip && <RenderMetricTooltipModal tooltip={currentTooltip} closeTooltip={closeTooltip} />}
            <div className='upper-deck'>
                <div className='metric-name'>{item.name}</div>
                <div className='tooltip-svg' onClick={handleTooltips}>{tooltipSvg}</div>
            </div>
            <div className='meteric-number'>{item.number}</div>
        </div>
    )
}
 * 
 * 
 // let RenderMetricTooltipModal = React.forwardRef((props, ref) => {
//     let {tooltip, closeTooltip} = {...props}
//     let subText = tooltip == 'Impressions' ? 'Times this tweets was seen on Twitter' : tooltip == 'New followers' ? 'Follows gained directly from this Tweet' : 'Number of profile views from this Tweet'
//     // console.log(props, 'props', tooltip, closeTooltip)
//     return (
//         <div className='tooltip-ui-wrapper' ref={ref}>
//             <div className='tooltip-name'>{tooltip}</div>
//             <div className='tooltip-subtext'>{subText}</div>
//             <div className='tooltip-modal-btn' onClick={() => closeTooltip()}>OK</div>
//         </div>
//     )
// })
 */