import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateRoleDto {


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type: string
}
