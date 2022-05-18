import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../user/repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository,
  ) {}

  private readonly logger = new Logger(UserService.name);
  
  async getUserById(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }
}
