import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @ApiProperty({
    required: true,
    example: 'Papas',
  })
  name: string;
  
  @IsNumber()
  @ApiProperty({
    required: true,
    example: 2500,
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    required: true,
    example: 'Mecatos',
  })
  type: string;
}
