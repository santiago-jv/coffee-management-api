import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create_product.dto';
import { GeneralResponse } from 'src/interfaces/general_response';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}
    
    getProducts(){
        return this.productRepository.find()
    }


    createProduct(product: CreateProductDTO): Promise<GeneralResponse<Product>> {
        const newProduct = this.productRepository.create(product)
        this.productRepository.save(newProduct)
        return new Promise((resolve) => {
            const response: GeneralResponse<Product> = {
                statusCode: HttpStatus.CREATED,
                message: "Product created succesfully",
                data: newProduct
            }
            resolve(response)
        })
    }
}
