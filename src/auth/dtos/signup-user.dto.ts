import { IsString, IsEmail } from 'class-validator';

export class SignupUserDto {
    @IsString()
    email: string;

    @IsString()
    password1: string;

    @IsString()
    password2: string;
}