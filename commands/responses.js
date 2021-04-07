export default {
    donate: "Dona a este enlace carajo:\nhttps://www.buymeacoffee.com/zelzazor",
    dictionary: function(word, definitions){
        let formatStr = word+":\n";
        for(const definition of definitions)  {
            formatStr+="1. "+definition+"\n";
        }
        return formatStr;
    },
    options: function(message){return {
		parse_mode: 'Markdown',
		reply_to_message_id: message.message_id,
    }}
}