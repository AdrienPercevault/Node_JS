// git user : gwenaelMoventes

const app = require('express')()
const bodyParser = require('body-parser')

const usersRouter = require('./users')
const itemsRouter = require('./items')
const listRouter = require('./list')

app.use(bodyParser.json())

app.use('/users', usersRouter)
app.use('/items', itemsRouter)
app.use('/list', listRouter)

app.get('/', (req, res) => {
    res.send('TP initiation express')
})

app.listen(9999, () => {
    console.log('App listening on port 9999')
})

function loggerMiddleware(req, res, next) {
    console.log(`New request received : <== [${req.method}] ${req.originalUrl}`)
    next()
}

app.use(loggerMiddleware)

class user {
    constructor (name, password) {
        this.name = name;
        this.password = password;
    }
}

class items {
    constructor (label, image, description) {
        this.label = label;
        this.image = image;
        this.description = description;
    }
}

class list {
    constructor (name, user, items) {
        this.name = name;
        this.user = user;
        this.items = items;
    }
}