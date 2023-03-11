import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class SignupUserDto {
    @ApiProperty({description: 'User email',})
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'User password',})
    @IsString()
    password1: string;

    @ApiProperty({description: 'User confirmation password',})
    @IsString()
    password2: string;
}