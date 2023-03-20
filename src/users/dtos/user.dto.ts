
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { UserSource } from '../enums';

export class UserDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty({
    required: true,
    description: 'The source of this user',
    enum: UserSource,
    example: UserSource.FACEBOOK,
  })
  @IsEnum(UserSource)
  @Expose()
  source: UserSource;

  @Expose()
  isActive: string;

  @Expose()
  isAdmin: string;

  @Exclude()
  password: string;

  @Exclude()
  email: string;
}