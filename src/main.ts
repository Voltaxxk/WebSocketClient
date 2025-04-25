import { connectToServer } from './socket-client'
import './style.css'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Socket Client</h1>

    <input type="text" id="jwtToken" placeholder="Type a token...">
    <br/>
    <br/>
    <Button id="btn-connect">Connect</Button>

    <br/>
    <br/>
    <span id="server-status">Offline</span>

    <ul id="clients-ul">
    
    </ul>

    <form id="message-form">
      <input type="text" id="message-input" placeholder="Type a message...">
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul">
      
    </ul>

  </div>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// connectToServer()
const inputJWT = document.querySelector<HTMLInputElement>('#jwtToken')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!


btnConnect.addEventListener('click', () => {
  const jwtToken = inputJWT.value.trim()
  if(jwtToken.length <= 0) return alert('Enter a valid token')
  inputJWT.value = ''
  connectToServer(jwtToken)
})