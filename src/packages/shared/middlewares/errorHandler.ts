import { Request, Response, NextFunction } from 'express';
import { ResponseSender } from '../utils/responseSender';

export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  ResponseSender.error({ res, error: err });
};
