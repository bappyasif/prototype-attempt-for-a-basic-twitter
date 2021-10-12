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
        // console.log(wordCount, offset, circumference)
    }, [wordCount])

    return (
        <div className="progressbar-wrapper">
            <CircleSvg radius={radius} circumference={circumference} offset={offset} stroke={stroke} normalizedRadius={normalizedRadius} />
        </div>
    )
}

let CircleSvg = ({radius, circumference, offset, stroke, normalizedRadius}) => <svg className='progress-ring' width='56' height='56'><circle className='progress-ring-circle' stroke='white' fill='aqua' strokeDasharray={circumference +' '+ circumference} style={{strokeDashoffset: offset, transformOrigin: '50%, 50%'}} strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} /></svg>

export default TweetWordCount