import { IsIn, IsString, MinLength } from 'class-validator';

export class AiMessagesDto {
  @IsIn(['user', 'assistant', 'system'], { message: 'مقدار نقش باید یکی از مقادیر "user"، "assistant" یا "system" باشد.' })
  role: 'user' | 'assistant' | 'system';

  @IsString({ message: 'محتوا باید یک رشته باشد.' })
  @MinLength(1, { message: 'محتوا نمی‌تواند خالی باشد.' })
  content: string;
}
