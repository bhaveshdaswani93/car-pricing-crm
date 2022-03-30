import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  beforeInsert() {
    console.log('Trying to insert')
  }
}
