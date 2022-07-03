const port = 3001;

export const getContacts = async () => {
    const everyContact = await fetch(`http://localhost:${port}/api/contactlist`);
    return everyContact.json();
};

export const getContactById = async (id) => {
    const oneContact = await fetch(`http://localhost:${port}/api/contactlist/${id}`);
    if (oneContact.status === 200) {
        return oneContact.json();
    } else {
        throw new Error(
            'Server error!'
        );
    }
};

export const createContact = async (contactData) => {
    const { name, img, phone, email } = contactData;

    const createdContact = await fetch(`http://localhost:${port}/api/contactlist/create`, {
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
    fetch(`http://localhost:${port}/api/contactlist/${id}`, {
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

export const uploadImage = async (image, errorHandler, initFile) => {
    if (typeof (image) !== 'undefined') {
        const formdata = new FormData();
        formdata.append('contactImage', image);
        formdata.append('name', image.name);
        console.log(image);

        fetch(`http://localhost:${port}/api/contactlist/upload`, {
            method: 'POST',
            mode: 'cors',
            body: formdata
        }).then(response => {
            if (!response.ok) {
                initFile('');
                throw new Error(
                    `HTTP error occured: status ${response.status}`
                )
            }
            initFile('');
            return response;
        }).catch((error) => {
            errorHandler(error.message);
        })
    }
    return;
}