import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleDisconnect(client: Socket) {
    // console.log('cliente desconectado', client.id) 
    this.messagesWsService.removeClient(client.id);
    console.log({conectados: this.messagesWsService.getConnectedClients()})
  }

  handleConnection(client: Socket) {
    // console.log('cliente conectado', client.id) 
    this.messagesWsService.registerClient(client);
    console.log({conectados: this.messagesWsService.getConnectedClients()})
  }

}
