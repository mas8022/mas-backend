import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Put,
  Res,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { FastifyReply } from 'fastify';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Put()
  async setUserScore(
    @Body() { score }: { score: number },
    @Headers('cookie') rawCookies: string,
    @Res() res: FastifyReply,
  ) {
    try {
      const result = this.quizService.setUserScore(score, rawCookies);
      return res.send(result);
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  @Get(':category')
  async getShuffle(
    @Param('category') category: string,
    @Res() res: FastifyReply,
  ) {
    try {
      const result = await this.quizService.getShuffle(category);
      return res.send(result);
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }
}
