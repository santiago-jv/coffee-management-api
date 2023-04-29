import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
import { GeneralResponse } from 'src/responses/general.response';
import { HttpStatus } from '@nestjs/common';

export class ProductListResponse implements GeneralResponse<Product[]> {
  @ApiProperty({ example: HttpStatus.OK })
  statusCode: HttpStatus;
  @ApiProperty({ example: 'Products found' })
  message: string;
  @ApiProperty({ type: [Product] })
  data: Product[];
}
