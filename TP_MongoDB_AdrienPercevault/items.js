const mongoDBClient = require('./mongo.connector')

const express = require ('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    mongoDBClient.db.collection('items').find({}).toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error))
});

router.post('/', (req, res) => {    
    mongoDBClient.db.collection('items').insertMany([{
        id: '1',
        label: 'label',
        image: 'image',
        description: 'description'
    }])
    .then(result => res.send(result))
    .catch(error => res.send(error))
});

router.delete('/:itemId', (req, res) => {
    mongoDBClient.db.collection('items').deleteOne({
        id: '1',
        label: 'label',
        image: 'image',
        description: 'description'
    })
    .then(result => res.send(result))
    .catch(error => res.send(error))
});

router.put('/:itemId', (req, res) => {
    mongoDBClient.db.collection('items').updateOne({})
    .then(result => res.send(result))
    .catch(error => res.send(error))
});

module.exports = router;