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

    static async response(product: Promise<Product>): Promise<ProductResponseDto> {
        try {
            const result = await product
            result.isActive = false
            console.log(result.name)
            return {
                id: result.id,
                name: result.name,
                price: result.price,
                type: result.type
            }
        }catch (error) {
            console.error("Promise rejected with error:", error);
            throw error;
        }

    }
}