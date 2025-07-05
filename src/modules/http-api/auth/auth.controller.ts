import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { VerifyOtpCodeDto } from './dto/verify-otp-code.dto';
import { PhoneDto } from './dto/phone.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpCodeDto, @Res() res: FastifyReply) {
    const { message, status, accessToken, sessionId } =
      await this.authService.verifyOtp(body);
    return res.send({
      status,
      message,
      accessToken,
      sessionId,
    });
  }

  @Post('send-otp')
  async sendOtp(@Body() body: PhoneDto, @Res() res: FastifyReply) {
    const result = await this.authService.sendOtp(body);
    return res.send(result);
  }

  @Get('refresh')
  async refreshToken(
    @Headers('cookie') rawCookies: string,
    @Res() res: FastifyReply,
  ) {
    try {
      const { status, message, newAccessToken } =
        await this.authService.refreshToken(rawCookies);

      if (newAccessToken) {
        return res.send({ status, message, newAccessToken });
      } else {
        return res.send({ status, message, newAccessToken: null });
      }
    } catch (error) {
      return {
        status: 500,
        message: 'اینترنت خود را بررسی کنید',
      };
    }
  }

  @Delete()
  async logout(
    @Headers('cookie') rawCookies: string,
    @Res() res: FastifyReply,
  ) {
    const { status, message } = await this.authService.logout(rawCookies);

    res.clearCookie('access_token');
    res.clearCookie('session_id');

    return res.send({ message, status });
  }
}
