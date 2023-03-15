import { Entity, Column, BeforeInsert, OneToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { generateId } from 'src/utils';
import { User } from 'src/users/user.entity';
import { Intrest } from 'src/intrests/intrest.entity';

@Entity()
export class Account {
  
  @Column({ primary: true })
  id: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ type: 'date' })
  birthDate?: string;

  @ManyToMany(()=> Intrest, { eager: true })
  @JoinTable()
  intrests: Intrest[]

  @BeforeInsert()
  generateId() {
    this.id = generateId('Account');
  }
}