import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

console.log(User, 'from report entity file ');

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  long: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  //

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

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
