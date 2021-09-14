import React, { useEffect, useState } from 'react'

function TweetPoll({isIconClicked}) {
    // style={{display: isIconClicked ? 'block' : 'none'}}
    console.log(isIconClicked, "??")
    return (
        <div id='poll-container'>
            <div id='top-layer'>
                <PollChoices />
            </div>
            <div id='mid-layer'>
                <PollLengths />
            </div>
        </div>
    )
}

let PollLengths = () => {
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

    return <> {daysLength} {hoursLength} {minutesLength} </>
}

let PollChoices = () => {
    let [divTextChoice01, setDivTextChoice01] = useState('');
    let [divTextChoice02, setDivTextChoice02] = useState('');
    let [divTextChoice03, setDivTextChoice03] = useState('');
    let [divTextChoice04, setDivTextChoice04] = useState('');

    let [inputTextChoice01, setInputTextChoice01] = useState('');
    let [inputTextChoice02, setInputTextChoice02] = useState('');
    let [inputTextChoice03, setInputTextChoice03] = useState('');
    let [inputTextChoice04, setInputTextChoice04] = useState('');

    let handleTextChangesForChoice01 = value => setInputTextChoice01(value)

    let handleTextChangesForChoice02 = value => setInputTextChoice02(value)

    let handleTextChangesForChoice03 = value => setInputTextChoice03(value)

    let handleTextChangesForChoice04 = value => setInputTextChoice04(value)


    let handleFocused = evt => {
        let choiceId = evt.target.id
        evt.target.placeholder = '';

        switch (choiceId) {
            case '01':
                setDivTextChoice01('Choice01')
                break;
            case '02':
                setDivTextChoice02('Choice02')
                break;
            case '03':
                setDivTextChoice03('Choice03 (optional)')
                break;
            case '04':
                setDivTextChoice04('Choice04 (optional)')
                break;
            default: console.log('soimething wrong!!')
        }
        // console.log(divTextChoice01, divTextChoice02, choiceId, "??")
    }

    let handleChanges = (evt) => {
        let choiceId = evt.target.id
        switch (choiceId) {
            case '01':
                handleTextChangesForChoice01(evt.target.value)
                break;
            case '02':
                handleTextChangesForChoice02(evt.target.value)
                break;
            default: console.log('soimething wrong!!')
        }
        // console.log(divTextChoice01, divTextChoice02, choiceId, "??")
    }

    let pollChoices = [{ placeholderText: 'Choice01', id: '01' }, { placeholderText: 'Choice02', id: '02' }];

    let availableChoices = pollChoices.map(choice => {
        return <div key={choice.placeholderText} className='choices-container'>
            <div className='div-text'>{choice.id == '01' ? divTextChoice01 : choice.id == '02' ? divTextChoice02 : choice.id == '03' ? divTextChoice03 : divTextChoice04}</div>
            <input className='poll-choices' id={choice.id} type='text' onChange={handleChanges} onFocus={handleFocused} placeholder={choice.placeholderText} />
        </div>
    })

    return availableChoices
}

export default TweetPoll
