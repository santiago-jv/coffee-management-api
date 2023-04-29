import { ApiProperty } from "@nestjs/swagger";
import { CreateProductDTO } from "./create-product.dto";
import { Product } from "../entities/product.entity";

export class ProductResponseDto extends CreateProductDTO {
    @ApiProperty({example:'asdafdaf-asdfas-dfadsa-dasda'})
    id:string

    static mapToResponse(product: Product): ProductResponseDto{
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            type: product.type
        }
    }
}