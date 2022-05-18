import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionService } from './services/transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [
    TypeOrmModule.forFeature([
      TransactionRepository
    ]),
    UserModule
  ],
})
export class TransactionModule {}
