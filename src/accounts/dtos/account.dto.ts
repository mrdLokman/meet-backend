
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class AccountDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty()
  @Expose()
  birthDate: string;

  @ApiProperty()
  @Transform(({obj}) => obj.user.id)
  @Expose()
  userId: number;
}