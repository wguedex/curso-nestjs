import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';


interface ConnectedClients {
    [id:string] : {
        socket: Socket, 
        user: User
    }, 

}

@Injectable()
export class MessagesWsService {

    constructor(
        @InjectRepository(User)
        private readonly userRespository: Repository<User>
    ){

    }

    private connectedClients: ConnectedClients = {}

    async registerClient(client: Socket, userId: string){

        const user = await this.userRespository.findOneBy({id : userId})
        if (!user) throw new Error('User not found'); 
        if (!user.isActive) throw new Error('User not active');  
 
        this.connectedClients[client.id] = {
            socket : client, 
            user : user
        }; 

    }

    removeClient(clientId: string){
       delete this.connectedClients[clientId];
    }

    // getConnectedClients(): number{
    //     return Object.keys(this.connectedClients).length;
    //   }
    
    getConnectedClients(): string[]{
        return Object.keys(this.connectedClients);
      }

      getUserFullName(socketId: string) {
        return this.connectedClients[socketId].user.fullname;
    }  

}
