import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateAccountDto {
    @ApiProperty({required:true})
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({required:false})
    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @ApiProperty({required:false})
    @IsOptional()
    @IsArray()
    intrestIds?: string[];
}