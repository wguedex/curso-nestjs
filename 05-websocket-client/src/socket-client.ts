import { Manager } from "socket.io-client"




export const connectToServer = () => {

    // localhost:3000/socket.io/socket.io.js
    const manager = new Manager('localhost:3000/socket.io/socket.io.js');

    const socket = manager.socket('/');
    console.log({socket})



}