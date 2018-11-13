const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'))
var list = [];

io.on('connection', socket => {
    console.log('user connected : ', socket.id)
    socket.on('loaded', (data) => {
        console.log('data from client :', data)
    })
    socket.on('message', (data) => {
        console.log('message received', data)
        socket.broadcast.emit('message', data)
    })
    list.push({id: socket.id, pseudo: 'Anonyme'})
    io.emit('list', list)
    socket.on('pseudoChange', (data) => {
        console.log(socket.id, 'changed pseudo to', data)
        list[list.findIndex(element => {
            return  element.id === socket.id
        })].pseudo = data
        io.emit('list', list)    
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
        list= list.filter(element=>{
            return element.id !== socket.id
        })
    })
    io.emit('list', list)
})

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/views/index.html')
})

http.listen(3000, () => {
    console.log('server is up and running in http://localhost:3000')
})