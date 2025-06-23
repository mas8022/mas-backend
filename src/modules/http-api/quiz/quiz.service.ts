import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/services/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async setUserScore(score: number, rawCookies: string) {
    try {
      const me = await this.userService.getMe(rawCookies);

      await this.prismaService.user.update({
        where: {
          id: me.id,
        },
        data: {
          score: {
            increment: score,
          },
        },
      });
      return {
        status: 200,
        message: 'امتیاز کاربر با موفقیت ثبت شد',
      };
    } catch (error) {
      return {
        status: 500,
        message: 'اینترنت خود را بررسی کنید',
      };
    }
  }

  async getShuffle(category: string) {
    try {
      const questions = await this.prismaService.question.findMany({
        where: {
          category,
        },
      });

      const shuffle = questions.sort(() => Math.random() - 0.5);

      const selected = shuffle.slice(0, 4);
      return {
        status: 200,
        message: 'با موفقیت سوال ها تصادفی گرفته شد',
        data: selected,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'اینترنت خود را بررسی کنید',
      };
    }
  }
}
