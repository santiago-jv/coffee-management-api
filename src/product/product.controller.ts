import { Body, Controller, Post} from '@nestjs/common';
import { CreateProductDTO } from './dto/create_product.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('v1/products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @ApiCreatedResponse({type: Product})
    @Post('/create')
    createProduct(@Body() newProduct: CreateProductDTO){
        return this.productService.createProduct(newProduct)
    }
}
