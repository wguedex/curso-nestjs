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
    
    socket.on('connect', () => {
        // console.log('connected')
        serverStatusLabel.innerHTML = 'connected';
    });

    socket.on('disconnect', () => {
        // console.log('disconnect')
        serverStatusLabel.innerHTML = 'disconnect';
    });    

}