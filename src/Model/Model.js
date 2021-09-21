const slugify = require("slugify");
// {remove: /[*+~.()'"!:@,;><`~]/g}

module.exports = class Model {
    static async categories(Sequelize, sequelize) {
        return sequelize.define("categories", {
            id: {
                type: Sequelize.DataTypes.UUID,
                defaultValue: Sequelize.DataTypes.UUIDV4,
                primaryKey: true,
            },
            category_name: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            slug: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
        });
    }

    static async lesson(Sequelize, sequelize) {
        return sequelize.define("lessons", {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4(),
            },
            file_id: {
                type: Sequelize.DataTypes.STRING(256),
                allowNull: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING(256),
                allowNull: false,
            },
            slug: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            caption: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
        });
    }
};
