import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'santiago@gmail.com',
  })
  email: string;
}
