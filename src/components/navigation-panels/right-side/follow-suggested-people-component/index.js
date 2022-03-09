import React from 'react';
import { useHistory } from 'react-router-dom';
import RenderSuggestedPeopleList from './render-suggested-people-list';

function FollowSuggestedPeopleComponent({ listOfRandomUsers }) {
    let history = useHistory(null)
    return (
        <div id='suggested-people-list-container'>
            <div id='header-text'>People you might like</div>
            <RenderSuggestedPeopleList listOfRandomUsers={listOfRandomUsers} />
            <div id='show-more' onClick={() => history.push('/i/connect_people')}>Show more</div>
        </div>
    )
}

export default FollowSuggestedPeopleComponent