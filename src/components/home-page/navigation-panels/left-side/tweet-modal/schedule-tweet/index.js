import React, { useEffect } from 'react'
import { useState } from 'react'
import { deleteIcon, scheduleIcon, selectIcon } from '../../svg-resources'

function TweetScheduler({ isIconClicked }) {
    // style={{display: isIconClicked ? 'block' : 'none'}}
    return (
        <div id='tweet-scheduler-container'>
            <div id='top-section'>
                <span id='delete-icon'>{deleteIcon()}</span>
                <hr />
            </div>
            <div id='mid-section'>
                <div id='annnounce-schedule'>
                    <span id='schedule-svg'>{scheduleIcon()}</span> <span id='annonunce-text'>time date Day timezone</span>
                </div>
                <DateSelection />

            </div>
        </div>
    )
}

let DateSelection = () => {
    let [month, setMonth] = useState('January');

    let years = [2020, 2021, 2022, 2023]

    let monthsAndDays = [{ month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]

    let allMonths = monthsAndDays.map(item => <option key={item.month} value={item.month}>{item.month}</option>)

    let allYears = years.map(year => <option key={year} value={year}>{year}</option>)

    let allDays;

    let curateDays = () => {
        monthsAndDays.map(item => {
            if (item.month == month) {
                allDays = Array.from(Array(item.days + 1).keys()).filter(val => val).map(val => <option key={val} value={val}>{val}</option>)
            }
        })
    }

    curateDays();

    useEffect(() => {
        let allSelects = document.querySelectorAll('.right-side');
        allSelects.forEach(node => node.selectedIndex = -1);
    })

    return (
        <div id='date-selection'>
            <div id='header-text'>Date</div>
            <div id='date-scrolls'>
                <GenerateSelector title="Month" value={month} options={allMonths} handleChange={setMonth} />
                <GenerateSelector title="Days" value="Days!!" options={allDays} />
                <GenerateSelector title="Years" value="Years!!" options={allYears} />
            </div>
        </div>
    )
}

let GenerateSelector = ({ title, value, options, handleChange }) => {
    return <div id={title} className='scroll-container'>
        <div className='top-side'>
            <p className='title'>{title}</p>
            <p className='select-svg'>{selectIcon()}</p>
        </div>
        
        <select value={value} onChange={(evt) => handleChange(evt.target.value)}>
            {options}
        </select>

    </div>
}

export default TweetScheduler


/**
 * 
 * 
 let GenerateSelector = ({ title, value, options, handleChange }) => {
    return <div id={title} className='scroll-container'>
        <div className='left-side'>
            <p className='title'>{title}</p>
            <p className='value'>{value}</p>
        </div>
        <select className='right-side' value={value} onChange={(evt) => handleChange(evt.target.value)}>
            {options}
        </select>
    </div>
}
 *
 *
 let DateSelection = () => {
    let [month, setMonth] = useState('January');
    // let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let years = [2020, 2021, 2022, 2023]
    let monthsAndDays = [{ month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]

    let allMonths = monthsAndDays.map(item => <option key={item.month} value={item.month}>{item.month}</option>)

    // let allDays = monthsAndDays.map((item) => Array.from(Array(item.days + 1)).map(val => <option key={val} value={val}>{val}</option>))

    // let allDays = monthsAndDays.map((item) => getAnArray(1, item.days).map(val => <option value={val}>{val}</option>))

    // let getAnArray = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx)

    let allYears = years.map(year => <option key={year} value={year}>{year}</option>)

    // console.log(allDays);
    let allDays;

    let curateDays = () => {
        monthsAndDays.map(item => {
            if(item.month == month) {
                allDays = Array.from(Array(item.days + 1).keys()).filter(val => val).map(val => <option key={val} value={val}>{val}</option>)
                // allDays = Array.from(Array(item.days + 1).keys()).map(val => <option key={val} value={val}>{val}</option>)
                // allDays = Array.from(Array(item.days + 1).keys())
                // console.log(allDays);
            }
        })
    }

    curateDays();

    return (<div id='date-selection'>
        {/* <div id='select-month'>
            <div className='left-side'>
                <p>Month</p>
                <p>Month!!</p>
            </div>
            <select className='right-side'>
                {allMonths}
            </select>
        </div>
        <div id='select-day'></div>
        <div id='select-year'></div> }

        <GenerateSelector title="Month" value={month} options={allMonths} handleChange={setMonth} />
        <GenerateSelector title="Days" value="Days!!" options={allDays} />
        <GenerateSelector title="Years" value="Years!!" options={allYears} />
    </div>)
}

let GenerateSelector = ({ title, value, options, handleChange }) => {
    // let makeChange = () => console.log()
    return <div id={title}>
        <div className='left-side'>
            <p>{title}</p>
            <p>{value}</p>
        </div>
        <select className='right-side' value={value} onChange={(evt) => handleChange(evt.target.value)}>
            {options}
        </select>
    </div>
}
 */