"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./db");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
let isDbConnected = false;
// Middleware setup
app.use(express_1.default.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: ["*"], credentials: true }));
// Database connection (only once)
async function initializeDB() {
    if (!isDbConnected) {
        try {
            await (0, db_1.connectDB)();
            await db_1.sequelize.sync({ force: false });
            console.log("Database connected");
            isDbConnected = true;
        }
        catch (error) {
            console.error("Database connection error:", error);
        }
    }
}
// Initialize DB on first request
app.use(async (req, res, next) => {
    await initializeDB();
    next();
});
// Routes
app.get("/", (req, res) => {
    res.send("API is running");
});
app.get("/api/healthchecker", (req, res) => {
    res.status(200).json({ status: "success", message: "DONE Bye Uzair" });
});
app.use("/api/blogs", routes_1.default);
// 404 handler
app.all("*", (req, res) => {
    res.status(404).json({ status: "fail", message: `Route: ${req.url} does not exist` });
});
// For local development
if (process.env.NODE_ENV === "development") {
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
// Export for Vercel
exports.default = app;
