
// Lado cliente
const socket = io() 
//Fecha

const tiempoTranscurrido = Date.now()
const hoy = new Date(tiempoTranscurrido)
const fecha= hoy.toLocaleDateString()
const tiempo = new Date()
const argHora=tiempo.toLocaleTimeString('it-IT')

//CHAT 
const formChat = document.querySelector('#formChat')
const id = document.querySelector('#idUsuario') //mail
const nameInput = document.querySelector('#nameInput')
const surnameInput = document.querySelector('#surnameInput')
const aliasInput = document.querySelector('#aliasInput') 
const avatarInput = document.querySelector('#avatarInput') 
const messageInput = document.querySelector('#messageInput')


const totalMessages = document.querySelector('#totalMessages')

// EMITO MENSAJES AL SERVIDOR
function sendMessage() {
    try {
        const mail = id.value
        const message = messageInput.value
        const tiempochat = tiempo
        socket.emit('client:message', { mail, message, tiempochat})
        
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

//RENDER MENSAJES E INSERTO HTML

function renderMessages(messagesArray) {
    try {
        const html = messagesArray.map(messageInfo => {
            return(`<div>
                <strong style="color: blue;" >${messageInfo.mail}</strong>[
                <span style="color: brown;">${messageInfo.tiempochat}</span>]:
                <em style="color: green;font-style: italic;">${messageInfo.message}</em> </div>`)
        }).join(" ");

        totalMessages.innerHTML = html
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}
// ESCUCHO EVENTO - ENVIO CHAT
formChat.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = "" 
})

// CAPTURO MENSAJES EMITIDOS AL SERVIDOR
socket.on('serverSend:message', renderMessages);
// 2  PARTE PRODUCTOS
const formProducts = document.querySelector('#formProducts')
const titleInput = document.querySelector('#title')
const priceInput = document.querySelector('#price')
const thumbnailInput = document.querySelector('#thumbnail')

const productosInsert = document.querySelector('#productosTabla')