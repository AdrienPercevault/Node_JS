const mongoDBClient = require('./mongo.connector')

const express = require ('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('All list');
});

router.get('/:list', (req, res) => {
    res.send(`list ${req.params.list}`);
});

module.exports = router;
