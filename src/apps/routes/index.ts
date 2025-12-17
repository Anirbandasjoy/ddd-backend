import { Application } from 'express';
import { authRoutes } from './auth/auth.routes';

import { getUserRepository } from '@/packages/database';
import { BcryptjsHashPassword, JsonWebToken } from '@/packages/shared';

export const rootRoutes = (basePath: string, app: Application) => {
  const hashPassword = new BcryptjsHashPassword();
  const jsonWebToken = new JsonWebToken();
  const userRepository = getUserRepository('mongoose');

  const routes = [authRoutes({ userRepository, hasPassword: hashPassword, jsonWebToken })];

  routes.forEach((r) => {
    app.use(`${basePath}${r.path}`, r.router);
  });
};
