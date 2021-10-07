module.exports = async (bot, message, psql) => {
    let chatId = message.from.id;
    let messageId = message.message_id || message.message.message_id;
    try {
        let keyboard = {
            inline_keyboard: [],
        };

        let categories = await psql.categories.findAll({
            where: {
                category_id: null,
            },
            raw: true,
        });

        categories.forEach((category) => {
            let button = [
                {
                    text: category.category_name,
                    callback_data: `category#${category.id}`,
                },
            ];

            keyboard.inline_keyboard.push(button);
        });

        keyboard.inline_keyboard.push([
            {
                text: "🔙 Orqaga",
                callback_data: `back_to_home`,
            },
        ]);

        await bot.sendMessage(chatId, `Quyidagi darslardan birini tanlang`, {
            reply_markup: keyboard,
        });
    } catch (e) {
        console.log(e);
    }
};
