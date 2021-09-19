module.exports = class HomeController {
    static async Get(req, res) {
        try {
            res.render("index");
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }
};
