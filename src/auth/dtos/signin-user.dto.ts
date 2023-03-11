import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class SigninUserDto {
    @ApiProperty({description: 'User email',})
    @IsEmail()
    @IsString()
    username: string;

    @ApiProperty({description: 'User password',})
    @IsString()
    password: string;
}