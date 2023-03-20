import { Entity, Column, BeforeInsert, OneToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { generateId } from 'src/utils';
import { User } from 'src/users/user.entity';
import { Intrest } from 'src/intrests/intrest.entity';
import { PURPOSE } from './enums';

@Entity()
export class Account {
  
  @Column({ primary: true })
  id: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: true, type: 'float' })
  longitude: number;

  @Column({ nullable: true, type: 'float' })
  latitude: number;

  @Column({ nullable: true, type: 'date' })
  birthDate?: string;

  @Column({ nullable: true, type: 'enum', enum: PURPOSE })
  purpose?: PURPOSE;

  @ManyToMany(()=> Intrest, { eager: true })
  @JoinTable()
  intrests: Intrest[]

  @BeforeInsert()
  generateId() {
    this.id = generateId('Account');
  }
}