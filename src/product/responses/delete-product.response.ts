import { GeneralResponse } from "src/responses/general.response";
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { ProductResponseDto } from "../dto/product-response.dto";

export class DeleteProductResponse implements GeneralResponse<ProductResponseDto> {
    @ApiProperty({example:HttpStatus.OK})
    statusCode: HttpStatus;
    @ApiProperty({example:'Product deleted'})
    message: string;
    @ApiProperty({ type: ProductResponseDto })
    data: ProductResponseDto;
  }