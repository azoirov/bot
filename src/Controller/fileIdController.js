module.exports = async (bot, message) => {
    let file = message.document || message.video;

    let file_id = file.file_id;
    try {
        await bot.sendMessage(message.from.id, `<code>${file_id}</code>`, {
            parse_mode: "HTML",
            reply_to_message_id: message.message_id,
        });
    } catch (e) {}
};
