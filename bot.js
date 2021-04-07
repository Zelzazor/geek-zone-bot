import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import responses from './commands/responses.js';
import Rae from 'rae';

if (process.env.NODE_ENV !== 'production') { 
    dotenv.config() 
}

const {donate, options, dictionary} = responses;

const token = process.env.TOKEN;
const oxford_id = process.env.APP_ID_OXFORD;
const oxford_key = process.env.APP_KEY_OXFORD;
const raeClient = Rae.create();



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
            const init = {
                method: 'GET',
                headers: {
                    'app_id': oxford_id,
                    'app_key': oxford_key
                }
            }
            const url = encodeURI(`https://od-api.oxforddictionaries.com/api/v2/entries/es/${word}`);
            const res = await fetch(url, init);
            //console.log(res.headers);
            const data = await res.json();
            //console.log(data);
            if (data.error){
                bot.sendMessage(msg.chat.id, `No he encontrado resultados para: ${word}`, options(msg));
            }
            else{
                const senses = data.results[0].lexicalEntries[0].entries[0].senses;
                const definitions = senses.map(sense => sense.definitions[0]);
                //console.log(definitions);
                bot.sendMessage(msg.chat.id, dictionary(word, definitions), options(msg));
            }
            
    })();

})

