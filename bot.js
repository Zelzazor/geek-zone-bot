import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import responses from './commands/responses.js';
import assistance from './commands/assistance.js'
import Rae from 'rae';

if (process.env.NODE_ENV !== 'production') { 
    dotenv.config() 
}

const {donate, options, dictionary, wiki, toque, options_markdown, til} = responses;
const { getDefs } = assistance;

const token = process.env.TOKEN;




const bot = new TelegramBot(token, {polling: true});

bot.onText(/^\/echo (.+)/, (msg, match) => {
    
    const chatId = msg.chat.id;
    const resp = match[1]; 

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
       
});

bot.onText(/^\/donate/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, donate, options(msg));
});

bot.onText(/^\/rae (.+)/,  (msg, match) => {

    (async ()=>{
            const word = match[1];
            const lang_es = "es";
            getDefs(bot, word, lang_es, msg);
    })();

});

bot.onText(/^\/oxford (.+)/,  (msg, match) => {

    (async ()=>{
            const word = match[1];
            const lang_en_us = "en-us";
            getDefs(bot, word, lang_en_us, msg);
    })();

});

bot.onText(/^\/toque/, (msg) => {
    bot.sendMessage(msg.chat.id, toque, options_markdown(msg));
})

bot.onText(/^\/wiki (.+)/, (msg, match)=>{
    (async ()=>{
        const search = match[1];
        const URL = encodeURI(`https://es.wikipedia.org/api/rest_v1/page/summary/${search}`);
        const res = await fetch(URL);
        const data = await res.json();
        //console.log(data);
        const extract = data.extract;
        const link = data.content_urls.desktop.page;
        bot.sendMessage(msg.chat.id, wiki(extract,link,search), options(msg));
    })();
});

bot.onText(/^\/til/, (msg, match)=>{
    (async ()=>{
        const search = match[1];
        const URL = encodeURI(`https://www.reddit.com/r/todayilearned/random.json`);
        const res = await fetch(URL);
        //console.log(res);
        const data = await res.json();
        
        const title = data[0].data.children[0].data.title;
        
        const permalink = encodeURI(`https://www.reddit.com${data[0].data.children[0].data.permalink}`);
        //console.log(title);
        //console.log(permalink);
        bot.sendMessage(msg.chat.id, til(title, permalink), options(msg));
    })();
})

