import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router';
import { deleteIcon, scheduleIcon, selectIcon } from '../svg-resources'

function TweetScheduler({ isScheduleIconClicked, handleToggle, setScheduleStamp }) {
    let [month, setMonth] = useState('January');
    let [day, setDay] = useState(1);
    let [year, setYear] = useState(2021);
    let [hour, setHour] = useState(11)
    let [minute, setMinute] = useState(22)
    let [amPm, setAmPm] = useState('AM')
    let history = useHistory()

    let handleConfirm = () => {
        setScheduleStamp(<div id='annnounce-schedule'>
            <span id='schedule-svg'>{scheduleIcon('silver')}</span> <span id='annonunce-text'>{getFormattedDateString(month, day, year, hour, minute, amPm)}</span>
        </div>)
        history.push('/tweet/compose');
        handleToggle()
    }

    let handleCloseScheduledModal = () => history.goBack()

    return (
        <div id='tweet-scheduler-container' style={{ display: isScheduleIconClicked ? 'block' : 'none' }}>
            <div id='top-section'>
                {/* <div className='left-side'><span id='delete-icon' onClick={handleToggle}>{deleteIcon()}</span> <span className='header-text'>Schedule</span></div> */}
                <div className='left-side'><span id='delete-icon' onClick={handleCloseScheduledModal}>{deleteIcon()}</span> <span className='header-text'>Schedule</span></div>
                <div className='right-side'>
                    <input type='button' value='Confirm' onClick={handleConfirm} />
                </div>
            </div>
            <hr />
            <div id='mid-section'>
                <div id='annnounce-schedule'>
                    <span id='schedule-svg'>{scheduleIcon('silver')}</span> <span id='annonunce-text'>{getFormattedDateString(month, day, year, hour, minute, amPm)}</span>
                </div>
                <DateSelection month={month} setMonth={setMonth} day={day} setDay={setDay} year={year} setYear={setYear} />

                <TimeSelection hour={hour} setHour={setHour} minute={minute} setMinute={setMinute} amPm={amPm} setAmPm={setAmPm} />
            </div>
            <div id='bottom-section'>
                <div className='header-text'>Time Zone</div>
                {getTimeZoneName()}
            </div>
            <div id='schedule-footer-section'>
                <a id='sceduled-tweets' href='#' target='_blank'>sceduled tweets</a>
            </div>
        </div>
    )
}

let DateSelection = ({ month, setMonth, day, setDay, year, setYear }) => {
    // let [month, setMonth] = useState('January');

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
                <GenerateSelector title="Days" value={day} options={allDays} handleChange={setDay} />
                <GenerateSelector title="Years" value={year} options={allYears} handleChange={setYear} />
            </div>
        </div>
    )
}

let TimeSelection = ({ hour, setHour, minute, setMinute, amPm, setAmPm }) => {

    let generateOptions = data => data.map(val => <option key={val} value={val}>{val}</option>)
    let generateData = (start, end, doubled) => Array(end - start + 1).fill().map((_, idx) => {
        if (doubled) {
            return start + idx < 10 ? '0' + (start + idx) : start + idx
        } else {
            return start + idx
        }
    })

    let allHours = generateOptions(generateData(1, 12));
    let allMinutes = generateOptions(generateData(0, 59, true));
    let justAmPm = generateOptions(['AM', 'PM']);

    return <div id='time-selection'>
        <div id='header-text'>Time</div>
        <div id='time-scrolls'>
            <GenerateSelector title="Hour" value={hour} options={allHours} handleChange={setHour} />
            <GenerateSelector title="Minute" value={minute} options={allMinutes} handleChange={setMinute} />
            <GenerateSelector title="AM/PM" value={amPm} options={justAmPm} handleChange={setAmPm} />
        </div>
    </div>
}

let GenerateSelector = ({ title, value, options, handleChange }) => {
    // title == 'AM/PM' ? "twelve-hours" : title
    return <div id={title} className='scroll-container'>
        <div className='top-side'>
            <p className='title'>{title}</p>
            {/* <p className='select-svg'>{selectIcon()}</p> */}
            {/* will be using css to generate this svg instead */}
            <p className='select-svg'></p>
        </div>

        <select value={value} onChange={(evt) => handleChange(evt.target.value)}>
            {options}
        </select>

    </div>
}

let getTimeZoneName = () => {
    let today = new Date();
    let short = today.toLocaleDateString(undefined);
    let long = today.toLocaleDateString(undefined, { timeZoneName: 'long' })
    return long.split(', ')[1]
}

let getFormattedDateString = (month, day, year, hrs, min, amPm) => {
    hrs = hrs == 12 ? 0 : hrs;
    // hrs = amPm == 'PM' || 'pm' && parseInt(hrs, 10) + 12
    if(amPm == 'PM') hrs = parseInt(hrs, 10) + 12
    hrs = hrs > 24 ? hrs - 24 : hrs

    let dateAndTimeString = `${month}/${day}/${year} ${hrs}:${min}`
    let dateString = new Date(dateAndTimeString);
    // console.log(dateString.toString(), 'from scheduled', amPm)
    // return dateString.toString().split(' (')[0]
    return dateString.toString()
}

export default TweetScheduler