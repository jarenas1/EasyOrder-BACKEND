import { IsNotEmpty, IsString } from "class-validator";

export class CreateTableStatusDto {
    @IsString()
    @IsNotEmpty()
    name: string

}
