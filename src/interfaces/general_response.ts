import { HttpStatus } from "@nestjs/common";

export interface GeneralResponse<T> {
    statusCode: HttpStatus;
    message: string;
    data: T;
}