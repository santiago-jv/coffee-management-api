import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create_product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}
    
    //Creates a product
    createProduct(product: CreateProductDTO): Promise<Product> {
        const newProduct = this.productRepository.create(product)
        return this.productRepository.save(newProduct)
    }
}
