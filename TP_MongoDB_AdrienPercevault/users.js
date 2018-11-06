const mongoDBClient = require('./mongo.connector')

const express = require ('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    mongoDBClient.db.collection('users').find({}).toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error))
});

router.post('/', (req, res) => {    
    mongoDBClient.db.collection('users').insertMany([{
        id: '4',
        name: 'Riki',
        password: 'LeCotey'
    }])
    .then(result => res.send(result))
    .catch(error => res.send(error))
});

router.delete('/:userId', (req, res) => {
    mongoDBClient.db.collection('users').deleteOne({
        id: '4',
        name: 'Riki',
        password: 'LeCotey'
    })
    .then(result => res.send(result))
    .catch(error => res.send(error))
});

router.put('/:userId', (req, res) => {
    mongoDBClient.db.collection('users').updateOne(
        {'id': '4'}, // Filter
        {'name': 'Jessica'} // Update
    )
    .then((obj) => {
        console.log('Updated - ' + obj);
        res.redirect('orders')
    })
    .catch((err) => {
        console.log('Error: ' + err);
    })
});

module.exports = router;