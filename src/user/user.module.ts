import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user-v1.controller';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';
import { UserPasswordResetModule } from 'src/user-password-reset/user-password-reset.module';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    EmailSenderModule,
    UserPasswordResetModule,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
