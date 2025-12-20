import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

type ValidationSchema = Partial<
  Record<'body' | 'query' | 'params' | 'headers' | 'cookies', ZodType<unknown>>
>;

export const validateRequest =
  (schemas: ValidationSchema) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      (Object.keys(schemas) as (keyof ValidationSchema)[]).forEach((key) => {
        switch (key) {
          case 'body':
            schemas.body?.parse(req.body);
            break;
          case 'query':
            schemas.query?.parse(req.query);
            break;
          case 'params':
            schemas.params?.parse(req.params);
            break;
          case 'headers':
            schemas.headers?.parse(req.headers);
            break;
          case 'cookies':
            schemas.cookies?.parse(req.cookies);
            break;
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  };
