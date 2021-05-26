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
    toque: `🚨 Toque de queda a partir de 27/5/2021 (Solo aplica al GSD) 🚨:
    \nTodos los días: 8:00P.M. con libre tránsito hasta las 11:00P.M.
    \n🚨 Toque de queda anterior 🚨:
    \nLunes a viernes: 10:00P.M. con libre tránsito hasta las 12:00A.M.
    \nFin de semana: 9:00P.M. con libre tránsito hasta las 12:00A.M.\n`,
    til: function(title, permalink){
        return `${title}\n\nLink:${permalink}`
    },
    scp: function(title, scp_class, scp_name, description, link){
        return `<b>${title}</b> - ${scp_name}\n\nObject class: <b>${scp_class}</b>\n\nDescription: ${description}\n\nMore information: ${link}`
    }
}