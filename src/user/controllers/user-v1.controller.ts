import { Controller, Post, Body, HttpStatus, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordResponse } from '../../user-password-reset/responses/reset-password.response';
import { UserService } from '../services/user.service';
import { ResetPasswordDto } from 'src/user-password-reset/data-transfer-objects/reset-password.dto';
import { ResetPasswordService } from 'src/user-password-reset/services/reset-password.service';
import { VerificationResetPasswordDto } from 'src/user-password-reset/data-transfer-objects/verificate-reset-password.dto';

@ApiTags('Users')
@Controller('v1/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}
  @Post('password-reset')
  @ApiOkResponse({ type: ResetPasswordResponse })
  public async resetPassword(
    @Body() resetData: ResetPasswordDto,
  ): Promise<ResetPasswordResponse> {
    await this.userService.resetPassword(resetData);
    return {
      statusCode: HttpStatus.OK,
      message: 'Email sent',
      data: {
        email: resetData.email,
      },
    };
  }
  @Patch('password-reset/verify')
  @ApiOkResponse({ type: ResetPasswordResponse })
  public async verifyResetPassword(
    @Body() verifyResetPasswordData: VerificationResetPasswordDto,
  ): Promise<ResetPasswordResponse> {
    await this.resetPasswordService.verificateResetPassword(
      verifyResetPasswordData,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Password changed',
      data: {
        email: verifyResetPasswordData.email,
      },
    };
  }
}
