import { IsString } from 'class-validator';

export class UpdateTableStatusDto {
  @IsString()
  status: string;
}
