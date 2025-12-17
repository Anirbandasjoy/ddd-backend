import { MongooseUserRepository } from './adapters/mongoose/impl_user.repository';
import { UserModel } from './mongoose/schemas/user.schema';
export * from './adapters/mongoose/impl_user.repository';

export type Adapter = 'mongoose';

export const getUserRepository = (adapter: Adapter = 'mongoose') => {
  switch (adapter) {
    case 'mongoose':
      return new MongooseUserRepository(UserModel);
    default:
      throw new Error('Invalid adapter');
  }
};
