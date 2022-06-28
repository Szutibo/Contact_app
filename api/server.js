const express = require('express');
const db = require('./db');
const router = express.Router();

// Get every contact
router.get('/', async (req, res) => {
    try {
        let result = await db.all();
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get one contact
router.get('/:id', async (req, res) => {
    try {
        let result = await db.one(req.params.id);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Create new contact
router.post('/create', async (req, res) => {
    try {
        let result = await db.create(req.body);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete contact
router.delete('/:id', async (req, res) => {
    try {
        let result = await db.delete(req.params.id);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Update contact
router.put('/', async (req, res) => {
    try {
        let result = await db.update(req.body);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;