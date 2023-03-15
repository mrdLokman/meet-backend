import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsDateString, IsArray } from 'class-validator';

export class UpdateAccountDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @ApiProperty()
    @IsArray()
    @IsOptional()
    intrestIds?: string[];
}