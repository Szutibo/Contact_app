import React, { useState, useEffect } from 'react';
import './Modal.css';

// Icon
import { GoPlus } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';
import { FiRefreshCw } from 'react-icons/fi';

//Components
import { updateContact, uploadImage } from '../fetch/Fetch';
import {
    validateUpdate,
    validateCreate,
    createButtonChecker,
    updateButtonChecker
}
    from '../utility/Utility';

// Collects valid data from the inputs
let putRequestBody = {};

function Modal(props, { setImages }) {
    const [contactData, setContactData] = useState({
        name: '',
        img: '',
        phone: '',
        email: '',
    });
    const deleteImg = { img: '' };
    const [file, setFile] = useState(); // Stores the chosen pictures data
    const [image, setImage] = useState(null) // Stores the chosen pictures url
    const [imageUpd, setImageUpd] = useState(null) // Stores the chosen pictures url
    const [createFormErrors, setCreateFormErrors] = useState([]); // Needed for validation
    const [updateFormErrors, setUpdateFormErrors] = useState([]); // Needed for validation
    const [createButtonDisabled, setCreateButtonDisabled] = useState(true); // Needed for validation
    const [updateButtonDisabled, setUpdateButtonDisabled] = useState(true); // Needed for validation
    const [createDisabledClass, setCreateDisabledClass] = useState('disabledClass'); // Needed for validation
    const [updateDisabledClass, setUpdateDisabledClass] = useState('disabledClass'); // Needed for validation

    const modifyContactById = async (obj) => {
        const modifyObj = { ...obj, id: props.contactToUpdate.id }
        try {
            await updateContact(modifyObj);
        } catch (error) {
            props.setHttpErrors(error.message);
        }
    }

    const dataPusher = (value, nameOfInput) => {
        putRequestBody = {
            ...putRequestBody,
            [nameOfInput]: value
        }
    };

    // Clears state after cancelling image upload
    const setImageToState = (e, state, func) => {
        if (e.target.files && e.target.files[0]) {
            func({ ...state, img: e.target.files[0].name });
        } else {
            func({ ...state, img: '' });
        }
    }

    // Creates a blob for previewing image
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        } else {
            setImage('');
        }
    }

    // Hibát dob a kép feltöltés cancel-nél, contacttoupdate undefined
    const onImageChangeUpdate = (event, props) => {
        if (event.target.files && event.target.files[0]) {
            setImageUpd(URL.createObjectURL(event.target.files[0]));
        } else if (props.contactToUpdate.img) {
            setImageUpd(`/images/${props.contactToUpdate.img}`);
        } else {
            setImageUpd(`/images/${props.defBg}`);
        }
    }

    // Calls validate
    useEffect(() => {
        if (props.title === 'Edit contact') {
            setUpdateFormErrors(validateUpdate(props.contactToUpdate));
        } else {
            setCreateFormErrors(validateCreate(contactData));
        }
    }, [props.contactToUpdate, contactData, props.title]);

    return (
        <div
            className='modal-bg'
            onKeyUp={() => {
                createButtonChecker(createFormErrors, setCreateButtonDisabled, setCreateDisabledClass);
            }}>
            {props.title === 'Add contact'
                ? (<div className='modal-container'>
                    <h2>{props.title}</h2>
                    <div className='picture-container'>
                        <img
                            className='picture'
                            alt='Contact'
                            src={image ? image : `/images/${props.defBg}`}
                        />
                        <label className='add-picture'>
                            {<GoPlus />}
                            <span>Add picture</span>
                            <input
                                type='file'
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    onImageChange(e);
                                    setImageToState(e, contactData, setContactData);
                                }}
                            />
                        </label>
                    </div>
                    <div className='input-container'>
                        <span>Name</span>
                        <input
                            type='text'
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            placeholder='Jamie Wright'
                        />
                        <label className='error-container'>{createFormErrors.name}</label>
                    </div>
                    <div className='input-container'>
                        <span>Phone number</span>
                        <input
                            type='number'
                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                            placeholder='+01 234 5678'
                        />
                        <label className='error-container'>{createFormErrors.phone}</label>
                    </div>
                    <div className='input-container'>
                        <span>Email address</span>
                        <input
                            type='text'
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            placeholder='jamie.wright@mail.com'
                        />
                        <label className='error-container'>{createFormErrors.email}</label>
                    </div>
                    <div className='button-container'>
                        <button className='cancel-button' onClick={() => {
                            props.closeModal(false);
                        }}>Cancel</button>
                        <button
                            disabled={createButtonDisabled}
                            className={'done-button ' + createDisabledClass}
                            onClick={() => {
                                props.closeModal(false);
                                uploadImage(file, props.setHttpErrors, setFile);
                                props.newContact(contactData);
                            }}
                        >Done</button>
                    </div>
                </div>
                )
                : (<div
                    className='modal-container'
                    onChange={() => updateButtonChecker(putRequestBody, updateFormErrors, setUpdateButtonDisabled, setUpdateDisabledClass)}>
                    <h2>{props.title}</h2>
                    <div className='picture-container'>
                        <img
                            className='picture'
                            alt=''
                            src={imageUpd ? imageUpd : `/images/${props.contactToUpdate.img}`}
                        />
                        <label className='add-picture'>
                            {<FiRefreshCw />}
                            <span>Add picture</span>
                            <input
                                type='file'
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    onImageChangeUpdate(e);
                                    setImageToState(e, props.contactToUpdate, props.setContactToUpdate)
                                }}
                            />
                        </label>
                        <p
                            onClick={() => {
                                props.setContactToUpdate({ ...props.contactToUpdate, img: '' });
                                modifyContactById(deleteImg);
                            }}
                            className='delete-picture'
                        >{<MdDeleteOutline />}</p>
                    </div>
                    <div className='input-container'>
                        <span>Name</span>
                        <input
                            type='text'
                            onMouseLeave={() => dataPusher(props.contactToUpdate.name, 'name')}
                            onChange={(e) => props.setContactToUpdate({ ...props.contactToUpdate, name: e.target.value })}
                            placeholder={props.contactToUpdate.name}
                        />
                        <label className='error-container'>{updateFormErrors.name}</label>
                    </div>
                    <div className='input-container'>
                        <span>Phone number</span>
                        <input
                            type='number'
                            onMouseLeave={() => dataPusher(props.contactToUpdate.phone, 'phone')}
                            onChange={(e) => props.setContactToUpdate({ ...props.contactToUpdate, phone: e.target.value })}
                            placeholder={props.contactToUpdate.phone}
                        />
                        <label className='error-container'>{updateFormErrors.phone}</label>
                    </div>
                    <div className='input-container'>
                        <span>Email address</span>
                        <input
                            type='text'
                            onMouseLeave={() => dataPusher(props.contactToUpdate.email, 'email')}
                            onChange={(e) => props.setContactToUpdate({ ...props.contactToUpdate, email: e.target.value })}
                            placeholder={props.contactToUpdate.email}
                        />
                        <label className='error-container'>{updateFormErrors.email}</label>
                    </div>
                    <div className='button-container'>
                        <button
                            className='cancel-button'
                            onClick={() => {
                                props.closeModal(false);
                            }}>Cancel</button>
                        <button
                            disabled={updateButtonDisabled}
                            className={'done-button ' + updateDisabledClass}
                            onClick={() => {
                                props.closeModal(false);
                                dataPusher(props.contactToUpdate.img, 'img');
                                modifyContactById(putRequestBody);
                                uploadImage(file, props.setHttpErrors, setFile);
                                props.refreshContactList();
                            }}
                        >Done</button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Modal;