import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({ description: 'El nombre de la mesa', example: 'Mesa 1' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'El estado de la mesa', example: 'disponible' })
  @IsString()
  status: string;
}
