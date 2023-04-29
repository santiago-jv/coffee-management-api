import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponseDto {
  @ApiProperty({
    example: 'santiago@gmail.com',
  })
  email: string;
}
