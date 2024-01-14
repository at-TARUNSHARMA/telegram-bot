// src/app.module.ts
import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';

@Module({
  providers: [TelegramBotService],
})
export class AppModule {}
