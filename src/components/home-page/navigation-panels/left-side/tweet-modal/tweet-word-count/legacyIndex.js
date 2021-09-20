import React, { useEffect, useState } from 'react'
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TweetWordCount({wordCount}) {
    let [circumference, setCircumference] = useState(0)
    let [offset, setOffset] = useState(0);

    // Step 2: Adding the stroke, to animate the length of the outer line of our ring to simulate visual progress.
    // We are going to use two CSS properties, they are exclusive to SVG elements, stroke-dasharray and stroke-dashoffset

    // stroke-dasharray property is like border-style: dashed but it lets you define the width of the dashes and the gap between them.
    // stroke-dasjoffset allows us to move the starting point of this dash-gap sequence along the path of the SVG element

    // if we passed the circle’s circumference to both stroke-dasharray values. Our shape would have one long dash occupying the whole length and a gap of the same length which wouldn’t be visible
    // if we also set to the stroke-dashoffset the same length, then the long dash will move all the way, decreasing it will start to reveal our svg shape

    // Circumference, What we need now is that length which can be calculated with the radius and this simple trigonometric formula
    // circumference = radius * 2 * PI

    let radius = 20, stroke = 4;
    let normalizedRadius = radius - stroke * 2;

    useEffect(()=> {
        setCircumference(normalizedRadius * 2 * Math.PI);
        let newOffset = circumference - wordCount / 100 * circumference;
        setOffset(newOffset);
        console.log(wordCount, offset, circumference)
    })

    return (
        <div className="progressbar-wrapper">
            <CircleSvg radius={radius} circumference={circumference} offset={offset} stroke={stroke} normalizedRadius={normalizedRadius} />
        </div>
    )
}

// Step 1: Let’s make an SVG ring  radius = (width / 2) - (strokeWidth * 2)
let CircleSvg = ({radius, circumference, offset, stroke, normalizedRadius}) => <svg className='progress-ring' width='56' height='56'><circle className='progress-ring-circle' stroke='white' fill='aqua' strokeDasharray={circumference +' '+ circumference} style={{strokeDashoffset: offset, transformOrigin: '50%, 50%'}} strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} /></svg>

export default TweetWordCount


/**
 * 
 * 
 function TweetWordCount() {
    let [circumference, setCircumference] = useState(0)
    let [radius, setRadius] = useState(20);
    let [stroke, setStroke] = useState(4);
    let [offset, setOffset] = useState(0);

    // Step 2: Adding the stroke, to animate the length of the outer line of our ring to simulate visual progress.
    // We are going to use two CSS properties, they are exclusive to SVG elements, stroke-dasharray and stroke-dashoffset

    // stroke-dasharray property is like border-style: dashed but it lets you define the width of the dashes and the gap between them.
    // stroke-dasjoffset allows us to move the starting point of this dash-gap sequence along the path of the SVG element

    // if we passed the circle’s circumference to both stroke-dasharray values. Our shape would have one long dash occupying the whole length and a gap of the same length which wouldn’t be visible
    // if we also set to the stroke-dashoffset the same length, then the long dash will move all the way, decreasing it will start to reveal our svg shape

    // Circumference, What we need now is that length which can be calculated with the radius and this simple trigonometric formula
    // circumference = radius * 2 * PI
    // let circleElem = document.querySelector('.progress-ring-circle');

    let normalizedRadius = radius - stroke * 2;

    // setCircumference(normalizedRadius * 2 * Math.PI);
    useEffect(()=> setCircumference(normalizedRadius * 2 * Math.PI))

    // Step 3: Progress to offset
    // we know that assigning the circumference value to stroke-dashoffset will reflect the status of zero progress and the 0 value will indicate progress is complete.
    // Therefore, as the progress grows we need to reduce the offset like this:
    let updateProgress = percent => {
        let offset = circumference - percent / 100 * circumference;
        setOffset(offset);
        // circleElem.style.strokeDashoffset = offset;
        console.log(percent, offset, circumference)
    }


    return (
        <div className="progressbar-wrapper" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <input type='number' onChange={(evt) => updateProgress(evt.target.value)} />
            <CircleSvg radius={radius} circumference={circumference} offset={offset} stroke={stroke} normalizedRadius={normalizedRadius} />
        </div>
    )
}

// Step 1: Let’s make an SVG ring  radius = (width / 2) - (strokeWidth * 2)
// let CircleSvg = () => <svg className='progress-ring' width='56' height='56'><circle className='progress-ring-circle' stroke='white' fill='aqua' strokeWidth='4' r='18' cx='22' cy='22' /></svg>
let CircleSvg = ({radius, circumference, offset, stroke, normalizedRadius}) => <svg className='progress-ring' width='56' height='56'><circle className='progress-ring-circle' stroke='white' fill='aqua' strokeDasharray={circumference +' '+ circumference} style={{strokeDashoffset: offset}} strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} /></svg>
 * 
 * 
 function TweetWordCount() {
    let [circumference, setCircumference] = useState(0)
    let [radius, setRadius] = useState(0);
    let [stroke, setStroke] = useState(4);
    let [offset, setOffset] = useState(0);

    // Step 2: Adding the stroke, to animate the length of the outer line of our ring to simulate visual progress.
    // We are going to use two CSS properties, they are exclusive to SVG elements, stroke-dasharray and stroke-dashoffset

    // stroke-dasharray property is like border-style: dashed but it lets you define the width of the dashes and the gap between them.
    // stroke-dasjoffset allows us to move the starting point of this dash-gap sequence along the path of the SVG element

    // if we passed the circle’s circumference to both stroke-dasharray values. Our shape would have one long dash occupying the whole length and a gap of the same length which wouldn’t be visible
    // if we also set to the stroke-dashoffset the same length, then the long dash will move all the way, decreasing it will start to reveal our svg shape

    // Circumference, What we need now is that length which can be calculated with the radius and this simple trigonometric formula
    // circumference = radius * 2 * PI
    // let circleElem = document.querySelector('.progress-ring-circle');
    let circleElem

    // let normalizedRadius = radius - stroke * 2;

    // setCircumference(normalizedRadius * 2 * Math.PI);

    useEffect(() => {
        circleElem = document.querySelector('.progress-ring-circle');
        let radius = circleElem.r.baseVal.value;
        setRadius(radius);
        // let circumference = radius * 2 * Math.PI;
        // setCircumference(radius * 2 * Math.PI);
        // let stroke = circleElem
        // console.log(stroke, "??")
        // This way we can later assign styles to our circle element.
        // circleElem.style.strokeDashArray = `${circumference} ${circumference}`;
        // circleElem.style.strokeDashoffset = circumference;
        // console.log(circumference, circleElem);
        let normalizedRadius = radius - stroke * 2;
        setRadius(normalizedRadius);

        setCircumference(normalizedRadius * 2 * Math.PI);

    });

    // Step 3: Progress to offset
    // we know that assigning the circumference value to stroke-dashoffset will reflect the status of zero progress and the 0 value will indicate progress is complete.
    // Therefore, as the progress grows we need to reduce the offset like this:
    let updateProgress = percent => {
        let offset = circumference - percent / 100 * circumference;
        setOffset(offset);
        circleElem.style.strokeDashoffset = offset;
        console.log(percent, offset, circumference)
    }


    return (
        <div className="progressbar-wrapper">
            <input type='number' onChange={(evt) => updateProgress(evt.target.value)} />
            <CircleSvg radius={radius} circumference={circumference} offset={offset} stroke={stroke} />
        </div>
    )
}
 * 
 * 
 function TweetWordCount() {
   let [percentage, setPercentage] = useState(0)
    useEffect(() => {
        setInterval(() => {
            if (percentage == 100) {
                clearInterval();
            } else {
                setPercentage(percentage + 10)
            }
        }, 100);
    }, [percentage])
    return (
        <div className="progressbar-wrapper">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
    )
}
 * 
 * 
 function TweetWordCount() {
    let counter = 0;
    useEffect(() => {
        const numb = document.querySelector(".number");
        setInterval(() => {
            if (counter == 100) {
                clearInterval();
            } else {
                counter += 1;
                numb.textContent = counter + "%";
            }
        }, 100);
    }, [])
    return (
        <div class="circular">
            <div class="inner"></div>
            <div class="number">100%</div>
            <div class="outer">
                <div class="progress" role='progressbar'></div>
            </div>
        </div>
    )
}
 *
 *
 function TweetWordCount() {
    let counter = 0;
    useEffect(() => {
        const numb = document.querySelector(".number");
        setInterval(() => {
            if (counter == 100) {
                clearInterval();
            } else {
                counter += 1;
                numb.textContent = counter + "%";
            }
        }, 100);
    }, [])
    return (
        <div class="circular">
            <div class="inner"></div>
            <div class="number">100%</div>
            <div class="circle">
                <div class="bar left">
                    <div class="progress"></div>
                </div>
                <div class="bar right">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
    )
 *
 *
 function TweetWordCount() {
    return (
        <div className="wrapper" data-anim="base wrapper">
            <div className="circle" data-anim="base left"></div>
            <div className="circle" data-anim="base right"></div>
        </div>
    )
}
 *
 *
 function TweetWordCount() {
    let interval;
    useEffect(() => {
        let wordCount = document.querySelector('#word-count');
        let counterContainer = document.querySelector('#tweet-word-count-container');
        interval = setInterval(() => {
            if(wordCount.clientWidth >= counterContainer.clientWidth) {
                clearInterval(interval)
            }
            // wordCount.style.width = wordCount.offsetWidth+1+'px'
            wordCount.style.width = wordCount.offsetWidth+1+'px'
        }, 20)
    })
    return (
        <div id='tweet-word-count-container'>
            <div id='word-count'></div>
        </div>
    )
}
 */