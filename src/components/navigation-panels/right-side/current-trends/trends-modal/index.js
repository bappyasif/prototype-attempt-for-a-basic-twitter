import React from 'react';
import { deleteIcon } from '../../../../tweet-modal/svg-resources';
import { ListModalHeader } from '../../../../user-profile/all-tweets/tweet-top/lists-reusable-helper-components';

function TrendsModal() {
    let renderSettingsUI = () => trendsSettingsOptions.map(item => <RenderSettingsOption key={item.name} item={item} />)
    return (
        <div id='trends-modal-container'>
            <ListModalHeader modalTitle={'Trends'} icon={deleteIcon()} />
            {renderSettingsUI()}
        </div>
    )
}

let RenderSettingsOption = ({ item }) => {
    return (
        <div className='settings-option-wrapper'>
            <div id='left-side'>
                <div className='title-text'>{item.actionText}</div>
                <div className='sub-text'>{item.explanation}</div>
            </div>
            <input type={'checkbox'} />
        </div>
    )
}

let trendsSettingsOptions = [
    { name: 'Location', actionText: 'Show content in this location', explanation: 'When this is on, you\'ll see what’s happening around you right now.' },
    { name: 'Personalization', actionText: 'Trends for you', explanation: 'You can personalize trends based on your location and who you follow.' }
]

export default TrendsModal;
