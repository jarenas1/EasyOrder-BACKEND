/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
    
    @ApiProperty({ description: 'Nombre de la sesión', example: 'Sesión 1' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'ID de la mesa asociada', example: 'uuid-de-la-mesa' })
    @IsNotEmpty()
    table_id: string;
}
