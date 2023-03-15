import { Entity, Column, BeforeInsert } from 'typeorm';
import { generateId } from 'src/utils';

@Entity()
export class Intrest {
  
  @Column({ primary: true })
  id: string;

  @Column({ nullable: false })
  title: string;

  @BeforeInsert()
  generateId() {
    this.id = generateId('Intrest');
  }
}