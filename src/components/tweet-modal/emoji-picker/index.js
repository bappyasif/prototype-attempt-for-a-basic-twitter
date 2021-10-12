import { Emoji, Picker } from 'emoji-mart';
import React, { useState } from 'react'
import "emoji-mart/css/emoji-mart.css";

function EmojiPicker({isIconClicked, tweetText, setTweetText}) {
    let [pickerInput, setPickerInput] = useState('');
    let [userInput, setUserInput] = useState([]);

    let addEmojis = evt => {
        setUserInput([...userInput, evt.id]);
        setTweetText(tweetText+evt.native);
        // console.log(evt.native, evt)
    }

    let renderEmojis = () => userInput.map((emoji, id) => <EmojiComponent key={id} emoji={emoji} />)

    

    return (
        <div id='emoji-picker-container'>

            {isIconClicked && <div>
                <Picker onSelect={addEmojis} set="twitter" skin={1} style={{width: '47%', float: 'left'}} />
            </div>}
        </div>
    )
}

let EmojiComponent = ({emoji}) => <Emoji emoji={emoji} set='twitter' size={16} />

export default EmojiPicker
