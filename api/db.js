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
    console.log('db.js' ,values);

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
        let querry = 'UPDATE data SET ';
        let values = [];
        if (typeof (body.name) != "undefined") {
            querry += 'name = ?, '
            values.push(body.name);
        }

        if (typeof (body.img) != "undefined") {
            querry += 'img = ?, '
            values.push(body.img);
        }

        if (typeof (body.phone) != "undefined") {
            querry += 'phone = ?, '
            values.push(body.phone);
        }

        if (typeof (body.email) != "undefined") {
            querry += 'email = ? '
            values.push(body.email);
        }
        querry += ' WHERE id = ?';

        values.push(parseInt(body.id));

        pool.query(querry, values, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve({ result: 'Update successful!' });
        });
    })
}

module.exports = db;