export interface IApiSuccessResponse<T = any> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, any>;
}

export interface IApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  code?: string;
  meta?: Record<string, any>;
  stack?: string;
}
