import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserInfo(email: string, Password: string) {
    const userData = await this.userService.getUserByEmail(email);

    const encrypt = await bcrypt.compare(Password, userData.password);

    const { password, ...user } = userData;

    if (encrypt) {
      return user;
    }
    return { message: 'Password Incorrect', user: null };
  }

  async generateToken(user) {
    const payload = { user: user.name, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
