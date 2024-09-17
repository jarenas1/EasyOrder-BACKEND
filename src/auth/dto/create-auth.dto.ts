import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from "src/role/entities/role.entity"

export class RegisterDto {


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    lastname: string

    @ApiPropertyOptional({ type: () => Role })
    @IsOptional()
    role: Role
}
