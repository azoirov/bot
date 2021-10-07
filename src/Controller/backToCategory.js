module.exports = async (bot, message, psql) => {
    let chatId = message.from.id;
    let messageId = message.message_id;

    let data = message.data.split("#");

    let thisCategoryId = data[1];

    try {
        let category = await psql.categories.findOne({
            where: {
                id: thisCategoryId,
            },
            raw: true,
        });
        if (category) {
            category = await psql.categories.find;
        }
    } catch (e) {}
};
