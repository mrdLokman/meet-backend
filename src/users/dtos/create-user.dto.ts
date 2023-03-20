import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { UserSource } from '../enums';

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

    @ApiProperty({
        required: false,
        description: 'The source of this user',
        enum: UserSource,
        example: UserSource.FACEBOOK,
    })
    @IsOptional()
    @IsEnum(UserSource)
    source: UserSource;

    @ApiProperty({required: false})
    @IsBoolean()
    isAdmin?: boolean;

    @ApiProperty({required: false})
    @IsBoolean()
    isActive?: boolean;
}