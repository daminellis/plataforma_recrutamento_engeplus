import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, IsEmail, IsOptional, IsInt } from "class-validator";


export class ResponseLoginDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4, 100)
    nomeCompleto: string;

    @ApiProperty()
    @IsEmail()
    @Length(8, 50)
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    cargo: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    setor: string;
}