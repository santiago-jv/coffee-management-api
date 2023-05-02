import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponse } from 'src/responses/general.response';
import { HttpStatus } from '@nestjs/common';
import { ProductResponseDto } from '../dto/product-response.dto';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class ProductListResponse implements GeneralResponse<ProductResponseDto[]>{
  @ApiProperty({ example: HttpStatus.OK })
  statusCode: HttpStatus;
  @ApiProperty({ example: 'Products found' })
  message: string;
  @ApiProperty({ type: [ProductResponseDto] })
  data: ProductResponseDto[]
  @ApiProperty()
  metaData: IPaginationMeta
}
