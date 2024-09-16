import { IsNotEmpty, IsNumber, IsUUID} from "class-validator";

export class RequestDto {
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    sessionsId: number;

    status?: string;
}