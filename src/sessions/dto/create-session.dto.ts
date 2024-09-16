/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    table_id: string;
}