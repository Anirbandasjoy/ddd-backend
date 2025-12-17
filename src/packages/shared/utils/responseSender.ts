import { Response } from 'express';
import { IApiSuccessResponse, IApiErrorResponse } from '@/packages/core/interfaces/response';
import { IAppError } from '@/packages/core/interfaces/errors';

interface SuccessOptions<T = any> {
  res: Response;
  message: string;
  data: T;
  meta?: Record<string, any>;
  statusCode?: number;
}

interface ErrorOptions {
  res: Response;
  error: IAppError | Error;
}

export class ResponseSender {
  static success<T = any>({ res, message, data, meta, statusCode = 200 }: SuccessOptions<T>) {
    const response: IApiSuccessResponse<T> = {
      success: true,
      message,
      data,
      meta,
    };
    return res.status(statusCode).json(response);
  }

  static error({ res, error }: ErrorOptions) {
    let response: IApiErrorResponse;

    if ('statusCode' in error) {
      const appErr = error as IAppError;
      response = {
        success: false,
        message: appErr.message,
        statusCode: appErr.statusCode,
        code: appErr.code,
        meta: appErr.meta,
        stack: process.env.NODE_ENV === 'development' ? appErr.stack : undefined,
      };
      return res.status(appErr.statusCode).json(response);
    }

    // Fallback for generic errors
    response = {
      success: false,
      message: error.message || 'Internal Server Error',
      statusCode: 500,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
    return res.status(500).json(response);
  }
}
