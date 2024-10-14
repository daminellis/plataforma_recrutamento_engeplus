import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateVagaTagDto {

    @ApiProperty()
    @IsOptional()
    @IsInt()
    vagaId?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    tagId?: number;
}