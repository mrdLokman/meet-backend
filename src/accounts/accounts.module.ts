import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { IntrestsModule } from 'src/intrests/intrests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    IntrestsModule,
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService]
})
export class AccountsModule {}
