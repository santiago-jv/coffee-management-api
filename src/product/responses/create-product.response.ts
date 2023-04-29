import { GeneralResponse } from "src/responses/general.response";
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { ProductResponseDto } from "../dto/product-response.dto";

export class CreateProductResponse implements GeneralResponse<ProductResponseDto> {
    @ApiProperty({example:HttpStatus.CREATED})
    statusCode: HttpStatus;
    @ApiProperty({example:'Product created'})
    message: string;
    @ApiProperty({ type: ProductResponseDto })
    data: ProductResponseDto;
  }