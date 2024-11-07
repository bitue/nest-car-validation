import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';

const script = promisify(_script);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    // see if email is in use
    const users = await this.userService.find(email);
    console.log(users, email, password);
    if (users.length) {
      throw new BadRequestException('email already in use here !');
    }

    // hash user password

    const salt = randomBytes(8).toString('hex'); // gen salt
    const hash = (await script(password, salt, 32)) as Buffer;
    const resultPassword = salt + '.' + hash.toString('hex');

    // create a new record to db
    const user = await this.userService.create(email, resultPassword);
    // return the user
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    console.log(user);
    if (!user) {
      throw new NotFoundException('user not found !');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await script(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('invalid user password !');
    }

    return user;
  }
}
