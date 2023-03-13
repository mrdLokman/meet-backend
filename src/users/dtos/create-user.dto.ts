import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    sourceUID?: string;

    @ApiProperty()
    @IsString()
    source: string;

    @ApiProperty()
    @IsBoolean()
    isAdmin?: boolean;

    @ApiProperty()
    @IsBoolean()
    isActive?: boolean;
}