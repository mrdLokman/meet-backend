import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateIntrestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
}