import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email, password) {
     const user = this.repo.create({ email, password });
     return this.repo.save(user);
  }

  async findOne(id: number) {
    return this.repo.findOne(id);
  }

  async find(email: string) {
    return this.repo.find({
      where: {
        email
      }
    })
  }
}
