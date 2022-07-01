export const getContacts = async () => {
    const everyContact = await fetch('http://localhost:3001/api/contactlist');
    return everyContact.json();
};

export const createContact = async (contactData) => {
    const { name, img, phone, email } = contactData;
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

export const updateContact = async (data) => {
    const updatedContact = await fetch(`http://localhost:3001/api/contactlist`, {
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

export const uploadFile = async (file, func) => {
    try {
        const result = await fetch('http://localhost:3001/api/contactlist/upload', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'text/html'
            }, body: {
                contactImage: file,
            }
        });
        console.log(file);
        const fileName = result.data;

        func({ fileName });
        console.log('siker', fileName);
    } catch (err) {
        if (err.status === 500) {
            console.log('Server error');
        } else {
            console.log('catch, else ág, fetch.js',err.message);
        }
    }
}