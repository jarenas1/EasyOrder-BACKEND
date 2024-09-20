import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsUrl()
    @IsNotEmpty()
    url: string
}
