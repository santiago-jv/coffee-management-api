import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import JwtAuthPayload from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const userFound = await this.userService.findOneByEmail(email);

    if (userFound && (await bcrypt.compare(password, userFound.password))) {
      delete userFound.password;
      return userFound;
    }
    return null;
  }

  async login(userData: LoginDto) {
    const user = await this.validateUser(userData.email, userData.password);

    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload: JwtAuthPayload = {
      id: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      type: 'Bearer',
      user,
    };
  }

  public async register(userData: RegisterDto) {
    const userFound = await this.userService.findOneByEmail(
      userData.email,
    );
    if (userFound) {
      throw new BadRequestException('User already exist');
    }
    const newUser = await this.userService.createUser(userData);

    return {
      user: newUser,
    };
  }
}
