const { verify, sign } = require("jsonwebtoken");
const config = require("../../../config");

async function generateToken(data) {
    return sign(data, config.SECRET_WORD);
}

async function checkToken(token) {
    try {
        return verify(token, config.SECRET_WORD);
    } catch (error) {
        return false;
    }
}

module.exports = { generateToken, checkToken };
