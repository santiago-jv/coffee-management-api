import { GeneralResponse } from "src/responses/general.response";
import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";


class DeleteProductResponseData {
  @ApiProperty({ type: String })
  id: string;
}

export class DeleteProductResponse implements GeneralResponse<DeleteProductResponseData> {
    @ApiProperty({example:HttpStatus.OK})
    statusCode: HttpStatus;
    @ApiProperty({example:'Product deleted'})
    message: string;
    @ApiProperty({ type: DeleteProductResponseData })
    data: DeleteProductResponseData;
  }

