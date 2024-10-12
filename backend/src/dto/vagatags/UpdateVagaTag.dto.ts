import { IsInt, IsOptional } from 'class-validator';

export class UpdateVagaTagDto {
    @IsOptional()
    @IsInt()
    vagaId?: number;

    @IsOptional()
    @IsInt()
    tagId?: number;
}