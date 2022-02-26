import React from 'react'

function RelevantPeopleViewForTweetThread({currentUserProfileInfo}) {
  return (
    currentUserProfileInfo
    &&
    <div id='relevant-people-view-container'>
        RelevantPeopleViewForTweetThread
        <div id='heading-text'>Relevant people</div>
        <div id='person-details'>
            <img src={ (currentUserProfileInfo[6] && currentUserProfileInfo[6].content) || 'https://picsum.photos/200/300'} id='profile-picture' />
            <div id='profile-infos'>
                <div id='name'>{currentUserProfileInfo[0].content}</div>
                <div id='handle'>@{currentUserProfileInfo[0].content.toLowerCase()}</div>
                <div id='description'>{currentUserProfileInfo[1].content}</div>
            </div>
        </div>
    </div>
  )
}

export default RelevantPeopleViewForTweetThread