import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateSetorDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nome: string;
}