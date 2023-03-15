import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsDateString, IsArray } from 'class-validator';

export class UpdateAccountDto {
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @ApiProperty({required:false})
    @IsArray()
    @IsOptional()
    intrestIds?: string[];
}