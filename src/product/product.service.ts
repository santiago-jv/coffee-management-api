import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductListResponse } from './responses/product-list.response';
import { Pagination, paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';

interface IProductService {
  getProducts(): Promise<ProductResponseDto[]>;
  createProduct(product: CreateProductDTO): Promise<ProductResponseDto>;
}

@Injectable()
export class ProductService{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getItemsPaginated(options: IPaginationOptions):Promise<Pagination<ProductResponseDto[]>>{
    const qb = this.productRepository.createQueryBuilder('product').where("product.isActive = :isActive", { isActive: true });
    return (await paginate<ProductResponseDto[]>(qb as any,options));
  }
  
  async createProduct(product: CreateProductDTO): Promise<ProductResponseDto> {
    const newProduct = await this.productRepository.save(product);
    return ProductResponseDto.mapToResponse(newProduct);

  }
}
