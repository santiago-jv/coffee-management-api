import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {
    @ApiProperty({required: true})
    name: string;
    @ApiProperty({required: true})
    price: number;
    @ApiProperty({required: true})
    type: string;
}