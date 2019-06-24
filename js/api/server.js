const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
console.log(`Server listening on ${port}...`);


const io = require('socket.io')(3060)
const users = {}

io.on('connection', socket => {
  console.log(" on connection ");
  try{
    document.getElementById('message-container').remove;
    console.log(" on remove ");
  }
  catch(e){

  }
  
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name : users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
});