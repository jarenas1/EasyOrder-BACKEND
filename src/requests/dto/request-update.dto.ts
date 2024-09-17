import { IsNotEmpty, IsString } from "class-validator";

export class RequestUpdateDto {
    @IsString()
    @IsNotEmpty()
    status: string;
}