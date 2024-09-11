import { IsNotEmpty, IsString } from "class-validator";


export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    type: string
}
