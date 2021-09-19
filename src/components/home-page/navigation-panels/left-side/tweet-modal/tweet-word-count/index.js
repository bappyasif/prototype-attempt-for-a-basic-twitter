import React, { useEffect } from 'react'
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function TweetWordCount() {
    let percentage = 20;
    // useEffect(() => {
    //     setInterval(() => {
    //         if (percentage == 100) {
    //             clearInterval();
    //         } else {
    //             percentage += 1;
    //         }
    //     }, 100);
    // }, [percentage])
    return (
        <div className="progressbar-wrapper">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
    )
}

export default TweetWordCount


/**
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