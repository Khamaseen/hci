//cllient side socket

const socket = io('http://localhost:3060');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = "name.."
userVisitLeave("you joined")
document.getElementById("chat-disconnected").remove()
socket.emit('new-user', name)

socket.on('chat-message', data =>{
    const messageBox = document.createElement('div')
    messageBox.className = "card"
    const cardBody = document.createElement('div')
    cardBody.className = "card-body"
    messageBox.append(cardBody)
    const h6 = document.createElement('h6')
    h6.className = "card-subtitle mb-2 text-primary text-left"
    h6.innerText = `${data.name}`
    cardBody.append(h6)
    const p = document.createElement('p')
    p.className = "card-text float-left"
    p.innerText = `${data.message}`
    cardBody.append(p)
    messageContainer.append(messageBox)
})
socket.on('user-connected', name =>{
    userVisitLeave(`${name} connected`);
})
socket.on('disconnected', name =>{
    userVisitLeave(`${name} disconnected`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value;

    const messageBox = document.createElement('div')
    messageBox.className = "card"
    const cardBody = document.createElement('div')
    cardBody.className = "card-body"
    messageBox.append(cardBody)
    const h6 = document.createElement('h6')
    h6.className = "card-subtitle mb-2 text-success text-right"
    h6.innerText = "You"
    cardBody.append(h6)
    const p = document.createElement('p')
    p.className = "card-text float-right"
    p.innerText = `${message}`
    cardBody.append(p)
    messageContainer.append(messageBox)

    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function userVisitLeave(message) {
    const messageElement = document.createElement('div')
    messageElement.className = "card"
    messageElement.style.backgroundColor = "#e1e1e1"
    messageElement.style.padding = "4px"
    messageElement.style.textAlign = "center"
    messageElement.innerText = message
    messageContainer.append(messageElement)
}