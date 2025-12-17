import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { getUserRepository } from '@/packages/database';
import { BcryptjsHashPassword, ConsoleLogger, JsonWebToken } from '@/packages/shared';
import { authRoutes } from './routes/auth.routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const logger = new ConsoleLogger();
const hashPassword = new BcryptjsHashPassword();
const jsonWebToken = new JsonWebToken();

// Repositories

const userRepository = getUserRepository('mongoose');

authRoutes(app, {
  userRepository,
  hasPassword: hashPassword,
  jsonWebToken,
  logger,
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Route Not Found',
    path: req.originalUrl,
    method: req.method,
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;
