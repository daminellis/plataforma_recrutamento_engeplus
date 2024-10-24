import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export class FileUploadDto {
    @ApiProperty()
    @IsNotEmpty()
    file: Buffer;

    @IsOptional()
    @IsString()
    fieldname: string;
    
    @IsOptional()
    @IsString()
    originalname: string;
    
    @IsOptional()
    @IsString()
    mimetype: string;

    @IsOptional()
    @IsNumber()
    size: number;
}