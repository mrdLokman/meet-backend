import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    intrestIds?: string[];
}