import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateAccountDto {
    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsDateString()
    birthDate: string;

    @IsOptional()
    user: User;
}