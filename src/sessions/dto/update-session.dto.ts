/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {

    @ApiProperty({ description: 'Estado del pago de la sesión', example: true })
    @IsBoolean()
    paid?: boolean;
}
