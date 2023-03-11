import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    sourceUID?: string;

    @IsString()
    source: string;
}