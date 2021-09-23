import { Emoji, Picker } from 'emoji-mart';
import React, { useState } from 'react'
import "emoji-mart/css/emoji-mart.css";

function EmojiPicker() {
    let [pickerInput, setPickerInput] = useState('');
    let [showPicker, setShowPicker] = useState(false)

    // let addEmojis = evt => {
    //     let symbols = evt.unified.split('-')
    //     console.log(symbols, evt.unified, evt);
    //     let codesArray = [];
    //     symbols.forEach(el => codesArray.push('0x' + el))
    //     let emoji = String.fromCodePoint(...codesArray)
    //     setPickerInput(pickerInput + emoji)
    // }

    let addEmojis = evt => {
        console.log(evt.id, evt)
        setPickerInput(evt.id)
        // setPickerInput(evt.native)
    }

    // console.log(<EmojiComponent emoji={pickerInput} />)

    return (
        <div id='emoji-picker-container'>
            <input
                value={pickerInput}
                onChange={(evt) => setPickerInput(evt.target.value)}
                type='text'
                placeholder='emoji picker'
            />
            <button className='svg-button' onClick={() => setShowPicker(!showPicker)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="silver"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>

            <EmojiComponent emoji={pickerInput} />

            {/* <EmojiItem emoji={pickerInput} /> */}

            {showPicker && <div>
                <Picker onSelect={addEmojis} />
            </div>}
        </div>
    )
}

let EmojiComponent = ({emoji}) => <Emoji emoji={emoji} skin='1' set='apple' size={16} />
// let EmojiComponent = ({emoji}) => <Emoji emoji={{ id: {emoji}, skin: 3 }} size={16} />

// let EmojiItem = ({emoji}) => <span role='img' aria-label='emojis' className='emojis'>{emoji}</span>

export default EmojiPicker







// import React, { useState } from 'react'
// import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
// function EmojiPickerComponent() {
//     let [emojiInput, setEmojiInput] = useState('');
//     let [showPicker, setShowPicker] = useState(false);

//     let onEmojiClickedHandler = (event, emojiObject) => {
//         setEmojiInput(emojiObject.emoji)
//     }

//     return (
//         <div id='emoji-picker-container'>
//             {emojiInput ? emojiInput : ''}
//             {/* <EmojiPicker onEmojiClick={onEmojiClickedHandler} /> */}
//             {/* <Picker onEmojiClick={onEmojiClickedHandler} skinTone={SKIN_TONE_MEDIUM_DARK} /> */}
//             <Picker onEmojiClick={onEmojiClickedHandler} />
//         </div>
//     )
// }

// export default EmojiPickerComponent
