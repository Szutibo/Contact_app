import React, { useState } from 'react';
import './Navbar.css';

// Components
import Modal from '../modal/Modal';

// Icons
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TbBrightnessUp } from "react-icons/tb";
import { GoPlus } from "react-icons/go";

const Navbar = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className='navbar'>
      <div className='navbar-left-side'>
        <a href="/"><AiOutlineArrowLeft /></a>
      </div>
      <div className='nav-main'>
        <h1>Contacts</h1>
        <ul className='nav-elements'>
          <li>
            <p className='settings-icon'>
              {<IoSettingsOutline />}
            </p>
          </li>
          <li className='user-icon'></li>
          <li>
            <p className='add-contact-button' onClick={() => setOpen(true)}>
              {<GoPlus />}
              <span>Add new</span>
            </p>
            {open &&
              <Modal newContact={props.newContact} title='Add contact' closeModal={setOpen}/>
            }
          </li>
        </ul>
      </div>
      <div className='navbar-right-side'>
        <TbBrightnessUp />
      </div>
    </nav>
  )
}

export default Navbar;