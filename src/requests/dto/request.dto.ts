import { IsNotEmpty, IsNumber} from "class-validator";

export class RequestDto {
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    sessionsId: number;

    status?: string;
}