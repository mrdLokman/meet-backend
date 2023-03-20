import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsDateString, IsArray, IsEnum, IsNumber } from 'class-validator';
import { PURPOSE } from '../enums';

export class UpdateAccountDto {
    @ApiProperty({
        required: false,
        description: 'The username for account',
        example: "lokman"
    })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({
        required: false,
        description: 'The date of birth for this account',
        example: "10-10-2023"
    })
    @IsString()
    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @ApiProperty({
        required:false,
        description: 'The intrests Ids selected for this account',
        example: ["Intrest_Am5dF3z2uUq"]
    })
    @IsArray()
    @IsOptional()
    intrestIds?: string[];

    @ApiProperty({
        required: false,
        description: 'The purpose of this account',
        enum: PURPOSE,
        example: PURPOSE.CHAT,
    })
    @IsOptional()
    @IsEnum(PURPOSE)
    purpose?: PURPOSE;

    @ApiProperty({
        required: false,
        description: 'The last registrated logitude',
        example: 3.256481,
    })
    @IsNumber()
    @IsOptional()
    longitude: number;

    @ApiProperty({
        required: false,
        description: 'The last registrated latitude',
        example: 19.745812,
    })
    @IsNumber()
    @IsOptional()
    latitude: number;
}