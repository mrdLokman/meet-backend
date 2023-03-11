
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  source: string;

  @Exclude()
  password: string;

  @Exclude()
  email: string;

  @Exclude()
  isActive: string;
}