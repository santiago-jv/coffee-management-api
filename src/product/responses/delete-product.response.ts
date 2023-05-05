import { GeneralResponse } from "src/responses/general.response";
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";

export class DeleteProductResponse implements GeneralResponse<String> {
    @ApiProperty({example:HttpStatus.OK})
    statusCode: HttpStatus;
    @ApiProperty({example:'Product deleted'})
    message: string;
    @ApiProperty({ type: String })
    data: string;
  }