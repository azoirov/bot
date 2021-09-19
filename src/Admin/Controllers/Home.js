const { default: slugify } = require("slugify");

module.exports = class HomeController {
    static async Get(req, res) {
        try {
            let categories = await req.psql.categories.findAll({
                where: {
                    category_id: null,
                },
                raw: true,
            });

            res.render("index", {
                categories,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async MainCategoryPost(req, res) {
        try {
            let { category_name } = req.body;

            let category = await req.psql.categories.findOne({
                where: {
                    slug: slugify(category_name.toLowerCase(), {
                        remove: /[*+~.()'"!:@,;><`~]/g,
                    }),
                },
            });

            if (category) throw new Error("This category exists");

            category = await req.psql.categories.create(
                {
                    category_name: category_name,
                    slug: slugify(category_name.toLowerCase(), {
                        remove: /[*+~.()'"!:@,;><`~]/g,
                    }),
                },
                {
                    raw: true,
                    returning: true,
                }
            );

            res.status(201).json({
                ok: true,
                category,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }
};
