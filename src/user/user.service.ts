import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(registerData: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerData.password, 10);
      registerData.password = hashedPassword;
      const user = await this.usersRepository.save(registerData);

      await this.usersRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      console.error('There was an error in: UserService::createUser', error);
      throw new BadRequestException('There was an error trying create user');
    }
  }

  public async findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
}
