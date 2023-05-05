import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductService } from '../product.service';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductListResponse } from '../responses/product-list.response';
import { CreateProductResponse } from '../responses/create-product.response';
import { ProductResponseDto } from '../dto/product-response.dto';
import { DeleteProductResponse } from '../responses/delete-product.response';

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

  @ApiFoundResponse({type:ProductListResponse})
  @Get()
  async getProducts(): Promise<ProductListResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: await this.productService.getProducts(),
    };
  }

  @ApiOkResponse({type: String})
  @Patch(':id')
  async deleteProduct(@Param('id') id:string): Promise<DeleteProductResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted',
      data: this.productService.deleteProduct(id)
    };
  }
}
