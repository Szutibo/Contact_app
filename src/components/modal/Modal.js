import React, { useState } from 'react';
import './Modal.css';

// Icon
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";

function Modal(props) {
    const defBg = '/images/Default.png';
    const [contactData, setContactData] = useState({
        name: '',
        img: '',
        phone: '',
        email: '',
    });

    return (
        <div className='modal-bg'>
            {props.title === 'Add contact'
                ? (<div className='modal-container'>
                    <h2>{props.title}</h2>
                    <div className='picture-container'>
                        <div className='picture' style={{ backgroundImage: `url(${defBg})` }}></div>
                        <label className='add-picture'>
                            {<GoPlus />}
                            <span>Add picture</span>
                            <input
                                type="file"
                                onChange={(e) => props.setContactData({ ...contactData, img: e.target.value })}
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
                            props.closeModal(false);
                        }}>Cancel</button>
                        <button className='done-button' onClick={() => {
                            props.closeModal(false);
                            props.newContact(contactData);
                            console.log(contactData);
                        }}>Done</button>
                    </div>
                </div>
                )
                : (<div className='modal-container'>
                    <h2>{props.title}</h2>
                    <div className='picture-container'>
                        <div className='picture' style={{ backgroundImage: `url(${defBg})` }}></div>
                        <label className='add-picture'>
                            {<FiRefreshCw />}
                            <span>Add picture</span>
                            <input
                                type="file"
                                onChange={(e) => props.getData({ ...props.data, img: e.target.value })}
                            />
                        </label>
                        <p>{<MdDeleteOutline />}</p>
                    </div>
                    <div className='input-container'>
                        <span>Name</span>
                        <input
                            type="text"
                            onChange={(e) => props.getData({ ...props.data, name: e.target.value })}
                            value={props.data.name}
                        />
                    </div>
                    <div className='input-container'>
                        <span>Phone number</span>
                        <input
                            type="number"
                            onChange={(e) => props.getData({ ...props.data, phone: e.target.value })}
                            value={props.data.phone}
                            pattern='+[0-9]{2}-[0-9]{3}-[0-9]{4}'
                        />
                    </div>
                    <div className='input-container'>
                        <span>Email address</span>
                        <input
                            type="text"
                            onChange={(e) => props.getData({ ...props.data, email: e.target.value })}
                            value={props.data.email}
                        />
                    </div>
                    <div className='button-container'>
                        <button className='cancel-button' onClick={() => props.closeModal(false)}>Cancel</button>
                        <button className='done-button' onClick={() => props.closeModal(false)}>Done</button>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Modal;