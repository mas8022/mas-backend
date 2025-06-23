import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { parse } from 'cookie';
import { JwtService } from '../../services/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getMeContact(rawCookies: string) {
    try {
      const me = await this.getMe(rawCookies);

      const contacts = await this.prismaService.contact.findMany({
        where: { userId: me.id },
      });

      return {
        status: 200,
        message: 'لیست مخاطبین شما با موفقیت ارسال شدن',
        data: contacts,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'اینترنت خود را بررسی کنید',
      };
    }
  }

  async getFindUsers(phone: string, rawCookies: string) {
    try {
      const me = await this.getMe(rawCookies);

      const users = await this.prismaService.user.findMany({
        where: {
          phone: {
            contains: phone,
          },
          NOT: {
            phone: me.phone,
          },
        },
        select: {
          id: true,
          phone: true,
        },
        take: 5,
      });

      return users;
    } catch (error) {
      return [];
    }
  }

  async getMe(rawCookies: string) {
    try {
      const { access_token } = parse(rawCookies || '');

      const { id } = this.jwtService.verifyAccessToken(access_token);

      const me = await this.prismaService.user.findUnique({ where: { id } });

      return me;
    } catch (error) {
      return null;
    }
  }
}
