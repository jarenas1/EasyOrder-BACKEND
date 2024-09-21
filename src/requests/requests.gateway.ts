import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// Dto para los requests
import { RequestDto } from './dto/request.dto';
import { Request } from './request.entity';


@ApiTags('WebSocket')
@WebSocketGateway({ cors: { origin: '*' }})
export class RequestsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  @ApiOperation({ summary: 'Notifica a todos los clientes cuando un nuevo cliente se conecta.' })
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    //Le tiramos el broadcast para que no le vaya a emitir al cliente
    client.broadcast.emit('client-joined', {message: `New client joined: ${client.id}`});
  }

  @ApiOperation({ summary: 'Notifica a todos los clientes cuando un cliente se desconecta.' })
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    client.broadcast.emit('client-disconnected', {message: `Client disconnected: ${client.id}`});
  }

  //Lo voy a dejar ahí para ver si con este se puede cambiar el estado
  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }


  @ApiOperation({ summary: 'Emite una nueva solicitud a todos los clientes conectados.' })
  sendRequest(request: Request) {
    this.server.emit('new-request', request);
  }

  //Con este voy a notificar al cliente cuando el estado de la solicitud cambie
  @ApiOperation({ summary: 'Notifica a todos los clientes cuando cambia el estado de una solicitud.' })
  notifyRequestStatusChange(request: Request) {
    this.server.emit('request-status-change', request);
  }

}