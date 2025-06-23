import { Controller, Get, Post, Body, Res, Headers } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FastifyReply } from 'fastify';

@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('income')
  async createIncome(
    @Body() { amount, category }: { amount: number; category: string },
    @Res() res: FastifyReply,
    @Headers('cookie') rawCookies: string,
  ) {
    const result = await this.financialService.createIncome(
      amount,
      category,
      rawCookies,
    );
    return res.send(result);
  }

  @Post('expense')
  async createExpense(
    @Body() { amount, category }: { amount: number; category: string },
    @Res() res: FastifyReply,
    @Headers('cookie') rawCookies: string,
  ) {
    const result = await this.financialService.createExpense(
      amount,
      category,
      rawCookies,
    );
    return res.send(result);
  }

  @Get('analytics')
  async getAnalytics(
    @Res() res: FastifyReply,
    @Headers('cookie') rawCookies: string,
  ) {
    const result = await this.financialService.getAnalytics(rawCookies);

    return res.send(result);
  }
}
