import { Logger } from '../../interfaces/logger';
import { UserRepository } from '../repositories/user.repository';

export class FindSingleUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.error('User not found');
      throw new Error('User not found');
    }
    this.logger.info('User found');
    return user;
  }
}
