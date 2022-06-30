export const getContacts = async () => {
    const everyContact = await fetch('http://localhost:3001/api/contactlist');
    return everyContact.json();
};

export const createContact = async (contactData) => {
    const { name, img, phone, email } = contactData;
    console.log('fetch.js' ,contactData);
    const createdContact = await fetch('http://localhost:3001/api/contactlist/create', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            img: img,
            phone: phone,
            email: email,
        })
    });
    if (createdContact.status === 200) {
        return createdContact.json();
    } else {
        throw new Error(
            `HTTP error occured: status ${createdContact.status}`
        );
    }
};

export const getContactById = async (id) => {
    const oneContact = await fetch(`http://localhost:3001/api/contactlist/${id}`);
    if (oneContact.status === 200) {
        return oneContact.json();
    } else {
        throw new Error(
            'ID does not exist!'
        );
    }
};

export const deleteContactById = (id) => {
    fetch(`http://localhost:3001/api/contactlist/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: [],
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `HTTP error occured: status ${response.status}`
                );
            }
            return response;
        });
};

export const updateContact = async (id, data) => {
    const updatedContact = await fetch(`http://localhost:3001/api/contactlist/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    if (updatedContact.status === 200) {
        return updatedContact.json();
    } else {
        throw new Error(
            'ID does not exist!'
        );
    }
};