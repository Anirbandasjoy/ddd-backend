import { MongooseUserRepository } from './mongoose/adapters/user/impl_user.repository';
import { UserModel } from './mongoose/adapters/user/user.schema';
export * from './mongoose/adapters/user/impl_user.repository';
export * from './mongoose/config/index';
export type Adapter = 'mongoose';

export const getUserRepository = (adapter: Adapter = 'mongoose') => {
  switch (adapter) {
    case 'mongoose':
      return new MongooseUserRepository(UserModel);
    default:
      throw new Error('Invalid adapter');
  }
};
