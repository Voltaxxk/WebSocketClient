import {Manager, Socket} from 'socket.io-client'

let socket : Socket 

export const connectToServer = ( token : string) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola : 'Mundo', 
            auth : token
        }
    })

    socket?.removeAllListeners();
    socket = manager.socket('/')
    addListener()
}


const addListener = () =>{

    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsList = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        // console.log('Connected to server')
        serverStatusLabel.innerText = 'Online'
    })

    socket.on('disconnect', () => {
        // console.log('Disconnected from server')
        serverStatusLabel.innerText = 'Offline'
    })


    socket.on('clients-updated', (clients : string[]) => {
        // console.log('clients-updated', clients)
        // // const clientsList = document.querySelector<HTMLUListElement>('#clients-ul')!
        // clients.forEach(client => {
            //     const li = document.createElement('li')
            //     li.innerText = client
            //     clientsList.appendChild(li)
            // })
        let clientsHtml = ''
        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        })
        clientsList.innerHTML = clientsHtml
    })
  
    


    messageForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const message = messageInput.value.trim()
        if(message.length === 0) return

        console.log()
        socket.emit('message-front-client', {id : 'Yo', message : messageInput.value})
        messageInput.value = ''
    })

    socket.on('message-from-server', (payload : {fullName : string, message : string}) => {
        console.log('message-from-server', payload)
        const li = document.createElement('li')
        li.innerText = `${payload.fullName}: ${payload.message}`
        messagesUl.appendChild(li)
    })

}