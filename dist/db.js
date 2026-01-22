"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTypes = exports.Sequelize = exports.sequelize = void 0;
exports.connectDB = connectDB;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
Object.defineProperty(exports, "DataTypes", { enumerable: true, get: function () { return sequelize_1.DataTypes; } });
const POSTGRES_URL = process.env.DATABASE_URL;
const sequelize = new sequelize_1.Sequelize(POSTGRES_URL);
exports.sequelize = sequelize;
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection Successful");
    }
    catch (error) {
        console.error("Unable to connect to database: ", error);
    }
}
