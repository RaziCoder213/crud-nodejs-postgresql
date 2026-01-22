"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const BlogModel = db_1.sequelize.define("blogs", {
    id: {
        type: db_1.DataTypes.UUID,
        defaultValue: db_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: db_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: db_1.DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: db_1.DataTypes.STRING(50),
        allowNull: true,
    },
    published: {
        type: db_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    createdAt: {
        type: db_1.DataTypes.DATE,
        defaultValue: db_1.DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: db_1.DataTypes.DATE,
        defaultValue: db_1.DataTypes.NOW,
        allowNull: false,
    },
});
exports.default = BlogModel;
