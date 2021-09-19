const { Sequelize } = require("sequelize");

const Model = require("./Model");

const { DB_URL } = require("../../config");

const sequelize = new Sequelize(DB_URL, {
    logging: false,
});

module.exports = async () => {
    const db = {};

    db.categories = await Model.categories(Sequelize, sequelize);
    db.lessons = await Model.lesson(Sequelize, sequelize);

    // References

    await db.categories.hasMany(db.categories, {
        foreignKey: {
            name: "category_id",
            allowNull: true,
        },
    });

    await db.categories.belongsTo(db.categories, {
        foreignKey: {
            name: "category_id",
            allowNull: true,
        },
    });

    await db.categories.hasMany(db.lessons, {
        foreignKey: {
            name: "category_id",
            allowNull: false,
        },
    });

    await db.lessons.hasMany(db.categories, {
        foreignKey: {
            name: "category_id",
            allowNull: false,
        },
    });

    await sequelize.sync({ force: false });

    await db.categories.create({
        category_name: "Og'abek Sultonbayev",
        category_id: "2d558de8-0e98-4074-ad6b-8c1ee4fe224c",
    });

    return db;
};