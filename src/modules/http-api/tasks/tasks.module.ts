import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
