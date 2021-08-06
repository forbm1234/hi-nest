
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateChatDto{
    @IsNumber()
    readonly customer_id: number;

    @IsOptional()
    @IsString( { each: true })
    readonly content: string;
}