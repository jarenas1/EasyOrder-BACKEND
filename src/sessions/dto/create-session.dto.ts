/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
    
    @IsString()
    @IsNotEmpty()
    idSolicitud: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    tableId: string;
}
