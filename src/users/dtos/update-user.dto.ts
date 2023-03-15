import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty({required: false})
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty({required: false})
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean;
}