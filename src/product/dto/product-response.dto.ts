import { ApiProperty } from "@nestjs/swagger";
import { CreateProductDTO } from "./create-product.dto";

export class ProductResponseDto extends CreateProductDTO {
    @ApiProperty({example:'asdafdaf-asdfas-dfadsa-dasda'})
    id:number
}