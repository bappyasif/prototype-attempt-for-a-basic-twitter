import React, {useState, useEffect} from 'react'
import '../../edit-profile/styles.css'

function ReuseableModal({handleCancelModal, handleAction, title, description}) {
    let [modalTitle, setModalTitle] = useState('');
    let [modalDescription, setModalDescription] = useState('');
    useEffect(() => {
        setModalTitle(title)
        setModalDescription(description)
    }, [])
    return (
        <div className='reuseable-modal-container'>
            <div className='modal-title'>{modalTitle}</div>
            <div className='modal-description'>{modalDescription}</div>
            <ClickableComponent heading='Action' clickAction={handleAction} />
            <ClickableComponent heading='Cancel' clickAction={handleCancelModal} />
        </div>
    )
}

let ClickableComponent = ({heading, clickAction}) => {
    return (
        <div className='clickable-component-container'>
            <div className='clickable-heading' onClick={clickAction}>{heading}</div>
        </div>
    )
}

export default ReuseableModal
