const { generateToken, checkToken } = require("../Modules/jwt");

module.exports = async (req, res, next) => {
    let token = req?.cookies["token"];

    if (!token) {
        res.redirect("/login");
        return;
    }

    token = await checkToken(token);

    if (!token) {
        res.redirect("/login");
        return;
    }

    req.admin = token;

    next();
};
