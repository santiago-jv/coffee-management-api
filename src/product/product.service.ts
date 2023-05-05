import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductListResponse } from './responses/product-list.response';
import { DeleteProductResponse } from './responses/delete-product.response';

interface IProductService {
  getProducts(): Promise<ProductResponseDto[]>;
  createProduct(product: CreateProductDTO): Promise<ProductResponseDto>;
}

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async getProducts(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find();
    return products.map((product) =>
      ProductResponseDto.mapToResponse(product),
    );
  }

  async createProduct(product: CreateProductDTO): Promise<ProductResponseDto> {
    const newProduct = await this.productRepository.save(product);
    return ProductResponseDto.mapToResponse(newProduct);
  }

  deleteProduct(id: string): string{
      this.productRepository.update(id, {isActive:false});
      return id
  }




}
