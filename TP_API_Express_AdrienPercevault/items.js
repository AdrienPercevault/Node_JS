const express = require ('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            console.log(data);
            var obj = JSON.parse(data);
            res.json(obj.items)
        }
    })
});

router.post('/', (req, res) => {    
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            console.log(data);
            var obj = JSON.parse(data);
            obj.items.push({id:req.body.id, label:req.body.label, image:req.body.image, description:req.body.description});
            var json = JSON.stringify(obj, null, 4);
            fs.writeFile('data.json', json, 'utf8', (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                res.json(obj.items)
            });
        }
    })
});

router.delete('/:itemId', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            console.log(data);
            var obj = JSON.parse(data);
            obj.items = obj.items.filter(items => {
                if (items.id === req.params.itemId) {
                    return false;
                } else {
                    return true;
                }
            });
            var json = JSON.stringify(obj, null, 4);
            fs.writeFile('data.json', json, 'utf8', (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                res.send(true)
            });
        }
    })
});

module.exports = router;
