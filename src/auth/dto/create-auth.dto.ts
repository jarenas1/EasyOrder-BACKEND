import { IsNotEmpty, IsString, MinLength } from "class-validator"
import { Role } from "src/role/entities/role.entity"

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    lastname: string

    @IsString()
    role: Role
}
