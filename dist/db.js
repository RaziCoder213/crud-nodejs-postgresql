import { Sequelize, DataTypes } from "sequelize";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;

// Configure Sequelize with explicit dialect for Vercel deployment
const sequelizeIsUndefined = !POSTGRES_URL;

let sequelize: Sequelize;

if (sequelizeIsUndefined) {
  // Attempt to create a dummy instance or just undefined if we want to check it later
  // However, to satisfy exports, we can initialize it lazily or just log a warning
  // For now, we will create it but it will fail connection attempts, we must ensure unrelated calls don't crash
  console.warn("DATABASE_URL is not set. Database functionality will not work.");
  // Initialize with void connection to prevent immediate crash on import if used, 
  // though connectDB should be the primary guard
  sequelize = new Sequelize("sqlite::memory:", { logging: false }); // Fallback to memory to prevent crash on new Sequelize()
} else {
  sequelize = new Sequelize(POSTGRES_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: process.env.NODE_ENV === "production" ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    logging: false
  });
}


async function connectDB() {
  if (sequelizeIsUndefined) {
    console.error("Skipping DB connection: DATABASE_URL not found.");
    return;
  }
  try {
    await sequelize.authenticate();
    console.log("Connection Successful");
  } catch (error) {
    console.error("Unable to connect to database: ", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };
