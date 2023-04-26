import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/create_product.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('v1/products')
export class ProductController {
    constructor(private productService: ProductService) {}

    //This controller calls the method from productService to create a product
    @Post('/create')
    createProduct(@Body() newProduct: CreateProductDTO){
        return this.productService.createProduct(newProduct)
    }
}
