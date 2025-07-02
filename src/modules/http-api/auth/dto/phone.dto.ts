import { IsMobilePhone } from 'class-validator';

export class PhoneDto {
  @IsMobilePhone('fa-IR')
  phone: string;
}
