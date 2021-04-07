export default {
    donate: "Dona a este enlace carajo:\nhttps://www.buymeacoffee.com/zelzazor",
    options: function(message){return {
		parse_mode: 'Markdown',
		reply_to_message_id: message.message_id,
    }}
}