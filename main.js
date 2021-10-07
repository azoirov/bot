const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("./config");
const categoryController = require("./src/Controller/categoryController");
const fileIdController = require("./src/Controller/fileIdController");
const replyKeyboardTextController = require("./src/Controller/replyKeyboardTextController");
const startController = require("./src/Controller/startController");

module.exports = async function bot(psql) {
    const bot = new TelegramBot(TOKEN, {
        polling: true,
    });

    let admins = [815280285, 756612778];

    bot.on("message", async (message) => {
        let text = message.text;
        let chatId = message.from.id;
        if ((message.document || message.video) && admins.includes(chatId)) {
            await fileIdController(bot, message);
        }

        if (text === "/start") {
            await startController(bot, message, psql);
        } else if (!message.data) {
            await replyKeyboardTextController(bot, message, psql);
        }

        if (message.data) {
            await categoryController(bot, message, psql);
        }
    });
};
