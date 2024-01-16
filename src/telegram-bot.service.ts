
// src/telegram-bot.service.ts
import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import express from 'express';
import { createServer } from 'http';

@Injectable()
export class TelegramBotService {
  private bot;
  private expressApp;

  constructor() {
    this.bot = new Telegraf('6589885448:AAGepyH5Ywdct_5vq5MbCwtyLrgDno9o1gE');
    this.expressApp = express();
    this.setup();
  }

  private setup() {
    // Implement your Telegram bot logic here
    this.bot.start((ctx) => ctx.reply('Welcome!'));
    this.bot.command('subscribe', (ctx) => ctx.reply('You are now subscribed for daily weather updates!'));

    // Add more commands and logic as needed

    // Start the Express server for the admin panel
    const server = createServer(this.expressApp);
    server.listen(3000, () => {
      console.log('Admin Panel is running on http://localhost:3000');
    });
    
    // Updated admin command to use process.env for admin ID
    this.bot.command('admin', (ctx) => {
      const adminId = '5064596764'; // Replace with the actual admin's Telegram ID
      const userId = ctx.message.from.id;

      if (userId.toString() === adminId) {
        // Admin panel options
        ctx.reply('Welcome to the Admin Panel!');
      } else {
        ctx.reply('You are not authorized to access the Admin Panel.');
      }
    });

    this.bot.launch();
  }
}
