import { Response } from 'express';
import { IApiSuccessResponse, IApiErrorResponse } from '@/packages/core/interfaces/response';

import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { handleZodError } from '../errors/handlers/zodErrorHandler';
import { handleMongooseCastError } from '../errors/handlers/mongooseCastErrorHandler';
import { handleMongooseValidationError } from '../errors/handlers/mongooseValidationErrorHandler';
import { handleDuplicateKeyError } from '../errors/handlers/duplicateKeyErrorHandler';
import { handleSyntaxError } from '../errors/handlers/syntaxErrorHandler';
import { handleJWTError } from '../errors/handlers/jwtErrorHandler';

interface SuccessOptions<T = any> {
  res: Response;
  message: string;
  data: T;
  meta?: Record<string, any>;
  statusCode?: number;
}

interface ErrorOptions {
  res: Response;
  error: any;
}

export class ResponseSender {
  static success<T = any>({ res, message, data, meta, statusCode = 200 }: SuccessOptions<T>) {
    const response: IApiSuccessResponse<T> = { success: true, message, data, meta };
    return res.status(statusCode).json(response);
  }

  static error({ res, error }: ErrorOptions) {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors: any = undefined;
    let stack: string | undefined =
      process.env.NODE_ENV === 'development' ? error?.stack : undefined;

    switch (true) {
      // ===== Zod Validation Error =====
      case error instanceof ZodError: {
        const simplified = handleZodError(error);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errors = simplified.errorDetails;
        break;
      }

      // ===== Mongoose CastError =====
      case error instanceof mongoose.Error.CastError: {
        const simplified = handleMongooseCastError(error);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errors = simplified.errorDetails;
        break;
      }

      // ===== Mongoose ValidationError =====
      case error instanceof mongoose.Error.ValidationError: {
        const simplified = handleMongooseValidationError(error);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errors = simplified.errorDetails;
        break;
      }

      // ===== Mongo Duplicate Key Error =====
      case error instanceof MongoServerError && error.code === 11000: {
        const simplified = handleDuplicateKeyError(error);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errors = simplified.errorDetails;
        break;
      }

      // ===== SyntaxError (Invalid JSON) =====
      case error instanceof SyntaxError && 'body' in error: {
        const simplified = handleSyntaxError(error);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errors = simplified.errorDetails;
        break;
      }

      // ===== JWT Errors =====
      case error instanceof JsonWebTokenError || error instanceof TokenExpiredError: {
        const simplified = handleJWTError(error);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errors = simplified.errorDetails;
        break;
      }

      // ===== Nodemailer Missing Credentials =====
      case typeof error.message === 'string' &&
        error.message.includes('Missing credentials for "PLAIN"'): {
        statusCode = 500;
        message = 'Email service credentials are missing. Please check SMTP configuration.';
        break;
      }

      // ===== Rate Limit / Too Many Requests =====
      case error.status === 429 || error.statusCode === 429: {
        statusCode = 429;
        message = error.message || 'Too many requests. Please try again later.';
        break;
      }

      // ===== Generic Error with statusCode/message =====
      case 'statusCode' in error && 'message' in error: {
        statusCode = error.statusCode || 500;
        message = error.message;
        break;
      }

      // ===== Fallback =====
      default: {
        message = error.message || message;
        break;
      }
    }

    // Hide stack in production
    if (process.env.NODE_ENV === 'production') {
      stack = undefined;
    }

    const response: IApiErrorResponse = {
      success: false,
      message,
      statusCode,
      errors,
      stack,
    };

    return res.status(statusCode).json(response);
  }
}
