import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { rootRoutes } from './routes';
import { AppError, globalErrorHandler, ResponseSender } from '@/packages/shared';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

rootRoutes('/api/v1', app);

app.get('/health', (_req: Request, res: Response) => {
  ResponseSender.success({
    res,
    message: 'OK',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
});

app.use((req: Request, res: Response, _next: NextFunction) => {
  const error = AppError.NOT_FOUND(`API Route not found: ${req.originalUrl}`);
  error.meta = { method: req.method, path: req.originalUrl };
  ResponseSender.error({ res, error: error });
});

app.use(globalErrorHandler);

export default app;
