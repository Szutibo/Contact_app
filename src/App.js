import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/navbar/Navbar';
import { DropdownMenu, DropdownItem } from './components/dropdown/Dropdown';
import Modal from './components/modal/Modal';
import { getContacts, createContact } from './components/fetch/Fetch';

// Icons
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBellOff } from "react-icons/bi";
import { RiHeadphoneLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";

function App() {
  const [contactData, setContactData] = useState({}); // Gets data from the inputs in the Edit contact modal, data and getData alias
  const [contacts, setContacts] = useState([]); // loadContacts' result (GET request)
  const [contactToUpdate, setContactToUpdate] = useState({}); // Gets the contact by the clicked row's id
  const [httpErrors, setHttpErrors] = useState(null);
  const [expandedId, setExpandedId] = useState(-1);
  const [open, setOpen] = useState(false);

  const defBg = 'Default.png';

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  //Gets all the records from db
  const loadContacts = async () => {
    try {
      const requestedContactsArray = await getContacts();
      setContacts(requestedContactsArray);
    } catch (error) {
      setHttpErrors(error.message);
    }
  };

  // Gets one contact by id from contacts
  const loadOneContact = (id) => {
    const contact = contacts.find((contact) => contact.id === id);
    if (!open) {
      setContactToUpdate(contact);
    }
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

  /*const imgUpload = async (file) => {
    try {
      const result = await uploadFile(file, setUploadedFile);
      if (result) {
        console.log('sikeres feltöltés');
      }
    } catch(error) {
      setHttpErrors(error.message);
    }
  }*/

  useEffect(() => {
    loadContacts();
  }, []);



  return (
    <div className="container">
      <div className='top-left-corner upper-placeholder-div'></div>
      <div className='first-row-middle main'></div>
      <div className='top-right-corner upper-placeholder-div'></div>
      <div className='nav-container'>
        <Navbar
          newContact={newContact}
          defBg={defBg}
          imgChecker={imgChecker}
        />
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
                  loadOneContact(oneContact.id);
                  loadContacts();
                }}
              >
                <div className='one-contact'>
                  <div className='one-contact-img' style={{ backgroundImage: `url('/images/${imgChecker(oneContact.img, defBg)}')` }}></div>
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
                  <Modal
                    contactToUpdate={contactToUpdate}
                    setContactToUpdate={setContactToUpdate}
                    title='Edit contact'
                    closeModal={setOpen}
                    getData={setContactData}
                    data={contactData}
                    setHttpErrors={setHttpErrors}
                    refreshContactList={loadContacts}
                    defBg={defBg}
                    imgChecker={imgChecker}
                  />
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

// Checks if a record has an image property or not
function imgChecker(img, defBg) {
  if (img) {
    return img;
  } else {
    return defBg;
  }
}

export default App;
