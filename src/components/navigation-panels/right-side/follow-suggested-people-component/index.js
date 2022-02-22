import React, { useEffect, useState } from 'react';
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

// function FollowSuggestedPeopleList({ contentCreators }) {
//     console.log(contentCreators, 'contentCreatrors!!')
//     let renderFollowThesePeople = () => contentCreators.map((item, idx) => <RenderPeople key={idx} item={item} />)
//     return (
//         <div id='follow-suggested-people-container'>
//             {renderFollowThesePeople()}
//         </div>
//     )
// }

// let RenderPeople = ({ item }) => {
//     let { name, imgUrl } = { ...item }

//     let [nameAdjusted, setNameAdjusted] = useState(null)

//     let [follows, setFollows] = useState(false)

//     let handleNameAdjust = () => {
//         if (name.includes(' And ')) {
//             let tokenizingNameIfThereIsAnd = name.split(' And ')
//             let joinedName = tokenizingNameIfThereIsAnd[0].split(' ')[0].concat(' ', tokenizingNameIfThereIsAnd[1].split(' ')[1])
//             setNameAdjusted(joinedName)
//             console.log(joinedName, 'joined!!')
//         } else {
//             console.log('not joined!!')
//         }
//     }

//     useEffect(() => {
//         Math.random() > .51 && setFollows(true)
//         handleNameAdjust()
//     }, [])

//     return (
//         <div className='render-people-wrapper'>
//             <div id='user-details'>
//                 <img src={imgUrl} id='user-img' />
//                 <div id='profile-info'>
//                     <div id='user-name'>{nameAdjusted || name}</div>
//                     <div id='user-handle'> @{(nameAdjusted || name).toLowerCase()} <span id='follow-status'>{follows ? ' Follows you' : ''}</span></div>
//                 </div>
//             </div>
//             <div id='follow-btn'>Follow</div>
//         </div>
//     )
// }

// export default FollowSuggestedPeopleList;
