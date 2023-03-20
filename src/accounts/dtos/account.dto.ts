
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { PURPOSE } from '../enums';

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

  @ApiProperty()
  @Transform(({obj}) => {
    if(!obj.intrests){
      return [];
    }
    const intrests: string[] = [];
    for(const intrest of obj.intrests){
      intrests.push(intrest.title);
    }
    return intrests;
  })
  @Expose()
  intrests?: string[]

  @ApiProperty({
    required: true,
    description: 'The source of this user',
    enum: PURPOSE,
    example: PURPOSE.CHAT,
  })
  @IsEnum(PURPOSE)
  @Expose()
  purpose: string;

  @ApiProperty()
  @Expose()
  longitude: number;

  @ApiProperty()
  @Expose()
  latitude: number;
}