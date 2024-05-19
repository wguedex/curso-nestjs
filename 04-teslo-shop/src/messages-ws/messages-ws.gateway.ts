
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';


@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService, 
    private readonly JwtService: JwtService
  ) {}

  handleDisconnect(client: Socket) {
    // console.log('cliente desconectado', client.id)
    this.messagesWsService.removeClient(client.id);
    console.log({ conectados: this.messagesWsService.getConnectedClients() });
  }

  async handleConnection(client: Socket) {

    const token = client.handshake.headers.authentication as string;
    let payload : JwtPayload;
     
    try {
      
      payload = this.JwtService.verify(token);
      await   this.messagesWsService.registerClient(client, payload.id);

    } catch (error) {
        client.disconnect()
        return;
    }

    console.log({ payload });

    // console.log('cliente conectado', client.id)
    
    console.log({ conectados: this.messagesWsService.getConnectedClients() });
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  onHandleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // console.log(client.id, payload)

    //! Emite únicamente al cliente.
    // client.emit('message-from-server', {
    //     fullName: 'Soy Yo!',
    //     message: payload.message || 'no-message!!'
    // });

    //! Emitir a todos MENOS, al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //     fullName: 'Soy Yo!',
    //     message: payload.message || 'no-message!!'
    // });

    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'no-message!!'
    });

  }
}
