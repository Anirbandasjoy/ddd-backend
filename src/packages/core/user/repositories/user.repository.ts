import { UserEntity } from '../entities/user.entities';
import { CreateNewUserDTO } from '../dto/user.dto';

export type UserWithPassword = UserEntity & {
  password: string;
};

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  create(dto: CreateNewUserDTO): Promise<UserEntity>;
  findByEmailWithPassword(email: string): Promise<UserWithPassword | null>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, dto: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
