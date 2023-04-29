import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';

interface IProductService {
    getProducts():Promise<Product[]>
    createProduct(product: CreateProductDTO): Promise<any>;
}

@Injectable()
export class ProductService implements IProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}
    
    getProducts(){
        const products = this.productRepository.find()
        return products
    }

    createProduct(product: CreateProductDTO): Promise<any> {
        const newProduct = this.productRepository.create(product)
        this.productRepository.save(newProduct)
        return new Promise((resolve) => {
            const response = {
                statusCode: HttpStatus.CREATED,
                message: "Product created succesfully",
                data: [newProduct]
            }
            resolve(response)
        })
    }
}
