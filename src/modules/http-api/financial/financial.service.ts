import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/services/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { log } from 'console';

@Injectable()
export class FinancialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async createIncome(amount: number, category: string, rawCookies: string) {
    const me = await this.userService.getMe(rawCookies);

    await this.prismaService.income.create({
      data: {
        userId: me.id,
        amount,
        category,
      },
    });

    return { status: 201, message: 'درامد ثبت شد' };
  }

  async createExpense(amount: number, category: string, rawCookies: string) {
    const me = await this.userService.getMe(rawCookies);

    await this.prismaService.expense.create({
      data: {
        userId: me.id,
        amount,
        category,
      },
    });

    return { status: 201, message: 'هزینه ثبت شد' };
  }

  async getAnalytics(rawCookies: string) {
    const me = await this.userService.getMe(rawCookies);

    // درآمد کلی
    const totalIncomeData = await this.prismaService.income.aggregate({
      _sum: { amount: true },
    });
    const totalIncome = Number(totalIncomeData._sum.amount || 0);

    // مجموع هزینه‌ها
    const expensesIncomeData = await this.prismaService.expense.aggregate({
      _sum: { amount: true },
    });
    const expensesIncome = Number(expensesIncomeData._sum.amount || 0);

    // مانده
    const remaining = totalIncome - expensesIncome;

    // نسبت هزینه به درآمد (درصد)
    const costToIncomeRatio =
      totalIncome > 0 ? Math.round((expensesIncome / totalIncome) * 100) : 0;

    // ۳ دسته پرهزینه‌ترین کاربر
    const topThreeUserExpensesRaw = await this.prismaService.expense.groupBy({
      by: ['category'],
      where: {
        userId: me.id,
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
      take: 3,
    });

    const topThreeUserExpenses = topThreeUserExpensesRaw.map((item) => ({
      ...item,
      _sum: {
        amount: Number(item._sum.amount || 0),
      },
    }));

    // ۳ دسته پردرآمدترین کاربر
    const topThreeUserIncomeRaw = await this.prismaService.income.groupBy({
      by: ['category'],
      where: {
        userId: me.id,
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
      take: 3,
    });

    const topThreeUserIncome = topThreeUserIncomeRaw.map((item) => ({
      ...item,
      _sum: {
        amount: Number(item._sum.amount || 0),
      },
    }));

    return {
      status: 200,
      message: 'اطلاعات مالی کاربر با موفقیت ارسال شد',
      data: {
        totalIncome,
        expensesIncome,
        remaining,
        costToIncomeRatio,
        topThreeUserExpenses,
        topThreeUserIncome,
      },
    };
  }
}
