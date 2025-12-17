import {
  CreateNewUserUseCase,
  HashPassword,
  JsonWebToken,
  Logger,
  UserRepository,
} from '@/packages/core';
import { Application, Router, Request, Response } from 'express';

type Dependencies<T> = {
  userRepository: UserRepository;
  hasPassword: HashPassword;
  jsonWebToken: JsonWebToken<T>;
  logger: Logger;
};

export const authRoutes = <T>(app: Application, deps: Dependencies<T>) => {
  const router: Router = Router();

  router.post('/register', async (req: Request, res: Response) => {
    const createUser = new CreateNewUserUseCase(deps.userRepository, deps.hasPassword, deps.logger);

    const user = await createUser.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  });

  app.use('/auth', router);
};
