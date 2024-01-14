// src/telegram-bot.service.ts
import { Injectable } from '@nestjs/common';
import { Telegraf, Markup } from 'telegraf';

@Injectable()
export class TelegramBotService {
  private bot;

  constructor() {
    try {
      this.bot = new Telegraf('6589885448:AAGepyH5Ywdct_5vq5MbCwtyLrgDno9o1gE');
      this.setup();
    } catch (error) {
      console.error('Error setting up Telegram bot:', error);
    }
  }

  private setup() {
    this.bot.start((ctx) => ctx.reply('Welcome! Use /subscribe to get daily weather updates.'));

    // Command to subscribe for daily weather updates
    this.bot.command('subscribe', (ctx) => {
      const userId = ctx.message.from.id;
      // Implement subscription logic (e.g., store user ID in a database)
      ctx.reply('You are now subscribed for daily weather updates!');
    });

    // Command to open the admin panel
    this.bot.command('admin', (ctx) => {
      const adminId = '5064596764'; // Replace with the actual admin's Telegram ID
      const userId = ctx.message.from.id;

      if (userId.toString() === adminId) {
        // Admin panel options
        const keyboard = Markup.keyboard([
          ['Manage Users', 'Bot Settings', 'Other Options'], // Add more options dynamically
        ]).resize();

        ctx.reply('Welcome to the Admin Panel!', keyboard);
      } else {
        ctx.reply('You are not authorized to access the Admin Panel.');
      }
    });

    // Command to handle admin actions
    this.bot.hears('Manage Users', (ctx) => {
      // Implement logic to manage users (e.g., blocking/deleting users)
      const userId = ctx.message.from.id;
      const username = ctx.message.from.username;

      // Perform user management actions (replace with your actual logic)
      // For example, you might want to block or delete a user
      // Assume you have a user management service with functions like blockUser or deleteUser

      // Sample user blocking logic
      // userManagementService.blockUser(userId);

      ctx.reply(`User @${username} (${userId}) has been blocked.`);
    });

    // Command to handle bot settings
    this.bot.hears('Bot Settings', (ctx) => {
      // Implement logic for updating bot settings (e.g., API keys)
      const userId = ctx.message.from.id;

      // Check if the user is authorized to update bot settings
      const adminId = process.env.ADMIN_TELEGRAM_ID; // Replace with the actual admin's Telegram ID
      if (userId.toString() !== adminId) {
        ctx.reply('You are not authorized to update bot settings.');
        return;
      }

      // Sample bot settings update logic
      // Replace with your actual logic for updating settings
      // Assume you have a settings service with functions like updateApiKey

      // const updatedApiKey = 'new_api_key';
      // settingsService.updateApiKey(updatedApiKey);

      ctx.reply('Bot settings updated successfully.');
    });

    this.bot.launch();
  }
}
