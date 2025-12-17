import { Logger } from '../../interfaces/logger';
import { UpdateUserDTO } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}
  async execute(id: string, dto: UpdateUserDTO) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.error('User not found');
      throw new Error('User not found');
    }
    const updatedUser = await this.userRepository.update(id, dto);
    this.logger.info('User updated');
    return updatedUser;
  }
}
