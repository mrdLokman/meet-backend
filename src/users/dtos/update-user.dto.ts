import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @IsOptional()
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}