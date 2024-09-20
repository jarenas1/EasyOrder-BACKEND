import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateTableDto {
  @ApiProperty({ description: 'El nombre de la mesa', example: 'Mesa 1' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'El estado de la mesa', example: 'disponible' })
  @IsString()
  status: string;

  @IsString()
  user: User;
}
