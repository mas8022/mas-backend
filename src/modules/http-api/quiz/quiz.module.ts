import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
