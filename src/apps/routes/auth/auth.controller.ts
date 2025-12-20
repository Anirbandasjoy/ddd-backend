import { Request, Response } from 'express';
import { CreateNewUserUseCase, HashPassword, UserRepository } from '@/packages/core';
import { logger, catchAsync, ResponseSender } from '@/packages/shared';

type AuthControllerDeps = {
  userRepository: UserRepository;
  hasPassword: HashPassword;
};

export class AuthController {
  constructor(private deps: AuthControllerDeps) {}

  register = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const createUser = new CreateNewUserUseCase(this.deps.userRepository, this.deps.hasPassword);

    const user = await createUser.execute({ id: crypto.randomUUID(), name, email, password });

    logger.info('User created successfully');

    ResponseSender.success({
      res,
      message: 'User created successfully',
      data: user,
    });
  });
}
