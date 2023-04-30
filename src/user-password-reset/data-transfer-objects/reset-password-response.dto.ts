import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResponseDto {
  @ApiProperty({
    example: 'santiagojv.work@gmail.com',
  })
  email: string;
}
