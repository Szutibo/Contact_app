import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/navbar/Navbar';
import { DropdownMenu, DropdownItem } from './components/dropdown/Dropdown';
import Modal from './components/modal/Modal';
import { getContacts, createContact } from './components/fetch/Fetch';
import { imgChecker } from './components/utility/Utility';

// Icons
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiBellOff } from 'react-icons/bi';
import { RiHeadphoneLine } from 'react-icons/ri';
import { TbDots } from 'react-icons/tb';

function App() {
  const [contactData, setContactData] = useState({
    name: '',
    img: '',
    phone: '',
    email: '',
  }); // Gets data from the inputs in the Edit contact modal, data and getData alias
  const [contacts, setContacts] = useState([]); // loadContacts' result (GET request)
  const [contactToUpdate, setContactToUpdate] = useState({}); // Gets the contact by the clicked row's id
  const [httpErrors, setHttpErrors] = useState(null); // HTTP errors get here
  const [expandedId, setExpandedId] = useState(-1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const defBg = 'Default.png';

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  //Gets all the records from db
  const loadContacts = async () => {
    setLoading(true);

    try {
      const requestedContactsArray = await getContacts();
      setContacts(requestedContactsArray);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setHttpErrors(error.message);
      setLoading(false);
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

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className='container'>
      <div className='top-left-corner upper-placeholder-div'></div>
      <div className='first-row-middle main'></div>
      <div className='top-right-corner upper-placeholder-div'></div>
      <div className='nav-container'>
        <Navbar
          newContact={newContact}
          defBg={defBg}
          imgChecker={imgChecker}
        />
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
          />
        }
      </div>
      <div className='bottom-left-corner lower-placeholder-div'></div>
      <div className='main body'>
        <div className='row-box'>
          {httpErrors &&
            <h2 onClick={() => {
              loadContacts();
              setHttpErrors('');
            }} className='http-error-container'>{httpErrors}</h2>
          }
          {loading
            ? <div className='skeleton-row'>
              <div className='skeleton-one-contact'>
                <div className='skeleton-img'></div>
                <div>
                  <div className='skeleton-item'></div>
                  <div className='skeleton-item'></div>
                </div>
              </div>
              <div className='skeleton-one-contact'>
                <div className='skeleton-img'></div>
                <div>
                  <div className='skeleton-item'></div>
                  <div className='skeleton-item'></div>
                </div>
              </div>
              <div className='skeleton-one-contact'>
                <div className='skeleton-img'></div>
                <div>
                  <div className='skeleton-item'></div>
                  <div className='skeleton-item'></div>
                </div>
              </div>
              <div className='skeleton-one-contact'>
                <div className='skeleton-img'></div>
                <div>
                  <div className='skeleton-item'></div>
                  <div className='skeleton-item'></div>
                </div>
              </div>
              <div className='skeleton-one-contact'>
                <div className='skeleton-img'></div>
                <div>
                  <div className='skeleton-item'></div>
                  <div className='skeleton-item'></div>
                </div>
              </div>
            </div>
            : contacts.map((oneContact, i) => {
              return (
                <div
                  className='row'
                  key={oneContact.id}
                  onClick={() => {
                    loadOneContact(oneContact.id);
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
                      <div
                      className='dropdown-container' onClick={() => {
                        handleExpandClick(i);
                      }}
                      >
                        {<TbDots />}
                        {expandedId === i &&
                          <DropdownMenu>
                            <DropdownItem openModal={setOpen} icon={<IoSettingsOutline />}
                            >Edit</DropdownItem>
                            <DropdownItem icon={<MdOutlineFavoriteBorder />}>Favourite</DropdownItem>
                            <DropdownItem refreshContactList={loadContacts} id={oneContact.id} icon={<MdDeleteOutline />}>Remove</DropdownItem>
                          </DropdownMenu>
                        }
                      </div>
                    </li>
                  </ul>
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
