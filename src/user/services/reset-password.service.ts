import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserPasswordReset } from '../entities/user-password-reset.entity';
import { DateService } from 'src/common/services/date.service';
import { PinGeneratorService } from 'src/common/services/pin-generator.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(UserPasswordReset)
    private readonly userPasswordResetRepository: Repository<UserPasswordReset>,
  ) {}

  public async generateResetPassword(user: User): Promise<string> {
    const newUserPasswordReset = await this.userPasswordResetRepository.save({
      user: user,
      code: PinGeneratorService.generatePin(),
    });
    return newUserPasswordReset.code;
  }
}
