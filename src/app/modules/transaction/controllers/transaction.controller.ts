import { Body, Controller, Post } from '@nestjs/common';
import { TransactionCreateDto } from '../dto/transaction-create.dto';
import { TransactionService } from '../services/transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  async createTransaction(@Body() dto: TransactionCreateDto): Promise<any> {
    await this.transactionService.createTransaction(dto);
    
    return {
      success: true,
      message: 'OK'
    };
  }
}
