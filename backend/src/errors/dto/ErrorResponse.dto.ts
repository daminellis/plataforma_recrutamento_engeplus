import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class ErrorResponseDto {
  @ApiProperty()
  @IsInt()
  code: number;

  @ApiProperty()
  message: string | object;

  @ApiProperty()
  @IsString()
  path: string;
}