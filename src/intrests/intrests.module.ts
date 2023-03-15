import { Module } from '@nestjs/common';
import { IntrestsService } from './intrests.service';
import { IntrestsController } from './intrests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intrest } from './intrest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intrest]),
  ],
  providers: [IntrestsService],
  controllers: [IntrestsController],
  exports: [IntrestsService]
})
export class IntrestsModule {}
