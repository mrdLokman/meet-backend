import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIntrestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
}