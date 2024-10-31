export class ErrorResponseDto {
  statusCode: number;
  message: string | object;
  path: string;
}