
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

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

  @Expose()
  purpose: string;
}