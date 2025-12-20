import { Router } from 'express';
import { AuthController } from './auth.controller';
import { HashPassword, JsonWebToken, UserRepository } from '@/packages/core';
import { validateRequest } from '@/packages/shared';
import { CreateUserZodSchema } from '@/packages/shared/zod_schemas';

type Dependencies<T> = {
  userRepository: UserRepository;
  hasPassword: HashPassword;
  jsonWebToken: JsonWebToken<T>;
};

export const authRoutes = <T>(deps: Dependencies<T>) => {
  const router = Router();

  const controller = new AuthController({
    userRepository: deps.userRepository,
    hasPassword: deps.hasPassword,
  });

  router.post('/register', validateRequest({ body: CreateUserZodSchema }), controller.register);

  return {
    path: '/auth',
    router,
  };
};
