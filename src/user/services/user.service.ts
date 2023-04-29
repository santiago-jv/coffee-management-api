import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/auth.dto';
import { ResetPasswordDto } from '../data-transfer-objects/reset-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { EmailSenderService } from 'src/email-sender/email-sender.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly emailSenderService: EmailSenderService,
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

  public async resetPassword(data: ResetPasswordDto) {
    const { email } = data;
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const code = await this.resetPasswordService.generateResetPassword(user);
    await this.emailSenderService.sendResetPasswordEmail(user.email, code);
  }
}
