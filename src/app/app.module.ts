import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigFactory } from 'src/lib/factories/typeorm-config.factory';
import { CommonModule } from './modules/common/common.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigFactory
    }),
    CommonModule,
    UserModule,
    TransactionModule,
  ],
})
export class AppModule {}
