import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductService } from '../product.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductListResponse } from '../responses/product-list.response';
import { CreateProductResponse } from '../responses/create-product.response';

@ApiTags('Products')
@Controller('v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiCreatedResponse({ type: CreateProductResponse })
  @Post()
  async createProduct(@Body() newProduct: CreateProductDTO): Promise<CreateProductResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: await this.productService.createProduct(newProduct)
    };
  }

  @ApiOkResponse({type:ProductListResponse})
  @Get()
  async getProducts(): Promise<ProductListResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: await this.productService.getProducts(),
    };
  }
}
