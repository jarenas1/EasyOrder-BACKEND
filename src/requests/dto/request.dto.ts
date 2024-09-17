import { ApiOperation } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID} from "class-validator";

export class RequestDto {
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsUUID()
    @IsNotEmpty()
    sessionId: string;

    status?: string;
}