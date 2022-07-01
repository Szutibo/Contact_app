import React, { useState } from 'react';
import './Modal.css';

// Icon
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";

//Components
import { updateContact, uploadFile } from '../fetch/Fetch';

function Modal(props) {
    const [contactData, setContactData] = useState({
        name: '',
        img: '',
        phone: '',
        email: '',
    });
    const deleteImg = { img: '' };
    const [file, setFile] = useState('');
    const [uploadedFile, setUploadedFile] = useState({});

    const modifyContactById = async (obj) => {
        const modifyObj = { ...obj, id: props.contactToUpdate.id }
        try {
            const result = await updateContact(modifyObj);
            if (result) {
                props.refreshContactList();
            }
        } catch (error) {
            props.setHttpErrors(error.message);
        }
    }

    const setImageToState = (e) => {
        if (typeof (e.target.files[0]) !== 'undefined') {
            setContactData({ ...contactData, img: e.target.files[0].name });
        }
    }

    // a request elmegy, de nem történik meg az upload
    const uploadFileFunc = async () => {
        const formdata = new FormData();
        formdata.append('contactImage', file);
        console.log(file);

        try {
            const result = await fetch('http://localhost:3001/api/contactlist/upload',formdata, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log('modaljs, siker',result);
        } catch(error) {
            console.log('modaljs, bukta',error);
        }
    }

    return (
        <div className='modal-bg'>
            {props.title === 'Add contact'
                ? (<div className='modal-container'>
                    <h2>{props.title}</h2>
                    <div className='picture-container'>
                        <div className='picture' style={{ backgroundImage: `url('/images/Timothy.png')` }}></div>
                        <label className='add-picture'>
                            {<GoPlus />}
                            <span>Add picture</span>
                            <input
                                type="file"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                }}
                            />
                        </label>
                    </div>
                    <div className='input-container'>
                        <span>Name</span>
                        <input
                            type="text"
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            placeholder='Jamie Wright'
                        />
                    </div>
                    <div className='input-container'>
                        <span>Phone number</span>
                        <input
                            type="number"
                            onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                            placeholder='+01 234 5678'
                            pattern='+[0-9]{2}-[0-9]{3}-[0-9]{4}'
                        />
                    </div>
                    <div className='input-container'>
                        <span>Email address</span>
                        <input
                            type="text"
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            placeholder='jamie.wright@mail.com'
                        />
                    </div>
                    <div className='button-container'>
                        <button className='cancel-button' onClick={() => {
                            //props.closeModal(false);
                            uploadFileFunc();
                            console.log('uploadedfile', uploadedFile);
                        }}>Cancel</button>
                        <button
                            type='submit'
                            className='done-button'
                            onClick={() => {
                                props.closeModal(false);
                                props.newContact(contactData);
                            }}
                        >Done</button>
                    </div>
                </div>
                )
                : (<div className='modal-container'>
                    <h2>{props.title}</h2>
                    <div className='picture-container'>
                        <div className='picture' style={{ backgroundImage: `url(/images/${props.imgChecker(props.contactToUpdate.img, props.defBg)})` }}></div>
                        <label className='add-picture'>
                            {<FiRefreshCw />}
                            <span>Add picture</span>
                            <input
                                type="file"
                                onChange={(e) => props.getData({ ...props.data, img: e.target.value })}
                            />
                        </label>
                        <p
                            onClick={() => {
                                props.getData({ ...props.data, img: '' });
                                modifyContactById(deleteImg);
                                props.setContactToUpdate({ ...props.contactToUpdate, img: props.defBg });
                            }}
                            className='delete-picture'
                        >{<MdDeleteOutline />}</p>
                    </div>
                    <div className='input-container'>
                        <span>Name</span>
                        <input
                            type="text"
                            onChange={(e) => props.getData({ ...props.data, name: e.target.value })}
                            placeholder={props.contactToUpdate.name}
                        />
                    </div>
                    <div className='input-container'>
                        <span>Phone number</span>
                        <input
                            type="number"
                            onChange={(e) => props.getData({ ...props.data, phone: e.target.value })}
                            placeholder={props.contactToUpdate.phone}
                            pattern='+[0-9]{2}-[0-9]{3}-[0-9]{4}'
                        />
                    </div>
                    <div className='input-container'>
                        <span>Email address</span>
                        <input
                            type="text"
                            onChange={(e) => props.getData({ ...props.data, email: e.target.value })}
                            placeholder={props.contactToUpdate.email}
                        />
                    </div>
                    <div className='button-container'>
                        <button className='cancel-button' >Cancel</button>
                        <button
                            className='done-button'
                            onClick={() => {
                                props.closeModal(false);
                                modifyContactById(props.data);
                                props.getData('');
                            }}
                        >Done</button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Modal;