import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user-v1.controller';
import { ResetPasswordService } from './services/reset-password.service';
import { UserPasswordReset } from './entities/user-password-reset.entity';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  providers: [UserService, ResetPasswordService,],
  imports: [TypeOrmModule.forFeature([User, UserPasswordReset]), EmailSenderModule],
  exports: [UserService, ResetPasswordService],
  controllers: [UserController],
})
export class UserModule {}
