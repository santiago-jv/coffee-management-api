import { ApiProperty } from "@nestjs/swagger";

export class VerificationResetPasswordDto {
  @ApiProperty({
    example:'125373'
  })
  code: string;
  @ApiProperty({
    example:'new_password_jajaja'
  })
  newPassword: string;
  @ApiProperty({
    example:'santiagojv.work@gmail.com'
  })
  email:string;
}
