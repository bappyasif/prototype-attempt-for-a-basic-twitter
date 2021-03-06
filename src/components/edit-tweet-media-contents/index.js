import { Gif } from '@giphy/react-components';
import React, { useState } from 'react'
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { backIcon } from '../user-profile/profile-page/svg-resources'
import './styles.css'

function EditTweetMediaContents({ mediaFile, updateMediaFile, gifFile, mediaDescriptionText, setMediaDescriptionText }) {
    let [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
    let [sideIsClicked, setSideIsClicked] = useState('');
    let [height, setHeight] = useState(251);
    let [width, setWidth] = useState(456);
    let [shapedClicked, setShapedClicked] = useState('original')
    let [zoomedWidth, setZoomedWidth] = useState('')

    let handleTextAreaChanges = evt => setMediaDescriptionText(evt.target.value);

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
                zoomedWidth={zoomedWidth}
                setZoomedWidth={setZoomedWidth}
            />
        } else if (sideIsClicked == 'alt-div-tab') {
            elements = <AltTagComponents
                textAreaValue={mediaDescriptionText}
                isTextAreaFocused={isTextAreaFocused}
                setIsTextAreaFocused={setIsTextAreaFocused}
                handleFocused={handleFocused}
                handleTextAreaChanges={handleTextAreaChanges}
                mediaDescriptionText={mediaDescriptionText}
                setMediaDescriptionText={setMediaDescriptionText}
            />
        }
        return elements
    }

    let GoBack = () => {
        return (
            <Route
                render={({ history }) => <div id='svg-icon' onClick={() => { history.push('/tweet/compose') }}>{backIcon()}</div>} />
        )
    }

    let handleCropImage = (evt) => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d')
        let sourceImg = document.getElementById('media-view');

        ctx.drawImage(sourceImg, `${decideCropShapeTop()}`, `${decideCropShapeLeft()}`, `${setCanvasWidth()}`, `${setCanvasHeight()}`)

        sourceImg.crossOrigin = 'anonymous'

        updateMediaFile(mediaFile && canvas.toDataURL('image/png'))
    }

    let decideCropShapeTop = () => shapedClicked == 'wide' ? 20 : 0;

    let decideCropShapeLeft = () => shapedClicked == 'squared' ? 20 : 0;

    let setCanvasWidth = () => shapedClicked == 'squared' ? 411 : 461;

    let setCanvasHeight = () => shapedClicked == 'wide' ? 211 : 249;

    let handleMediaFileChecks = () => {
        let mediaSrc = mediaFile;
        if (mediaFile instanceof File || mediaFile instanceof Blob || mediaFile instanceof MediaSource) {
            mediaSrc = URL.createObjectURL(mediaFile)
        }
        return mediaSrc;
    }

    let renderWhichMediafile = () => {
        if (mediaFile) {
            return <img id='media-view' src={handleMediaFileChecks()} style={{ flex: `0 0 ${zoomedWidth ? zoomedWidth : 99}`, minWidth: '100%' }} />
        } else {
            return <Gif gif={gifFile} width={449} height={290} borderRadius={20} />
        }
    }

    return (
        <div id='media-editing-container'>
            <div id='header-section'>
                <div id='top-portion'>
                    <div id='left-side'>
                        <GoBack />
                        <p id='header-text'>Edit Photo</p>
                    </div>
                    <div id='right-side'>
                        <Link to='/tweet/compose' id='save-button' onClick={handleCropImage}>Save</Link>
                    </div>
                </div>
                <div id='bottom-portion' style={{ display: gifFile ? 'none' : 'flex' }}>
                    <div id='svg-icon-tab' onClick={handleClick}>{cropIcon()}</div>
                    <div id='alt-div-tab' onClick={handleClick}>ALT</div>
                </div>
            </div>
            <div id='middle-section' style={{ overflow: gifFile ? 'hidden' : 'auto' }}>
                {renderWhichMediafile()}
                <div id='overlay-view' style={{ width: sideIsClicked == 'svg-icon-tab' && width + 'px', height: sideIsClicked == 'svg-icon-tab' && height + 'px' }}></div>
            </div>

            {renderBottomComponents()}
            {
                gifFile
                &&
                <AltTagComponents
                    textAreaValue={textAreaValue}
                    isTextAreaFocused={isTextAreaFocused}
                    setIsTextAreaFocused={setIsTextAreaFocused}
                    handleFocused={handleFocused}
                    handleTextAreaChanges={handleTextAreaChanges}
                    mediaDescriptionText={mediaDescriptionText}
                    setMediaDescriptionText={setMediaDescriptionText}
                />
            }
        </div>
    )
}

let PhotoEditToolsComponent = ({ width, setWidth, height, setHeight, shapedClicked, setShapedClicked, setZoomedWidth, zoomedWidth }) => {
    let [percentage, setPercentage] = useState(0);

    let handleImageZoom = (checker) => {
        let sourceImg = document.getElementById('media-view');
        let currWidth = sourceImg.clientWidth

        checker ? setZoomedWidth((currWidth - Number(percentage)) + 'px') : setZoomedWidth((currWidth + Number(percentage)) + 'px')
    }

    let clearUpCoords = (evt) => {
        // setPercentage(0);
        // setZoomedWidth(0)
        // setZoomedWidth((evt.target.value + Number(percentage)) + 'px')
    }

    let handleZoom = (evt) => {
        setPercentage(`${evt.target.value}`)
        evt.target.value == 0 ? setZoomedWidth(110) : handleImageZoom(evt.target.value < percentage)
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
    }

    let handleSquaredSize = () => {
        setHeight(`${249}`);
        setWidth(`${411}`);
        setShapedClicked('squared')
    }

    return (
        <div id='photo-edit-bottom-section'>
            <span className='image-shapes' id='original-size' onClick={handleOriginalSize}>{originalSizeIcon(shapedClicked)}</span>
            <span className='image-shapes' id='wide-angle' onClick={handleWideAngle}>{wideAngleIcon(shapedClicked)}</span>
            <span className='image-shapes' id='squared-size' onClick={handleSquaredSize}>{sqaureSizeIcon(shapedClicked)}</span>
            <div id='zoom-in-and-out'>
                <span id='zoom-out'>{zoomOutIcon()}</span>
                <div id='zoom-slider'>
                    <SliderFiller value={percentage} handleZoom={handleZoom} handleOnMouseUp={clearUpCoords} />
                </div>
                <span id='zoom-in'>{zoomInIcon()}</span>
            </div>
        </div>
    )
}

let SliderFiller = ({ value, handleZoom, handleOnMouseUp }) => {
    return (
        <div id='progress-bar'>
            <input
                type='range'
                min='0'
                max='100'
                value={value}
                id='slider-filler'
                onChange={handleZoom}
                onMouseUp={handleOnMouseUp}
            />
        </div>
    )
}

let AltTagComponents = ({ isTextAreaFocused, textAreaValue, handleTextAreaChanges, handleFocused, setIsTextAreaFocused }) => {
    let [placeholderText, setPlaceholderText] = useState('Description')

    let handleOnFocused = (evt) => {
        handleFocused();
        setPlaceholderText('')
    }

    return (
        <div id='bottom-section'>
            <textarea
                rows='4'
                id='description-area'
                placeholder={placeholderText}
                value={textAreaValue}
                onChange={handleTextAreaChanges}
                onFocus={handleOnFocused}
                maxLength='11'
                onBlur={() => setPlaceholderText('Description')}
            />
            <div
                id='description-div-corrected'
                className='div-border-highlight'
            >
                <span className='div-headers' id='tag-text'>Description</span>
                <span style={{ color: 'silver' }}>{textAreaValue.length}/1,000</span>
            </div>
            <a href='#' target='_blank'>What is alt text?</a>
        </div>
    )
}

let style = {
    transform: 'scale(.9)',
    display: 'flex'
}

let originalSizeIcon = (shapedClicked) => <svg width='24px' height='24px' className={shapedClicked == 'original' ? 'shape-active' : ''}><g><path d="M19.75 19.944H4.25c-1.24 0-2.25-1.01-2.25-2.25V6.306c0-1.24 1.01-2.25 2.25-2.25h15.5c1.24 0 2.25 1.01 2.25 2.25v11.39c0 1.24-1.01 2.248-2.25 2.248zM4.25 5.556c-.413 0-.75.337-.75.75v11.39c0 .412.337.75.75.75h15.5c.413 0 .75-.338.75-.75V6.305c0-.413-.337-.75-.75-.75H4.25z"></path></g></svg>

let wideAngleIcon = (shapedClicked) => <svg width='24px' height='24px' className={shapedClicked == 'wide' ? 'shape-active' : ''}><g><path d="M19.75 19.89H4.25C3.01 19.89 2 18.88 2 17.64v-7.28c0-1.24 1.01-2.25 2.25-2.25h15.5c1.24 0 2.25 1.01 2.25 2.25v7.277c0 1.24-1.01 2.25-2.25 2.25zM4.25 9.61c-.413 0-.75.338-.75.75v7.278c0 .413.337.75.75.75h15.5c.413 0 .75-.337.75-.75V10.36c0-.412-.337-.75-.75-.75H4.25z"></path></g></svg>

let sqaureSizeIcon = (shapedClicked) => <svg width='24px' height='24px' className={shapedClicked == 'squared' ? 'shape-active' : ''}><g><path d="M19.75 22H4.25C3.01 22 2 20.99 2 19.75V4.25C2 3.01 3.01 2 4.25 2h15.5C20.99 2 22 3.01 22 4.25v15.5c0 1.24-1.01 2.25-2.25 2.25zM4.25 3.5c-.413 0-.75.337-.75.75v15.5c0 .413.337.75.75.75h15.5c.413 0 .75-.337.75-.75V4.25c0-.413-.337-.75-.75-.75H4.25z"></path></g></svg>

let zoomOutIcon = () => <svg width='24px' height='24px' style={style}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path><path d="M14.46 11.75H7.54c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.92c.415 0 .75.336.75.75s-.335.75-.75.75z"></path></g></svg>

let zoomInIcon = () => <svg width='24px' height='24px' style={style}><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path><path d="M15.21 11c0 .41-.34.75-.75.75h-2.71v2.71c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2.71H7.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.71V7.54c0-.41.34-.75.75-.75s.75.34.75.75v2.71h2.71c.41 0 .75.34.75.75z"></path></g></svg>

let cropIcon = () => <svg width='24px' height='24px'><g><path d="M3.5 5.25H2c-.414 0-.75.336-.75.75s.336.75.75.75h1.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm18.5 12H7.5c-.414 0-.75-.337-.75-.75V2c0-.414-.336-.75-.75-.75s-.75.336-.75.75v14.5c0 1.24 1.01 2.25 2.25 2.25H22c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-4 2.5c-.414 0-.75.336-.75.75V22c0 .414.336.75.75.75s.75-.336.75-.75v-1.5c0-.414-.336-.75-.75-.75z"></path><path d="M8.5 6.75h8c.414 0 .75.337.75.75v8c0 .414.336.75.75.75s.75-.336.75-.75v-8c0-1.24-1.01-2.25-2.25-2.25h-8c-.414 0-.75.336-.75.75s.336.75.75.75z"></path></g></svg>

export default EditTweetMediaContents