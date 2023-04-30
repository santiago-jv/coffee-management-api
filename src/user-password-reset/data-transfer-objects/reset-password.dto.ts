import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'santiagojv.work@gmail.com',
  })
  email: string;
}
