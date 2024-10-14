import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateVagaTagDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    vagaId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    tagId: number;
}