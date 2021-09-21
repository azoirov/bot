const TelegramBot = require("node-telegram-bot-api");
const ytdl = require("ytdl-core");
let db = require("./src/Model/postgres");
const admin = require("./src/Admin/server");
const { TOKEN } = require("./config");
const fileIdController = require("./src/Controller/fileIdController");

(async () => {
    await admin();
})();

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
});
