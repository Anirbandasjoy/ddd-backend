import { Logger } from '../../interfaces/logger';
import { UserRepository } from '../repositories/user.repository';

export class FindAllUsersUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();
    if (!users || users.length === 0) {
      this.logger.error('No users found');
      throw new Error('No users found');
    }
    this.logger.info('Users found');
    return users;
  }
}
