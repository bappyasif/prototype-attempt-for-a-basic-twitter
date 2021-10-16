import React, { useEffect, useRef, useState } from 'react'
import useOnClickOutside from '../navigation-panels/right-side/click-outside-utility-hook/useOnClickOutside';
import './styles.css'

function SignupPage() {
    let [isPhoneNumberUsed, setIsPhoneNumberUsed] = useState(false);
    let [month, setMonth] = useState('January');
    let [date, setDate] = useState('');
    let [year, setYear] = useState('');
    let [name, setname] = useState('');
    let [emailOrPassword, setEmailOrPassword] = useState('')

    // let selectRef = useRef();

    let handleSelectElementChanges = evt => {
        // console.log(evt.target.id, evt.target.value, month)
        let whichSelectElement = evt.target.id;
        let value = evt.target.value;
        
        if(whichSelectElement.includes('Month')) {
            // console.log('here!!')
            setMonth(value)
        } else if(whichSelectElement.includes('Date')) {
            // console.log('here!!')
            setDate(value)
        } else if(whichSelectElement.includes('Year')) {
            // console.log('here!!')
            setYear(value)
        }
    }

    return (
        <div id='signup-page-container'>
            <div id='top-div'>
                <div id='remove-modal'> {removeIcon()} </div>
                <div id='twitter-logo'> {twitterLogo()} </div>
            </div>
            <div id='user-info-div'>
                <h2>Create your account</h2>
                <div id='first-half'>
                    <ReturnAnInputElement name="Name" maxLength={50} updateValue={setname} />
                    <ReturnAnInputElement name={isPhoneNumberUsed ? "Email address" : "Phone number"} updateValue={setEmailOrPassword} />
                    <h4 onClick={() => setIsPhoneNumberUsed(!isPhoneNumberUsed)}>{isPhoneNumberUsed ? 'Use phone number instead' : 'Use email address instead'}</h4>
                </div>
                <div id='second-half'>
                    <h2>Date of birth</h2>
                    <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                    <div id='birth-date-selection-container'>
                        <ReturnASelectElement data={allMonths} name='Month' handleChnage={handleSelectElementChanges} />
                        <ReturnASelectElement data={[]} name='Date' handleChnage={handleSelectElementChanges} whichMonth={month} />
                        <ReturnASelectElement data={[]} name='Year' handleChnage={handleSelectElementChanges} />
                    </div>
                </div>
            </div>
            {/* <div id='bottom-div' style={{pointerEvents: !(name && emailOrPassword && month && date && year) ? 'none' : 'auto'}}>Next</div> */}
            {/* <button id='bottom-div' style={{pointerEvents: !(name && emailOrPassword) ? 'none' : 'auto'}}>Next</button> */}
            <button id='bottom-div' className={(name && emailOrPassword) ? 'ready' : 'not-ready'}>Next</button>
        </div>
    )
}

let ReturnASelectElement = ({ data, name, handleChnage, whichMonth, ref }) => {
    let [focused, setFocused] = useState(false);
    let selectRef = useRef(null);
    
    let monthsAndDays = [{ month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]

    let findEndDateRange = whichMonth && monthsAndDays.filter(item => item.month == whichMonth).map(item=>item.days)[0]

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

    // if (name == 'Date') data = range(1, 30, 1)
    if (name == 'Date') data = range(1, findEndDateRange, 1)

    if (name == 'Year') data = range(1901, 2021, 1).reverse()

    // let test = whichMonth && monthsAndDays.filter(item => item.month == whichMonth).map(item=>item.days)

    // console.log(test, "<>", whichMonth)

    // useEffect(() => console.log(value, '?!'), [!value])

    // let renderSelectElementOptions = data.map(item => <option key={item} value={item} onClick={() => name == 'Month' && setValue(item)}>{item}</option>)
    let renderSelectElementOptions = data.map(item => <option key={item} value={item} onSelect={() => setFocused(false)}>{item}</option>)

    let handleRef = () => {
        selectRef.current.click()
        // selectRef.current.click()
        // setFocused(true)
        console.log(selectRef, selectRef.current, selectRef.current.click(), selectRef.current.focus())
        // console.log(ref.current, ref)
    }

    // useOnClickOutside(selectRef, () => setFocused(false))

    return (
        <div className='select-element-container' style={{border: focused && 'solid .11em aqua'}}>
            <div className='left-side'>
                <div className='element-header'>{name}</div>
                <select id={name + '-select'} onChange={handleChnage} ref={selectRef} onMouseUp={() => setFocused(false)} onMouseDown={() => setFocused(true)} onBlur={() => setFocused(false)}>
                    {renderSelectElementOptions}
                </select>
            </div>
            {/* <span className='dropdown-icon' onClick={handleRef} onBlur={() => setFocused(false)}>{dropdownIcon()}</span> */}
            <span className='dropdown-icon' onClick={handleRef}>{dropdownIcon()}</span>
        </div>
    )
}

let ReturnAnInputElement = ({ type, name, maxLength, updateValue }) => {
    let [value, setValue] = useState('')
    let [focused, setFocused] = useState(false);
    // let hgandleChange = evt => setValue(evt.target.value)
    let hgandleChange = evt => {
        setValue(evt.target.value)
        updateValue(evt.target.value)
    }
    return (
        <div className='custom-input-component-container'>
            <div className='component-header'>
                <div className='header-title'>{name}</div>
                {maxLength && <div className='word-counts' style={{display: focused ? 'block' : 'none'}}>{value.length}/{maxLength}</div>}
            </div>
            <input type={type ? type : 'text'} maxLength={maxLength ? maxLength : null} value={value} onChange={hgandleChange} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} />
        </div>
    )
}

let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let dropdownIcon = () => <svg width='24px' height='24px'><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>

let twitterLogo = () => <svg width='24px' height='24px'><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>

let removeIcon = () => <svg width='24px' height='24px'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default SignupPage
