const homeController = require("./homeController");

module.exports = async (bot, message, psql) => {
    let chatId = message.from.id;
    let firstName = message.from.first_name;
    let rizqimUrl = "https://t.me/rizqimuz";
    try {
        let user = await psql.users.findOne({
            where: {
                chat_id: chatId,
            },
            raw: true,
        });

        if (!user) {
            user = await psql.users.create({
                chat_id: 1,
            });
        }

        let keyboard = {
            inline_keyboard: [
                [
                    {
                        text: "Rizqim.uz - IT sohasida ish topishda qiynalyapsizmi?",
                        url: rizqimUrl,
                    },
                ],
            ],
        };

        await bot.sendMessage(
            chatId,
            `Assalomu alaykum, <b>${firstName}</b>!\n\nBotimizga xush kelibsiz`,
            {
                parse_mode: "HTML",
                reply_markup: keyboard,
            }
        );

        await homeController(bot, message, psql);
    } catch (e) {
        console.log(e);
    }
};
