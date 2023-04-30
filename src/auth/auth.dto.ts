import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  name:string;
  
  @ApiProperty()
  email:string;
  
  @ApiProperty()
  password:string;
}

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'santiagojv.work@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'secret_password',
  })
  password: string;
}
