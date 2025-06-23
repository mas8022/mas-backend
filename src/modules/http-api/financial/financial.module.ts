import { Module } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialController } from './financial.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
