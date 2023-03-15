import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({required: false})
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    sourceUID?: string;

    @ApiProperty({required: false})
    @IsString()
    source: string;

    @ApiProperty({required: false})
    @IsBoolean()
    isAdmin?: boolean;

    @ApiProperty({required: false})
    @IsBoolean()
    isActive?: boolean;
}