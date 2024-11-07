import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`after insert the ${this.id} done ...`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`after remove the ${this.id} done ...`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`after update the ${this.id} done ...`);
  }
}
