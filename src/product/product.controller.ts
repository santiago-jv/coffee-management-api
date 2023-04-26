import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDTO } from './dto/create_product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post('/create')
    createProduct(@Body() newUser: CreateProductDTO){
        return this.productService.createProduct(newUser)
    }
}
