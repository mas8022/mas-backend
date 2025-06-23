import {
  Controller,
  Post,
  Body,
  Res,
  Headers,
  Get,
  Put,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { FastifyReply } from 'fastify';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Delete(':id')
  async delete(@Res() res: FastifyReply, @Param('id') id: number) {
    try {
      const result = await this.taskService.delete(id);
      return res.send(result);
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  @Patch(':id')
  async toggleDone(@Res() res: FastifyReply, @Param('id') id: number) {
    try {
      const result = await this.taskService.toggleDone(id);
      return res.send(result);
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  @Put(':id')
  async edit(
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: FastifyReply,
    @Param('id') id: number,
  ) {
    try {
      const result = await this.taskService.edit(createTaskDto, id);
      return res.send(result);
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  @Get()
  async getAll(
    @Res() res: FastifyReply,
    @Headers('cookie') rawCookies: string,
  ) {
    try {
      const result = await this.taskService.getAll(rawCookies);
      return res.send(result);
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: FastifyReply,
    @Headers('cookie') rawCookies: string,
  ) {
    try {
      const result = await this.taskService.create(createTaskDto, rawCookies);
      return res.send(result);
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }
}
