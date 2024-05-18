import { Manager, Socket } from "socket.io-client"




export const connectToServer = () => {

    // localhost:3000/socket.io/socket.io.js
    const manager = new Manager('localhost:3000/socket.io/socket.io.js');

    const socket = manager.socket('/');
    addListeners(socket)
    // console.log({socket})



}


const addListeners = (socket: Socket) => {
    
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-ul')!; 

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    
    socket.on('connect', () => {
        // console.log('connected')
        serverStatusLabel.innerHTML = 'connected';
    });

    socket.on('disconnect', () => {
        // console.log('disconnect')
        serverStatusLabel.innerHTML = 'disconnect';
    });    

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
          clientsHtml += `
            <li>${clientId}</li>
          `;
        });
        clientsUl.innerHTML = clientsHtml;
      });

      messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0){
          return;
        }

        socket.emit('message-from-client', {
          id: 'YO!!', 
          message : messageInput.value
        });
 
        messageInput.value = '';
 
      });


}