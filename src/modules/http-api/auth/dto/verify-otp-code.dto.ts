import { Length, IsString, IsMobilePhone } from 'class-validator';

export class VerifyOtpCodeDto {
  @IsString()
  @Length(5, 5, { message: 'OTP code must be exactly 5 digits.' })
  code: string;

  @IsMobilePhone("fa-IR")
  phone: string
}
