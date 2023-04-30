import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserPasswordReset } from '../entities/user-password-reset.entity';
import { DateService } from 'src/common/services/date.service';
import { PinGeneratorService } from 'src/common/services/pin-generator.service';
import { UserService } from '../../user/services/user.service';
import { VerificationResetPasswordDto } from '../data-transfer-objects/verificate-reset-password.dto';

@Injectable()
export class ResetPasswordService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectRepository(UserPasswordReset)
    private readonly userPasswordResetRepository: Repository<UserPasswordReset>,
  ) {}

  public async generateResetPassword(user: User): Promise<string> {
    const userPasswordResetFound =
      await this.userPasswordResetRepository.findOneBy({
        isActive: true,
        user,
      });
    if (userPasswordResetFound) {
      throw new BadRequestException(
        'User already have password reset in progress',
      );
    }
    const newUserPasswordReset = await this.userPasswordResetRepository.save({
      user: user,
      code: PinGeneratorService.generatePin(),
    });
    return newUserPasswordReset.code;
  }

  public async verificateResetPassword(
    data: VerificationResetPasswordDto,
  ): Promise<void> {
    const { code, newPassword, email } = data;

    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const userPasswordResetFound =
      await this.userPasswordResetRepository.findOneBy({
        isActive: true,
        user: {
          id: user.id,
        },
      });

    if (!userPasswordResetFound) {
      throw new BadRequestException('User pin not found');
    }

    const isExpiredDate = DateService.hasPassedOneDay(
      userPasswordResetFound.expirationDate,
    );
    if (isExpiredDate) {
      await this.disableResetProcess(userPasswordResetFound);
      throw new BadRequestException('Reset password has expired');
    }
    if (userPasswordResetFound.code !== code) {
      throw new BadRequestException('Invalid verification code');
    }
    await this.disableResetProcess(userPasswordResetFound);
    await this.userService.changePassword(user, newPassword);
  }

  private async disableResetProcess(
    userPasswordResetFound: UserPasswordReset,
  ): Promise<void> {
    userPasswordResetFound.isActive = false;
    await this.userPasswordResetRepository.save(userPasswordResetFound);
  }
}
