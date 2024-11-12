import { Report } from 'src/reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

console.log(Report, 'form user entity file ');

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
