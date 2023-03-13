
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  source: string;

  @Expose()
  isActive: string;

  @Expose()
  isAdmin: string;

  @Exclude()
  password: string;

  @Exclude()
  email: string;
}