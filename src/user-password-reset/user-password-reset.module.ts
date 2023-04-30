import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPasswordReset } from './entities/user-password-reset.entity';
import { ResetPasswordService } from './services/reset-password.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ResetPasswordService],
  imports: [
    TypeOrmModule.forFeature([UserPasswordReset]),
    forwardRef(() => UserModule),
  ],
  exports: [ResetPasswordService],
})
export class UserPasswordResetModule {}
