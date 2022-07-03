import React, { useState, useEffect, Fragment } from 'react';
import './App.css';

// Components
import Navbar from './components/navbar/Navbar';
import { DropdownMenu, DropdownItem } from './components/dropdown/Dropdown';
import Modal from './components/modal/Modal';
import { getContacts, createContact } from './components/fetch/Fetch';
import { imgChecker } from './components/utility/Utility';
import { SkeletonItem } from './components/skeleton/Skeleton';

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
  const [contactToUpdate, setContactToUpdate] = useState({}); // Gets the contact by the clicked row's id
  const [httpErrors, setHttpErrors] = useState(null); // HTTP errors get set here
  const [contacts, setContacts] = useState([]); // loadContacts' result
  const [expandedId, setExpandedId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
    setContactToUpdate(contact);
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
          {contacts.map((oneContact, i) => {
            return (
              <Fragment key={oneContact.id}>
                {loading
                  ? <div className='skeleton-row'>
                    <SkeletonItem />
                  </div>
                  : (<div
                    className='row'
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
                  )}
              </Fragment>
            )
          })}
        </div>
      </div>
      <div className='bottom-right-corner lower-placeholder-div'></div>
    </div>
  );
}

export default App;