const coursesController = require("./coursesController");

module.exports = async (bot, message, psql) => {
    let chatId = message.from.id;
    let messageId = message.from.id;
    let text = message.text;
    try {
        if (text === "Darslar") {
            await coursesController(bot, message, psql);
        }
    } catch (e) {}
};
