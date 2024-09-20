import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableStatusDto {
  @ApiProperty({ description: 'El nuevo estado de la mesa', example: 'ocupado' })
  @IsString()
  status: string;
}

export class UpdateTableNameDto {
  @ApiProperty({ description: 'El nuevo nombre de la mesa'})
  @IsString()
  name: string;
}