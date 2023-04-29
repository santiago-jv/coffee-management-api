import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ResetPasswordDto } from '../data-transfer-objects/reset-password.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordResponse } from '../responses/reset-password.response';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
}
