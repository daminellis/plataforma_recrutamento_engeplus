import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, Length, IsEmail, IsOptional, IsInt, IsArray, ValidateNested, IsBoolean } from "class-validator";

class RoutePermission {
    @ApiProperty()
    @IsString()
    route: string;

    @ApiProperty()
    @IsNotEmpty()
    hasAccess: boolean;
}

export class ResponseLoginDto {

    @ApiProperty()
    @IsBoolean()
    success: boolean;

    @ApiProperty()
    @IsString()
    access_token: string;

    @ApiProperty({ type: [RoutePermission] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RoutePermission)
    routes: RoutePermission[];
}