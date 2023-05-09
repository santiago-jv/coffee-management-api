import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ProductService{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async getProducts({limit, offset}: PaginationQueryDto): Promise<ProductResponseDto[]>{
    const products = await this.productRepository.find({
      skip: (offset-1)*limit, take: limit
    })
    return products.map((product) =>
    ProductResponseDto.mapToResponse(product),
  );
  }
  
  async createProduct(product: CreateProductDTO): Promise<ProductResponseDto> {
    const newProduct = await this.productRepository.save(product);
    return ProductResponseDto.mapToResponse(newProduct);
  }

  async deleteProduct(id: string): Promise<void>{
    const exists = await this.productRepository.exist({where: {id}})
    if (!exists) {
      throw new BadRequestException('Product not found');
     }     
   await this.productRepository.update(id, {isActive:false});
   } 
}
