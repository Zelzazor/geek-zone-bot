import responses from './responses.js'
import dotenv from 'dotenv';

const {dictionary, options} = responses;

if (process.env.NODE_ENV !== 'production') { 
    dotenv.config() 
}

const oxford_id = process.env.APP_ID_OXFORD;
const oxford_key = process.env.APP_KEY_OXFORD;

const getDefs = async (bot, word, language, msg) => {
    const init = {
        method: 'GET',
        headers: {
            'app_id': oxford_id,
            'app_key': oxford_key
        }
    }
    const url = encodeURI(`https://od-api.oxforddictionaries.com/api/v2/entries/${language}/${word}`);
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
        bot.sendMessage(msg.chat.id, dictionary(word, definitions), options(msg));
    }
}


export default {getDefs}