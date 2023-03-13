import { Entity, Column, BeforeInsert } from 'typeorm';
import { generateId } from 'src/utils';
import { UserSource } from './enums';


@Entity()
export class User {
  
  @Column({ primary: true })
  id: string;

  @Column({nullable: true})
  email?: string;

  @Column({nullable: true})
  password?: string;

  @Column({enum: UserSource, default:UserSource.EMAIL})
  source: string;

  @Column({nullable: true})
  sourceUID?: string;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: false })
  isAdmin?: boolean

  @BeforeInsert()
  generateId() {
    this.id = generateId('User');
  }
}