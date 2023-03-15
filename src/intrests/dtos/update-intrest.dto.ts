import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateIntrestDto {
    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    title: string;
}