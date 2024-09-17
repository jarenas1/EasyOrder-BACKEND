import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from "src/role/entities/role.entity"

export class CreateUserDto {


    @ApiProperty({example: "diegojota"})
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: string


    @ApiProperty({example: "diego"})
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string

    @ApiProperty({example: "JaraMillo22"})
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string

    @ApiProperty({example: "jaramillo"})
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    lastname: string


    @ApiPropertyOptional({ type: () => Role })
    @IsOptional()
    @IsString()
    role: Role
}
