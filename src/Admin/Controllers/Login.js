const { LOGIN, PASS } = require("../../../config.js");
const jwt = require("../Modules/jwt.js");
const { generateToken, checkToken } = jwt;

module.exports = class LoginController {
    static async Get(req, res) {
        try {
            res.status(200).render("login");
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async Post(req, res) {
        try {
            const { username, password } = req.body;

            console.log(username, password);

            if (username === LOGIN && password === PASS) {
                let token = await generateToken({
                    login: LOGIN,
                });

                res.cookie("token", token).redirect("/");
            } else {
                res.redirect("/login");
            }
        } catch (e) {
            res.send(e + "");
        }
    }
};
