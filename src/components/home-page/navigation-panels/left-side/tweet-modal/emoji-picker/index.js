import { Emoji, Picker } from 'emoji-mart';
import React, { useState } from 'react'
import "emoji-mart/css/emoji-mart.css";

function EmojiPicker({isIconClicked, tweetText, setTweetText}) {
    let [pickerInput, setPickerInput] = useState('');
    // let [showPicker, setShowPicker] = useState(false)
    let [userInput, setUserInput] = useState([]);

    let addEmojis = evt => {
        // setPickerInput(evt.id)
        setUserInput([...userInput, evt.id]);
        // setTweetText(tweetText+renderEmojis());
        setTweetText(tweetText+evt.native);
        // setTweetText(tweetText+`<span>${evt.native}</span>`);
        console.log(evt.native, evt)
    }

    let renderEmojis = () => userInput.map((emoji, id) => <EmojiComponent key={id} emoji={emoji} />)

    

    return (
        <div id='emoji-picker-container'>

            <EmojiComponent emoji={pickerInput} />

            {/* {renderEmojis()} */}

            {isIconClicked && <div>
                {/* <Picker onSelect={addEmojis} set="twitter" skin="1" /> */}
                {/* <Picker onSelect={addEmojis} set="twitter" defaultSkin={1} onClick={ (emoji, event) => setPickerInput(emoji)} /> */}
                <Picker onSelect={addEmojis} set="twitter" onClick={ (emoji, event) => setPickerInput(emoji)} color={"#009688"} />
            </div>}
        </div>
    )
}

let EmojiComponent = ({emoji}) => <Emoji emoji={emoji} set='twitter' size={16} />

export default EmojiPicker
