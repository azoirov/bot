require("dotenv").config();

const { env } = process;

module.exports = {
    TOKEN: env.TOKEN,
    DB_URL: env.DB_URL,
    PORT: env.PORT,
    LOGIN: env.LOGIN,
    PASS: env.PASS,
    SECRET_WORD: env.SECRET_WORD,
};
