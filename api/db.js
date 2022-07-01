const mySql = require('mysql');
const pool = mySql.createPool({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'contact_app',
    port: '3306'
});
let db = {};

// Get all contacts
db.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM data', (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
};

// Get one contact by id
db.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM data WHERE id = ?', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result[0]);
        })
    });
}

// Create new contact
db.create = (body) => {
    let values = { name: body.name, img: body.img, phone: body.phone, email: body.email };

    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO data SET ?', values, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ result: 'Create successful!' });
        })
    });
}

// Delete contact by id
db.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM data WHERE id = ?', [id], (err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ result: 'Delete successful!' });
        })
    });
}

// Update contact
db.update = (body) => {
    return new Promise((resolve, reject) => {
        let query = 'UPDATE data SET ';
        let values = [];
        if (typeof (body.name) != 'undefined') {
            query += 'name = ?';
            values.push(body.name);
        }

        if (typeof (body.img) != 'undefined') {
            if (values.length >= 1) {
                query += ',';
            }
            query += 'img = ?'
            values.push(body.img);
        }

        if (typeof (body.phone) != 'undefined') {
            if (values.length >= 1) {
                query += ',';
            }
            query += 'phone = ?'
            values.push(body.phone);
        }

        if (typeof (body.email) != 'undefined') {
            if (values.length >= 1) {
                query += ',';
            }
            query += 'email = ?'
            values.push(body.email);
        }
        query += ' WHERE id = ?';

        values.push(parseInt(body.id));

        pool.query(query, values, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ result: 'Update successful!' });
        });
    })
}

module.exports = db;