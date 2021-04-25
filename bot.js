import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import responses from './commands/responses.js';
import assistance from './commands/assistance.js'
import Rae from 'rae';

if (process.env.NODE_ENV !== 'production') { 
    dotenv.config() 
}

const {donate, options, dictionary, wiki, toque, options_markdown, til, scp} = responses;
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

bot.onText(/^\/meme/, (msg, match)=>{
    (async ()=>{
        const search = match[1];
        const URL = encodeURI(`https://www.reddit.com/r/dankmemes/random.json`);
        const res = await fetch(URL);
        //console.log(res);
        const data = await res.json();
        
        const result = encodeURI(data[0].data.children[0].data.url);
        
        
        console.log(result);
        //console.log(permalink);
        if(result.includes(".gif")){
            bot.sendDocument(msg.chat.id, result, options(msg));
        }
        else{
            bot.sendPhoto(msg.chat.id, result, options(msg));
        }
    })();
})

bot.onText(/^\/advice/, (msg, match)=>{
    (async ()=>{
        const search = match[1];
        const URL = encodeURI(`https://api.adviceslip.com/advice`);
        const res = await fetch(URL);
        //console.log(res);
        const data = await res.json();
        
        const advice = data.slip.advice;
        
        
        //console.log(title);
        //console.log(permalink);
        bot.sendMessage(msg.chat.id, advice, options(msg));
    })();
})

bot.onText(/^\/scp (.+)/, (msg, match)=>{
    (async ()=>{
        const search = match[1];
        const URL = encodeURI(`http://localhost:3000/scp/${search}`);
        const res = await fetch(URL);
        //console.log(res);
        const data = await res.json();
        

        const title = data[0].title;
        const scp_class = data[0].class;
        const description = data[0].description;
        const link = encodeURI(data[0].link);
        
        
        //console.log(title);
        //console.log(permalink);
        bot.sendMessage(msg.chat.id, scp(title, scp_class, description, link), options(msg));
    })();
})

bot.onText(/^\/random_scp/, (msg, match)=>{
    (async ()=>{
        const search = match[1];
        const URL = encodeURI(`http://localhost:3000/scp/random`);
        const res = await fetch(URL);
        //console.log(res);
        const data = await res.json();
        

        const title = data[0].title;
        const scp_class = data[0].class;
        const description = data[0].description;
        const link = encodeURI(data[0].link);
        
        
        //console.log(title);
        //console.log(permalink);
        bot.sendMessage(msg.chat.id, scp(title, scp_class, description, link), options(msg));
    })();
})

