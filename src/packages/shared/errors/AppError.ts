import { IErrors, IAppError } from '@/packages/core/interfaces/errors';
import { StatusCodes as HttpStatusCodes } from 'http-status-codes';

class ApplicationError implements IAppError {
  public message: string;
  public statusCode: number;
  public isOperational: boolean;
  public stack?: string;
  public code?: string;
  public meta?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    code?: string,
    meta?: Record<string, any>
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.meta = meta;
    this.stack = new Error().stack;
  }
}

export class Errors implements IErrors {
  private defaultStatus(method: keyof IErrors): number {
    switch (method) {
      case 'OK':
        return HttpStatusCodes.OK;
      case 'CREATED':
        return HttpStatusCodes.CREATED;
      case 'BAD_REQUEST':
        return HttpStatusCodes.BAD_REQUEST;
      case 'UNAUTHORIZED':
        return HttpStatusCodes.UNAUTHORIZED;
      case 'FORBIDDEN':
        return HttpStatusCodes.FORBIDDEN;
      case 'NOT_FOUND':
        return HttpStatusCodes.NOT_FOUND;
      case 'CONFLICT':
        return HttpStatusCodes.CONFLICT;
      case 'INTERNAL_SERVER_ERROR':
        return HttpStatusCodes.INTERNAL_SERVER_ERROR;
      default:
        return HttpStatusCodes.INTERNAL_SERVER_ERROR;
    }
  }

  OK(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('OK'));
  }

  CREATED(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('CREATED'));
  }

  BAD_REQUEST(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('BAD_REQUEST'));
  }

  UNAUTHORIZED(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('UNAUTHORIZED'));
  }

  FORBIDDEN(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('FORBIDDEN'));
  }

  NOT_FOUND(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('NOT_FOUND'));
  }

  CONFLICT(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('CONFLICT'));
  }

  INTERNAL_SERVER_ERROR(message: string, statusCode?: number): IAppError {
    return new ApplicationError(message, statusCode ?? this.defaultStatus('INTERNAL_SERVER_ERROR'));
  }

  CUSTOM(
    message: string,
    statusCode: number,
    code?: string,
    meta?: Record<string, any>
  ): IAppError {
    return new ApplicationError(message, statusCode, true, code, meta);
  }
}

/**
 *  Global singleton instance
 */
export const AppError: IErrors = new Errors();
