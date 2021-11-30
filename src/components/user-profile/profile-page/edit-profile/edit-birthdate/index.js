import React, { useEffect, useState } from 'react'
import '../../edit-profile/styles.css'

function EditBirthdate({item, convertDateIntoString}) {
    let handleDelete = (evt) => console.log('here!!')
    return (
        <div id='birthdate-edit-container'>
            <p id='birthdate-info'>This should be your date of birth, whether this account is for your business, event, or even your cat.</p>
            <DateComponent item={item} convertDateIntoString={convertDateIntoString} />
            <div id='remove-birthdate' onClick={handleDelete}>Remove Birthdate</div>
        </div>
    )
}

// let DeleteBirthdate = (evt) => {
//     console.log('delete birthdate!!', evt)
// }

let DateComponent = ({item, convertDateIntoString, showCalendar}) => {
    let [month, setMonth] = useState('')
    let [day, setDay] = useState('')
    let [year, setYear] = useState('')
    let [dateString, setDateString] = useState('')

    useEffect(() => {
        let dateToken = item.content.split(/[\s ,]/).filter(v => v)
        setMonth(dateToken[0])
        setDay(dateToken[1])
        setYear(dateToken[2])
    }, [])
    
    useEffect(() => month && day && year && setDateString(`${month}-${day}-${year}`), [month, day, year])

    useEffect(() => dateString && convertDateIntoString(dateString), [dateString])

    let monthsAndDays = [{ month: ' ', days: ' ' }, { month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]

    let findHowManyDays = month => monthsAndDays.filter(item => item.month == month).map(item => item.days)[0]

    let handleChanges = (evt) => {
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
        <div className='select-component-wrapper' style={{width: title == 'Month' ? '233px' : title == 'Day' ? '99px' : '137px', textAlign: 'left', paddingLeft: '4px'}}>
            <div className='top'>
                <div className='title-header' style={{color: 'silver', fontSize: 'small'}}>{title}</div>
                {/* <div className='dropdown-svg' style={{position: 'absolute', right: '2px', top: '15px'}}>{dropDownSvg()}</div> */}
                {/* <div className='dropdown-svg' style={{position: 'absolute', right: '2px', top: '15px', content: `${dropDownSvg()}`}}></div> */}
            </div>
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
    let daysOptions = Array.from(Array(days + 1).keys()).map(val => <option key={val} value={val} disabled={val == ' '}>{val ? val : ' '}</option>)
    return <select id='days' onChange={handleChanges} value={value ? value : ' '}>{daysOptions}</select>
}

let YearsComponentForDate = ({ handleChanges, value }) => {
    let getCurrentYear = new Date().getFullYear()
    let yearsRange = (start, end) => Array((end - start) + 1).fill().map((_, idx) => start + idx)
    let allYears = yearsRange(1900, getCurrentYear)
    let yearsOptions = allYears.map(val => <option key={val} value={val} disabled={val == '1900'}>{val != '1900' ? val : ' '}</option>)

    return <select id='years' onChange={handleChanges} value={value}>{yearsOptions}</select>
}

let dropDownSvg = () => <svg width='24px' height='24px'><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>

export default EditBirthdate
