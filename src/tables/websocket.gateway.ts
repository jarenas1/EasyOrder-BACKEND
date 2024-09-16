import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TableGateway {
  @WebSocketServer()
  server: Server;

  updateTableStatus(tableId: string, status: string) {
    this.server.emit('tableStatusUpdate', { tableId, status });
  }
  
}
