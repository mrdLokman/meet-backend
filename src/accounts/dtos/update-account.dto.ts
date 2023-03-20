import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsDateString, IsArray, IsEnum } from 'class-validator';
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
}