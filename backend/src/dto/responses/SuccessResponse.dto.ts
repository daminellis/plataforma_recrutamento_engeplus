import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class SuccessResponseDto {

  @ApiProperty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @IsInt()
  code: number;

  @ApiProperty()
  message: string | object;
}