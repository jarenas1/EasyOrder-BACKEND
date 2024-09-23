import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

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

export class UpdateTableUserDto {
  @ApiProperty({ description: 'El nuevo usuario asignado a la mesa' })
  user: User;
}

export class UpdateTableNameAndUserDto {
  @ApiProperty({ description: 'El nuevo nombre de la mesa' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'El id del nuevo usuario asignado a la mesa', example: 'uuid' })
  @IsString()
  user: User;
}