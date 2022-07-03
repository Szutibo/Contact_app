export function validateCreate(values) {
    const { name, phone, email } = values;
    const errors = [];
    const regexNumberFormat = /^\d+$/;
    const regexEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        errors.name = 'Please provide a name!'
    } else if (name.length > 50) {
        errors.name = 'Name cannot exceed 50 characters!';
    } else if (name.length < 5) {
        errors.name = 'Name cannot be less than 5 characters!';
    }

    if (phone) {
        phone.length > 15 && (errors.phone = 'Phone number cannot exceed 15 characters!');
        phone.length < 5 && (errors.phone = 'Phone number cannot be less than 5 characters!');
        !regexNumberFormat.test(parseInt(phone)) && (errors.phone = 'You can only give positive whole numbers as a phone number!');
    }

    if (email) {
        email.length > 35 && (errors.email = 'E-mail address cannot exceed 35 characters!');
        email.length < 3 && (errors.email = 'E-mail address cannot be less than 3 characters!');
        !regexEmailFormat.test(email) && (errors.email = 'E-mail must contain "@" and "." characters!')
    }
    return errors;
};

export const validateUpdate = (values) => {
    const { name, phone, email } = values;
    const errors = [];
    const regexNumberFormat = /^\d+$/;
    const regexEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name) {
        name.length > 50 && (errors.name = 'Name cannot exceed 50 characters!');
        name.length < 5 && (errors.name = 'Name cannot be less than 5 characters!');
    }

    if (phone) {
        phone.length > 15 && (errors.phone = 'Phone number cannot exceed 15 characters!');
        phone.length < 5 && (errors.phone = 'Phone number cannot be less than 5 characters!');
        !regexNumberFormat.test(parseInt(phone)) && (errors.phone = 'You can only give positive whole numbers as a phone number!');
    }

    if (email) {
        email.length > 35 && (errors.email = 'E-mail address cannot exceed 35 characters!');
        email.length < 3 && (errors.email = 'E-mail address cannot be less than 3 characters!');
        !regexEmailFormat.test(email) && (errors.email = 'E-mail must contain "@" and "." characters!')
    }

    return errors;
};

export const createButtonChecker = (errorsArray, buttonFunc, classFunc) => {
    if (Object.keys(errorsArray).length === 0) {
        buttonFunc(false);
        classFunc('');
    } else {
        buttonFunc(true);
        classFunc('disabledClass');
    }
};

export const updateButtonChecker = (requestBody, errorsArray, buttonFunc, classFunc) => {
    if (Object.keys(requestBody).length > 0) {
        if (Object.keys(errorsArray).length === 0) {
            buttonFunc(false);
            classFunc('');
        } else {
            buttonFunc(true);
            classFunc('disabledClass');
        }
    } else {
        buttonFunc(true);
    }
};

export function imgChecker(img, defBg) {
    if (typeof (img) !== 'undefined') {
        return img;
    } else {
        return defBg;
    }
}