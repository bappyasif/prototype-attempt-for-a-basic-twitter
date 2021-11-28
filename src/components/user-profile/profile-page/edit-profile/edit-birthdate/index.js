import React, { useState } from 'react'
import '../../edit-profile/styles.css'

function EditBirthdate() {
    return (
        <div id='birthdate-edit-container'>
            <p id='birthdate-info'>This should be your date of birth, whether this account is for your business, event, or even your cat.</p>
            <DateComponent />
        </div>
    )
}

let DateComponent = () => {
    let [month, setMonth] = useState('')
    let [day, setDay] = useState('')
    let [year, setYear] = useState('')

    let monthsAndDays = [{ month: ' ', days: ' ' }, { month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]
    // let allMonths = monthsAndDays.filter(item=>item.month).map(month => <option key={month} value={month}>{month}</option>)
    // let extractOptions = (arr, kind) => arr.filter(item => item[kind]).map(vals => <option key={vals[kind]} disabled={vals[kind] == ' '}>{vals[kind]}</option>)
    // let extractOptions = (arr, kind) => <select>{arr.filter(item => item[kind]).map(val => <option key={val}>{val}</option>)}</select>
    // let extractOptions = (arr, kind) => arr.filter(item => {
    //     console.log(item[kind])
    //     return item[kind]
    // }).map(val => {
    //     console.log(val[kind],'!!')
    //     return val
    // })

    // let allMonths = extractOptions(monthsAndDays, 'month')
    // let allDays = extractOptions(monthsAndDays, 'days')

    let findHowManyDays = month => monthsAndDays.filter(item => item.month == month).map(item => item.days)[0]

    // console.log(allMonths, allDays, 'months and days!!', findHowManyDays(month || 'February'))

    let handleChanges = (evt) => {
        // console.log(evt.target.id, evt.target.value)
        let whichElement = evt.target.id;
        let value = evt.target.value;

        if (whichElement == 'months') {
            setMonth(value)
        } else if (whichElement == 'days') {
            setDay(value)
        } else if (whichElement == 'years') {
            setYear(value)
        }
    }

    return (
        <div id='date-component-container'>
            {/* <select id='months' onChange={handleChanges} value={month}>{allMonths}</select> */}
            {/* <select>{allDays}</select> */}

            {/* <MonthComponentForDate handleChanges={handleChanges} value={month} monthsAndDays={monthsAndDays} />
            <DaysComponentForDate days={findHowManyDays(month || 'January')} handleChanges={handleChanges} value={day} />
            <YearsComponentForDate handleChanges={handleChanges} value={year} /> */}

            <div id='select-components-container'>
                <MakeVisualsForDateSelectCompoennts title='Month' selectContent={<MonthComponentForDate handleChanges={handleChanges} value={month} monthsAndDays={monthsAndDays} />} />
                <MakeVisualsForDateSelectCompoennts title='Day' selectContent={<DaysComponentForDate days={findHowManyDays(month || 'January')} handleChanges={handleChanges} value={day} />} />
                <MakeVisualsForDateSelectCompoennts title='Year' selectContent={<YearsComponentForDate handleChanges={handleChanges} value={year} />} />
            </div>
        </div>
    )
}

let MakeVisualsForDateSelectCompoennts = ({ selectContent, title }) => {
    return (
        <div className='select-component-wrapper' style={{width: title == 'Month' ? '233px' : title == 'Day' ? '99px' : '137px'}}>
            <div className='top'>{title}</div>
            <div className='bottom'>{selectContent}</div>
        </div>
    )
}

let MonthComponentForDate = ({ handleChanges, value, monthsAndDays }) => {
    let extractOptions = (arr, kind) => arr.filter(item => item[kind]).map(vals => <option key={vals[kind]} disabled={vals[kind] == ' '}>{vals[kind]}</option>)
    let allMonths = extractOptions(monthsAndDays, 'month')
    return <select id='months' onChange={handleChanges} value={value}>{allMonths}</select>
}

let DaysComponentForDate = ({ days, handleChanges, value }) => {
    // console.log(days, 'days!!')
    let daysOptions = Array.from(Array(days + 1).keys()).map(val => <option key={val} value={val}>{val ? val : ' '}</option>)
    // let daysOptions = Array(days).fill().map((_,idx) => console.log(idx+1))
    return <select id='days' onChange={handleChanges} value={value ? value : ' '}>{daysOptions}</select>
}

let YearsComponentForDate = ({ handleChanges, value }) => {
    let getCurrentYear = new Date().getFullYear()
    let yearsRange = (start, end) => Array((end - start) + 1).fill().map((_, idx) => start + idx)
    let allYears = yearsRange(1900, getCurrentYear)
    let yearsOptions = allYears.map(val => <option key={val} value={val}>{val != '1900' ? val : ' '}</option>)

    return <select id='years' onChange={handleChanges} value={value}>{yearsOptions}</select>
}

export default EditBirthdate
