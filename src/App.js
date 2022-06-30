import React, { useState, useEffect } from 'react';
import './App.css';
import { getContacts, createContact, getContactById, updateContact } from './components/fetch/Fetch';

// Components
import Navbar from './components/navbar/Navbar';
import { DropdownMenu, DropdownItem } from './components/dropdown/Dropdown';
import Modal from './components/modal/Modal';

// Icons
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBellOff } from "react-icons/bi";
import { RiHeadphoneLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";

function App() {
  const [contactData, setContactData] = useState({
    id: '',
    name: '',
    img: '',
    phone: '',
    email: '',
  });
  const [contacts, setContacts] = useState([]);
  const [httpErrors, setHttpErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(-1);
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const defBg = 'Default.png';

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  const loadContacts = async () => {
    try {
      const requestedContactsArray = await getContacts();
      setContacts(requestedContactsArray);
    } catch (error) {
      setHttpErrors(error.message);
    }
  };

  const check = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    console.log(contact);
  }

  const newContact = async (data) => {
    try {
      const result = await createContact(data);
      if (result) {
        loadContacts();
      }
    } catch (error) {
      setHttpErrors(error.message);
    }
  }

  useEffect(() => {
    loadContacts();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  return (
    <div className="container">
      <div className='top-left-corner upper-placeholder-div'></div>
      <div className='first-row-middle main'></div>
      <div className='top-right-corner upper-placeholder-div'></div>
      <div className='nav-container'>
        <Navbar newContact={newContact}/>
      </div>
      <div className='bottom-left-corner lower-placeholder-div'></div>
      <div className='main body'>
        {httpErrors && 
          <p>{httpErrors}</p>
        }
        <div className='row-box'>
          {contacts.map((oneContact, i) => {
            return (
              <div
              className='row'
              key={oneContact.id}
              onClick={() => {
                setRowId(oneContact.id);
                check(oneContact.id);
              }}
              >
                <div className='one-contact'>
                  <div className='one-contact-img' style={{ backgroundImage: `url('/images/${defBg}')` }}></div>
                  <div className='one-contact-info'>
                    <div>{oneContact.name}</div>
                    <div>{oneContact.phone}</div>
                  </div>
                </div>
                <ul className='one-contact-icons-container'>
                  <li>{<BiBellOff />}</li>
                  <li>{<RiHeadphoneLine />}</li>
                  <li>
                    <div className='dropdown-container' onClick={() => handleExpandClick(i)}>
                      {<TbDots />}
                      {expandedId === i &&
                        <DropdownMenu>
                          <DropdownItem openModal={setOpen} icon={<IoSettingsOutline />}>Edit</DropdownItem>
                          <DropdownItem icon={<MdOutlineFavoriteBorder />}>Favourite</DropdownItem>
                          <DropdownItem refreshContactList={loadContacts} id={oneContact.id} icon={<MdDeleteOutline />}>Remove</DropdownItem>
                        </DropdownMenu>
                      }
                    </div>
                  </li>
                </ul>
                {open &&
                  <Modal title='Edit contact' closeModal={setOpen} getData={setContactData} data={contactData} contactId={1} />
                }
              </div>
            )
          })}
        </div>
      </div>
      <div className='bottom-right-corner lower-placeholder-div'></div>
    </div>
  );
}

export default App;
