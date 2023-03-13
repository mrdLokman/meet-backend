import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean;
}