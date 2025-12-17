import { Router } from 'express';
import { AuthController } from './auth.controller';
import { HashPassword, JsonWebToken, UserRepository } from '@/packages/core';

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

  router.post('/register', controller.register);

  return {
    path: '/auth',
    router,
  };
};
