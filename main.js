const TelegramBot = require("node-telegram-bot-api");
const ytdl = require("ytdl-core");
let db = require("./src/Model/postgres");
const admin = require("./src/Admin/server");
const { TOKEN } = require("./config");

(async () => {
    await admin();
})();

const bot = new TelegramBot(TOKEN, {
    polling: true,
});
