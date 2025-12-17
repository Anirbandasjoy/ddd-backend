import { HashPassword } from '../../interfaces/hash_password';
import { Logger } from '../../interfaces/logger';
import { CreateNewUserDTO } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

export class CreateNewUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashPassword: HashPassword,
    private readonly logger: Logger
  ) {}

  async execute(dto: CreateNewUserDTO) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      this.logger.error('User already exists');
      throw new Error('User already exists');
    }
    const hashedPassword = await this.hashPassword.hash(dto.password);
    const user = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    if (!user) {
      this.logger.error('User not created');
      throw new Error('User not created');
    }
    this.logger.info('User created');
    return user;
  }
}
