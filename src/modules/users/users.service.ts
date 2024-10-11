import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.password = userData.password;

    return await newUser.save();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) throw new NotFoundException();

    return user;
  }
}
