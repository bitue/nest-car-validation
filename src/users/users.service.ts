import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    //console.log(1);
    const user = this.repo.create({ email, password }); // create new instance to the User entity  not save to the DB specific hook is executed
    // console.log(user);
    return this.repo.save(user); // save it to the DB  actual persistance
  }
  async findOne(id: number) {
    console.log(id, '----------------');
    if (!id) {
      return null;
    }
    const user = await this.repo.findOne({ where: { id } });
    // if (!user) {
    //   return new NotFoundException('user not found');
    // }
    return user;
  }
  find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attr: Partial<User>) {
    const user = await this.findOne(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found !');
    }
    Object.assign(user, attr);
    return this.repo.save(user as User);
  }
  async remove(id: number) {
    console.log(1);
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found !');
    }
    console.log(3);
    return this.repo.remove(user as User);
  }
}
