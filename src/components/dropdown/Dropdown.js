import './Dropdown.css';
import { deleteContactById } from '../fetch/Fetch';

export function DropdownMenu(props) {

    return (
        <div className="dropdown">
            {props.children}
        </div>
    )
}

export function DropdownItem(props) {
    return (
        <div
            onClick={() => {
                (props.openModal && props.openModal(true));
                if (props.id) {
                    deleteContactById(props.id);
                    props.refreshContactList();
                }
            }}
            className="dropdown-item"
        >
            <span>{props.icon}</span>
            {props.children}
        </div>
    )
}