import { CreateNewUserDTO, UserEntity, UserRepository, UserWithPassword } from '@/packages/core';
import { Model } from 'mongoose';

export class MongooseUserRepository implements UserRepository {
  constructor(private readonly userModel = Model<UserWithPassword>) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userModel.findOne({ email }).exec();
  }
  async findById(id: string): Promise<UserEntity | null> {
    return await this.userModel.findById(id).exec();
  }

  async create(dto: CreateNewUserDTO): Promise<UserEntity> {
    return await this.userModel.create(dto);
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.userModel.find().exec();
  }

  async update(id: string, dto: Partial<UserEntity>): Promise<UserEntity> {
    const updated = await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    return updated!.toObject();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
  async findByEmailWithPassword(email: string): Promise<UserWithPassword | null> {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }
}
