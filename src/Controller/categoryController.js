module.exports = async (bot, message, psql) => {
    let messageId = message.message_id || message.message.message_id;
    let chatId = message.from.id;
    let data = message.data;
    let categoryId = data.split("#")[1];
    let type = data.split("#")[0];
    try {
    } catch (e) {}
};
