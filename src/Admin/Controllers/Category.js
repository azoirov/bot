const { Op } = require("sequelize");
const { default: slugify } = require("slugify");

module.exports = class CategoryController {
    static async MainCategoryGet(req, res) {
        try {
            const { category_id } = req.params;

            let category = await req.psql.categories.findOne({
                where: {
                    id: category_id,
                },
                raw: true,
            });

            let categories = await req.psql.categories.findAll({
                where: {
                    category_id,
                },
                raw: true,
            });

            let lessons;

            if (!categories.length) {
                lessons = await req.psql.lessons.findAll({
                    where: {
                        category_id: category_id,
                    },
                    raw: true,
                });
            }

            res.render("category", {
                category,
                categories,
                lessons: lessons ? lessons : [],
            });
        } catch (e) {
            res.send(e + "");
        }
    }

    static async AddCategory(req, res) {
        try {
            let { category_name, category_id } = req.body;

            let category = await req.psql.categories.findOne({
                where: {
                    id: category_id,
                },
                raw: true,
            });

            if (!category) throw new Error("Invalid category");

            let lessons = await req.psql.lessons.findAll({
                where: {
                    category_id: category_id,
                },
                raw: true,
            });

            if (lessons.length)
                throw new Error(
                    "This category contains lessons, One category only can include lesson or category"
                );

            let c = await req.psql.categories.findAll({
                where: {
                    [Op.and]: {
                        category_id: category_id,
                        slug: slugify(category_name.toLowerCase(), {
                            remove: /[*+~.()'"!:@,;><`~]/g,
                        }),
                    },
                },
            });

            if (c.length)
                throw new Error("Please, change category name and try again");

            await req.psql.categories.create({
                category_name: category_name,
                slug: slugify(category_name.toLowerCase(), {
                    remove: /[*+~.()'"!:@,;><`~]/g,
                }),
                category_id: category_id,
            });

            res.status(201).json({
                ok: true,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async Addlesson(req, res) {
        try {
            let { lesson_name, file_id, category_id, caption } = req.body;

            let category = await req.psql.categories.findOne({
                where: {
                    id: category_id,
                },
                raw: true,
            });

            if (!category) throw new Error("Invalid category_id");

            let lesson = await req.psql.lessons.create(
                {
                    name: lesson_name,
                    file_id,
                    category_id,
                    caption,
                    slug: slugify(lesson_name.toLowerCase(), {
                        remove: /[*+~.()'"!:@,;><`~]/g,
                    }),
                },
                {
                    returning: true,
                    raw: true,
                }
            );

            res.status(201).json({
                ok: true,
                lesson: lesson,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async DeleteLesson(req, res) {
        try {
            let { lesson_id } = req.params;

            let lesson = await req.psql.lessons.findOne({
                where: {
                    id: lesson_id,
                },
                raw: true,
            });

            if (!lesson) throw new Error("Invalid lesson id");

            lesson = await req.psql.lessons.destroy({
                where: {
                    id: lesson_id,
                },
            });

            res.status(200).json({
                ok: true,
            });
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }

    static async DeleteCategories(req, res) {
        try {
            let { category_id } = req.params;

            let category = await req.psql.categories.findOne({
                where: {
                    id: category_id,
                },
            });

            if (!category) throw new Error("Invalid category_id");

            await req.psql.categories.destroy({
                where: {
                    id: category_id,
                },
            });

            await req.psql.categories.destroy({
                where: {
                    category_id: category_id,
                },
            });

            res.status(200).redirect("/");
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + "",
            });
        }
    }
};
