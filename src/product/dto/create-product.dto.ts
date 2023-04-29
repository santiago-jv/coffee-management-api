import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({
    required: true,
    example: 'Papas',
  })
  name: string;
  
  @ApiProperty({
    required: true,
    example: 2500,
  })
  price: number;

  @ApiProperty({
    required: true,
    example: 'Mecatos',
  })
  type: string;
}
