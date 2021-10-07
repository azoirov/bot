module.exports = async (bot, message, psql) => {
    chatId = message.from.id;
    try {
        let homeKeyboard = {
            keyboard: [
                [
                    {
                        text: "Darslar",
                    },
                ],
            ],
            resize_keyboard: true,
        };

        await bot.sendMessage(chatId, "Bizning botda tekinga ta'lim oling", {
            reply_markup: homeKeyboard,
        });
    } catch (e) {
        console.log(e + "");
    }
};
