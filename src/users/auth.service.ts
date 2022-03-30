import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (user) {
      throw new BadRequestException('Email already registered');
    }

    // generate the salt
    const salt = randomBytes(8).toString('hex');
    //generate the hash
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //concat salt with hash
    const result = salt + '.' + hash.toString('hex');
    return this.usersService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new BadRequestException('Email not registered');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Wrong password.');
    }
    return user;
  }
}
