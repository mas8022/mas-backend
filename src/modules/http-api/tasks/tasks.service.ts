import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/modules/services/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async delete(id: number) {
    try {
      await this.prismaService.task.delete({
        where: { id: Number(id) },
      });

      return { status: 201, message: 'با موفقیت حذف شد' };
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  async toggleDone(id: number) {
    try {
      const task = await this.prismaService.task.findUnique({
        where: { id: Number(id) },
        select: { done: true },
      });

      await this.prismaService.task.update({
        where: { id: Number(id) },
        data: {
          done: !task.done,
        },
      });

      return { status: 201, message: 'با موفقیت وضعیت انجام ان تغییر کرد' };
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  async edit(
    { title, description, date, priority, done }: CreateTaskDto,
    id: number,
  ) {
    try {
      await this.prismaService.task.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          date,
          priority,
          done,
        },
      });

      return { status: 201, message: 'با موفقیت ویرایش شد' };
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  async getAll(rawCookies: string) {
    const { id: userId } = await this.userService.getMe(rawCookies);
    const tasks = await this.prismaService.task.findMany({ where: { userId } });

    try {
      return { status: 200, message: 'get all user tasks', data: tasks };
    } catch (error) {
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }

  async create(
    { title, description, date, priority, done }: CreateTaskDto,
    rawCookies: string,
  ) {
    try {
      const { id: userId } = await this.userService.getMe(rawCookies);

      await this.prismaService.task.create({
        data: { title, description, date, priority, done, userId },
      });
      return { status: 201, message: 'با موفقیت ایجاد شد' };
    } catch (error) {
      
      return { status: 500, message: 'اینترنت خود را بررسی کنید' };
    }
  }
}
