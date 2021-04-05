import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config() 
}


const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/echo (.+)/, (msg, match) => {
    
    const chatId = msg.chat.id;
    const resp = match[1]; 

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
       
});

