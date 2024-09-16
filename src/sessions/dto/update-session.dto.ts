/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';
import { IsBoolean } from 'class-validator';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {
    @IsBoolean()
    paid?: boolean;

}
