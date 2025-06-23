import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':phone')
  async getFindUsers(
    @Param('phone') phone: string,
    @Headers('cookie') rawCookies: string,
    @Res() res: FastifyReply,
  ) {
    const result = await this.userService.getFindUsers(phone, rawCookies);

    return res.send(result);
  }

  @Get('me')
  async getMe(@Res() res: FastifyReply, @Headers('cookie') rawCookies: string) {
    const result = await this.userService.getMe(rawCookies);
    return res.send(result);
  }

  @Get('me-contact')
  async getMeContacts(
    @Headers('cookie') rawCookies: string,
    @Res() res: FastifyReply,
  ) {
    try {
      const result = await this.userService.getMeContact(rawCookies);
      return res.send(result);
    } catch (error) {
      return {
        status: 500,
        message: 'اینترنت خود را بررسی کنید',
      };
    }
  }
}
