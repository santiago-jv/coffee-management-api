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

    //Returns a product array
    findAll(): Promise<Product[]> {
        return this.productRepository.find()
    }
    
    //Returns a specific product
    findOne(id: number): Promise<Product|null> {
        return this.productRepository.findOneBy({id})
    }
    
    createProduct(product: CreateProductDTO): Promise<Product> {
        const newProduct = this.productRepository.create(product)
        return this.productRepository.save(newProduct)
    }

    //Removes a specific product
    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id)
    }

}
