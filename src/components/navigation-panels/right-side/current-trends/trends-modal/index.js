import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { deleteIcon } from '../../../../tweet-modal/svg-resources';
import { ListModalHeader } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components';

function TrendsModal() {
    let history = useHistory()
    let renderSettingsUI = () => trendsSettingsOptions.map(item => <RenderSettingsOption key={item.name} item={item} />)
    return (
        <div id='trends-modal-container'>
            <ListModalHeader modalTitle={'Trends'} icon={deleteIcon()} history={history} />
            {renderSettingsUI()}
        </div>
    )
}

let RenderSettingsOption = ({ item }) => {
    let [checked, setChecked] = useState(false)
    let handleClick = () => setChecked(!checked)
    return (
        <div className='settings-option-wrapper'>
            <div id='left-side'>
                <div className='title-text'>{item.actionText}</div>
                <div className='sub-text'>{item.explanation}</div>
            </div>
            <div id='right-side' onClick={handleClick}>
                {/* as checkbox native checkbox is persistent to built in styling, we need to manually remove or hide it from DOM and replace it with out intended styled component instaed */}
                <input type={'checkbox'} checked={checked} onChange={handleClick} />
                <span className={checked ? 'checked' : null} id='changed-checkbox'></span>
            </div>
        </div>
    )
}

let trendsSettingsOptions = [
    { name: 'Location', actionText: 'Show content in this location', explanation: 'When this is on, you\'ll see what’s happening around you right now.' },
    { name: 'Personalization', actionText: 'Trends for you', explanation: 'You can personalize trends based on your location and who you follow.' }
]

export default TrendsModal;
