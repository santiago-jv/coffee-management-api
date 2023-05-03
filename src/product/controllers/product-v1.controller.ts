import { Body, Controller, DefaultValuePipe, Get, HttpStatus, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductService } from '../product.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductListResponse } from '../responses/product-list.response';
import { CreateProductResponse } from '../responses/create-product.response';
import { IPaginationOptions, Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { ProductResponseDto } from '../dto/product-response.dto';

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

  @ApiOkResponse({type: ProductListResponse})
  @Get()
  async getPaginatedProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 1
    ):Promise<ProductListResponse>{
      const options: IPaginationOptions = { limit, page }

      return {
      statusCode: HttpStatus.OK,
      message: 'Products found',
      data: (await this.productService.getItemsPaginated(options)).items
      .reduce((a,b)=>a.concat(b),[]),//This sentence is to convert a [][]array to an []array
      metaData: (await this.productService.getItemsPaginated(options)).meta
    };
    }
}
