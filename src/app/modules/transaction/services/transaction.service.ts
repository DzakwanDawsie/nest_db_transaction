import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { TransactionCreateDto } from '../dto/transaction-create.dto';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly userService: UserService
  ) {}

  private readonly logger = new Logger(TransactionService.name);
  
  async createTransaction(dto: TransactionCreateDto): Promise<void> {
    if (dto.type == 'topup') await this.createTopupTransaction(dto);
  }

  async createTopupTransaction(dto: TransactionCreateDto): Promise<void> {
    const transaction = plainToClass(Transaction, dto);
    
    // Create query runner
    const queryRunner = getConnection().createQueryRunner();

    // Start transaction
    await queryRunner.startTransaction();

    try {
      // Save transaction's data
      await queryRunner.manager.save(transaction);

      // Get user's data, then add the balance
      const user = await this.userService.getUserById(dto.user_id);
      user.addBalance(dto.amount);
      
      // Save user's data
      await queryRunner.manager.save(user);

      // Commit transaction
      await queryRunner.commitTransaction();
      this.logger.debug('TOPUP TRANSACTION SUCCESS');
    } catch (error) {
      // Rollback all changes in transaction's process
      await queryRunner.rollbackTransaction();
      this.logger.error('TOPUP TRANSACTION FAILED: '+ error.message);

      // Throw error
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }
}
