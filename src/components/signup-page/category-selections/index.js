import React, { useState, useEffect } from 'react'
import { updateUserInterestsSelection } from '../../firestore-methods';
import { AddMoreToCategories, categoriesList } from '../../topics-picker'

function CategorySelections({ handleData, sanitizedData, updateComlpetionStatus, currentUser }) {
    let [categories, setCategories] = useState([]);
    let [level, setLevel] = useState(0);
    let [isTopicsUploadDone, setIsTopicsUploadDone] = useState(false)

    let handleTopicsUploadStatus = () => setIsTopicsUploadDone(true)
    let handleLevel = () => {
        setLevel(prevLevel => prevLevel + 1)
        let topicsOfInterests = { topicsOfInterests: categories }
        // console.log(topicsOfInterests, typeof topicsOfInterests)
        updateUserInterestsSelection(topicsOfInterests, currentUser, handleTopicsUploadStatus)
    }
    let handleCategories = (data) => setCategories(prevData => prevData.concat(data))
    let removeCategory = () => setCategories(prevData => prevData.slice(0, categories.length - 1))

    // categories && console.log(categories)
    let updateInterestsInFirestore = () => {
        sanitizedData.length && updateUserInterestsSelection(sanitizedData, currentUser, updateComlpetionStatus)
        // updating completion status when user has not any list for to add in their interest list
        !sanitizedData.length && updateComlpetionStatus()
    }

    // console.log(sanitizedData, 'from signup')

    let showText = () => {
        let text;
        categories.length <= 3
            ?
            text = `${categories.length ? categories.length : 0} of 3 selected`
            :
            text = `currently ${categories.length} categories selected`
        return text
    }

    return (

        level == 0
            ?
            <div id='container-for-category-selections'>
                <div id='heading-text'>What do you want to see on Twitter?</div>
                <div id='sub-heading-text'>Select at least 3 interest to personalize your Twitter experience. They will be visible on your profile.</div>
                <ShowSelectionPickerCards addCategory={handleCategories} removeCategory={removeCategory} />
                <div id='bottom-div'>
                    <div id='selection-count'>{showText()}</div>
                    <div id='next-btn' onClick={handleLevel} style={{ pointerEvents: categories.length < 3 && 'none', cursor: categories.length >= 3 && 'pointer' }}>Next</div>
                </div>
            </div>
            :
            <div id='container-for-category-selections'>
                {isTopicsUploadDone && <AddMoreToCategories scrollBy={560} handleData={handleData} currentUser={currentUser} />}
                {isTopicsUploadDone && <div id='done-selecting' onClick={updateInterestsInFirestore}>Next</div>}
                {!isTopicsUploadDone && <h4>Data loading....</h4>}
            </div>
    )
}

let ShowSelectionPickerCards = ({ addCategory, removeCategory }) => {
    let renderCards = categoriesList.map(card => <PickerCard key={card.name} item={card.name} addCategory={addCategory} removeCategory={removeCategory} />)
    return <div id='categories-wrapper'>{renderCards}</div>
}

let PickerCard = ({ item, removeCategory, addCategory }) => {
    let [selected, setSelected] = useState(false)
    let handleSelected = () => setSelected(!selected)

    useEffect(() => {
        // selected && console.log(item)
        selected && addCategory(item)
        !selected && removeCategory()
    }, [selected])

    return (
        <div className='card-container' onClick={handleSelected} style={{backgroundColor: selected && 'rgba(29, 155, 240, 1)', color: selected && 'white'}}>{item}</div>
    )
}

let ShowSubcategories = () => {
    return (
        <div id='subcategories-container'>
            <AddMoreToCategories scrollBy={350} />
        </div>
    )
}

export default CategorySelections
