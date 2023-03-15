import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIntrestDto {
    @ApiProperty({required: true})
    @IsString()
    @IsNotEmpty()
    title: string;
}