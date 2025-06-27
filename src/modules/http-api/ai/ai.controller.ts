import { Controller, Post, Body, Res } from '@nestjs/common';
import { AiService } from './ai.service';
import { FastifyReply } from 'fastify';
import { AiMessagesDto } from './ai-message.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async chat(
    @Body() body: { messages: AiMessagesDto[] },
    @Res() res: FastifyReply,
  ) {
    const result = await this.aiService.reply(body.messages);
    res.send(result);
  }
}
