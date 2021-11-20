import React, { useEffect, useState } from 'react'

export default function TweetPoll({ isPollIconClicked, handleToggle, inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) {
    
    // console.log(inputTextChoice01, inputTextChoice02, inputTextChoice03, inputTextChoice04, "showing values tweet poll")
    
    return (
        <div id='poll-container' style={{ display: isPollIconClicked ? 'flex' : 'none' }}>
            <div id='top-layer'>
                <PollChoices
                    inputTextChoice01={inputTextChoice01}
                    setInputTextChoice01={setInputTextChoice01}
                    inputTextChoice02={inputTextChoice02}
                    setInputTextChoice02={setInputTextChoice02}
                    inputTextChoice03={inputTextChoice03}
                    setInputTextChoice03={setInputTextChoice03}
                    inputTextChoice04={inputTextChoice04}
                    setInputTextChoice04={setInputTextChoice04}
                />
            </div>
            <div id='mid-layer'>
                <PollLengths />
            </div>
            <div id='bottom-layer' onClick={handleToggle}>Remove poll</div>
        </div>
    )
}

export let PollLengths = () => {
    let [days, setDays] = useState(0);
    let [hours, setHours] = useState(0);
    let [minutes, setMinutes] = useState(0);

    useEffect(() => {
        // document.getElementById("id").selectedIndex = -1;
        document.querySelectorAll('select').forEach(node => node.selectedIndex = -1);
    }, [])

    let daysOptions = [];
    let hoursOptions = [];
    let minutesOptions = [];

    for (let i = 0; i <= 7; i++) daysOptions.push(i)
    for (let i = 0; i < 24; i++) hoursOptions.push(i)
    for (let i = 5; i < 60; i++) minutesOptions.push(i)

    let returnNumericalValuedDropdowns = (data) => data.map(num => <option key={num}>{num}</option>)

    let returnLengthBox = (id, value, dropdowns) => <div className="length-container"><div className='length-info'><div className="length-text">{id}</div><div className='length-value'>{value}</div></div><select id={id} onChange={handleChanges}>{dropdowns}</select></div>

    let handleChanges = evt => {
        let whichLength = evt.target.id;
        // console.log(whichLength)
        switch (whichLength) {
            case 'days':
                setDays(evt.target.value);
                break;
            case 'hours':
                setHours(evt.target.value);
                break;
            case 'minutes':
                setMinutes(evt.target.value);
                break;
            default: console.log('something wrong!!');
        }
        evt.target.value = ''
    }

    let daysDropdown = returnNumericalValuedDropdowns(daysOptions);
    let hoursDropdown = returnNumericalValuedDropdowns(hoursOptions);
    let minutesDropdown = returnNumericalValuedDropdowns(minutesOptions);

    let daysLength = returnLengthBox('days', days, daysDropdown);
    let hoursLength = returnLengthBox('hours', hours, hoursDropdown);
    let minutesLength = returnLengthBox('minutes', minutes, minutesDropdown);

    return <div id='poll-lengths'> <div id='poll-length-text'>Poll length</div> <div id='all-lengths'>{daysLength} {hoursLength} {minutesLength}</div> </div>
}

export let PollChoices = ({ inputTextChoice01, setInputTextChoice01, inputTextChoice02, setInputTextChoice02, inputTextChoice03, setInputTextChoice03, inputTextChoice04, setInputTextChoice04 }) => {
    let [divTextChoice01, setDivTextChoice01] = useState('');
    let [divTextChoice02, setDivTextChoice02] = useState('');
    let [divTextChoice03, setDivTextChoice03] = useState('');
    let [divTextChoice04, setDivTextChoice04] = useState('');

    let [pollChoices, setPollChoices] = useState([{ placeholderText: 'Choice01', id: '01' }, { placeholderText: 'Choice02', id: '02' }])
    let [choicesFlag, setChoicesFlag] = useState(true);

    let [wordCountChoice01, setWordCountChoice01] = useState(0);
    let [wordCountChoice02, setWordCountChoice02] = useState(0);
    let [wordCountChoice03, setWordCountChoice03] = useState(0);
    let [wordCountChoice04, setWordCountChoice04] = useState(0);

    let handleTextChangesForChoice01 = value => setInputTextChoice01(value)

    let handleTextChangesForChoice02 = value => setInputTextChoice02(value)

    let handleTextChangesForChoice03 = value => setInputTextChoice03(value)

    let handleTextChangesForChoice04 = value => setInputTextChoice04(value)


    let handleFocused = evt => {
        let choiceId = evt.target.id
        // evt.target.placeholder = '';

        switch (choiceId) {
            case '01':
                inputTextChoice02 ? setDivTextChoice02(divTextChoice02) : setDivTextChoice02('')
                inputTextChoice03 ? setDivTextChoice03(divTextChoice03) : setDivTextChoice03('')
                inputTextChoice04 ? setDivTextChoice04(divTextChoice03) : setDivTextChoice04('')
                // setWordCountChoice01(evt.target.value.length > 0 ? evt.target.value.length : '')
                setWordCountChoice01(wordCountChoice01)
                setWordCountChoice02('')
                setWordCountChoice03('')
                setWordCountChoice04('')
                setDivTextChoice01('Choice01')
                break;
            case '02':
                inputTextChoice01 ? setDivTextChoice01(divTextChoice01) : setDivTextChoice01('')
                inputTextChoice04 ? setDivTextChoice04(divTextChoice03) : setDivTextChoice04('')
                inputTextChoice03 ? setDivTextChoice03(divTextChoice03) : setDivTextChoice03('')
                setWordCountChoice02(wordCountChoice02)
                setWordCountChoice01('')
                setWordCountChoice03('')
                setWordCountChoice04('')
                setDivTextChoice02('Choice02')
                break;
            case '03':
                inputTextChoice01 ? setDivTextChoice01(divTextChoice01) : setDivTextChoice01('')
                inputTextChoice04 ? setDivTextChoice04(divTextChoice03) : setDivTextChoice04('')
                inputTextChoice02 ? setDivTextChoice02(divTextChoice02) : setDivTextChoice02('')
                setWordCountChoice03(wordCountChoice03)
                setWordCountChoice02('')
                setWordCountChoice01('')
                setWordCountChoice04('')
                setDivTextChoice03('Choice03 (optional)')
                break;
            case '04':
                inputTextChoice01 ? setDivTextChoice01(divTextChoice01) : setDivTextChoice01('')
                inputTextChoice02 ? setDivTextChoice02(divTextChoice02) : setDivTextChoice02('')
                inputTextChoice03 ? setDivTextChoice03(divTextChoice03) : setDivTextChoice03('')
                setWordCountChoice04(wordCountChoice04)
                setWordCountChoice02('')
                setWordCountChoice03('')
                setWordCountChoice01('')
                setDivTextChoice04('Choice04 (optional)')
                break;
            default: console.log('soimething wrong!!')
        }
    }

    useEffect(() => {
        setWordCountChoice01('')
        setWordCountChoice02('')
        setWordCountChoice03('')
        setWordCountChoice04('')

        // setInputTextChoice01(inputTextChoice01 ? inputTextChoice01 : '')
        // setInputTextChoice02(inputTextChoice02 ? inputTextChoice02 : '')
        // setInputTextChoice03(inputTextChoice03 ? inputTextChoice03 : '')
        // setInputTextChoice01(inputTextChoice04 ? inputTextChoice04 : '')
    }, [])

    // useEffect(() => {
    //     // setInputTextChoice01(inputTextChoice01 ? inputTextChoice01 : '')
    //     // setInputTextChoice02(inputTextChoice02 ? inputTextChoice02 : '')
    //     // setInputTextChoice03(inputTextChoice03 ? inputTextChoice03 : '')
    //     // setInputTextChoice01(inputTextChoice04 ? inputTextChoice04 : '')
        
    //     // setInputTextChoice01(inputTextChoice01 && inputTextChoice01 )
    //     // setInputTextChoice02(inputTextChoice02 && inputTextChoice02)
    //     // setInputTextChoice03(inputTextChoice03 && inputTextChoice03 )
    //     // setInputTextChoice01(inputTextChoice04 && inputTextChoice04 )
        
    //     console.log(inputTextChoice01, inputTextChoice02, inputTextChoice03, inputTextChoice04, "showing values")
    // }, [inputTextChoice01, inputTextChoice02, inputTextChoice03, inputTextChoice04])

    let handleChanges = (evt) => {
        let choiceId = evt.target.id
        switch (choiceId) {
            case '01':
                // handleTextChangesForChoice01(evt.target.value)
                handleTextChangesForChoice01(evt.target.value ? evt.target.value : inputTextChoice01)
                setWordCountChoice01(evt.target.value.length + " / 25")
                setWordCountChoice02('')
                setWordCountChoice03('')
                setWordCountChoice04('')
                break;
            case '02':
                handleTextChangesForChoice02(evt.target.value)
                setWordCountChoice02(evt.target.value.length + " / 25")
                setWordCountChoice01('')
                setWordCountChoice03('')
                setWordCountChoice04('')
                break;
            case '03':
                handleTextChangesForChoice03(evt.target.value)
                setWordCountChoice03(evt.target.value.length + " / 25")
                setWordCountChoice02('')
                setWordCountChoice01('')
                setWordCountChoice04('')
                break;
            case '04':
                handleTextChangesForChoice04(evt.target.value)
                setWordCountChoice04(evt.target.value.length + " / 25")
                setWordCountChoice03('')
                setWordCountChoice02('')
                setWordCountChoice01('')
                break;
            default: console.log('soimething wrong!!')
        }
    }

    let availableChoices = pollChoices.map(choice => {
        return <div key={choice.placeholderText} className='choices-container'>
            <div className='split-divs'>
                <div className='div-text'>{choice.id == '01' ? divTextChoice01 : choice.id == '02' ? divTextChoice02 : choice.id == '03' ? divTextChoice03 : divTextChoice04}</div>
               
                <div className='word-count'>{choice.id == '01' ? wordCountChoice01 : choice.id == '02' ? wordCountChoice02 : choice.id == '03' ? wordCountChoice03 : wordCountChoice04}</div>
            </div>
            {/* <input className='poll-choices' id={choice.id} type='text' maxLength='25' onChange={handleChanges} onFocus={handleFocused} placeholder={choice.placeholderText} /> */}
            <input className='poll-choices' id={choice.id} value={choice.id == '01' ? inputTextChoice01 : choice.id == '02' ? inputTextChoice02 : choice.id == '03' ? inputTextChoice03 : choice.id == '04' ? inputTextChoice04 : ''} type='text' maxLength='25' onChange={handleChanges} onFocus={handleFocused} placeholder={choice.placeholderText} />
        </div>
    })

    let addAnotherChoice = (evt) => {
        pollChoices.length == 2 ? setPollChoices([...pollChoices, { placeholderText: 'Choice03', id: '03' }]) : setPollChoices([...pollChoices, { placeholderText: 'Choice04', id: '04' }])
        if (pollChoices.length == 3) setChoicesFlag(false);
    }

    return <div id='choices-container'><div id='choices'>{availableChoices}</div><div id='add-choices' onClick={addAnotherChoice} style={{ display: choicesFlag ? 'block' : 'none' }}>+</div></div>
}
