import { Entity, Column, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import { generateId } from 'src/utils';
import { User } from 'src/users/user.entity';

@Entity()
export class Account {
  
  @Column({ primary: true })
  id: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ nullable: false })
  username: string;

  @Column({ type: 'date' })
  birthDate?: string;

  @BeforeInsert()
  generateId() {
    this.id = generateId('Account');
  }

}