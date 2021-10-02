import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { backIcon } from '../user-profile/profile-page/svg-resources'
import './styles.css'

function EditTweetMediaContents({mediaFile, updateMediaFile}) {
    let [textAreaValue, setTextAreaValue] = useState('');
    let [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    let [sideIsClicked, setSideIsClicked] = useState('');
    let [height, setHeight] = useState(0);
    let [width, setWidth] = useState(0);
    let [shapedClicked, setShapedClicked] = useState('')
    let [goBackTo, setGoBackTo] = useState('')

    let handleTextAreaChanges = evt => setTextAreaValue(evt.target.value);
    // let handleFocused = () => setIsTextAreaFocused(!isTextAreaFocused)
    let handleFocused = () => setIsTextAreaFocused(true)

    let handleClick = evt => setSideIsClicked(evt.target.id);

    let renderBottomComponents = () => {
        let elements = '';
        if (sideIsClicked == 'svg-icon-tab') {
            elements = <PhotoEditToolsComponent
                width={width}
                setWidth={setWidth}
                height={height}
                setHeight={setHeight}
                shapedClicked={shapedClicked}
                setShapedClicked={setShapedClicked}
            />
        } else if (sideIsClicked == 'alt-div-tab') {
            elements = <AltTagComponents
                textAreaValue={textAreaValue}
                isTextAreaFocused={isTextAreaFocused}
                setIsTextAreaFocused={setIsTextAreaFocused}
                handleFocused={handleFocused}
                handleTextAreaChanges={handleTextAreaChanges}
            />
        }
        return elements
    }

    let GoBack = () => {
        return (
            <Route 
            render = {({history}) => <div id='svg-icon' onClick={() => {history.push('/tweet/compose')}}>{backIcon()}</div>} />
        )
    }

    let handleCropImage = () => {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d')
        let sourceImg = document.getElementById('media-view');
        // ctx.drawImage(sourceImg, 20, 90, 110, 99, 0, 0, 200, 200)
        ctx.drawImage(sourceImg, `${decideCropShapeTop()}`, `${decideCropShapeLeft()}`, `${setCanvasWidth()}`, `${setCanvasHeight()}`, 0, 0, `${setCanvasWidth()}`, `${setCanvasHeight()}`)
        // ctx.drawImage(sourceImg, `${decideCropShapeTop()}`, `${decideCropShapeLeft()}`, `${setCanvasHeight()}`, `${setCanvasWidth()}`, 0, 0, `${setCanvasHeight()}`, `${setCanvasWidth()}`)
    }

    let decideCropShapeTop = () => shapedClicked == 'wide' ? 20 : 0;

    let decideCropShapeLeft = () => shapedClicked == 'squared' ? 20 : 0;

    let setCanvasWidth = () => shapedClicked == 'squared' ? 411 : 456;

    let setCanvasHeight = () => shapedClicked == 'wide' ? 211 : 249;
    // let setCanvasHeight = () => shapedClicked == 'wide' ? 411 : 449;

    return (
        <div id='media-editing-container'>
            <div id='header-section'>
                <div id='top-portion'>
                    <div id='left-side'>
                        {/* <div id='svg-icon'><Redirect to='/tweet/compose'>{backIcon()}</Redirect></div> */}
                        {/* <div id='svg-icon'><Link to={goBackTo?goBackTo:null} onClick={goBack}>{backIcon()}</Link></div> */}
                        {/* <div id='svg-icon'>{backIcon()}</div> */}
                        <GoBack />
                        <p id='header-text'>Edit Photo</p>
                    </div>
                    <div id='right-side'>
                        <button id='save-button' onClick={handleCropImage}>Save</button>
                    </div>
                </div>
                <div id='bottom-portion'>
                    <div id='svg-icon-tab' onClick={handleClick}>{cropIcon()}</div>
                    <div id='alt-div-tab' onClick={handleClick}>ALT</div>
                </div>
            </div>
            <div id='middle-section'>
                {/* <canvas id='canvas'></canvas> */}
                <img id='media-view' src='https://picsum.photos/200/300' />
                {/* <img id='media-view' src={mediaFile && URL.createObjectURL(mediaFile)}/> */}
                <div id='overlay-view' style={{ width: width+'px', height: height+'px' }}></div>
            </div>
            {renderBottomComponents()}
            <canvas id='canvas'></canvas>
        </div>
    )
}

let PhotoEditToolsComponent = ({width, setWidth, height, setHeight, shapedClicked, setShapedClicked}) => {
    let [percentage, setPercentage] = useState(0);

    let handleZoom = (evt) => {
        setPercentage(`${evt.target.value}`)
    }

    let handleOriginalSize = () => {
        setHeight(`${251}`);
        setWidth(`${456}`);
        setShapedClicked('original')
    }

    let handleWideAngle = (evt) => {
        setHeight(`${211}`);
        setWidth(`${456}`);
        setShapedClicked('wide')
        // let handle = document.querySelector('#middle-section #media-view');
        // handle.classList.add('wide-angle-in-view')
        // let handle = evt.target
        // handle.classList.add('wide-angle-in-view')
    }

    let handleSquaredSize = () => {
        setHeight(`${249}`);
        setWidth(`${411}`);
        setShapedClicked('squared')
    }

    return (
        <div id='photo-edit-bottom-section'>
            <span id='original-size' onClick={handleOriginalSize}>{originalSizeIcon()}</span>
            <span id='wide-angle' onClick={handleWideAngle}>{wideAngleIcon()}</span>
            <span id='squared-size' onClick={handleSquaredSize}>{sqaureSizeIcon()}</span>
            <div id='zoom-in-and-out'>
                <span id='zoom-out'>{zoomOutIcon()}</span>
                <div id='zoom-slider'>
                    <SliderFiller value={percentage} handleZoom={handleZoom} />
                </div>
                <span id='zoom-in'>{zoomInIcon()}</span>
            </div>
        </div>
    )
}

let SliderFiller = ({ value, handleZoom }) => {
    return (
        <div id='progress-bar'>
            <input type='range' min='0' max='100' value={value} id='slider-filler' onChange={handleZoom} />
        </div>
    )
}

let AltTagComponents = ({ isTextAreaFocused, textAreaValue, handleTextAreaChanges, handleFocused, setIsTextAreaFocused }) => {
    return (
        <div id='bottom-section'>
            {/* style={{borderColor: isTextAreaFocused ? 'rgb(29, 155, 240)' : ''}} */}
            {/* className={isTextAreaFocused ? 'highlight-description-div-border' : ''} */}
            {/* className={classes} */}
            <div
                id='description-div'
                style={{ borderColor: isTextAreaFocused ? 'rgb(29, 155, 240)' : '' }}
                onClick={() => setIsTextAreaFocused(false)}
            >
                <span id='tag-text'>Description</span>
                <span>0/1,000</span>
            </div>
            <textarea
                rows='4'
                id='description-area'
                value={textAreaValue}
                onChange={handleTextAreaChanges}
                onFocus={handleFocused}
            // onClick={() => setIsTextAreaFocused(!isTextAreaFocused)}
            />
            <a href='#' target='_blank'>What is alt text?</a>
        </div>
    )
}

let style = {
    transform: 'scale(.9)',
    display: 'flex'
}

let originalSizeIcon = () => <svg width='24px' height='24px'><g><path d="M19.75 19.944H4.25c-1.24 0-2.25-1.01-2.25-2.25V6.306c0-1.24 1.01-2.25 2.25-2.25h15.5c1.24 0 2.25 1.01 2.25 2.25v11.39c0 1.24-1.01 2.248-2.25 2.248zM4.25 5.556c-.413 0-.75.337-.75.75v11.39c0 .412.337.75.75.75h15.5c.413 0 .75-.338.75-.75V6.305c0-.413-.337-.75-.75-.75H4.25z"></path></g></svg>

let wideAngleIcon = () => <svg width='24px' height='24px'><g><path d="M19.75 19.89H4.25C3.01 19.89 2 18.88 2 17.64v-7.28c0-1.24 1.01-2.25 2.25-2.25h15.5c1.24 0 2.25 1.01 2.25 2.25v7.277c0 1.24-1.01 2.25-2.25 2.25zM4.25 9.61c-.413 0-.75.338-.75.75v7.278c0 .413.337.75.75.75h15.5c.413 0 .75-.337.75-.75V10.36c0-.412-.337-.75-.75-.75H4.25z"></path></g></svg>

let sqaureSizeIcon = () => <svg width='24px' height='24px'><g><path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.413 0-.75.337-.75.75v15.5c0 .413.337.75.75.75h15.5c.413 0 .75-.337.75-.75V4.25c0-.413-.337-.75-.75-.75H4.25z"></path></g></svg>

let zoomOutIcon = () => <svg width='24px' height='24px' style={style}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path><path d="M14.46 11.75H7.54c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.92c.415 0 .75.336.75.75s-.335.75-.75.75z"></path></g></svg>

let zoomInIcon = () => <svg width='24px' height='24px' style={style}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path><path d="M15.21 11c0 .41-.34.75-.75.75h-2.71v2.71c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2.71H7.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.71V7.54c0-.41.34-.75.75-.75s.75.34.75.75v2.71h2.71c.41 0 .75.34.75.75z"></path></g></svg>

let cropIcon = () => <svg width='24px' height='24px'><g><path d="M3.5 5.25H2c-.414 0-.75.336-.75.75s.336.75.75.75h1.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm18.5 12H7.5c-.414 0-.75-.337-.75-.75V2c0-.414-.336-.75-.75-.75s-.75.336-.75.75v14.5c0 1.24 1.01 2.25 2.25 2.25H22c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-4 2.5c-.414 0-.75.336-.75.75V22c0 .414.336.75.75.75s.75-.336.75-.75v-1.5c0-.414-.336-.75-.75-.75z"></path><path d="M8.5 6.75h8c.414 0 .75.337.75.75v8c0 .414.336.75.75.75s.75-.336.75-.75v-8c0-1.24-1.01-2.25-2.25-2.25h-8c-.414 0-.75.336-.75.75s.336.75.75.75z"></path></g></svg>

export default EditTweetMediaContents


/**
 *
 *
 let PhotoEditToolsComponent = () => {
    let [percentage, setPercentage] = useState(0);

    let handleZoom = (evt) => {
        // console.log('here', evt.target.value)
        setPercentage(`${evt.target.value}`)
    }

    // let handleMouseUp = () => setCoordsX(0);


    return (
        <div id='photo-edit-bottom-section'>
            <span id='original-size'>{originalSizeIcon()}</span>
            <span id='wide-angle'>{wideAngleIcon()}</span>
            <span id='squared-size'>{sqaureSizeIcon()}</span>
            <div id='zoom-in-and-out'>
                <span id='zoom-out'>{zoomOutIcon()}</span>
                <div id='zoom-slider'>
                    <SliderFiller value={percentage} handleZoom={handleZoom}/>
                </div>
                <span id='zoom-in'>{zoomInIcon()}</span>
            </div>
        </div>
    )
}

let SliderFiller = ({value, handleZoom}) => {
    return (
        <div id='progress-bar'>
            <input type='range' min='0' max='100' value={value} id='slider-filler' onChange={handleZoom} />
        </div>
    )
}
 *
 *
 let PhotoEditToolsComponent = () => {
    let [percentage, setPercentage] = useState(0);
    let [coordsX, setCoordsX] = useState(0)
    let [coordsX1, setCoordsX1] = useState(0);

    let handleZoom = (evt) => {
        let sliderNob = evt.target;
        let posStarted = evt.clientX;
        setCoordsX1(posStarted)
        // sliderNob.addEventListener('mousemove', handleMouseMove)
        console.log(posStarted, "??")
        sliderNob.addEventListener('mousemove', (evt) => handleMouseMove(evt, posStarted))
        // sliderNob.addEventListener('mouseup', handleMouseUp)
    }

    let handleMouseUp = () => setCoordsX(0);

    let handleMouseMove = (evt, x) => {
        // let posChanged = coordsX <= 0 ? coordsX : x - evt.clientX
        let posChanged = coordsX1 - evt.clientX
        setCoordsX(posChanged)
        setCoordsX1(evt.clientX)
        setPercentage(`${coordsX/146 * 100}%`)
        console.log(posChanged, coordsX, x,  evt.clientX, percentage)
    }
    return (
        <div id='photo-edit-bottom-section'>
            <span id='original-size'>{originalSizeIcon()}</span>
            <span id='wide-angle'>{wideAngleIcon()}</span>
            <span id='squared-size'>{sqaureSizeIcon()}</span>
            <div id='zoom-in-and-out'>
                <span id='zoom-out'>{zoomOutIcon()}</span>
                <div id='zoom-slider'>
                    <SliderFiller percentage={percentage} handleZoom={handleZoom}/>
                </div>
                <span id='zoom-in'>{zoomInIcon()}</span>
            </div>
        </div>
    )
}

let SliderFiller = ({percentage, handleZoom}) => {
    return (
        <div id='progress-bar'>
            <div id='slider-filler' style={{width: percentage}}>
                <div id='slider-nob' onMouseDown={handleZoom}></div>
            </div>
        </div>
    )
}
 *
 *
 let [classes, setClasses] = useState('');
 useEffect(() => {
        // document.body.onclick = () => setIsTextAreaFocused(false)
        // document.body.addEventListener('click', () => setIsTextAreaFocused(false))
        document.body.addEventListener('click', handleClicktoFocusout)

        // classes rules doesnt take effect even though className shows up on node!!
        // if (isTextAreaFocused) {
        //     setClasses('description-div highlight-description-div-border')
        // } else {
        //     setClasses('description-div')
        // }

        return () => document.body.removeEventListener('click', handleClicktoFocusout)

    }, [])

    let handleClicktoFocusout = () => {
        if(isTextAreaFocused) setIsTextAreaFocused(false);
    }
 */