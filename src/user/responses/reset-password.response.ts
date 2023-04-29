import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponse } from 'src/responses/general.response';
import { ResetPasswordResponseDto } from '../data-transfer-objects/reset-password-response.dto';

export class ResetPasswordResponse
  implements GeneralResponse<ResetPasswordResponseDto>
{
  @ApiProperty({ example: HttpStatus.OK })
  statusCode: HttpStatus;
  @ApiProperty({ example: 'Email sent' })
  message: string;
  @ApiProperty({ example: { email: 'santiago@gmail.com' } })
  data: ResetPasswordResponseDto;
}
