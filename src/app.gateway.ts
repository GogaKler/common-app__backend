import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://127.0.0.1:5173',
        credentials: true
    }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('AppGateway');

    @SubscribeMessage('sendMessage')
    handleMessage(client: Socket, payload): void {
        const { message } = payload;

        console.log(payload);
        const data = {
            message: message.message,
            user_id: message.user_id,
            name: message.name,
            avatar: message.avatar
        };
        this.server.emit('recMessage', data);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
