import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class SigninUserDto {
    @ApiProperty({description: 'User email', required: true})
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({description: 'User password', required: true})
    @IsString()
    password: string;
}