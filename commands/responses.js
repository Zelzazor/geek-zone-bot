export default {
    donate: "Dona a este enlace carajo:\nhttps://www.buymeacoffee.com/zelzazor",
    dictionary: function(word, definitions){
        let formatStr = word+":\n";
        let count = 1;
        for(const definition of definitions)  {
            formatStr+=count+". "+definition+"\n";
            count++;
        }
        return formatStr;
    },
    wiki: function(extract, link, search){
        return `<b>${search}</b>\n\n${extract}\n\nMás información: ${link}`
    }
    ,
    options: function(message){return {
		parse_mode: 'html',
		reply_to_message_id: message.message_id,
    }},
    options_markdown: function(message){
        return {
            parse_mode: 'Markdown',
		    reply_to_message_id: message.message_id,
        }
    },
    toque: `🚨 Toque de queda 🚨:
    \nLunes a viernes: 10:00P.M. con libre tránsito hasta las 12:00A.M.
    \nFin de semana: 9:00P.M. con libre tránsito hasta las 12:00A.M.\n`,
    til: function(title, permalink){
        return `${title}\n\nLink:${permalink}`
    }
}