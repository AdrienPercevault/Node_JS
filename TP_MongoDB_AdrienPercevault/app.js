const mongoDBClient = require('./mongo.connector')

const app = require('express')()
const bodyParser = require('body-parser')

const usersRouter = require('./users')
const itemsRouter = require('./items')
const listRouter = require('./list')

mongoDBClient.init()
.then(client => {
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
})
.catch(err => {
    throw err
})