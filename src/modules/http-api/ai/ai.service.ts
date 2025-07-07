import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { AiMessagesDto } from './ai-message.dto';

const openai = new OpenAI({
  baseURL: process.env.AI_BASE_URL,
  apiKey: process.env.AI_LIARA_API_KEY,
});

@Injectable()
export class AiService {
  async reply(messages: AiMessagesDto[]) {
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages,
    });

    return {
      status: 200,
      message: 'پاسخ داده شد',
      data: response.choices[0].message.content,
    };
  }
}
