import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string
}
