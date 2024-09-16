import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}