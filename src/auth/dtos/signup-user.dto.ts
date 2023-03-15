import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class SignupUserDto {
    @ApiProperty({description: 'User email', required: true})
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'User password', required: true})
    @IsString()
    password1: string;

    @ApiProperty({description: 'User confirmation password', required: true})
    @IsString()
    password2: string;
}