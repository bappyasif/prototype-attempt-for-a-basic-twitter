import React, { useEffect, useRef, useState } from 'react'
import './styles.css'

function SignupPage() {
    let [isPhoneNumberUsed, setIsPhoneNumberUsed] = useState(false);
    let [month, setMonth] = useState('January');
    let [date, setDate] = useState('');
    let [year, setYear] = useState('');
    let [name, setname] = useState('');
    let [emailOrPassword, setEmailOrPassword] = useState('')
    let [step, setStep] = useState(1);
    let nameRef = useRef(null);
    let testRef = React.createRef();

    let handleSelectElementChanges = evt => {
        let whichSelectElement = evt.target.id;
        let value = evt.target.value;

        if (whichSelectElement.includes('Month')) {
            setMonth(value)
        } else if (whichSelectElement.includes('Date')) {
            setDate(value)
        } else if (whichSelectElement.includes('Year')) {
            setYear(value)
        }
    }

    let handleGoNextButton = () => {
        if (step == 1) {
            setStep(2)
        } else if (step == 2) {
            setStep(3)
        } else if (step == 3) {
            setStep(4)
        } else if (step == 4) {
            setStep(5)
        }
    }

    let handleFocused = () => {
        // setStep(1);
        testRef.current.focus();
        // nameRef.current.focus();
        // console.log(testRef, testRef.current, testRef.current.focus(), '>?')
        console.log(testRef, testRef.current, '>?')
    }

    return (
        <div id='signup-page-container'>
            <div id='top-div'>
                {step == 1 && <div id='remove-modal'> {removeIcon()} </div>}
                {step != 1 && <div id='remove-modal' onClick={() => setStep(step - 1)}> {backIcon()}  <span>{step + 'of 5'}</span> </div>}
                <div id='twitter-logo'> {twitterLogo()} </div>
            </div>
            {
                step == 1
                &&
                <div id='user-info-div'>
                    <h2>Create your account</h2>
                    <div id='first-half'>
                        <ReturnRevampedInputElement name="Name" maxLength={50} updateValue={setname} value={name} ref={testRef} />
                        <ReturnRevampedInputElement name={isPhoneNumberUsed ? "Email address" : "Phone number"} updateValue={setEmailOrPassword} value={emailOrPassword} />
                        {/* <ReturnAnInputElement name="Name" maxLength={50} updateValue={setname} value={name} ref={nameRef} />
                        <ReturnAnInputElement name={isPhoneNumberUsed ? "Email address" : "Phone number"} updateValue={setEmailOrPassword} value={emailOrPassword} /> */}
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
            }
            {
                step == 2
                &&
                <div id='customize-your-experience-container'>
                    <h2>Customize your experience</h2>
                    <h4>Track where you see Twitter content across the web</h4>
                    <label htmlFor='experience-checkbox'>
                        Twitter uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.
                    </label>
                    <input type='checkbox' id='experience-checkbox' defaultChecked style={{ width: 'fit-content', marginLeft: '8px' }} />
                    <p style={{ marginLeft: '26px' }}>For more details about these settings, visit the <a style={{ color: 'rgba(29, 155, 240, 1)' }} href='https://help.twitter.com/en/managing-your-account/new-account-settings' target='_blank'>Help Center</a>.</p>
                </div>
            }

            {
                step == 3
                &&
                <div id='signup-confirmation-container'>
                    <h2>Create your account</h2>
                    {/* <ReturnAnInputVisual name="Name" value={name} /> */}
                    {/* <ReturnRevampedInputElement name="Name" maxLength={50} updateValue={setname} value={name} handleFocused={handleFocused} ref={testRef} /> */}
                    {/* <ReturnRevampedInputElement name={isPhoneNumberUsed ? "Email address" : "Phone number"} updateValue={setEmailOrPassword} value={emailOrPassword} /> */}
                    <Test name='Name' value={name} focused={handleFocused} ref={testRef} />
                </div>
            }

            <button id='bottom-div' className={(name && emailOrPassword) ? 'ready' : 'not-ready'} onClick={handleGoNextButton}>Next</button>
        </div>
    )
}

let Test = React.forwardRef((props, ref) => {
    // console.log(props, ref)
    let { name, value, focused } = { ...props }
    return <div className='an-input-visual-container'>
        <div className='header-title'>{name}</div>
        <input defaultValue={value} onFocus={focused} ref={ref} />
    </div>
})

let ReturnAnInputVisual = ({ name, value, focused }) => {
    return <div className='an-input-visual-container'>
        <div className='header-title'>{name}</div>
        <input defaultValue={value} onFocus={focused} />
    </div>
}

let ReturnASelectElement = ({ data, name, handleChnage, whichMonth, ref }) => {
    let [focused, setFocused] = useState(false);
    let selectRef = useRef(null);

    let monthsAndDays = [{ month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]

    let findEndDateRange = whichMonth && monthsAndDays.filter(item => item.month == whichMonth).map(item => item.days)[0]

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

    if (name == 'Date') data = range(1, findEndDateRange, 1)

    if (name == 'Year') data = range(1901, 2021, 1).reverse()

    let renderSelectElementOptions = data.map(item => <option key={item} value={item} onSelect={() => setFocused(false)}>{item}</option>)

    let handleRef = () => {
        selectRef.current.click()
        // console.log(selectRef, selectRef.current, selectRef.current.click(), selectRef.current.focus())
    }

    // useOnClickOutside(selectRef, () => setFocused(false))

    return (
        <div className='select-element-container' style={{ border: focused && 'solid .11em aqua' }}>
            <div className='left-side'>
                <div className='element-header'>{name}</div>
                <select id={name + '-select'} onChange={handleChnage} ref={selectRef} onMouseUp={() => setFocused(false)} onMouseDown={() => setFocused(true)} onBlur={() => setFocused(false)}>
                    {renderSelectElementOptions}
                </select>
            </div>
            <span className='dropdown-icon' onClick={handleRef}>{dropdownIcon()}</span>
        </div>
    )
}

let ReturnRevampedInputElement = React.forwardRef((props, ref) => {
    let { type, name, maxLength, updateValue, value, handleFocused } = { ...props }
    let [focused, setFocused] = useState(false);

    let hgandleChange = evt => {
        updateValue(evt.target.value)
    }

    console.log(props, ref)
    let handlingFocus = () => {
        setFocused(true)
        handleFocused && handleFocused()
    }

    return (
        <div className='custom-input-component-container'>
            <div className='component-header'>
                <div className='header-title'>{name}</div>
                {maxLength && <div className='word-counts' style={{ display: focused ? 'block' : 'none' }}>{value.length}/{maxLength}</div>}
            </div>
            <input ref={ref && ref} type={type ? type : 'text'} maxLength={maxLength ? maxLength : null} value={value} onChange={hgandleChange} onFocus={handlingFocus} onBlur={() => setFocused(false)} />
        </div>
    )
})

let ReturnAnInputElement = ({ type, name, maxLength, updateValue, value, ref }) => {
    let [focused, setFocused] = useState(false);

    let hgandleChange = evt => {
        updateValue(evt.target.value)
    }
    return (
        <div className='custom-input-component-container'>
            <div className='component-header'>
                <div className='header-title'>{name}</div>
                {maxLength && <div className='word-counts' style={{ display: focused ? 'block' : 'none' }}>{value.length}/{maxLength}</div>}
            </div>
            <input ref={ref} type={type ? type : 'text'} maxLength={maxLength ? maxLength : null} value={value} onChange={hgandleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        </div>
    )
}

let allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let backIcon = () => <svg width='24px' height='24px'><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

let dropdownIcon = () => <svg width='24px' height='24px'><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>

let twitterLogo = () => <svg width='24px' height='24px'><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>

let removeIcon = () => <svg width='24px' height='24px'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default SignupPage