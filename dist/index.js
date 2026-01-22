import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB, sequelize } from "./db";
import blogRouter from "./routes/routes";

const app: Express = express();
let isDbConnected = false;

// Middleware setup
app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cors({ origin: ["*"], credentials: true }));

// Database connection (only once)
// Database connection (only once)
async function initializeDB() {
  if (!isDbConnected) {
    // If DATABASE_URL was missing, sequelize might be a dummy instance.
    // We should check if we really want to proceed.
    if (!process.env.DATABASE_URL) {
      console.warn("Skipping DB initialization: DATABASE_URL missing");
      return;
    }

    try {
      await connectDB();
      // Only sync if we have a valid postgres connection, otherwise this might throw on the dummy sqlite or if connection failed
      await sequelize.sync({ force: false });
      console.log("Database connected and synced");
      isDbConnected = true;
    } catch (error) {
      console.error("Database connection error:", error);
      // Don't throw - let the app continue serving other requests (like health checks)
    }
  }
}

// Initialize DB on first request
app.use(async (req: Request, res: Response, next) => {
  if (!isDbConnected) {
    await initializeDB();
  }
  next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "DONE Bye Uzair" });
});

app.use("/api/blogs", blogRouter);

// 404 handler
app.all("*", (req: Request, res: Response) => {
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
export default app;
