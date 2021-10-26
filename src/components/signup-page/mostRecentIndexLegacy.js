import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './styles.css'

function SignupPage() {
    let [isPhoneNumberUsed, setIsPhoneNumberUsed] = useState(false);
    let [month, setMonth] = useState('');
    let [date, setDate] = useState('');
    let [year, setYear] = useState('');
    let [name, setname] = useState('');
    let [emailOrPassword, setEmailOrPassword] = useState('')
    let [step, setStep] = useState(1);
    let [focusedWhich, setFocusedWhich] = useState('');
    let [birthDate, setBirthDate] = useState('');
    let nameRef = React.createRef();
    let epRef = React.createRef();
    let birthDateRef = React.createRef();
    // let testRef = React.createRef();
    let birthRef =  useRef();

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
            setBirthDate(`${month.substr(0, 3)} ${date}, ${year}`)
            setStep(2)
        } else if (step == 2) {
            setStep(3)
        } else if (step == 3) {
            setStep(4)
        } else if (step == 4) {
            setStep(5)
        }
    }

    let handleFocused = (evt) => {
        let whichElement = evt.target.name
        setStep(1);
        setFocusedWhich(whichElement)
        // console.log(whichElement, birthDateRef, nameRef)
        // let findEl = document.getElementsByName(`${whichSelectElement}`)[0]
        // console.log(whichSelectElement, findEl, document.body, testRef, test)
        // findEl.focus()
        // testRef.current.focus()
        // test.current.focus()
    }

    useEffect(() => {
        // setTest(testRef)
        // console.log(test, '??')
        // step == 1 && testRef.current.focus()
        step == 1 && focusedWhich == 'Name' && nameRef.current.focus()
        step == 1 && focusedWhich == 'Email or Password' && epRef.current.focus()
        // step == 1 && focusedWhich == 'Birth date' && birthDateRef.current.click()
        step == 1 && focusedWhich == 'Birth date' && birthRef.current.focus()
        // step == 1 && focusedWhich == 'Birth date' && birthDateRef.current.focus()
        // step == 1 && focusedWhich == 'Birth date' && birthDateRef.current.focus() && birthDateRef.current.select()
        // console.log(birthRef, nameRef)
    }, [step])

    return (
        <div id='signup-page-container'>
            <div id='top-div'>
                {step == 1 && <div id='remove-modal'> {removeIcon()} </div>}
                {/* <span>{step + ' of 5'}</span> */}
                {step != 1 && <div id='remove-modal' onClick={() => setStep(step - 1)}> {backIcon()} </div>}
                <div id='twitter-logo'> {twitterLogo()} </div>
            </div>
            {
                step == 1
                &&
                <div id='user-info-div'>
                    <h2>Create your account</h2>
                    <div id='first-half'>
                        <ReturnAnInputElement name="Name" maxLength={50} updateValue={setname} value={name} ref={nameRef} />
                        <ReturnAnInputElement name={isPhoneNumberUsed ? "Email address" : "Phone number"} updateValue={setEmailOrPassword} value={emailOrPassword} ref={epRef} type={isPhoneNumberUsed ? 'email' : 'tel'} />
                        <h4 onClick={() => setIsPhoneNumberUsed(!isPhoneNumberUsed)}>{isPhoneNumberUsed ? 'Use phone number instead' : 'Use email address instead'}</h4>
                    </div>
                    <div id='second-half'>
                        <h2>Date of birth</h2>
                        <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                        <div id='birth-date-selection-container'>
                            {/* <ReturnASelectElement name='Month' handleChnage={handleSelectElementChanges} ref={birthDateRef} /> */}
                            <ReturnASelectElement name='Month' handleChnage={handleSelectElementChanges} ref={birthRef} month={month} />
                            <ReturnASelectElement name='Date' handleChnage={handleSelectElementChanges} whichMonth={month} date={date} />
                            <ReturnASelectElement name='Year' handleChnage={handleSelectElementChanges} year={year} />
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
                    <p>For more details about these settings, visit the <a style={{ color: 'rgba(29, 155, 240, 1)' }} href='https://help.twitter.com/en/managing-your-account/new-account-settings' target='_blank'>Help Center</a>.</p>
                </div>
            }

            {
                step == 3
                &&
                <div id='signup-confirmation-container'>
                    <h2>Create your account</h2>
                    <ReturnAnInputVisual name="Name" value={name} focused={handleFocused} />
                    <ReturnAnInputVisual name="Email or Password" value={emailOrPassword} focused={handleFocused} />
                    <ReturnAnInputVisual name="Birth date" value={birthDate} focused={handleFocused} />
                    <p>By signing up, you agree to the <a style={{ color: 'rgba(29, 155, 240, 1)' }} href='#'> Terms of Service </a> and <a style={{ color: 'rgba(29, 155, 240, 1)' }} href='#'> Privacy Policy</a>, 
                    including <a style={{ color: 'rgba(29, 155, 240, 1)' }} href='#'>Cookie Use</a>. Others will be able to find you by email or phone number when 
                    provided · <a style={{ color: 'rgba(29, 155, 240, 1)' }} href='#'>Privacy Options</a></p>
                </div>
            }
            {
                step != 3
                &&
                <button style={{backgroundColor: step == 3 && 'black', cursor: 'pointer'}} id='bottom-div' className={(name && emailOrPassword && month && date && year) ? 'ready' : 'not-ready'} onClick={handleGoNextButton}>Next</button>
            }

            {/* <button style={{backgroundColor: step == 3 && 'black', cursor: 'pointer'}} id='bottom-div' className={(name && emailOrPassword) ? 'ready' : 'not-ready'} onClick={handleGoNextButton}>{step == 3 ? 'Signup' : 'Next'}</button> */}

            {
                step == 3
                &&
                <Link style={{backgroundColor: step == 3 && 'black', cursor: 'pointer'}} id='bottom-div' to='/username/'>Signup</Link>
            }
        </div>
    )
}

let ReturnAnInputVisual = ({ name, value, focused }) => {
    return <div className='an-input-visual-container'>
        <div className='header-title'>{name}</div>
        <input name={name} defaultValue={value} onFocus={focused} />
    </div>
}

let ReturnASelectElement = React.forwardRef((props, ref) => {
    let { name, handleChnage, whichMonth, date, year, month } = { ...props }
    let [focused, setFocused] = useState(false);
    let data = [];

    let monthsAndDays = [{ month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]

    let findEndDateRange = ('January' || whichMonth) && monthsAndDays.filter(item => item.month == (whichMonth || 'January')).map(item => item.days)[0]

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

    if (name == 'Date') data = range(0, findEndDateRange, 1)
    let getYear = new Date().getFullYear();
    // console.log(which)

    if (name == 'Year') data = range(1901, getYear+1, 1).reverse()

    if (name == 'Month') data = allMonths;

    // let renderSelectElementOptions = data.map(item => <option style={{backgroundColor: (item == 0 || item == getYear+1) && 'silver', color: (item == 0 || item == getYear+1) && 'silver'}} key={item} value={item} onSelect={() => setFocused(false)}>{(item != getYear+1 || item != 0) && item}</option>)
    // let renderSelectElementOptions = data.map(item => <option key={item} value={item} onSelect={() => setFocused(false)}>{item}</option>)
    // let renderSelectElementOptions = data.map(item => <option key={item} value={(!item || item == getYear+1) ? '' : item} onSelect={() => setFocused(false)}>{(!item || item == getYear+1) ? '' : item}</option>)
    // let renderSelectElementOptions = data.map(item => <option style={{backgroundColor: (!item) && 'silver'}} key={item} value={(!item || item == getYear+1) ? '' : item} onSelect={() => setFocused(false)}>{(!item || item == getYear+1) ? '' : item}</option>)
    // let renderSelectElementOptions = data.map(item => <option disabled={(!item || item == getYear+1) ? true : null} key={item} value={(!item || item == getYear+1) ? '' : item} onSelect={() => setFocused(false)}>{(!item || item == getYear+1) ? '' : item}</option>)
    let renderSelectElementOptions = data.map(item => <option style={{backgroundColor: (date || month || year) ? 'transparent' : (!item || item == getYear+1) ? 'silver' : 'transparent'}} disabled={(date || month || year) && (!item || item == getYear+1) ? true : null} key={item} value={(!item || item == getYear+1) ? '' : item} onSelect={() => setFocused(false)}>{(!item || item == getYear+1) ? '' : item}</option>)

    // ref && console.log(ref, "??")

    return (
        <div className='select-element-container' style={{ border: focused && 'solid .11em aqua' }}>
            
            <div className='dropdown-icon-div'>
                
                <div className='left-side'>
                    <div className='element-header'>{name}</div>
                    <select id={name + '-select'} onFocus={() => setFocused(true)} onChange={handleChnage} ref={ref} onMouseUp={() => setFocused(false)} onMouseDown={() => setFocused(true)} onBlur={() => setFocused(false)}>
                        {renderSelectElementOptions}
                    </select>
                </div>
                {/* <span className='dropdown-icon'>{dropdownIcon()}</span> */}
            </div>
        </div>
    )
})

let ReturnAnInputElement = React.forwardRef((props, ref) => {
    let [focused, setFocused] = useState(false);
    let { type, name, maxLength, updateValue, value } = { ...props }

    let handleChange = evt => {
        updateValue(evt.target.value)
    }

    // console.log(ref, "<>")
    // setTest(ref && ref)
    return (
        <div className='custom-input-component-container' style={{ border: focused && 'solid .11em aqua' }}>
            <div className='component-header'>
                <div className='header-title'>{name}</div>
                {maxLength && <div className='word-counts' style={{ display: focused ? 'block' : 'none' }}>{value.length}/{maxLength}</div>}
            </div>
            <input name={name} ref={ref} type={type ? type : 'text'} maxLength={maxLength ? maxLength : null} value={value} onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        </div>
    )
})

let allMonths = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let backIcon = () => <svg width='24px' height='24px'><g><path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path></g></svg>

let dropdownIcon = () => <svg width='24px' height='24px'><g><path d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"></path></g></svg>

let twitterLogo = () => <svg width='24px' height='24px'><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>

let removeIcon = () => <svg width='24px' height='24px'><g><path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path></g></svg>

export default SignupPage

/**
 * 
 * 
     useEffect(() => {
        let monthSel = document.querySelector('#Month-select');
        let dateSel = document.querySelector('#Date-select');
        let yearSel = document.querySelector('#Year-select');
        // console.log(elDiv)
        let opEl = document.createElement('option')
        opEl.value = 0
        opEl.textContent = 0;
        // console.log(opEl)
        // monthSel.prepend(opEl);
        // dateSel.prepend(opEl);
        // yearSel.prepend(opEl)
    }, [])
 * 
 * 
 useEffect(() => {
        let elDiv = document.querySelectorAll('select');
        // console.log(elDiv)
        let opEl = document.createElement('option')
        opEl.value = 0
        opEl.textContent = 0;
        // console.log(opEl)
        elDiv.forEach(node => {
            console.log(node)
            node.appendChild(opEl)
            // console.log(node.querySelector('#Month-select'))
            // node.querySelector('select').append(opEl)
            // node.querySelector('#Month-select').appendChild(opEl)
            // node.querySelector('#Date-select').appendChild(opEl)
            // node.querySelector('#Year-select').appendChild(opEl)
        })
    }, [])
 * 
 * 
let ReturnASelectElement = React.forwardRef((props, ref) => {
    let { data, name, handleChnage, whichMonth } = { ...props }
    let [focused, setFocused] = useState(false);
    // let selectRef = useRef(null);

    ref && console.log(ref, "<>")

    let monthsAndDays = [{ month: 'January', days: 31 }, { month: 'February', days: 28 }, { month: 'March', days: 31 }, { month: 'April', days: 30 }, { month: 'May', days: 31 }, { month: 'June', days: 30 }, { month: 'July', days: 31 }, { month: 'August', days: 31 }, { month: 'September', days: 30 }, { month: 'October', days: 31 }, { month: 'November', days: 30 }, { month: 'December', days: 31 }]

    let findEndDateRange = whichMonth && monthsAndDays.filter(item => item.month == whichMonth).map(item => item.days)[0]

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

    if (name == 'Date') data = range(1, findEndDateRange, 1)

    if (name == 'Year') data = range(1901, 2021, 1).reverse()

    let renderSelectElementOptions = data.map(item => <option key={item} value={item} onSelect={() => setFocused(false)}>{item}</option>)

    // let handleRef = () => {
    //     selectRef.current.click()
    //     // console.log(selectRef, selectRef.current, selectRef.current.click(), selectRef.current.focus())
    // }

    // useOnClickOutside(selectRef, () => setFocused(false))

    return (
        <div className='select-element-container' style={{ border: focused && 'solid .11em aqua' }}>
            {/* <div className='left-side'>
            <div className='element-header'>{name}</div>
            <select id={name + '-select'} onChange={handleChnage} ref={ref && ref} onMouseUp={() => setFocused(false)} onMouseDown={() => setFocused(true)} onBlur={() => setFocused(false)}>
                {renderSelectElementOptions}
            </select>
        </div> *}
            {/* <span className='dropdown-icon' onClick={handleRef}>{dropdownIcon()}</span> *}
            <div className='dropdown-icon-div' dataDropdownIcon={dropdownIcon()}>
                
                <div className='left-side'>
                    <div className='element-header'>{name}</div>
                    <select id={name + '-select'} onChange={handleChnage} ref={ref && ref} onMouseUp={() => setFocused(false)} onMouseDown={() => setFocused(true)} onBlur={() => setFocused(false)}>
                        {renderSelectElementOptions}
                    </select>
                </div>
                <span className='dropdown-icon'>{dropdownIcon()}</span>
            </div>
        </div>

        // <div className='select-element-container' style={{ border: focused && 'solid .11em aqua' }}>
        //     <div className='left-side'>
        //         <div className='element-header'>{name}</div>
        //         <select id={name + '-select'} onChange={handleChnage} ref={ref && ref} onMouseUp={() => setFocused(false)} onMouseDown={() => setFocused(true)} onBlur={() => setFocused(false)}>
        //             {renderSelectElementOptions}
        //         </select>
        //     </div>
        //     {/* <span className='dropdown-icon' onClick={handleRef}>{dropdownIcon()}</span> *}
        //     <span className='dropdown-icon'>{dropdownIcon()}</span>
        // </div>
    )
})
 */