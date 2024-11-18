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

    @ApiProperty()
    @IsNotEmpty()
    user: {
        id: number,
        username: string,
        nomeCompleto: string,
        email: string,
        cargo: string,
        setor: string,
        routes: RoutePermission[]
    };
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsInt()
    // id: number;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // username: string;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // @Length(4, 100)
    // nomeCompleto: string;

    // @ApiProperty()
    // @IsEmail()
    // @Length(8, 50)
    // @IsNotEmpty()
    // email: string;

    // @ApiProperty()
    // @IsString()
    // @IsOptional()
    // cargo: string;

    // @ApiProperty()
    // @IsString()
    // @IsOptional()
    // setor: string;

    // @ApiProperty({ type: [RoutePermission] })
    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => RoutePermission)
    // routes: RoutePermission[];
}