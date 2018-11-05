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
            res.json(obj.users)
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
            obj.users.push({id:req.body.id, name:req.body.name, password:req.body.password});
            var json = JSON.stringify(obj, null, 4);
            fs.writeFile('data.json', json, 'utf8', (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).send(error);
                }
                res.json(obj.users)
            });
        }
    })
});

router.delete('/:userId', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        } else {
            console.log(data);
            var obj = JSON.parse(data);
            obj.users = obj.users.filter(users => {
                if (users.id === req.params.userId) {
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

router.put('/:userId', (req, res) => {
    object.body.keys.foreach(key => {
        req.users.userId.key
    })
    var json = JSON.stringify(obj, null, 4);
    fs.writeFile('data.json', json, 'utf8', (error) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        }
        res.send(true)
    });
})

module.exports = router;
