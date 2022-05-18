import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  exports: [UserService]
})
export class UserModule {}
