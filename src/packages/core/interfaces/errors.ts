export interface IAppError {
  message: string;
  statusCode: number;
  isOperational?: boolean;
  stack?: string;
  code?: string;
  meta?: Record<string, any>;
}

/**
 * Core-level error factory interface (synchronous version)
 */
export interface IErrors {
  OK(message: string, statusCode?: number): IAppError;
  CREATED(message: string, statusCode?: number): IAppError;
  BAD_REQUEST(message: string, statusCode?: number): IAppError;
  UNAUTHORIZED(message: string, statusCode?: number): IAppError;
  FORBIDDEN(message: string, statusCode?: number): IAppError;
  NOT_FOUND(message: string, statusCode?: number): IAppError;
  CONFLICT(message: string, statusCode?: number): IAppError;
  INTERNAL_SERVER_ERROR(message: string, statusCode?: number): IAppError;
  CUSTOM(message: string, statusCode: number, code?: string, meta?: Record<string, any>): IAppError;
}
