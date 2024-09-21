import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('WebSocket')
@Controller('websocketinfo')
export class WebsocketinfoController {
    @Get()
    @ApiOperation({ summary: 'Obtiene información sobre cómo conectarse al WebSocket.' })
    getWebSocketInfo() {
        return {
            websocketUrl: "ws://{HOST}:{PORT}",
            events: [
                {
                    event: "client-joined",
                    description: "Notifica cuando un nuevo cliente se conecta."
                },
                {
                    event: "client-disconnected",
                    description: "Notifica cuando un cliente se desconecta."
                },
                {
                    event: "new-request",
                    description: "Notifica cuando se crea una nueva solicitud."
                },
                {
                    event: "request-status-change",
                    description: "Notifica cuando cambia el estado de una solicitud."
                }
            ]
        };
    }
}
