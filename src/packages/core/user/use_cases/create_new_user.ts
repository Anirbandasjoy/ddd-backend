import { AppError, logger } from '@/packages/shared';
import { HashPassword } from '../../interfaces/hash_password';
import { CreateNewUserDTO } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

export class CreateNewUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: HashPassword
  ) {}

  async execute(dto: CreateNewUserDTO) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      logger.error('User already exists');
      throw AppError.CONFLICT('User already exists');
    }
    const hashedPassword = await this.hashPassword.hash(dto.password);
    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    if (!user) {
      logger.error('User not created');
      throw AppError.INTERNAL_SERVER_ERROR('User not created');
    }
    logger.info('User created');
    return user;
  }
}
