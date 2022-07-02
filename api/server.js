const express = require('express');
const db = require('./db');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '../public/images/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

// Filtering file type
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(new Error('File type must be jpg or png!'), false);
    }
}

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Get every contact
router.get('/', async (req, res) => {
    try {
        let result = await db.all();
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get one contact
router.get('/:id', async (req, res) => {
    try {
        let result = await db.one(req.params.id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Create new contact
router.post('/create', async (req, res) => {
    try {
        let result = await db.create(req.body);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete contact by id
router.delete('/:id', async (req, res) => {
    try {
        let result = await db.delete(req.params.id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Upload image
router.post('/upload', upload.single('contactImage'), (req, res) => {
    try {
        res.status(200).send(req.body.name);
        console.log('sikeres upload, backend');
    } catch (err) {
        res.status(500).send({ error: err.message })
        console.log(err.message);
    };
});


// Update contact
router.put('/', async (req, res) => {
    try {
        let result = await db.update(req.body);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;