import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsIn,
} from 'class-validator';

export enum Priority {
  کم = 'کم',
  متوسط = 'متوسط',
  زیاد = 'زیاد',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'عنوان الزامی است' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString({}, { message: 'تاریخ باید فرمت ISO داشته باشد' })
  date: string;

  @IsIn(['کم', 'متوسط', 'زیاد'], { message: 'اولویت نامعتبر است' })
  priority: Priority;

  @IsOptional()
  @IsBoolean()
  done?: boolean = false;
}
